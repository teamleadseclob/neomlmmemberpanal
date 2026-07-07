import { Link } from 'react-router-dom';
import { BASE } from '../paths';

export default function Header() {
  return (
    <header data-elementor-type="header" data-elementor-id="1048" className="elementor elementor-1048 elementor-location-header" data-elementor-post-type="elementor_library">
      <div className="elementor-element elementor-element-24e6e16c e-flex e-con-boxed e-con e-parent e-lazyloaded elementor-sticky--active" data-id="24e6e16c" data-element_type="container" data-e-type="container" style={{position:'fixed',top:0,left:0,width:'100%',zIndex:9999}}>
        <div className="e-con-inner">
          <div className="elementor-element elementor-element-14b78808 e-con-full e-flex e-con e-child" data-id="14b78808" data-element_type="container" data-e-type="container">
            <div className="elementor-element elementor-element-6e60e348 e-con-full e-flex e-con e-child" data-id="6e60e348" data-element_type="container" data-e-type="container">
              <div className="elementor-element elementor-element-2fa767cc elementor-widget elementor-widget-image" data-id="2fa767cc" data-element_type="widget" data-e-type="widget" data-settings='{"_animation":"fadeInDown","_animation_delay":"250"}' data-widget_type="image.default">
                <img fetchpriority="high" width="348" height="146" src={`${BASE}/wp-content/uploads/2026/05/Neofi-Academy-Logo2.png`} className="attachment-full size-full wp-image-823" alt="" />
              </div>
            </div>
            <div className="elementor-element elementor-element-544b523d e-con-full e-flex e-con e-child" data-id="544b523d" data-element_type="container" data-e-type="container">
              <div className="elementor-element elementor-element-5c7d1e99 elementor-hidden-tablet elementor-hidden-mobile elementor-widget elementor-widget-ekit-nav-menu" data-id="5c7d1e99" data-element_type="widget" data-e-type="widget" data-settings='{"_animation":"fadeInDown","_animation_delay":"500"}' data-widget_type="ekit-nav-menu.default">
                <div className="elementor-widget-container">
                  <nav className="ekit-wid-con ekit_menu_responsive_tablet" data-hamburger-icon="icon icon-menu-11" data-hamburger-icon-type="icon" data-responsive-breakpoint="1024">
                    <button className="elementskit-menu-hamburger elementskit-menu-toggler" type="button" aria-label="hamburger-icon">
                      <i aria-hidden="true" className="ekit-menu-icon icon icon-menu-11"></i>
                    </button>
                    <div id="ekit-megamenu-main-menu" className="elementskit-menu-container elementskit-menu-offcanvas-elements elementskit-navbar-nav-default ekit-nav-menu-one-page-yes ekit-nav-dropdown-hover">
                      <ul id="menu-main-menu" className="elementskit-navbar-nav elementskit-menu-po-center submenu-click-on-icon">
                        <li className="menu-item nav-item elementskit-mobile-builder-content active"><a href="/#Home Page" className="ekit-menu-nav-link active">Home</a></li>
                        <li className="menu-item nav-item elementskit-mobile-builder-content active"><a href="/#About" className="ekit-menu-nav-link active">About us</a></li>
                        <li className="menu-item nav-item elementskit-mobile-builder-content active"><a href="/#Service" className="ekit-menu-nav-link active">Services</a></li>
                        <li className="menu-item nav-item elementskit-mobile-builder-content active"><a href="/#Partners" className="ekit-menu-nav-link active">Partners</a></li>
                        <li className="menu-item nav-item elementskit-mobile-builder-content active"><a href="/#Access" className="ekit-menu-nav-link active">Access</a></li>
                        <li className="menu-item nav-item elementskit-mobile-builder-content active"><a href="/#Contact" className="ekit-menu-nav-link active">Contact us</a></li>
                      </ul>
                      <div className="elementskit-nav-identity-panel">
                        <Link className="elementskit-nav-logo" to="/">
                          <img src={`${BASE}/wp-content/uploads/2026/05/cropped-Neofi-Academy-logo-ICN%40300x.png`} alt="" decoding="async" />
                        </Link>
                        <button className="elementskit-menu-close elementskit-menu-toggler" type="button">X</button>
                      </div>
                    </div>
                    <div className="elementskit-menu-overlay elementskit-menu-offcanvas-elements elementskit-menu-toggler ekit-nav-menu--overlay"></div>
                  </nav>
                </div>
              </div>
              <div className="elementor-element elementor-element-3ed18e3 elementor-hidden-desktop ekit-off-canvas-position-right elementor-widget elementor-widget-elementskit-header-offcanvas" data-id="3ed18e3" data-element_type="widget" data-e-type="widget" data-widget_type="elementskit-header-offcanvas.default">
                <div className="ekit-wid-con">
                  <div className="ekit-offcanvas-toggle-wraper before">
                    <a href="#" className="ekit_navSidebar-button ekit_offcanvas-sidebar" aria-label="offcanvas-menu">
                      <i aria-hidden="true" className="icon icon-burger-menu"></i>
                    </a>
                  </div>
                  <div className="ekit-sidebar-group info-group ekit-slide">
                    <div className="ekit-overlay ekit-bg-black"></div>
                    <div className="ekit-sidebar-widget">
                      <div className="ekit_sidebar-widget-container">
                        <div className="ekit_widget-heading before">
                          <a href="#" className="ekit_close-side-widget" aria-label="close-icon">
                            <svg aria-hidden="true" className="e-font-icon-svg e-fas-times" viewBox="0 0 352 512" xmlns="http://www.w3.org/2000/svg"><path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path></svg>
                          </a>
                        </div>
                        <div className="ekit_sidebar-textwidget">
                          <div className="ekit-widget-area-container">
                            <div className="elementor-element elementor-element-0916879 elementor-hidden-desktop e-flex e-con-boxed e-con e-parent" data-id="0916879" data-element_type="container" data-e-type="container">
                              <div className="e-con-inner">
                                <div className="elementor-element elementor-element-353805a elementor-widget elementor-widget-image" data-id="353805a" data-element_type="widget" data-e-type="widget" data-widget_type="theme-site-logo.default">
                                  <Link to="/">
                                    <img width="348" height="146" src={`${BASE}/wp-content/uploads/2026/05/Neofi-Academy-Logo22.png`} className="attachment-full size-full wp-image-1273" alt="" />
                                  </Link>
                                </div>
                                <div className="elementor-element elementor-element-32b654d e-con-full e-flex e-con e-child" data-id="32b654d" data-element_type="container" data-e-type="container">
                                  <div className="elementor-element elementor-element-4bb7115 elementor-icon-list--layout-traditional elementor-list-item-link-full_width elementor-widget elementor-widget-icon-list" data-id="4bb7115" data-element_type="widget" data-e-type="widget" data-widget_type="icon-list.default">
                                    <ul className="elementor-icon-list-items">
                                      <li className="elementor-icon-list-item"><a href="#Home Page"><span className="elementor-icon-list-text">Home Page</span></a></li>
                                      <li className="elementor-icon-list-item"><a href="#About"><span className="elementor-icon-list-text">About Us</span></a></li>
                                      <li className="elementor-icon-list-item"><a href="#Service"><span className="elementor-icon-list-text">Services</span></a></li>
                                      <li className="elementor-icon-list-item"><a href="#Partners"><span className="elementor-icon-list-text">Partners</span></a></li>
                                      <li className="elementor-icon-list-item"><a href="#Access"><span className="elementor-icon-list-text">Access</span></a></li>
                                      <li className="elementor-icon-list-item"><a href="#Contact"><span className="elementor-icon-list-text">Contact Us</span></a></li>
                                    </ul>
                                  </div>
                                </div>
                                <div className="elementor-element elementor-element-a8fe940 e-con-full e-flex e-con e-child" data-id="a8fe940" data-element_type="container" data-e-type="container">
                                  <div className="elementor-element elementor-element-ff4735b elementor-widget elementor-widget-heading" data-id="ff4735b" data-element_type="widget" data-e-type="widget" data-widget_type="heading.default">
                                    <div className="elementor-heading-title elementor-size-default"><Link to="/login">Client Login</Link></div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="elementor-element elementor-element-340d8d5c e-con-full elementor-hidden-mobile e-flex e-con e-child" data-id="340d8d5c" data-element_type="container" data-e-type="container">
              <div className="elementor-element elementor-element-822e307 elementor-widget elementor-widget-heading" data-id="822e307" data-element_type="widget" data-e-type="widget" data-settings='{"_animation":"fadeInUp"}' data-widget_type="heading.default">
                <div className="elementor-heading-title elementor-size-default"><Link to="/login">Client Login</Link></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
