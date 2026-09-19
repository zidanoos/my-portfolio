/**
 * Yassine Zidane - Portfolio Interactions & Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initTimeWidget();
  initProjectFiltering();
  initCaseStudyModal();
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
/* Case Study Deep Dive Modal Data & Controller                               */
/* -------------------------------------------------------------------------- */
const CASE_STUDIES = {
  biat: {
    title: 'BIAT Corporate Banking Suite',
    client: 'Banque Internationale Arabe de Tunisie (BIAT)',
    role: 'Lead Product Designer',
    timeline: '14 Months (2024 - 2025)',
    tags: ['Fintech', 'Treasury & FX', 'Enterprise UX', 'Design System'],
    heroHighlight: 'Transformed multi-billion dollar trade finance operations and cash management workflows for 18,000+ corporate clients.',
    stats: [
      { label: 'Approval Speed', val: '+62%' },
      { label: 'Error Rate', val: '-84%' },
      { label: 'NPS Score', val: '74 (+42pts)' }
    ],
    challenge: 'BIAT’s legacy corporate portal required over 14 discrete screens to execute a single syndicated international wire or foreign exchange hedge. Corporate CFOs and treasurers were experiencing compliance bottlenecks and costly manual reconciliation delays.',
    solution: 'Engineered a unified financial command center with contextual multi-currency cash positioning, one-click batch approvals with biometrics, and an integrated audit compliance tracker. Built in modular micro-frontends with high-density data tables and customizable dashboard widgets.',
    impact: 'Successfully deployed across 18,000 corporate clients with zero rollbacks. Daily transaction volume executed grew by $420M in the first quarter of deployment.'
  },
  tec: {
    title: 'Executive Council Public Sector Intelligence Portal',
    client: 'The Executive Council (TEC)',
    role: 'Senior Enterprise UX Strategist',
    timeline: '12 Months (2023 - 2024)',
    tags: ['Government Reporting', 'Data Intelligence', 'Executive KPIs'],
    heroHighlight: 'Consolidated 24 ministerial data streams into a single real-time executive dashboard for high-level government decision makers.',
    stats: [
      { label: 'Reporting Cadence', val: 'Real-time' },
      { label: 'Adoption Rate', val: '98%' },
      { label: 'Briefing Prep Time', val: '-70%' }
    ],
    challenge: 'Government department heads were compiling manual slide decks and PDF spreadsheets across 24 entities. Discrepancies in metric definitions caused lengthy review cycles and delayed strategic legislative responses.',
    solution: 'Designed an executive-first analytical cockpit with automated anomaly detection, geospatial project tracking, and hierarchical drill-downs from national KPIs straight to field inspections. Optimized for both large video-wall briefing rooms and secure tablet devices.',
    impact: 'Adopted across all executive committee meetings. Reduced ministerial briefing preparation time from 10 days to real-time instant drill-downs.'
  },
  qpr: {
    title: 'QPR Process Mining & Analytics Cloud',
    client: 'QPR Software Enterprise',
    role: 'Principal UX Designer',
    timeline: '10 Months (2023)',
    tags: ['B2B SaaS', 'Process Mining', 'Data Visualization', 'Workflow Automation'],
    heroHighlight: 'Designed intuitive visual graph exploration for petabyte-scale event log process discovery.',
    stats: [
      { label: 'Task Completion', val: '+48%' },
      { label: 'User Onboarding', val: '3 Days vs 4 Wks' },
      { label: 'Churn Reduction', val: '-32%' }
    ],
    challenge: 'Process mining tools are notoriously dense with technical graph jargon, making them inaccessible to business transformation leaders and analysts without data science backgrounds.',
    solution: 'Created an intelligent graph exploration canvas that highlights operational bottlenecks in automated natural language insights. Re-engineered filter queries with visual chip builders and automated bottleneck root-cause pathways.',
    impact: 'Increased product trial-to-paid conversion by 38% and was recognized as a major usability breakthrough in Gartner process mining evaluations.'
  },
  themar: {
    title: 'Themar — Mobile-First Crowdlending Investment Engine',
    client: 'Themar Financial Platform',
    role: 'Lead Product Designer // FinTech Systems Specialist',
    timeline: '8 Months (2022 – 2023)',
    tags: ['Mobile-First', 'KYC & Compliance', 'Investment UX', 'Crowdlending', 'RTL'],
    heroHighlight: 'Translating an intricate, enterprise crowdlending web portal into a responsive, mobile-first investment engine built to accommodate distinct investor profiles simultaneously.',
    stats: [
      { label: 'KYC Steps Clustered', val: '9 → 3' },
      { label: 'Onboarding Drop-off', val: 'Reduced' },
      { label: 'Day-1 Conversion', val: 'Accelerated' }
    ],
    challenge: 'Balancing rigid regulatory compliance and mandatory institutional friction against the user expectation of a frictionless financial application. The platform required an absolute architectural overhaul to simplify sophisticated financial metrics and reduce systemic cognitive overload. Business target: accelerate day-one investor conversion rates and minimize onboarding drop-off velocities without sacrificing institutional trust or central bank compliance parameters.',
    solution: 'Restructured a high-friction 9-step KYC process into 3 intuitive "trust clusters" (Identity, Risk, Legal). Minimized drop-off rates by providing clear progress feedback and "why-based" explanations for every data request. Translated dense financial dashboards into a mobile-first hierarchy — prioritizing real-time investment data and portfolio health over secondary navigation.',
    impact: 'Achieved a measurable reduction in onboarding drop-off and accelerated day-one investor conversion, while maintaining full central bank compliance. The mobile-first redesign made complex portfolio data instantly readable across all device sizes.'
  },
  aisoft: {
    title: 'Aisoft Shopify Partner Ecosystem Suite',
    client: 'Aisoft Commerce',
    role: 'Product Architect & UI Designer',
    timeline: '6 Months (2024)',
    tags: ['E-Commerce SaaS', 'Shopify Ecosystem', 'Merchant Analytics'],
    heroHighlight: 'Scalable suite of high-volume merchant automation and conversion optimization apps.',
    stats: [
      { label: 'Active Merchants', val: '24,000+' },
      { label: 'Store GMV Handled', val: '$350M+' },
      { label: 'Merchant Rating', val: '4.9 ★' }
    ],
    challenge: 'E-commerce merchants manage fragmented dashboards for inventory, automated discounts, and customer segmentation, causing operational friction during flash sales.',
    solution: 'Created an embedded Shopify Admin application adhering strictly to Shopify Polaris standards while extending modular analytics widgets, real-time inventory alert triggers, and one-click upsell logic.',
    impact: 'Achieved featured status on the Shopify App Store, scaling to over 24,000 active global merchants in under 8 months.'
  },
  aegis: {
    title: 'Aegis Scalable Design System',
    client: 'Enterprise Multi-Brand Platform',
    role: 'Design System Architect',
    timeline: 'Continuous (2023 - Present)',
    tags: ['Design Tokens', 'Figma Variables', 'Component Library', 'WCAG AAA'],
    heroHighlight: 'Multi-theme token-driven enterprise design system supporting 6 product squads.',
    stats: [
      { label: 'Dev Handoff Speed', val: '+55%' },
      { label: 'Components Built', val: '180+' },
      { label: 'WCAG Compliance', val: 'AAA Standard' }
    ],
    challenge: 'Multiple distributed product teams were rewriting UI components, causing inconsistent user experience, accessibility violations, and slow sprint velocity.',
    solution: 'Designed a foundational multi-tier design token architecture (Semantic, Component, Brand) implemented in Figma Variables with bi-directional syncing to React/CSS token files.',
    impact: 'Decreased design-to-development handoff time by 55% and eliminated 100% of contrast accessibility defects across products.'
  }
};

