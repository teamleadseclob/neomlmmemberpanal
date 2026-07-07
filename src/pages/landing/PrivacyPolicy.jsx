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

export default function PrivacyPolicy() {
  const [cssReady, setCssReady] = useState(false);

  useEffect(() => {
    document.title = 'PRIVACY POLICY – Neofi Academy';

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
        <h1 style={{ fontSize: '3.5rem', fontWeight: 'bold', color: '#fff', margin: '0 0 8px' }}>PRIVACY POLICY</h1>
        <p style={{ color: '#d4af37', fontSize: '13px', margin: '0 0 16px' }}>PRIVACY POLICY</p>

        <p style={t}>Effective Date: May 2026</p>

        <p style={t}>At NeoFi Academy, we value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website or participate in our educational and affiliate programs.</p>

        <p style={h}>Information We Collect</p>
        <p style={t}>
          • Name<br />
          • Email Address<br />
          • Phone Number<br />
          • Country of Residence<br />
          • Affiliate Referral Information<br />
          • Information submitted through contact forms or support requests
        </p>

        <p style={h}>How We Use Your Information</p>
        <p style={t}>
          • Provide educational services and training programs<br />
          • Manage affiliate and referral activities<br />
          • Respond to inquiries and support requests<br />
          • Send important updates and announcements<br />
          • Improve our website, services, and user experience<br />
          • Maintain platform security and prevent fraud
        </p>

        <p style={h}>Cookies</p>
        <p style={t}>Our website may use cookies to enhance user experience and analyze website traffic. By using our website, you consent to the use of cookies.</p>

        <p style={h}>Third-Party Services</p>
        <p style={t}>We may use trusted third-party services for website hosting, analytics, email communications, and payment processing.</p>

        <p style={h}>Data Security</p>
        <p style={t}>We take reasonable measures to protect your personal information from unauthorized access, misuse, or disclosure.</p>

        <p style={h}>Your Rights</p>
        <p style={t}>You may request access to, correction of, or deletion of your personal information by contacting us.</p>

        <p style={h}>Educational Disclaimer</p>
        <p style={t}>NeoFi Academy provides educational content, training, and affiliate opportunities. We do not provide financial, investment, or trading advice.</p>

        <p style={h}>Changes to This Policy</p>
        <p style={t}>We may update this Privacy Policy from time to time. Any changes will be posted on this page.</p>

        <p style={h}>Contact Us</p>
        <p style={t}>If you have any questions regarding this Privacy Policy, please contact us through our official website.</p>
        <p style={t}>NeoFi Academy</p>
      </main>
      <Footer />
    </>
  );
}

const h = { color: '#fff', fontSize: '16px', margin: '32px 0 8px', fontWeight: '600', paddingLeft: '20px' };
const t = { color: '#ccc', fontSize: '15px', lineHeight: '2', margin: '0 0 20px' };
