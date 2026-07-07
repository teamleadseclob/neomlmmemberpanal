import { useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';

export default function TermsConditionsLanding() {
  useEffect(() => { document.title = 'TERMS & CONDITIONS – Neofi Academy'; }, []);

  return (
    <>
      <Header />
      <main id="content" className="site-main" style={{paddingTop:'100px', padding:'100px 5% 60px', color:'#fff', background:'#000', minHeight:'100vh'}}>
        <h1 style={{fontSize:'2rem', marginBottom:'24px'}}>TERMS &amp; CONDITIONS</h1>
        <p>Welcome to NeoFi Academy.</p>
        <p>By accessing and using our website, educational services, and affiliation program, you agree to comply with and be bound by the following Terms and Conditions.</p>
        <p><strong>1. About NeoFi Academy</strong></p>
        <p>NeoFi Academy provides educational content, training programs, business networking opportunities, and affiliation programs related to personal development, financial literacy, and forex trading education.</p>
        <p><strong>2. Educational Purpose Only</strong></p>
        <p>All information, training materials, webinars, courses, resources, presentations, and content provided by NeoFi Academy are strictly for educational and informational purposes only.</p>
        <p><strong>3. Risk Disclaimer</strong></p>
        <p>Forex trading, CFD trading, copy trading, and other financial market activities involve substantial risk and may not be suitable for all individuals.</p>
        <p><strong>Contact Us</strong></p>
        <p>For questions regarding these Terms and Conditions, please contact us through our official website.</p>
        <p>NeoFi Academy</p>
      </main>
      <Footer />
    </>
  );
}
