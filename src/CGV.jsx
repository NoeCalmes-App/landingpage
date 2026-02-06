export default function CGV({ onBack }) {
  return (
    <div className="min-h-screen bg-surface px-5 py-16 md:py-24">
      <div className="max-w-230 mx-auto">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-brand font-semibold text-sm mb-10 hover:opacity-70 transition-opacity cursor-pointer"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Retour au site
        </button>

        <h1 className="font-heading text-text text-2xl md:text-[2.1rem] font-bold tracking-tight mb-4">
          Conditions G&eacute;n&eacute;rales de Vente
        </h1>
        <p className="text-grey text-sm mb-10">
          En vigueur au 6 f&eacute;vrier 2026
        </p>

        <div className="space-y-10 text-text text-[0.93rem] md:text-[0.95rem] leading-relaxed">

          <section>
            <h2 className="font-heading text-lg font-bold mb-3">Article 1 &mdash; Objet</h2>
            <p>
              Les pr&eacute;sentes Conditions G&eacute;n&eacute;rales de Vente (CGV) r&eacute;gissent les relations contractuelles entre <strong>No&eacute; Calmes</strong>, entrepreneur individuel (SIREN 922 623 814), et tout client (ci-apr&egrave;s &laquo; le Client &raquo;) souhaitant b&eacute;n&eacute;ficier des prestations de d&eacute;veloppement d&rsquo;applications mobiles propos&eacute;es.
            </p>
            <p className="mt-2">
              Toute commande de prestation implique l&rsquo;acceptation sans r&eacute;serve des pr&eacute;sentes CGV.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-lg font-bold mb-3">Article 2 &mdash; Prestations</h2>
            <p>No&eacute; Calmes propose les prestations suivantes :</p>
            <ul className="mt-3 space-y-1.5 list-disc list-inside text-grey">
              <li>Conception et d&eacute;veloppement d&rsquo;applications mobiles (iOS et Android) avec Flutter</li>
              <li>D&eacute;veloppement d&rsquo;applications MVP (Minimum Viable Product)</li>
              <li>Refonte d&rsquo;applications existantes</li>
              <li>D&eacute;ploiement sur l&rsquo;App Store et Google Play</li>
              <li>Maintenance et suivi apr&egrave;s mise en ligne</li>
            </ul>
            <p className="mt-2">
              Le d&eacute;tail des prestations est pr&eacute;cis&eacute; dans le devis ou la proposition commerciale accept&eacute;e par le Client.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-lg font-bold mb-3">Article 3 &mdash; Devis et commande</h2>
            <p>
              Toute prestation fait l&rsquo;objet d&rsquo;un devis d&eacute;taill&eacute; transmis au Client. Le devis est valable <strong>30 jours</strong> &agrave; compter de sa date d&rsquo;&eacute;mission.
            </p>
            <p className="mt-2">
              La commande est r&eacute;put&eacute;e ferme et d&eacute;finitive &agrave; r&eacute;ception du devis sign&eacute; par le Client et du versement de l&rsquo;acompte pr&eacute;vu.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-lg font-bold mb-3">Article 4 &mdash; Tarifs et paiement</h2>
            <p>Les prix sont indiqu&eacute;s en euros et hors taxes (HT). La TVA applicable est ajout&eacute;e au taux en vigueur.</p>
            <ul className="mt-3 space-y-1.5 list-disc list-inside text-grey">
              <li><strong>Acompte :</strong> 30 % du montant total &agrave; la signature du devis</li>
              <li><strong>Paiement interm&eacute;diaire :</strong> 40 % &agrave; la livraison d&rsquo;une version fonctionnelle</li>
              <li><strong>Solde :</strong> 30 % &agrave; la livraison finale et au d&eacute;ploiement</li>
            </ul>
            <p className="mt-2">
              Les paiements s&rsquo;effectuent par virement bancaire dans un d&eacute;lai de <strong>30 jours</strong> &agrave; compter de la date de facturation, sauf mention contraire sur le devis.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-lg font-bold mb-3">Article 5 &mdash; Retard de paiement</h2>
            <p>
              En cas de retard de paiement, des p&eacute;nalit&eacute;s de retard seront appliqu&eacute;es au taux de <strong>3 fois le taux d&rsquo;int&eacute;r&ecirc;t l&eacute;gal</strong> en vigueur, conform&eacute;ment &agrave; l&rsquo;article L.441-10 du Code de commerce.
            </p>
            <p className="mt-2">
              Une indemnit&eacute; forfaitaire de <strong>40 &euro;</strong> pour frais de recouvrement sera &eacute;galement due (article D.441-5 du Code de commerce).
            </p>
          </section>

          <section>
            <h2 className="font-heading text-lg font-bold mb-3">Article 6 &mdash; D&eacute;lais de r&eacute;alisation</h2>
            <p>
              Les d&eacute;lais de r&eacute;alisation sont indiqu&eacute;s &agrave; titre estimatif dans le devis. No&eacute; Calmes s&rsquo;engage &agrave; mettre en &oelig;uvre tous les moyens n&eacute;cessaires pour respecter les d&eacute;lais convenus.
            </p>
            <p className="mt-2">
              Les d&eacute;lais peuvent &ecirc;tre prolong&eacute;s en cas de retard imputable au Client (retard dans la fourniture de contenus, validations tardives, changement de p&eacute;rim&egrave;tre).
            </p>
          </section>

          <section>
            <h2 className="font-heading text-lg font-bold mb-3">Article 7 &mdash; Obligations du Client</h2>
            <p>Le Client s&rsquo;engage &agrave; :</p>
            <ul className="mt-3 space-y-1.5 list-disc list-inside text-grey">
              <li>Fournir les &eacute;l&eacute;ments n&eacute;cessaires &agrave; la r&eacute;alisation de la prestation (contenus, maquettes, acc&egrave;s, identifiants)</li>
              <li>R&eacute;pondre aux demandes de validation dans un d&eacute;lai raisonnable</li>
              <li>D&eacute;signer un interlocuteur unique pour faciliter les &eacute;changes</li>
              <li>R&eacute;gler les factures dans les d&eacute;lais convenus</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-lg font-bold mb-3">Article 8 &mdash; Propri&eacute;t&eacute; intellectuelle</h2>
            <p>
              &Agrave; r&eacute;ception du paiement int&eacute;gral, le Client devient propri&eacute;taire du code source sp&eacute;cifiquement d&eacute;velopp&eacute; pour son projet.
            </p>
            <p className="mt-2">
              Les biblioth&egrave;ques, frameworks et composants g&eacute;n&eacute;riques utilis&eacute;s restent la propri&eacute;t&eacute; de leurs auteurs respectifs et sont soumis &agrave; leurs licences propres.
            </p>
            <p className="mt-2">
              No&eacute; Calmes se r&eacute;serve le droit de mentionner la r&eacute;alisation du projet dans son portfolio, sauf accord contraire &eacute;crit du Client.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-lg font-bold mb-3">Article 9 &mdash; R&eacute;siliation</h2>
            <p>
              En cas de r&eacute;siliation anticip&eacute;e par le Client, les sommes d&eacute;j&agrave; vers&eacute;es restent acquises &agrave; No&eacute; Calmes au titre des travaux r&eacute;alis&eacute;s. Le travail effectu&eacute; jusqu&rsquo;&agrave; la date de r&eacute;siliation sera livr&eacute; au Client.
            </p>
            <p className="mt-2">
              En cas de manquement grave de l&rsquo;une des parties, l&rsquo;autre partie pourra r&eacute;silier le contrat de plein droit apr&egrave;s mise en demeure rest&eacute;e infructueuse pendant <strong>15 jours</strong>.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-lg font-bold mb-3">Article 10 &mdash; Garantie et maintenance</h2>
            <p>
              No&eacute; Calmes garantit la correction des bugs li&eacute;s au d&eacute;veloppement pendant une dur&eacute;e de <strong>30 jours</strong> apr&egrave;s la livraison finale, sans frais suppl&eacute;mentaires.
            </p>
            <p className="mt-2">
              Au-del&agrave; de cette p&eacute;riode, toute intervention fera l&rsquo;objet d&rsquo;un devis compl&eacute;mentaire.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-lg font-bold mb-3">Article 11 &mdash; Responsabilit&eacute;</h2>
            <p>
              La responsabilit&eacute; de No&eacute; Calmes est limit&eacute;e au montant total de la prestation concern&eacute;e. No&eacute; Calmes ne saurait &ecirc;tre tenu responsable des dommages indirects (perte de chiffre d&rsquo;affaires, perte de donn&eacute;es, pr&eacute;judice commercial).
            </p>
          </section>

          <section>
            <h2 className="font-heading text-lg font-bold mb-3">Article 12 &mdash; Force majeure</h2>
            <p>
              Aucune des parties ne pourra &ecirc;tre tenue responsable de l&rsquo;inex&eacute;cution de ses obligations en cas de force majeure telle que d&eacute;finie par l&rsquo;article 1218 du Code civil.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-lg font-bold mb-3">Article 13 &mdash; Droit applicable et litiges</h2>
            <p>
              Les pr&eacute;sentes CGV sont soumises au droit fran&ccedil;ais. En cas de litige, les parties s&rsquo;engagent &agrave; rechercher une solution amiable. &Agrave; d&eacute;faut, le litige sera port&eacute; devant les tribunaux comp&eacute;tents de <strong>Millau</strong>.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-lg font-bold mb-3">Article 14 &mdash; M&eacute;diation</h2>
            <p>
              Conform&eacute;ment aux articles L.612-1 et suivants du Code de la consommation, le Client consommateur a le droit de recourir gratuitement &agrave; un m&eacute;diateur de la consommation en vue de la r&eacute;solution amiable de tout litige.
            </p>
          </section>

        </div>
      </div>
    </div>
  )
}
