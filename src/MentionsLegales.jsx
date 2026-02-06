export default function MentionsLegales({ onBack }) {
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
          Mentions l&eacute;gales
        </h1>
        <p className="text-grey text-sm mb-10">
          En vigueur au 6 f&eacute;vrier 2026
        </p>

        <div className="space-y-10 text-text text-[0.93rem] md:text-[0.95rem] leading-relaxed">

          <section>
            <h2 className="font-heading text-lg font-bold mb-3">&Eacute;diteur du site</h2>
            <ul className="space-y-1.5 text-grey">
              <li><strong className="text-text">Nom :</strong> No&eacute; Calmes</li>
              <li><strong className="text-text">Statut :</strong> Entrepreneur individuel</li>
              <li><strong className="text-text">SIREN :</strong> 922 623 814</li>
              <li><strong className="text-text">SIRET :</strong> 922 623 814 00030</li>
              <li><strong className="text-text">N&deg; TVA :</strong> FR25922623814</li>
              <li><strong className="text-text">Activit&eacute; :</strong> Programmation informatique (NAF 6201Z)</li>
              <li><strong className="text-text">Adresse :</strong> 2500 Rue des Aumi&egrave;res, 12100 Millau, France</li>
              <li><strong className="text-text">Contact :</strong> <a href="mailto:contact@noecalmes.fr" className="text-brand hover:underline">contact@noecalmes.fr</a></li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-lg font-bold mb-3">Directeur de la publication</h2>
            <p>No&eacute; Calmes, en qualit&eacute; d&rsquo;entrepreneur individuel.</p>
          </section>

          <section>
            <h2 className="font-heading text-lg font-bold mb-3">H&eacute;bergeur</h2>
            <ul className="space-y-1.5 text-grey">
              <li><strong className="text-text">Raison sociale :</strong> Vercel Inc.</li>
              <li><strong className="text-text">Adresse :</strong> 440 N Barranca Ave #4133, Covina, CA 91723, &Eacute;tats-Unis</li>
              <li><strong className="text-text">Site :</strong> <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-brand hover:underline">vercel.com</a></li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-lg font-bold mb-3">Propri&eacute;t&eacute; intellectuelle</h2>
            <p>
              L&rsquo;ensemble du contenu du site (textes, images, graphismes, logo, ic&ocirc;nes, vid&eacute;os, mise en page) est la propri&eacute;t&eacute; exclusive de No&eacute; Calmes, sauf mention contraire. Toute reproduction, repr&eacute;sentation, modification, publication ou adaptation de tout ou partie des &eacute;l&eacute;ments du site, quel que soit le moyen ou le proc&eacute;d&eacute; utilis&eacute;, est interdite sans l&rsquo;autorisation &eacute;crite pr&eacute;alable de No&eacute; Calmes.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-lg font-bold mb-3">Limitation de responsabilit&eacute;</h2>
            <p>
              No&eacute; Calmes s&rsquo;efforce de fournir sur le site des informations aussi pr&eacute;cises que possible. Toutefois, il ne pourra &ecirc;tre tenu responsable des omissions, des inexactitudes et des carences dans la mise &agrave; jour, qu&rsquo;elles soient de son fait ou du fait des tiers partenaires qui lui fournissent ces informations.
            </p>
            <p className="mt-2">
              Toutes les informations indiqu&eacute;es sur le site sont donn&eacute;es &agrave; titre indicatif et sont susceptibles d&rsquo;&eacute;voluer. Le site peut contenir des liens hypertextes vers d&rsquo;autres sites. No&eacute; Calmes ne dispose d&rsquo;aucun contr&ocirc;le sur le contenu de ces sites tiers et n&rsquo;assume aucune responsabilit&eacute; &agrave; leur &eacute;gard.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-lg font-bold mb-3">Donn&eacute;es personnelles</h2>
            <p>
              Pour toute information relative au traitement de vos donn&eacute;es personnelles, veuillez consulter notre Politique de confidentialit&eacute; accessible depuis le pied de page du site.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-lg font-bold mb-3">Droit applicable</h2>
            <p>
              Les pr&eacute;sentes mentions l&eacute;gales sont r&eacute;gies par le droit fran&ccedil;ais. En cas de litige, les tribunaux fran&ccedil;ais seront seuls comp&eacute;tents.
            </p>
          </section>

        </div>
      </div>
    </div>
  )
}
