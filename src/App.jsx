import React, { useEffect, useMemo, useRef, useState } from 'react';

const product = {
  name: 'Ashwagandha',
  image: 'assets/Ashwagandha.jpg',
  spec: 'Root cuts or powder available. Batch specs and COA on request.',
};

const categories = [
  { name: 'Whole Herbs', image: 'assets/Whole Herbs.png' },
  { name: 'Herbal Powders', image: 'assets/Herbal Powders.jpg' },
  { name: 'Herbal Extracts', image: 'assets/Herbal Extracts.jpg' },
  { name: 'Seeds & Roots', image: 'assets/Seeds & Roots.jpg' },
];
const markets = ['UAE', 'USA', 'Germany', 'Southeast Asia'];
const certifications = [
  { name: 'FSSAI', image: 'assets/FSSAI.png', detail: 'Food safety compliant' },
  { name: 'GST', image: 'assets/GST.png', detail: 'Registered exporter' },
  { name: 'ISO', image: 'assets/ISO.jpg', detail: 'Quality process ready' },
  { name: 'COA Available', image: 'assets/COA Available.jpg', detail: 'Batch-wise analysis' },
];
const trustPoints = ['ISO / GST Certified', 'Export Quality Assured', 'Bulk Supply', 'Global Shipping'];
const companyEmail = 'bluveraexports@gmail.com';

function useReveal() {
  const [visible, setVisible] = useState(new Set(['hero']));

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        setVisible((current) => {
          const next = new Set(current);
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.target instanceof HTMLElement) {
              const revealKey = entry.target.dataset.reveal;
              if (revealKey) next.add(revealKey);
            }
          });
          return next;
        });
      },
      { threshold: 0.18 },
    );

    document.querySelectorAll('[data-reveal]').forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return visible;
}

