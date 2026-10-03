import { onDocumentCreated } from "firebase-functions/v2/firestore";
import { defineSecret } from "firebase-functions/params";
import { FieldValue } from "firebase-admin/firestore";

const secret = defineSecret("AUDIT_CRM_SECRET");
const endpoint = "https://europe-west1-devis-app-8e216.cloudfunctions.net/ingestAuditContact";

// Durable delivery: the saved audit is the outbox. Retries never duplicate a
// client (the receiver commits client + receipt in one transaction).
export const syncAuditContact = onDocumentCreated({
  document: "audits/{auditId}",
  region: "europe-west1",
  secrets: [secret],
  retry: true,
  maxInstances: 3,
  timeoutSeconds: 60,
}, async (event) => {
  const snapshot = event.data;
  const audit = snapshot?.data();
  if (!snapshot || !audit || audit.status !== "completed" || (!audit.contactEmail && !audit.contactPhone)) return;
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${secret.value()}` },
      body: JSON.stringify({
        auditId: snapshot.id,
        firstName: audit.firstName,
        email: audit.contactEmail || "",
        phone: audit.contactPhone || "",
        idea: audit.ideaText || "",
        budget: audit.q4Answer || "",
        stage: audit.projectStageAnswer || "",
        heat: audit.leadTemperature,
      }),
      signal: AbortSignal.timeout(20000),
    });
    if (!response.ok) throw new Error(`CRM HTTP ${response.status}`);
    const result = await response.json() as { status: string; clientId: string };
    if (!["created", "existing"].includes(result.status) || !result.clientId) throw new Error("Invalid CRM acknowledgement");
    await snapshot.ref.update({ crmSync: { ...result, syncedAt: FieldValue.serverTimestamp() } });
  } catch (error) {
    await snapshot.ref.update({ crmSync: { status: "retrying", attemptedAt: FieldValue.serverTimestamp() } });
    throw error;
  }
});
