import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import './Contact.css';

// Contact detail items
const CONTACT_ITEMS = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="20" height="20">
        <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 7L2 7"/>
      </svg>
    ),
    label: 'Email',
    value: 'matheeshaanjana01@gmail.com',
    href:  'mailto:matheeshaanjana01@gmail.com',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="20" height="20">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8a19.79 19.79 0 01-3.07-8.68A2 2 0 012.18 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.72 6.72l1.28-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
      </svg>
    ),
    label: 'Phone',
    value: '+94 77 165 6886',
    href:  'tel:+94771656886',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="20" height="20">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
      </svg>
    ),
    label: 'Location',
    value: 'Kurunegala, Sri Lanka',
    href:  null,
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="20" height="20">
        <path d="M16 8a6 6 0 01-12 0 6 6 0 0112 0z"/>
        <path d="M2 20c0-4 4-6 8-6s8 2 8 6"/>
      </svg>
    ),
    label: 'LinkedIn',
    value: 'linkedin.com/in/matheesha-amarathunga',
    href: 'https://linkedin.com/in/matheesha-amarathunga-87221a373',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
      </svg>
    ),
    label: 'GitHub',
    value: 'github.com/MatheeshaAnjana',
    href:  'https://github.com/MatheeshaAnjana',
  },
];

function Contact() {
  // Form field state
  const [form, setForm]       = useState({ name: '', email: '', message: '' });
  const [sent, setSent]       = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // Opens user's email client pre-filled with the message
  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, message } = form;
    const mailto = `mailto:matheeshaanjana01@gmail.com?subject=Portfolio Contact from ${encodeURIComponent(name)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
    window.location.href = mailto;
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section id="contact" className="contact section-border-top" style={{ background: 'var(--bg-secondary)' }}>
      <div className="contact__bg-orb" />
      <Container>
        <p className="section-label">Get In Touch</p>
        <h2 className="section-title">Let's Work Together</h2>
        <p className="section-subtitle">
          Open to internship opportunities, freelance projects, and exciting collaborations. Drop me a message!
        </p>

        <Row className="gy-5 align-items-start">

          {/* ── Left: contact info cards ── */}
          <Col lg={4}>
            <div className="d-flex flex-column gap-3">
              {CONTACT_ITEMS.map((item) => (
                <Card key={item.label} className="contact-info-card">
                  <Card.Body className="d-flex align-items-center gap-3">
                    <div className="contact-info-card__icon">{item.icon}</div>
                    <div>
                      <p className="contact-info-card__label">{item.label}</p>
                      {item.href
                        ? <a href={item.href} className="contact-info-card__value contact-info-card__link" target={item.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">{item.value}</a>
                        : <p className="contact-info-card__value">{item.value}</p>
                      }
                    </div>
                  </Card.Body>
                </Card>
              ))}
            </div>
          </Col>

          {/* ── Right: contact form ── */}
          <Col lg={8}>
            <Card className="contact-form-card">
              <Card.Body className="p-4 p-lg-5">
                {/* Bootstrap Form component */}
                <Form onSubmit={handleSubmit}>
                  <Row className="g-3">
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label className="contact-form__label">Your Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="name"
                          placeholder="John Doe"
                          value={form.name}
                          onChange={handleChange}
                          required
                          className="contact-form__input"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label className="contact-form__label">Email Address</Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          placeholder="john@example.com"
                          value={form.email}
                          onChange={handleChange}
                          required
                          className="contact-form__input"
                        />
                      </Form.Group>
                    </Col>
                    <Col xs={12}>
                      <Form.Group>
                        <Form.Label className="contact-form__label">Message</Form.Label>
                        <Form.Control
                          as="textarea"
                          name="message"
                          rows={5}
                          placeholder="Tell me about your project or opportunity..."
                          value={form.message}
                          onChange={handleChange}
                          required
                          className="contact-form__input"
                        />
                      </Form.Group>
                    </Col>
                    <Col xs={12}>
                      <Button type="submit" className="contact-form__submit w-100">
                        {sent ? (
                          <>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                              <polyline points="20 6 9 17 4 12"/>
                            </svg>
                            Message Sent!
                          </>
                        ) : (
                          <>
                            Send Message
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <line x1="22" y1="2" x2="11" y2="13"/>
                              <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                            </svg>
                          </>
                        )}
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Card.Body>
            </Card>
          </Col>

        </Row>
      </Container>
    </section>
  );
}

export default Contact;
