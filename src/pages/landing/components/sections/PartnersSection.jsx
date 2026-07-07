import { BASE } from '../../paths';

const partners = [
  {
    name: 'Fusion Markets',
    logo: `${BASE}/wp-content/uploads/2026/05/Fusen-Market.png`,
    points: ['Global Forex Broker', 'Competitive Spreads', 'MT4 / MT5 Support'],
  },
  {
    name: 'Century Financial',
    logo: `${BASE}/wp-content/uploads/2026/06/Fusen-Market-0223456.png`,
    points: ['DFSA / SCA Regulated', 'Forex, Stocks & Commodities', 'MT4 / MT5 Support'],
  },
  {
    name: 'Exness',
    logo: `${BASE}/wp-content/uploads/2026/05/Fusen-Market-02234.png`,
    points: ['FCA / CySEC Regulated', 'Forex, Metals & Crypto', 'MT5 Support'],
  },
  {
    name: 'XM',
    logo: `${BASE}/wp-content/uploads/2026/05/Fusen-Market-022345.png`,
    points: ['FCA / CySEC Regulated', 'Forex, Metals & Crypto', 'MT5 Support'],
  },
];

const checkItems = [
  'Regulated global trading environments',
  'MT4 & MT5 and cTrader trading platforms',
  'Secure access to Forex, metals, stocks & crypto',
];

export default function PartnersSection() {
  return (
    <section id="Partners" style={styles.section}>
      <div style={styles.dividerWrap}>
        <img
          src={`${BASE}/wp-content/uploads/2026/05/Horizontal-Divider.png`}
          alt=""
          style={styles.dividerImg}
        />
      </div>
      <div style={styles.container}>
        {/* Left Column */}
        <div style={styles.left}>
          <span style={styles.badge}>Partners</span>
          <h2 style={styles.heading}>World-Class<br />Broker Partners</h2>
          <p style={styles.description}>
            Neofi Academy collaborates with internationally trusted Forex brokers to deliver secure trading access, advanced platforms, and professional market experiences for traders worldwide.
          </p>
          <ul style={styles.checkList}>
            {checkItems.map((item, i) => (
              <li key={i} style={styles.checkItem}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={styles.checkIcon}>
                  <path d="M4 10.5L8 14.5L16 6.5" stroke="#F0B90B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Right Column - 2x2 Grid */}
        <div style={styles.grid}>
          {partners.map((p, i) => (
            <div key={i} style={styles.card}>
              <div style={styles.cardHeader}>
                <img src={p.logo} alt={p.name} style={styles.cardLogo} />
                <h6 style={styles.cardName}>{p.name}</h6>
              </div>
              <ul style={styles.cardList}>
                {p.points.map((pt, j) => (
                  <li key={j} style={styles.cardListItem}>{pt}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const styles = {
  section: {
    background: '#000',
    padding: '80px 5%',
    position: 'relative',
  },
  dividerWrap: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
  },
  dividerImg: {
    width: '100%',
    height: 'auto',
    display: 'block',
  },
  container: {
    display: 'flex',
    gap: '60px',
    maxWidth: '1280px',
    margin: '0 auto',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  left: {
    flex: '1 1 400px',
    minWidth: '300px',
  },
  badge: {
    display: 'inline-block',
    border: '1px solid #D4A300',
    borderRadius: '999px',
    padding: '8px 24px',
    color: '#fff',
    fontSize: '14px',
    marginBottom: '24px',
  },
  heading: {
    fontFamily: "'Bricolage Grotesque', sans-serif",
    fontSize: 'clamp(36px, 5vw, 64px)',
    fontWeight: 700,
    color: '#fff',
    lineHeight: 1.1,
    margin: '0 0 24px',
  },
  description: {
    color: '#999',
    fontSize: '16px',
    lineHeight: 1.7,
    margin: '0 0 32px',
    maxWidth: '520px',
  },
  checkList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
  },
  checkItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    color: '#fff',
    fontSize: '15px',
  },
  checkIcon: {
    flexShrink: 0,
  },
  grid: {
    flex: '1 1 500px',
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '20px',
  },
  card: {
    background: '#1a1a1a',
    borderRadius: '12px',
    padding: '24px',
    border: '1px solid #2a2a2a',
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '16px',
  },
  cardLogo: {
    width: '48px',
    height: '48px',
    objectFit: 'contain',
  },
  cardName: {
    color: '#fff',
    fontSize: '18px',
    fontWeight: 600,
    margin: 0,
  },
  cardList: {
    listStyle: 'disc',
    paddingLeft: '20px',
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  cardListItem: {
    color: '#ccc',
    fontSize: '14px',
    lineHeight: 1.5,
  },
};
