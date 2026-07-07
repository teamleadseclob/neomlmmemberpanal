import { useState } from 'react';
import { BASE } from '../../paths';

export default function ContactSection() {
  const faqs = [
    { q: 'Is Neofi Academy suitable for beginners?', a: 'Yes, our programs are designed for both beginners and advanced traders.' },
    { q: 'What is copy trading?', a: 'Copy trading allows you to automatically replicate trades executed by professional traders.' },
    { q: 'Is there any risk involved?', a: 'Yes. All trading carries risk, which is why we focus heavily on disciplined and risk-managed strategies.' },
    { q: 'Can I earn passive income?', a: 'Yes, through our copy trading systems and affiliate program opportunities.' },
    { q: 'Is Neofi Academy available worldwide?', a: 'Yes, our platform and programs are accessible globally.' },
  ];

  return (
    <div className="elementor-element elementor-element-4b2b9f1b e-flex e-con-boxed e-con e-parent e-lazyloaded" data-id="4b2b9f1b" data-element_type="container" data-e-type="container" id="Contact">
      <div className="e-con-inner">
        <div className="elementor-element elementor-element-2973b370 elementor-widget__width-inherit elementor-absolute e-transform elementor-widget elementor-widget-image" data-id="2973b370" data-element_type="widget" data-e-type="widget" data-settings='{"_position":"absolute","_transform_translateX_effect":{"unit":"%","size":"-50","sizes":[]}}' data-widget_type="image.default">
          <img decoding="async" width="1440" height="1" src={`${BASE}/wp-content/uploads/2026/05/Horizontal-Divider.png`} className="attachment-full size-full wp-image-26" alt="" />
        </div>
        <div className="elementor-element elementor-element-43fb99ca e-con-full e-transform e-flex e-con e-child" data-id="43fb99ca" data-element_type="container" data-e-type="container" data-settings='{"position":"absolute","_transform_translateX_effect":{"unit":"%","size":"-50","sizes":[]}}'>
          <div className="elementor-element elementor-element-6c357ec8 elementor-widget-divider--view-line elementor-widget elementor-widget-divider" data-id="6c357ec8" data-element_type="widget" data-e-type="widget" data-widget_type="divider.default">
            <div className="elementor-divider"><span className="elementor-divider-separator"></span></div>
          </div>
        </div>
        <div className="elementor-element elementor-element-fe4072e e-con-full e-flex e-con e-child" data-id="fe4072e" data-element_type="container" data-e-type="container">
          <div className="elementor-element elementor-element-6ebc7972 elementor-widget__width-initial elementor-widget-tablet__width-inherit elementor-widget elementor-widget-elementskit-heading" data-id="6ebc7972" data-element_type="widget" data-e-type="widget" data-settings='{"_animation":"fadeInUp"}' data-widget_type="elementskit-heading.default">
            <div className="ekit-wid-con"><div className="ekit-heading elementskit-section-title-wraper text_left ekit_heading_tablet- ekit_heading_mobile-"><div className="elementskit-section-subtitle ekit-heading__subtitle-has-border">Common Questions</div><h2 className="ekit-heading--title elementskit-section-title text_fill">Frequently Asked Questions</h2></div></div>
          </div>
        </div>
        <div className="elementor-element elementor-element-2f83cb32 e-con-full e-flex e-con e-child" data-id="2f83cb32" data-element_type="container" data-e-type="container">
          <div className="elementor-element elementor-element-7ea05ba e-con-full e-flex e-con e-child" data-id="7ea05ba" data-element_type="container" data-e-type="container">
            <div className="elementor-element elementor-element-1f85bd34 elementor-widget elementor-widget-n-accordion" data-id="1f85bd34" data-element_type="widget" data-e-type="widget" data-settings='{"default_state":"all_collapsed","_animation":"fadeInUp","max_items_expended":"one","n_accordion_animation_duration":{"unit":"ms","size":400,"sizes":[]}}' data-widget_type="nested-accordion.default">
              <div className="e-n-accordion" aria-label="Accordion. Open links with Enter or Space, close with Escape, and navigate with Arrow Keys">
                {faqs.map((faq, i) => (
                  <FaqItem key={i} question={faq.q} answer={faq.a} index={i} />
                ))}
              </div>
            </div>
          </div>
          <div className="elementor-element elementor-element-59b5890 e-con-full e-flex e-con e-child" data-id="59b5890" data-element_type="container" data-e-type="container">
            <a className="elementor-element elementor-element-7ae0d0a e-con-full e-flex e-con e-child" data-id="7ae0d0a" data-element_type="container" data-e-type="container" data-settings='{"background_background":"classic","animation":"fadeInUp","animation_delay":"250"}' href="#">
              <div className="elementor-element elementor-element-b496461 elementor-widget elementor-widget-elementskit-heading" data-id="b496461" data-element_type="widget" data-e-type="widget" data-widget_type="elementskit-heading.default">
                <div className="ekit-wid-con"><div className="ekit-heading elementskit-section-title-wraper text_center ekit_heading_tablet- ekit_heading_mobile-"><h5 className="ekit-heading--title elementskit-section-title text_fill">Stay Connected <br/>With Market Insights</h5></div></div>
              </div>
              <div className="elementor-element elementor-element-dd5af7d elementor-widget elementor-widget-heading" data-id="dd5af7d" data-element_type="widget" data-e-type="widget" data-widget_type="heading.default">
                <h6 className="elementor-heading-title elementor-size-default">Get the latest trading updates, webinars, strategies, and market opportunities directly from Neofi Academy.</h6>
              </div>
              <div className="elementor-element elementor-element-2e303bb elementor-widget elementor-widget-spacer" data-id="2e303bb" data-element_type="widget" data-e-type="widget" data-widget_type="spacer.default"><div className="elementor-spacer"><div className="elementor-spacer-inner"></div></div></div>
              <SubscribeForm />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function FaqItem({ question, answer, index }) {
  const [open, setOpen] = useState(false);
  return (
    <details className="e-n-accordion-item" open={open} onClick={(e) => { e.preventDefault(); setOpen(!open); }}>
      <summary className="e-n-accordion-item-title" tabIndex={index === 0 ? 0 : -1} aria-expanded={open}>
        <span className='e-n-accordion-item-title-header'><div className="e-n-accordion-item-title-text"> {question} </div></span>
        <span className='e-n-accordion-item-title-icon'>
          <span className='e-opened'>
            <svg aria-hidden="true" className="e-font-icon-svg e-fas-caret-up" viewBox="0 0 320 512" xmlns="http://www.w3.org/2000/svg"><path d="M288.662 352H31.338c-17.818 0-26.741-21.543-14.142-34.142l128.662-128.662c7.81-7.81 20.474-7.81 28.284 0l128.662 128.662c12.6 12.599 3.676 34.142-14.142 34.142z"></path></svg>
          </span>
          <span className='e-closed'>
            <svg aria-hidden="true" className="e-font-icon-svg e-fas-caret-down" viewBox="0 0 320 512" xmlns="http://www.w3.org/2000/svg"><path d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"></path></svg>
          </span>
        </span>
      </summary>
      {open && (
        <div className="e-con-full e-flex e-con e-child" data-element_type="container">
          <div className="elementor-element elementor-widget elementor-widget-text-editor" data-widget_type="text-editor.default">
            <p>{answer}</p>
          </div>
        </div>
      )}
    </details>
  );
}

function SubscribeForm() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for subscribing!');
    setEmail('');
  };

  return (
    <div className="elementor-element elementor-element-1f516b6 elementor-button-align-center elementor-widget__width-initial elementor-widget elementor-widget-form" data-id="1f516b6" data-element_type="widget" data-e-type="widget" data-widget_type="form.default">
      <form className="elementor-form" onSubmit={handleSubmit} name="New Form" aria-label="New Form">
        <div className="elementor-form-fields-wrapper elementor-labels-">
          <div className="elementor-field-type-email elementor-field-group elementor-column elementor-field-group-email elementor-col-100">
            <label htmlFor="form-field-email" className="elementor-field-label elementor-screen-only">Email</label>
            <input
              size="1"
              type="email"
              name="form_fields[email]"
              id="form-field-email"
              className="elementor-field elementor-size-sm elementor-field-textual"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="elementor-field-group elementor-column elementor-field-type-submit elementor-col-100 e-form__buttons">
            <button className="elementor-button elementor-size-sm" type="submit">
              <span className="elementor-button-content-wrapper">
                <span className="elementor-button-text">Subscribe Now</span>
              </span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