function App() {
  const visible = useReveal();
  const [query, setQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  const filteredProduct = useMemo(() => {
    if (!query.trim()) return product;
    return product.name.toLowerCase().includes(query.toLowerCase()) ? product : null;
  }, [query]);

  const whatsappLink = 'https://wa.me/919739541463?text=Hello%20Bluvera%20Exports%2C%20I%20need%20a%20quote%20for%20Ashwagandha.';
  const inquiryLink = `https://wa.me/919739541463?text=${encodeURIComponent('Hello Bluvera Exports, I need a quote for Ashwagandha.')}`;

  // Parallax & pointer interaction for hero visual (with JSDoc types to satisfy checker)
  /** @type {import('react').MutableRefObject<HTMLDivElement|null>} */
  const heroRef = useRef(null);
  useEffect(() => {
    /** @type {HTMLDivElement | null} */
    const root = heroRef.current;
    if (!root) return undefined;

    // Use a non-null local alias to satisfy type narrowing for nested functions
    /** @type {HTMLDivElement} */
    const el = /** @type {HTMLDivElement} */ (root);

    /** @type {HTMLElement | null} */
    const heroImage = /** @type {HTMLElement | null} */ (el.querySelector('.hero-image'));
    /** @type {HTMLElement | null} */
    const floatA = /** @type {HTMLElement | null} */ (el.querySelector('.product-float-a'));
    /** @type {HTMLElement | null} */
    const floatB = /** @type {HTMLElement | null} */ (el.querySelector('.product-float-b'));

    /** @type {number | null} */
    let raf = null;
    /** @type {{x:number,y:number}} */
    const pointer = { x: 0, y: 0 };

    /**
     * @param {MouseEvent|TouchEvent} e
     */
    function handleMove(e) {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      // @ts-ignore
      const px = ('clientX' in e) ? e.clientX : (e.touches && e.touches[0] && e.touches[0].clientX) || 0;
      // @ts-ignore
      const py = ('clientY' in e) ? e.clientY : (e.touches && e.touches[0] && e.touches[0].clientY) || 0;
      pointer.x = (px - cx) / rect.width;
      pointer.y = (py - cy) / rect.height;

      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const tx = pointer.x * 18;
        const ty = pointer.y * 12;
        if (heroImage) heroImage.style.transform = `translate(${tx * 0.4}px, ${ty * 0.6}px) scale(1.01)`;
        if (floatA) floatA.style.transform = `translate(${ -tx * 0.8 }px, ${ -ty * 0.6 }px)`;
        if (floatB) floatB.style.transform = `translate(${ tx * 0.9 }px, ${ ty * 0.7 }px)`;
      });
    }

    function handleScroll() {
      const scrollY = window.scrollY || window.pageYOffset;
      const offset = Math.min(60, scrollY * 0.08);
      if (heroImage) heroImage.style.transform = `translateY(${offset}px)`;
    }

    el.addEventListener('mousemove', handleMove);
    el.addEventListener('touchmove', handleMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      el.removeEventListener('mousemove', handleMove);
      el.removeEventListener('touchmove', handleMove);
      window.removeEventListener('scroll', handleScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  /**
   * @param {React.FormEvent<HTMLFormElement>} event
   */
  const handleEnquirySubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get('name')?.toString().trim() || 'Website visitor';
    const email = formData.get('email')?.toString().trim() || 'Not provided';
    const country = formData.get('country')?.toString().trim() || 'Not provided';
    const productName = formData.get('product')?.toString().trim() || 'Ashwagandha';
    const quantity = formData.get('quantity')?.toString().trim() || 'Not provided';
    const phone = formData.get('phone')?.toString().trim() || 'Not provided';
    const message = formData.get('message')?.toString().trim() || 'Not provided';

    const subject = encodeURIComponent(`Bluvera Exports enquiry - ${productName}`);
    const body = encodeURIComponent(
      [
        `Name: ${name}`,
        `Email: ${email}`,
        `Country: ${country}`,
        `Product: ${productName}`,
        `Quantity: ${quantity}`,
        `Phone / WhatsApp: ${phone}`,
        '',
        `Message: ${message}`,
      ].join('\n'),
    );

    window.location.href = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(companyEmail)}&su=${subject}&body=${body}`;
  };

  return (
    <div className="page-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <header className="site-header">
        <div className="container header-inner">
          <a className="brand" href="#home" aria-label="Bluvera Exports home">
            <img src="assets/logo.jpg" alt="Bluvera Exports" className="logo" />
          </a>
          <button
            className="menu-toggle"
            type="button"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((current) => !current)}
          >
            <span />
            <span />
            <span />
          </button>
          <nav className={`main-nav ${menuOpen ? 'open' : ''}`} aria-label="Main Navigation">
            <a href="#home" onClick={() => setMenuOpen(false)}>Home</a>
            <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
            <a href="#products" onClick={() => setMenuOpen(false)}>Products</a>
            <a href="#certifications" onClick={() => setMenuOpen(false)}>Certifications</a>
            <a href="#markets" onClick={() => setMenuOpen(false)}>Export Markets</a>
            <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
          </nav>
          <a className="btn btn-cta pulse" href="#enquiry">Request a Quote</a>
        </div>
      </header>

      <main>
        <section id="home" className={`hero container ${visible.has('hero') ? 'is-visible' : ''}`} data-reveal="hero">
          <div className="hero-copy">
            <div className="brand-highlight">Bluvera Exports</div>
            <span className="eyebrow">Premium Ayurvedic raw materials exporter from India</span>
            <h1>
              Premium Ayurvedic Raw Materials
              <span className="accent">Exporter from India</span>
            </h1>
            <p>Supplying high-quality herbs, powders, and extracts to global pharmaceutical, nutraceutical, cosmetic and food industries.</p>
            <div className="hero-ctas">
              <a className="btn btn-cta" href="#enquiry">Request a Quote</a>
              <a className="btn btn-outline" href="#products">View Products</a>
            </div>
            <div className="hero-meta">
              <div>India</div>
              <div>SF-208, 2nd Floor, D Block</div>
              <div>Greenaly Signature, Bengaluru, Karnataka - 560076</div>
            </div>
          </div>
          <div className="hero-visual" ref={heroRef}>
            <div className="product-float product-float-a" />
            <div className="product-float product-float-b" />
            <img src="assets/hero.jpg" alt="Ayurvedic herbs" className="hero-image" />
            <div className="hero-badge">Export ready today</div>
          </div>
        </section>

        <section className="trust-bar" data-reveal="trust">
          <div className="container trust-inner">
            {trustPoints.map((item) => (
              <div className="trust-item" key={item}>{item}</div>
            ))}
          </div>
        </section>

        <section id="products" className={`section container ${visible.has('products') ? 'is-visible' : ''}`} data-reveal="products">
          <div className="section-head">
            <h2>Product Category</h2>
            <p>Focused launch: Ashwagandha only for now.</p>
          </div>
          <div className="cats-grid">
            {categories.map((item, index) => (
              <a className="cat-card image-card" href="#enquiry" key={item.name} style={{ animationDelay: `${index * 90}ms` }}>
                <img src={item.image} alt={item.name} className="cat-image" />
                <span>{item.name}</span>
              </a>
            ))}
          </div>
        </section>

        <section id="about" className={`section container split ${visible.has('about') ? 'is-visible' : ''}`} data-reveal="about">
          <div className="split-media">
            <img src="assets/farm.jpg" alt="Herbal farm" />
          </div>
          <div className="split-copy">
            <div className="section-head left">
              <h2>Why Choose Bluvera Exports</h2>
              <p>Built for buyers who want clear specs, reliable sourcing, and fast export communication.</p>
            </div>
            <ul className="check-list">
              <li>Direct sourcing from farmers</li>
              <li>Strict quality control and testing</li>
              <li>Export documentation support</li>
              <li>Competitive pricing</li>
              <li>Reliable delivery</li>
            </ul>
          </div>
        </section>

        <section className={`section container ${visible.has('featured') ? 'is-visible' : ''}`} data-reveal="featured">
          <div className="section-head">
            <h2>Featured Product</h2>
            <p>One-product launch with a fast filter and quote CTA.</p>
          </div>
          <div className="product-tools">
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by herb name" />
            <button className="btn btn-outline" onClick={() => setQuery('')} type="button">Clear</button>
          </div>
          <div className="featured-grid">
            {filteredProduct ? (
              <article className="product-card hover-rise">
                <div className="product-image-shell">
                  <img src={filteredProduct.image} alt={filteredProduct.name} />
                </div>
                <h3>{filteredProduct.name}</h3>
                <p>{filteredProduct.spec}</p>
                <a className="btn btn-cta" href={inquiryLink} target="_blank" rel="noreferrer">Request Quote</a>
              </article>
            ) : (
              <div className="empty-state">No matching product found.</div>
            )}
          </div>
        </section>

        <section id="markets" className={`section container ${visible.has('markets') ? 'is-visible' : ''}`} data-reveal="markets">
          <div className="section-head left">
            <h2>Export Markets</h2>
            <p>Serving clients across the key markets below.</p>
          </div>
          <div className="pill-row">
            {markets.map((market) => <span className="pill" key={market}>{market}</span>)}
          </div>
        </section>

        <section id="certifications" className={`section container ${visible.has('certifications') ? 'is-visible' : ''}`} data-reveal="certifications">
          <div className="section-head">
            <h2>Certifications & Quality</h2>
            <p>All products are tested and comply with international export standards.</p>
          </div>
          <div className="cert-grid">
            {certifications.map((cert) => (
              <article className="cert-card cert-card-image" key={cert.name}>
                <img src={cert.image} alt={cert.name} />
                <h3>{cert.name}</h3>
                <p>{cert.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={`section container catalog-band ${visible.has('catalog') ? 'is-visible' : ''}`} data-reveal="catalog">
          <div>
            <h2>Download Our Product Catalog</h2>
            <p>Product details, certifications, and export highlights are included in the PDF.</p>
          </div>
          <a className="btn btn-light" href="assets/catalog.pdf" download>Download PDF</a>
        </section>

        <section id="enquiry" className={`section container enquiry-grid ${visible.has('enquiry') ? 'is-visible' : ''}`} data-reveal="enquiry">
          <div className="enquiry-copy">
            <div className="section-head left">
              <h2>Send Your Enquiry</h2>
              <p>We respond within 24 hours.</p>
            </div>
            <div className="contact-block" id="contact">
              <strong>Location</strong>
              <span>India, SF-208, 2nd floor, D Block, Greenaly Signature, Bengaluru, Karnataka -560076</span>
              <div className="contact-actions">
                <a className="contact-action whatsapp" href={whatsappLink} target="_blank" rel="noreferrer">
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a9.9 9.9 0 0 0-8.52 14.86L2 22l5.32-1.4A10 10 0 1 0 12 2Zm0 18.1a8.1 8.1 0 0 1-4.13-1.13l-.3-.17-3.16.83.85-3.07-.2-.32A8.1 8.1 0 1 1 12 20.1Zm4.7-5.25c-.25-.12-1.48-.73-1.7-.81-.23-.09-.4-.12-.57.12s-.66.81-.81.98-.3.18-.55.06a6.6 6.6 0 0 1-1.95-1.2 7.3 7.3 0 0 1-1.35-1.67c-.14-.24-.01-.37.11-.49.11-.11.24-.3.36-.45.12-.15.16-.25.25-.42.08-.17.04-.31-.02-.43-.06-.12-.57-1.37-.78-1.88-.2-.48-.41-.41-.57-.42h-.48c-.16 0-.43.06-.66.31s-.88.86-.88 2.1.9 2.43 1.02 2.6c.13.17 1.74 2.66 4.2 3.72.58.25 1.03.4 1.38.51.58.18 1.1.16 1.5.1.46-.07 1.48-.6 1.69-1.18.21-.57.21-1.06.15-1.18-.06-.12-.22-.18-.47-.3Z"/></svg>
                  WhatsApp Us
                </a>
                <a className="contact-action email" href={`mailto:${companyEmail}`}>
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm0 3.2V18h16V7.2l-8 5.2-8-5.2Zm8 3.5 8-5.2H4l8 5.2Z"/></svg>
                  Email Us
                </a>
              </div>
            </div>
          </div>
          <form className="enquiry-form" onSubmit={handleEnquirySubmit}>
            <div className="form-row">
              <input name="name" placeholder="Name" />
              <input name="email" placeholder="Email" />
            </div>
            <div className="form-row">
              <input name="country" placeholder="Country" />
              <input name="product" placeholder="Product" />
            </div>
            <div className="form-row">
              <input name="quantity" placeholder="Quantity" />
              <input name="phone" placeholder="WhatsApp / Phone" />
            </div>
            <textarea name="message" rows={5} placeholder="Message / Requirements" />
            <div className="form-actions">
              <button className="btn btn-cta" type="submit">Submit Enquiry</button>
              <a className="btn btn-outline" href={whatsappLink} target="_blank" rel="noreferrer">Chat on WhatsApp</a>
            </div>
          </form>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <div className="footer-about">
            <img src="assets/logo.jpg" alt="Bluvera Exports" />
            <p>Premium supplier of Ayurvedic raw materials from India. Delivering nature's finest to global buyers.</p>
          </div>
          <div className="footer-links">
            <h4>Quick Links</h4>
            <a href="#home">Home</a>
            <a href="#products">Products</a>
            <a href="#certifications">Certifications</a>
            <a href="#enquiry">Contact</a>
          </div>
          <div className="footer-contact">
            <h4>Contact</h4>
            <p>India, SF-208, 2nd floor, D Block, Greenaly Signature, Bengaluru, Karnataka -560076</p>
            <p>+91 97395 41463</p>
            <p>bluveraexports@gmail.com</p>
          </div>
        </div>
      </footer>

      <a className="float-quote" href="#enquiry">Request Quote</a>
      <a className="wa-stick" href={whatsappLink} target="_blank" rel="noreferrer">Chat on WhatsApp</a>
    </div>
  );
}

export default App;
