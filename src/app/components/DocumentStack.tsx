const Lines = ({ rows = 4, shortLast = false }: { rows?: number; shortLast?: boolean }) => (
  <div className="document-lines" aria-hidden="true">
    {Array.from({ length: rows }).map((_, index) => <i className={shortLast && index === rows - 1 ? "is-short" : ""} key={index} />)}
  </div>
);

const Status = ({ children }: { children: React.ReactNode }) => (
  <span className="document-status"><b aria-hidden="true">•••</b>{children}</span>
);

export function DocumentStack() {
  return (
    <div className="document-stage" aria-label="Documents préparés pendant la consultation">
      <article className="medical-document medical-document--letter">
        <header><span className="status-dot" /><h3>Courrier d’adressage</h3><Status>Préparation<br />en cours</Status></header>
        <div className="document-address"><Lines rows={2} shortLast /></div>
        <Lines rows={1} />
        <div className="document-letter-body"><Lines rows={4} /><Lines rows={4} shortLast /></div>
      </article>
      <article className="medical-document medical-document--report">
        <header><span className="status-dot" /><h3>Compte rendu</h3><Status>Prêt à relire</Status></header>
        <div className="document-summary"><Lines rows={3} shortLast /><Lines rows={3} shortLast /></div>
        <section><h4>Motif de consultation</h4><Lines rows={4} shortLast /></section>
        <section><h4>Synthèse</h4><Lines rows={4} shortLast /></section>
        <section><h4>Éléments cliniques</h4><Lines rows={3} shortLast /></section>
      </article>
      <article className="medical-document medical-document--prescription">
        <header><span className="status-dot" /><h3>Ordonnance</h3><Status>Validée par<br />le médecin</Status></header>
        <div className="document-summary"><Lines rows={2} shortLast /><Lines rows={2} shortLast /></div>
        {Array.from({ length: 3 }).map((_, index) => <div className="prescription-row" key={index}><span /><Lines rows={2} shortLast /><i /></div>)}
      </article>
    </div>
  );
}
