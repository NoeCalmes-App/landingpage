// Shared by the browser form and backend validation; contains no server imports.
export function normalizeContactPhone(value: string): string {
  const raw = value.trim();
  if (!raw || !/^[+\d ().-]+$/.test(raw)) return "";
  let digits = raw.replace(/\D/g, "");
  if (raw.startsWith("00")) digits = digits.slice(2);
  if (digits.startsWith("330")) digits = `33${digits.slice(3)}`;
  if (digits.startsWith("0") && digits.length === 10) digits = `33${digits.slice(1)}`;
  if (!raw.startsWith("+") && !raw.startsWith("00") && /^[1-9]\d{8}$/.test(digits)) digits = `33${digits}`;
  return /^[1-9]\d{8,14}$/.test(digits) ? `+${digits}` : "";
}