function initCaseStudyModal() {
  const modalOverlay = document.getElementById('caseStudyModal');
  if (!modalOverlay) return;

  const closeBtn = modalOverlay.querySelector('.modal-close-btn');
  const modalBody = modalOverlay.querySelector('.modal-content-inner');

  // Attach click listener to any trigger with data-case-study
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-case-study]');
    if (trigger) {
      e.preventDefault();
      const studyKey = trigger.getAttribute('data-case-study');
      const data = CASE_STUDIES[studyKey];
      if (data && modalBody) {
        renderCaseStudyModal(modalBody, data);
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    }
  });

  function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });
}

function renderCaseStudyModal(container, data) {
  container.innerHTML = `
    <div style="margin-bottom: 24px;">
      <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 14px;">
        ${data.tags.map(t => `<span class="tag">${t}</span>`).join('')}
      </div>
      <h2 style="font-size: clamp(26px, 3vw, 36px); font-weight: 800; color: #0F172A; line-height: 1.2; margin-bottom: 8px;">
        ${data.title}
      </h2>
      <p style="font-size: 15px; color: #64748B; font-weight: 500;">
        ${data.client} • Role: ${data.role} • ${data.timeline}
      </p>
    </div>

    <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 12px; padding: 20px; margin-bottom: 28px;">
      <p style="font-size: 16px; color: #334155; font-weight: 600; line-height: 1.6;">
        "${data.heroHighlight}"
      </p>
    </div>

    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 36px; padding: 20px 0; border-top: 1px solid #E2E8F0; border-bottom: 1px solid #E2E8F0;">
      ${data.stats.map(s => `
        <div style="text-align: center;">
          <div style="font-size: 26px; font-weight: 800; color: #7C3AED; letter-spacing: -0.02em;">${s.val}</div>
          <div style="font-size: 12px; color: #64748B; font-weight: 600; text-transform: uppercase; margin-top: 4px;">${s.label}</div>
        </div>
      `).join('')}
    </div>

    <div style="display: flex; flex-direction: column; gap: 28px;">
      <div>
        <h3 style="font-size: 19px; font-weight: 700; color: #0F172A; margin-bottom: 10px; display: flex; align-items: center; gap: 8px;">
          <span style="color: #E11D48;">●</span> The Business & UX Challenge
        </h3>
        <p style="font-size: 15px; color: #475569; line-height: 1.7;">
          ${data.challenge}
        </p>
      </div>

      <div>
        <h3 style="font-size: 19px; font-weight: 700; color: #0F172A; margin-bottom: 10px; display: flex; align-items: center; gap: 8px;">
          <span style="color: #7C3AED;">●</span> Strategic UX Solution & Architecture
        </h3>
        <p style="font-size: 15px; color: #475569; line-height: 1.7;">
          ${data.solution}
        </p>
      </div>

      <div>
        <h3 style="font-size: 19px; font-weight: 700; color: #0F172A; margin-bottom: 10px; display: flex; align-items: center; gap: 8px;">
          <span style="color: #10B981;">●</span> Measurable Outcome & Scalability
        </h3>
        <p style="font-size: 15px; color: #475569; line-height: 1.7;">
          ${data.impact}
        </p>
      </div>
    </div>

    <div style="margin-top: 40px; padding-top: 24px; border-top: 1px solid #E2E8F0; display: flex; justify-content: space-between; align-items: center; flex-wrap: gap;">
      <span style="font-size: 14px; color: #64748B;">Want to explore technical specifications or wireframes?</span>
      <a href="contact.html" class="btn-primary" style="padding: 10px 20px; font-size: 14px;">
        Request Private Walkthrough
      </a>
    </div>
  `;
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
