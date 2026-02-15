export default function PolitiqueConfidentialite({ onBack }) {
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
          Politique de confidentialit&eacute;
        </h1>
        <p className="text-grey text-sm mb-10">
          Derni&egrave;re mise &agrave; jour : 6 f&eacute;vrier 2026
        </p>

        <div className="space-y-10 text-text text-[0.93rem] md:text-[0.95rem] leading-relaxed">

          {/* 1 */}
          <section>
            <h2 className="font-heading text-lg font-bold mb-3">&Eacute;diteur du site</h2>
            <p>
              Le pr&eacute;sent site est &eacute;dit&eacute; par <strong>No&eacute; Calmes</strong>, entrepreneur individuel.
            </p>
            <ul className="mt-3 space-y-1 text-grey">
              <li>SIREN : 922 623 814</li>
              <li>SIRET : 922 623 814 00030</li>
              <li>TVA intracommunautaire : FR25922623814</li>
              <li>Activit&eacute; : Programmation informatique (6201Z)</li>
            </ul>
          </section>

          {/* 2 */}
          <section>
            <h2 className="font-heading text-lg font-bold mb-3">Responsable du traitement</h2>
            <p>
              Le responsable du traitement des donn&eacute;es personnelles est <strong>No&eacute; Calmes</strong>.
            </p>
            <p className="mt-2">
              Contact : <a href="mailto:contact@noecalmes.fr" className="text-brand hover:underline">contact@noecalmes.fr</a>
            </p>
          </section>

          {/* 3 */}
          <section>
            <h2 className="font-heading text-lg font-bold mb-3">Donn&eacute;es collect&eacute;es</h2>
            <p>Dans le cadre de l&rsquo;utilisation du site et de la prise de rendez-vous, les donn&eacute;es suivantes peuvent &ecirc;tre collect&eacute;es :</p>
            <ul className="mt-3 space-y-1.5 list-disc list-inside text-grey">
              <li>Nom et pr&eacute;nom</li>
              <li>Adresse e-mail</li>
              <li>Num&eacute;ro de t&eacute;l&eacute;phone</li>
              <li>Informations relatives &agrave; votre projet (description, besoins)</li>
              <li>Donn&eacute;es de navigation (cookies, adresse IP, pages visit&eacute;es)</li>
            </ul>
          </section>

          {/* 4 */}
          <section>
            <h2 className="font-heading text-lg font-bold mb-3">Finalit&eacute;s du traitement</h2>
            <p>Vos donn&eacute;es sont collect&eacute;es pour les finalit&eacute;s suivantes :</p>
            <ul className="mt-3 space-y-1.5 list-disc list-inside text-grey">
              <li>R&eacute;pondre &agrave; vos demandes de contact et de prise de rendez-vous</li>
              <li>&Eacute;tablir des devis et propositions commerciales</li>
              <li>Assurer le suivi de la relation client</li>
              <li>Am&eacute;liorer l&rsquo;exp&eacute;rience utilisateur du site</li>
              <li>Respecter les obligations l&eacute;gales et r&eacute;glementaires</li>
            </ul>
          </section>

          {/* 5 */}
          <section>
            <h2 className="font-heading text-lg font-bold mb-3">Base l&eacute;gale du traitement</h2>
            <p>Le traitement de vos donn&eacute;es repose sur :</p>
            <ul className="mt-3 space-y-1.5 list-disc list-inside text-grey">
              <li><strong>Votre consentement</strong> (article 6.1.a du RGPD) lors de la prise de contact</li>
              <li><strong>L&rsquo;ex&eacute;cution de mesures pr&eacute;contractuelles</strong> (article 6.1.b du RGPD) pour l&rsquo;&eacute;tablissement de devis</li>
              <li><strong>L&rsquo;int&eacute;r&ecirc;t l&eacute;gitime</strong> (article 6.1.f du RGPD) pour l&rsquo;am&eacute;lioration du site</li>
            </ul>
          </section>

          {/* 6 */}
          <section>
            <h2 className="font-heading text-lg font-bold mb-3">Dur&eacute;e de conservation</h2>
            <p>Vos donn&eacute;es personnelles sont conserv&eacute;es pour une dur&eacute;e maximale de :</p>
            <ul className="mt-3 space-y-1.5 list-disc list-inside text-grey">
              <li><strong>3 ans</strong> &agrave; compter du dernier contact pour les donn&eacute;es de prospects</li>
              <li><strong>5 ans</strong> apr&egrave;s la fin de la relation commerciale pour les donn&eacute;es clients (obligations comptables)</li>
              <li><strong>13 mois</strong> pour les cookies et traceurs</li>
            </ul>
          </section>

          {/* 7 */}
          <section>
            <h2 className="font-heading text-lg font-bold mb-3">Destinataires des donn&eacute;es</h2>
            <p>
              Vos donn&eacute;es sont destin&eacute;es uniquement &agrave; No&eacute; Calmes. Elles ne sont ni vendues, ni c&eacute;d&eacute;es &agrave; des tiers.
            </p>
            <p className="mt-2">
              Elles peuvent &ecirc;tre transmises &agrave; des sous-traitants techniques (h&eacute;bergement, outil de prise de rendez-vous) dans le respect du RGPD.
            </p>
          </section>

          {/* 8 */}
          <section>
            <h2 className="font-heading text-lg font-bold mb-3">Vos droits</h2>
            <p>Conform&eacute;ment au R&egrave;glement G&eacute;n&eacute;ral sur la Protection des Donn&eacute;es (RGPD) et &agrave; la loi Informatique et Libert&eacute;s, vous disposez des droits suivants :</p>
            <ul className="mt-3 space-y-1.5 list-disc list-inside text-grey">
              <li><strong>Droit d&rsquo;acc&egrave;s</strong> : obtenir la confirmation que vos donn&eacute;es sont trait&eacute;es et en obtenir une copie</li>
              <li><strong>Droit de rectification</strong> : demander la correction de donn&eacute;es inexactes</li>
              <li><strong>Droit &agrave; l&rsquo;effacement</strong> : demander la suppression de vos donn&eacute;es</li>
              <li><strong>Droit &agrave; la limitation</strong> : demander la suspension du traitement</li>
              <li><strong>Droit &agrave; la portabilit&eacute;</strong> : recevoir vos donn&eacute;es dans un format structur&eacute;</li>
              <li><strong>Droit d&rsquo;opposition</strong> : vous opposer au traitement de vos donn&eacute;es</li>
            </ul>
            <p className="mt-3">
              Pour exercer vos droits, contactez : <a href="mailto:contact@noecalmes.fr" className="text-brand hover:underline">contact@noecalmes.fr</a>
            </p>
            <p className="mt-2">
              Vous pouvez &eacute;galement introduire une r&eacute;clamation aupr&egrave;s de la <strong>CNIL</strong> (Commission Nationale de l&rsquo;Informatique et des Libert&eacute;s) : <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-brand hover:underline">www.cnil.fr</a>
            </p>
          </section>

          {/* 9 */}
          <section>
            <h2 className="font-heading text-lg font-bold mb-3">Cookies</h2>
            <p>
              Le site peut utiliser des cookies techniques n&eacute;cessaires &agrave; son fonctionnement ainsi que des cookies analytiques pour mesurer l&rsquo;audience.
            </p>
            <p className="mt-2">
              Vous pouvez &agrave; tout moment g&eacute;rer vos pr&eacute;f&eacute;rences en mati&egrave;re de cookies via les param&egrave;tres de votre navigateur.
            </p>
          </section>

          {/* 10 */}
          <section>
            <h2 className="font-heading text-lg font-bold mb-3">S&eacute;curit&eacute;</h2>
            <p>
              No&eacute; Calmes met en &oelig;uvre les mesures techniques et organisationnelles appropri&eacute;es pour prot&eacute;ger vos donn&eacute;es personnelles contre tout acc&egrave;s non autoris&eacute;, toute perte ou toute alt&eacute;ration.
            </p>
          </section>

          {/* 11 */}
          <section>
            <h2 className="font-heading text-lg font-bold mb-3">Modification de la politique</h2>
            <p>
              Cette politique de confidentialit&eacute; peut &ecirc;tre mise &agrave; jour &agrave; tout moment. La date de derni&egrave;re modification est indiqu&eacute;e en haut de cette page.
            </p>
          </section>

        </div>
      </div>
    </div>
  )
}
