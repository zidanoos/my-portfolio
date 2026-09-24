/**
 * Yassine Zidane - Portfolio Interactions & Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initTimeWidget();
  initProjectFiltering();
  initContactForm();
  initFaqAccordion();
});

/* -------------------------------------------------------------------------- */
/* Navigation & Header Scroll State                                           */
/* -------------------------------------------------------------------------- */
function initNavigation() {
  const header = document.querySelector('.site-header');
  const toggleBtn = document.querySelector('.mobile-nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener('click', () => {
      const isActive = navMenu.classList.toggle('active');
      toggleBtn.setAttribute('aria-expanded', isActive);
      toggleBtn.classList.toggle('open');
    });

    // Close menu when clicking outside or on a link
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !toggleBtn.contains(e.target) && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        toggleBtn.setAttribute('aria-expanded', 'false');
        toggleBtn.classList.remove('open');
      }
    });
  }

  // Highlight active link based on current URL path
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    const linkHref = link.getAttribute('href');
    if (linkHref === currentPath || (currentPath === '' && linkHref === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

/* -------------------------------------------------------------------------- */
/* Live Local Time Widget (Tunis, UTC+1)                                      */
/* -------------------------------------------------------------------------- */
function initTimeWidget() {
  const timeElements = document.querySelectorAll('.live-time-display');
  if (!timeElements.length) return;

  function updateClock() {
    const now = new Date();
    // Format to Europe/Paris or Africa/Tunis (UTC+1)
    const options = {
      timeZone: 'Africa/Tunis',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    };
    const timeStr = new Intl.DateTimeFormat([], options).format(now);
    timeElements.forEach(el => {
      el.textContent = `${timeStr} (UTC+1)`;
    });
  }

  updateClock();
  setInterval(updateClock, 1000);
}

/* -------------------------------------------------------------------------- */
/* Project Filter on Work Page                                                */
/* -------------------------------------------------------------------------- */
function initProjectFiltering() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card[data-category]');

  if (!filterButtons.length || !projectCards.length) return;

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category.includes(filter)) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          card.style.transform = 'translateY(12px)';
          setTimeout(() => {
            card.style.transition = 'all 0.35s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* -------------------------------------------------------------------------- */
/* Contact Form Validation & Realistic Feedback                               */
/* -------------------------------------------------------------------------- */
function initContactForm() {
  const contactForm = document.getElementById('projectContactForm');
  const copyEmailBtn = document.getElementById('copyEmailBtn');

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const emailText = 'contact@yassinezidane.com';
      navigator.clipboard.writeText(emailText).then(() => {
        const originalHtml = copyEmailBtn.innerHTML;
        copyEmailBtn.innerHTML = `
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
          Copied to clipboard!
        `;
        copyEmailBtn.style.background = '#DCFCE7';
        copyEmailBtn.style.color = '#15803D';

        setTimeout(() => {
          copyEmailBtn.innerHTML = originalHtml;
          copyEmailBtn.style.background = '';
          copyEmailBtn.style.color = '';
        }, 2500);
      });
    });
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg style="animation: spin 1s linear infinite; width: 18px; height: 18px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
          <path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"></path>
        </svg>
        Transmitting Inquiry...
      `;

      setTimeout(() => {
        contactForm.innerHTML = `
          <div style="text-align: center; padding: 48px 24px;">
            <div style="width: 64px; height: 64px; border-radius: 50%; background: #DCFCE7; color: #16A34A; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 20px;">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
            </div>
            <h3 style="font-size: 26px; font-weight: 800; color: #0F172A; margin-bottom: 12px;">Inquiry Received!</h3>
            <p style="font-size: 16px; color: #475569; max-width: 480px; margin: 0 auto 24px; line-height: 1.6;">
              Thank you for reaching out. I personally review all enterprise and design inquiries and will respond within <strong>24 business hours</strong>.
            </p>
            <a href="work.html" class="btn-primary" style="display: inline-flex;">
              Explore More Case Studies
            </a>
          </div>
        `;
      }, 1200);
    });
  }
}

/* -------------------------------------------------------------------------- */
/* FAQ Accordion Controller                                                   */
/* -------------------------------------------------------------------------- */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', () => {
        const isOpen = item.classList.contains('active');
        faqItems.forEach(i => i.classList.remove('active'));
        if (!isOpen) {
          item.classList.add('active');
        }
      });
    }
  });
}
