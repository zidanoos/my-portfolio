/**
 * Case Study Content — Single Source of Truth
 * ------------------------------------------------------------------
 * Every project detail page (project.html?slug=<key>) and the project
 * cards on the homepage / work page pull their case-study copy from
 * this one object. To add a new case study: add a new key here, then
 * link to it with <a href="project.html?slug=yourKey">.
 *
 * `heroImage` is optional — leave it out (or set to null) for projects
 * that only have the inline SVG mockups instead of a real screenshot.
 */
const CASE_STUDIES = {
  biat: {
    title: 'BIAT Corporate Banking Suite',
    client: 'Banque Internationale Arabe de Tunisie (BIAT)',
    role: 'Lead Product Designer',
    timeline: '14 Months (2024 - 2025)',
    heroImage: 'Images/BIAT_Thumbnail-new.webp',
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
    heroImage: 'Images/TEC-Thumbnail.webp',
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
    heroImage: null,
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
    heroImage: 'Images/Themar-Thumbnail.webp',
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
    heroImage: null,
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
    heroImage: null,
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
  },
  fifa: {
    title: 'FIFA+ Arabic Design System: RTL UX for the World Cup',
    client: 'FIFA',
    role: 'Lead Product Designer & RTL UX Specialist',
    timeline: 'Nov 2021 to Dec 2022, 14 months',
    team: 'FIFA+ Design System team, 25+ designers',
    platform: 'Web, iOS, Android',
    heroImage: 'Images/FIFA-Thumbnail.webp',
    heroBg: 'Images/fifa-hero-bg.webp',
    tags: ['RTL Design Systems', 'Arabic UX', 'Design Tokens', 'Figma Variables', 'Localization', 'WCAG'],
    heroHighlight: 'Architecting a single codebase, dual directional design system for 22 MENA markets ahead of World Cup 2022.',
    theme: {
      '--cs-accent': '#0A5BC4',
      '--cs-accent-bright': '#00AEEF',
      '--cs-accent-soft': 'rgba(0, 174, 239, 0.10)',
      '--cs-dark-1': '#081422',
      '--cs-dark-2': '#10344F',
      '--cs-dot-1': '#00AEEF',
      '--cs-dot-2': '#0A7BD4',
      '--cs-dot-3': '#0A5BC4',
      '--cs-dot-4': '#14498F',
      '--cs-dot-5': '#10344F'
    },
    stats: [
      { label: 'Arabic Speakers Reached', val: '660M+' },
      { label: 'Countries', val: '22' },
      { label: 'Codebase Forks', val: '0' },
      { label: 'Dev Handoff Time', val: '-50%' }
    ],
    intro: 'FIFA needed a full Arabic experience for FIFA+, its global streaming platform, live in time for the Qatar World Cup. Arabic speakers across MENA are one of the platform\'s largest growth markets, and launching without them would have meant 22 countries watching the biggest football event in the world through an interface built for a language they do not read.',
    problemStatement: 'Ship a complete right-to-left Arabic version of FIFA+ on a fixed, high-visibility launch date, without forking the existing English codebase and without falling behind it in features.',
    challengePoints: [
      {
        title: 'Brand Integrity',
        description: 'The Arabic version had to feel like a native FIFA+ product, not a mirrored translation bolted onto an English layout.',
        icon: 'shield'
      },
      {
        title: 'Beyond Mirroring',
        description: 'Simple LTR to RTL flipping breaks typography, iconography, and data formatting. Each of these needed its own set of rules.',
        icon: 'layers'
      },
      {
        title: 'An Unmovable Deadline',
        description: 'The World Cup kickoff date was fixed. Every design and engineering decision had to protect that timeline.',
        icon: 'clock'
      }
    ],
    process: [
      {
        title: 'Brand & Component Audit',
        what: 'Catalogued every existing English component and flagged which ones would break under RTL layout, Arabic type, or local content rules.',
        why: 'Without this, RTL work becomes reactive: bugs get found in QA instead of design.'
      },
      {
        title: 'Regional Benchmarking',
        what: 'Studied Apple\'s Human Interface Guidelines for RTL alongside regional platforms like Shahid and OSN+ to see how they handle Arabic UX in streaming products.',
        why: 'Apple\'s guidelines cover the technical rules; regional apps show what Arabic-speaking users already expect from a streaming interface.'
      },
      {
        title: 'Wireframe Re-Architecture',
        what: 'Rebuilt key flows at the wireframe level rather than just flipping the English screens, so information hierarchy could adapt to Arabic reading patterns.',
        why: 'A mirrored layout is not the same as a correct layout. Some patterns needed to change, not just flip direction.'
      },
      {
        title: 'Arabic Typography Engineering',
        what: 'Defined rules for Kashida justification, contextual glyph forms, and a roughly 10% optical size increase for Arabic type to match the English typeface\'s visual weight.',
        why: 'Arabic script needs different justification and sizing logic than Latin script to feel readable and intentional, not stretched or cramped.'
      },
      {
        title: 'Icon & Data Direction Rules',
        what: 'Split icons into two groups: directional icons that flip with the layout, and universal icons (like a play button) that never do. Set numeral and date-boundary rules for mixed Arabic and Latin content.',
        why: 'Flipping every icon indiscriminately creates confusing or incorrect symbols. Numbers and dates also follow different directional rules than the surrounding text.'
      },
      {
        title: 'Design Tokens & Style Dictionary',
        what: 'Built a token layer in Figma Variables using CSS logical properties, piped through Style Dictionary to keep values in sync across platforms.',
        why: 'This let one token update propagate to every platform automatically, instead of manually re-implementing spacing and color fixes per platform.'
      },
      {
        title: 'Component Library Extension',
        what: 'Extended the existing English component library with RTL-aware variants rather than building a parallel Arabic library from scratch.',
        why: 'One shared library meant the Arabic team never fell behind the English team\'s feature releases.'
      }
    ],
    impactSummary: 'Shipped a fully mirrored Arabic platform reaching 660M+ Arabic speakers across 22 countries, with zero codebase forks and pixel-level visual parity with the English version, while cutting dev handoff time by 50%.',
    takeaways: [
      'A token-driven, logical-properties approach scales localization far better than manually mirroring screens one by one.',
      'RTL is not just "flip the layout." Typography, iconography, and data formatting each need their own explicit rules.',
      'Working inside the same component library as the English team, instead of a parallel one, kept both languages shipping in lockstep.'
    ],
    retrospective: [
      'I would automate more of the Figma-to-GitHub handoff using AI tooling, which wasn\'t mature enough to rely on at the time.',
      'I would build custom Figma plugins earlier in the project to catch RTL-breaking components automatically instead of relying on manual audits.'
    ]
  }
};

