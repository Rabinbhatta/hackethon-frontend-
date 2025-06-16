import React from 'react';

const Footer = () => {
  const footerStyles = {
    footer: {
      backgroundColor: '#f8f9fa',
      padding: '48px 0 24px',
      borderTop: '1px solid #e5e7eb'
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 16px'
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '32px',
      marginBottom: '32px'
    },
    logo: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '16px'
    },
    logoText: {
      fontSize: '20px',
      fontWeight: 'bold',
      color: '#111827',
      marginLeft: '8px'
    },
    description: {
      color: '#6b7280',
      fontSize: '14px'
    },
    sectionTitle: {
      fontWeight: '600',
      marginBottom: '16px',
      color: '#111827',
      fontSize: '16px'
    },
    linksList: {
      listStyle: 'none',
      padding: 0,
      margin: 0
    },
    link: {
      color: '#6b7280',
      textDecoration: 'none',
      fontSize: '14px',
      transition: 'color 0.2s ease'
    },
    bottom: {
      borderTop: '1px solid #e5e7eb',
      paddingTop: '24px',
      textAlign: 'center',
      color: '#6b7280',
      fontSize: '14px'
    }
  };

  return (
    <footer style={footerStyles.footer}>
      <div style={footerStyles.container}>
        <div style={footerStyles.grid}>
          <div>
            <div style={footerStyles.logo}>
              <span style={footerStyles.logoText}>Sajilo Lagani</span>
            </div>
            <p style={footerStyles.description}>
              Making investment accessible for everyone in Nepal.
            </p>
          </div>
          
          <div>
            <h4 style={footerStyles.sectionTitle}>Platform</h4>
            <ul style={footerStyles.linksList}>
              <li style={{marginBottom: '8px'}}><a href="/investors" style={footerStyles.link}>For Investors</a></li>
              <li style={{marginBottom: '8px'}}><a href="/startups" style={footerStyles.link}>For Startups</a></li>
              <li style={{marginBottom: '8px'}}><a href="/how-it-works" style={footerStyles.link}>How It Works</a></li>
              <li style={{marginBottom: '8px'}}><a href="/marketplace" style={footerStyles.link}>Marketplace</a></li>
            </ul>
          </div>
          
          <div>
            <h4 style={footerStyles.sectionTitle}>Company</h4>
            <ul style={footerStyles.linksList}>
              <li style={{marginBottom: '8px'}}><a href="/about" style={footerStyles.link}>About Us</a></li>
              <li style={{marginBottom: '8px'}}><a href="/careers" style={footerStyles.link}>Careers</a></li>
              <li style={{marginBottom: '8px'}}><a href="/contact" style={footerStyles.link}>Contact</a></li>
              <li style={{marginBottom: '8px'}}><a href="/blog" style={footerStyles.link}>Blog</a></li>
            </ul>
          </div>
          
          <div>
            <h4 style={footerStyles.sectionTitle}>Legal</h4>
            <ul style={footerStyles.linksList}>
              <li style={{marginBottom: '8px'}}><a href="/privacy" style={footerStyles.link}>Privacy Policy</a></li>
              <li style={{marginBottom: '8px'}}><a href="/terms" style={footerStyles.link}>Terms of Service</a></li>
              <li style={{marginBottom: '8px'}}><a href="/compliance" style={footerStyles.link}>Compliance</a></li>
              <li style={{marginBottom: '8px'}}><a href="/security" style={footerStyles.link}>Security</a></li>
            </ul>
          </div>
        </div>
        
        <div style={footerStyles.bottom}>
          <p>&copy; {new Date().getFullYear()} Sajilo Lagani. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;