import { useEffect, useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HeroSection from './components/sections/HeroSection';
import AboutSection from './components/sections/AboutSection';
import ServicesSection from './components/sections/ServicesSection';
import PartnersSection from './components/sections/PartnersSection';
import AccessSection from './components/sections/AccessSection';
import ContactSection from './components/sections/ContactSection';
import useScrollAnimations from './useScrollAnimations';

const cssFiles = [
  '/wp.neofiacademy.com/wp-content/plugins/elementor/assets/lib/font-awesome/css/all.min1678.css',
  '/wp.neofiacademy.com/wp-content/plugins/elementor/assets/lib/font-awesome/css/v4-shims.min1678.css',
  '/wp.neofiacademy.com/wp-content/plugins/bdthemes-prime-slider/assets/css/bdt-uikit5829.css',
  '/wp.neofiacademy.com/wp-content/plugins/bdthemes-prime-slider/assets/css/prime-slider-site1aae.css',
  '/wp.neofiacademy.com/wp-content/plugins/metform/public/assets/lib/cute-alert/styleeda1.css',
  '/wp.neofiacademy.com/wp-content/plugins/metform/public/assets/css/text-editoreda1.css',
  '/wp.neofiacademy.com/wp-content/themes/hello-elementor/assets/css/reseta7da.css',
  '/wp.neofiacademy.com/wp-content/themes/hello-elementor/assets/css/themea7da.css',
  '/wp.neofiacademy.com/wp-content/themes/hello-elementor/assets/css/header-footera7da.css',
  '/wp.neofiacademy.com/wp-content/plugins/elementor/assets/css/frontend.min1678.css',
  '/wp.neofiacademy.com/wp-content/uploads/elementor/css/post-134da7.css',
  '/wp.neofiacademy.com/wp-content/plugins/elementor/assets/lib/animations/styles/fadeInDown.min1678.css',
  '/wp.neofiacademy.com/wp-content/plugins/elementor/assets/css/widget-image.min1678.css',
  '/wp.neofiacademy.com/wp-content/plugins/elementor/assets/lib/animations/styles/fadeInUp.min1678.css',
  '/wp.neofiacademy.com/wp-content/plugins/elementor/assets/css/widget-heading.min1678.css',
  '/wp.neofiacademy.com/wp-content/plugins/pro-elements/assets/css/modules/sticky.min5fc8.css',
  '/wp.neofiacademy.com/wp-content/plugins/bdthemes-prime-slider/assets/css/ps-general1aae.css',
  '/wp.neofiacademy.com/wp-content/plugins/elementor/assets/css/widget-divider.min1678.css',
  '/wp.neofiacademy.com/wp-content/plugins/elementor/assets/css/widget-spacer.min1678.css',
  '/wp.neofiacademy.com/wp-content/plugins/elementor/assets/css/widget-icon-list.min1678.css',
  '/wp.neofiacademy.com/wp-content/plugins/elementor/assets/css/widget-nested-accordion.min1678.css',
  '/wp.neofiacademy.com/wp-content/plugins/pro-elements/assets/css/widget-form.min5fc8.css',
  '/wp.neofiacademy.com/wp-content/uploads/elementor/css/post-814da7.css',
  '/wp.neofiacademy.com/wp-content/uploads/elementor/css/base-desktope096.css',
  '/wp.neofiacademy.com/wp-content/uploads/elementor/css/local-81-frontend-desktop940c.css',
  '/wp.neofiacademy.com/wp-content/uploads/elementor/css/post-1048d0e8.css',
  '/wp.neofiacademy.com/wp-content/uploads/elementor/css/post-546d8e5.css',
  '/wp.neofiacademy.com/wp-content/plugins/elementskit-lite/widgets/init/assets/css/widget-styles657a.css',
  '/wp.neofiacademy.com/wp-content/plugins/elementskit-lite/widgets/init/assets/css/responsive657a.css',
  '/wp.neofiacademy.com/wp-content/plugins/elementskit-lite/modules/elementskit-icon-pack/assets/css/ekiticons657a.css',
  '/wp.neofiacademy.com/wp-content/uploads/elementor/css/post-13616c6d.css',
];

export default function LandingPage() {
  const [cssReady, setCssReady] = useState(false);

  useEffect(() => {
    document.title = 'neo_memberpanel';

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

    // Add Google Fonts
    const fonts = [
      'https://fonts.googleapis.com/css?family=Bricolage+Grotesque:100,200,300,400,500,600,700,800,900&display=swap',
      'https://fonts.googleapis.com/css?family=Be+Vietnam+Pro:100,200,300,400,500,600,700,800,900&display=swap',
    ];
    const fontLinks = fonts.map((href) => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      link.dataset.landing = 'true';
      document.head.appendChild(link);
      return link;
    });

    // Add JS dependencies
    const scripts = [
      '/wp.neofiacademy.com/wp-content/plugins/elementor/assets/lib/font-awesome/js/v4-shims.min1678.js',
      '/wp.neofiacademy.com/wp-content/plugins/elementor/assets/js/webpack.runtime.min1678.js',
      '/wp.neofiacademy.com/wp-content/plugins/elementor/assets/js/frontend-modules.min1678.js',
      '/wp.neofiacademy.com/wp-content/plugins/elementor/assets/js/frontend.min1678.js',
      '/wp.neofiacademy.com/wp-content/plugins/bdthemes-prime-slider/assets/vendor/js/gsap.min9b70.js',
      '/wp.neofiacademy.com/wp-content/plugins/bdthemes-prime-slider/assets/vendor/js/SplitText.min9b70.js',
      '/wp.neofiacademy.com/wp-content/plugins/bdthemes-prime-slider/assets/js/bdt-uikit.min5829.js',
      '/wp.neofiacademy.com/wp-content/plugins/bdthemes-prime-slider/assets/js/modules/ps-general.min1aae.js',
      '/wp.neofiacademy.com/wp-content/plugins/bdthemes-prime-slider/assets/js/prime-slider-site.min1aae.js',
    ];
    const scriptEls = scripts.map((src) => {
      const s = document.createElement('script');
      s.src = src;
      s.dataset.landing = 'true';
      document.body.appendChild(s);
      return s;
    });

    // Add body classes for landing page
    document.body.className = 'home wp-singular page-template-default page page-id-81 wp-custom-logo wp-embed-responsive wp-theme-hello-elementor hello-elementor-default elementor-default elementor-kit-13 elementor-page elementor-page-81';

    return () => {
      links.forEach((l) => l.remove());
      fontLinks.forEach((l) => l.remove());
      scriptEls.forEach((s) => s.remove());
      document.body.className = '';
    };
  }, []);

  useScrollAnimations();

  if (!cssReady) {
    return (
      <div style={{minHeight:'100vh',background:'#0a0a0a',display:'flex',alignItems:'center',justifyContent:'center'}}>
        <span style={{width:32,height:32,border:'2px solid rgba(139,92,246,0.3)',borderTopColor:'#8b5cf6',borderRadius:'50%',animation:'spin 0.6s linear infinite'}} />
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      </div>
    );
  }

  return (
    <>
      <Header />
      <main id="content" className="site-main post-81 page type-page status-publish hentry" style={{paddingTop:'80px'}}>
        <div className="page-content">
          <div data-elementor-type="wp-page" data-elementor-id="81" className="elementor elementor-81" data-elementor-post-type="page">
            <HeroSection />
            <AboutSection />
            <ServicesSection />
            <PartnersSection />
            <AccessSection />
            <ContactSection />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
