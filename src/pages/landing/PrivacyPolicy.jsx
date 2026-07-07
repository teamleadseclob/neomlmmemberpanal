import { useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';

export default function PrivacyPolicy() {
  useEffect(() => { document.title = 'PRIVACY POLICY – Neofi Academy'; }, []);

  return (
    <>
      <Header />
      <main id="content" className="site-main" style={{paddingTop:'100px', padding:'100px 5% 60px', color:'#fff', background:'#000', minHeight:'100vh'}}>
        <h1 style={{fontSize:'2rem', marginBottom:'24px'}}>PRIVACY POLICY</h1>
        <p>Effective Date: May 2026</p>
        <p>At NeoFi Academy, we value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website or participate in our educational and affiliate programs.</p>
        <p><strong>Information We Collect</strong></p>
        <p>• Name<br/>• Email Address<br/>• Phone Number<br/>• Country of Residence<br/>• Affiliate Referral Information<br/>• Information submitted through contact forms or support requests</p>
        <p><strong>How We Use Your Information</strong></p>
        <p>• Provide educational services and training programs<br/>• Manage affiliate and referral activities<br/>• Respond to inquiries and support requests<br/>• Send important updates and announcements<br/>• Improve our website, services, and user experience<br/>• Maintain platform security and prevent fraud</p>
        <p><strong>Contact Us</strong></p>
        <p>If you have any questions regarding this Privacy Policy, please contact us through our official website.</p>
        <p>NeoFi Academy</p>
      </main>
      <Footer />
    </>
  );
}
