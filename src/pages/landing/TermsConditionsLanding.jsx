import { useEffect, useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';

const cssFiles = [
  '/wp.neofiacademy.com/wp-content/plugins/elementor/assets/lib/font-awesome/css/all.min1678.css',
  '/wp.neofiacademy.com/wp-content/plugins/elementor/assets/css/frontend.min1678.css',
  '/wp.neofiacademy.com/wp-content/themes/hello-elementor/assets/css/reseta7da.css',
  '/wp.neofiacademy.com/wp-content/themes/hello-elementor/assets/css/themea7da.css',
  '/wp.neofiacademy.com/wp-content/themes/hello-elementor/assets/css/header-footera7da.css',
  '/wp.neofiacademy.com/wp-content/uploads/elementor/css/post-546d8e5.css',
  '/wp.neofiacademy.com/wp-content/uploads/elementor/css/post-814da7.css',
  '/wp.neofiacademy.com/wp-content/uploads/elementor/css/base-desktope096.css',
  '/wp.neofiacademy.com/wp-content/plugins/elementor/assets/css/widget-image.min1678.css',
  '/wp.neofiacademy.com/wp-content/plugins/elementor/assets/css/widget-heading.min1678.css',
  '/wp.neofiacademy.com/wp-content/plugins/elementskit-lite/widgets/init/assets/css/widget-styles657a.css',
  '/wp.neofiacademy.com/wp-content/plugins/elementskit-lite/widgets/init/assets/css/responsive657a.css',
  '/wp.neofiacademy.com/wp-content/plugins/elementskit-lite/modules/elementskit-icon-pack/assets/css/ekiticons657a.css',
];

export default function TermsConditionsLanding() {
  const [cssReady, setCssReady] = useState(false);

  useEffect(() => {
    document.title = 'TERMS & CONDITIONS – Neofi Academy';

    let loaded = 0;
    const total = cssFiles.length;
    const onLoad = () => { if (++loaded >= total) setCssReady(true); };

    const links = cssFiles.map((href) => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      link.dataset.landing = 'true';
      link.onload = onLoad;
      link.onerror = onLoad;
      document.head.appendChild(link);
      return link;
    });

    document.body.className = 'page wp-theme-hello-elementor hello-elementor-default elementor-default elementor-kit-13';

    return () => {
      links.forEach((l) => l.remove());
      document.body.className = '';
    };
  }, []);

  if (!cssReady) {
    return (
      <div style={{ minHeight: '100vh', background: '#0a0a0a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ width: 32, height: 32, border: '2px solid rgba(139,92,246,0.3)', borderTopColor: '#8b5cf6', borderRadius: '50%', animation: 'spin 0.6s linear infinite' }} />
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      </div>
    );
  }

  return (
    <>
      <Header />
      <main style={{ padding: '120px 15% 60px', background: '#000', minHeight: '100vh', fontFamily: 'sans-serif' }}>
        <h1 style={{ fontSize: '3.5rem', fontWeight: 'bold', color: '#fff', margin: '0 0 8px' }}>TERMS &amp; CONDITIONS</h1>
        <p style={{ color: '#d4af37', fontSize: '13px', margin: '0 0 16px' }}>TERMS &amp; CONDITIONS</p>

        <p style={t}>Welcome to NeoFi Academy.</p>

        <p style={t}>By accessing and using our website, educational services, and affiliation program, you agree to comply with and be bound by the following Terms and Conditions.</p>

        <p style={h}>1. About NeoFi Academy</p>
        <p style={t}>NeoFi Academy provides educational content, training programs, business networking opportunities, and affiliation programs related to personal development, financial literacy, and forex trading education.</p>

        <p style={h}>2. Educational Purpose Only</p>
        <p style={t}>All information, training materials, webinars, courses, resources, presentations, and content provided by NeoFi Academy are strictly for educational and informational purposes only.</p>

        <p style={h}>3. Risk Disclaimer</p>
        <p style={t}>Forex trading, CFD trading, copy trading, and other financial market activities involve substantial risk and may not be suitable for all individuals.</p>
        <p style={t}>
          • NeoFi Academy provides education only.<br />
          • No investment advice or financial recommendations.<br />
          • No management of client funds or trading accounts.<br />
          • No guarantee of profits or returns.<br />
          • Past performance does not guarantee future results.
        </p>

        <p style={h}>4. Affiliation Program</p>
        <p style={t}>Participation in the NeoFi Academy Affiliation Program is voluntary and subject to applicable policies.</p>

        <p style={h}>5. User Responsibilities</p>
        <p style={t}>
          • Provide accurate information.<br />
          • Do not misuse the website.<br />
          • Do not engage in unlawful or fraudulent activities.<br />
          • Do not reproduce content without permission.
        </p>

        <p style={h}>6. Intellectual Property</p>
        <p style={t}>All website content, branding, graphics, materials, and resources remain the exclusive property of NeoFi Academy.</p>

        <p style={h}>7. Third-Party Services</p>
        <p style={t}>We may link to third-party platforms, brokers, tools, and services. Users access such services at their own risk.</p>

        <p style={h}>8. Limitation of Liability</p>
        <p style={t}>NeoFi Academy shall not be liable for losses arising from the use of our website, educational materials, or participation in financial activities.</p>

        <p style={h}>9. Modifications</p>
        <p style={t}>We reserve the right to modify these Terms and Conditions at any time.</p>

        <p style={h}>10. Termination</p>
        <p style={t}>We may suspend or terminate access if users violate these Terms.</p>

        <p style={h}>11. Contact Us</p>
        <p style={t}>For questions regarding these Terms and Conditions, please contact us through our official website.</p>
        <p style={t}>NeoFi Academy</p>
      </main>
      <Footer />
    </>
  );
}

const h = { color: '#fff', fontSize: '16px', margin: '32px 0 8px', fontWeight: '600', paddingLeft: '20px' };
const t = { color: '#ccc', fontSize: '15px', lineHeight: '2', margin: '0 0 20px' };
