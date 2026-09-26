/**
 * Project Detail Page Renderer
 * ------------------------------------------------------------------
 * Runs only on project.html. Reads the "slug" query param
 * (e.g. project.html?slug=fifa), looks it up in CASE_STUDIES
 * (a global defined in js/case-studies-data.js, which is loaded
 * before this file as a classic script), and fills the placeholder
 * elements already sitting in project.html.
 *
 * If the slug is missing or doesn't match any case study, the
 * "not found" section is shown instead and the content section
 * stays hidden.
 */

// Icon set for the challenge cards. Add a new key here when a case
// study needs an icon this list doesn't have yet, then reference it
// with `icon: "keyName"` on that challengePoint.
var CHALLENGE_ICONS = {
  shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l8 3v6c0 5-3.5 8.5-8 11-4.5-2.5-8-6-8-11V5l8-3z"/></svg>',
  layers: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>',
  clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
  target: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>',
  users: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  lock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>',
  chart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>',
  "default": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>'
};

// Small helper: sets text only if the element actually exists, so one
// missing placeholder can never halt the whole render.
function setText(id, value) {
  var el = document.getElementById(id);
  if (el) el.textContent = value || '';
  return el;
}

function setHTML(id, value) {
  var el = document.getElementById(id);
  if (el) el.innerHTML = value || '';
  return el;
}

document.addEventListener('DOMContentLoaded', function () {
  var contentSection = document.getElementById('projectContent');
  var notFoundSection = document.getElementById('projectNotFound');
  if (!contentSection || !notFoundSection) return; // not on project.html

  var params = new URLSearchParams(window.location.search);
  var slug = params.get('slug');
  var data = (slug && typeof CASE_STUDIES !== 'undefined') ? CASE_STUDIES[slug] : null;

  if (!data) {
    contentSection.style.display = 'none';
    notFoundSection.style.display = 'block';
    return;
  }

  // Tab title + meta description. Role and timeline live here for SEO,
  // not in the visible page header.
    // Immersive hero. Only projects that declare a heroBg get the dark treatment.
  if (data.heroBg) {
    contentSection.classList.add('immersive');
    var heroBgEl = document.getElementById('projectHeroBg');
    if (heroBgEl) {
      heroBgEl.style.backgroundImage = 'url("' + data.heroBg + '")';
      if (data.heroBgPosition) {
        heroBgEl.style.backgroundPosition = data.heroBgPosition;
      }
    }
  }
    // Per-project colour theme. Any case study without one keeps the site purple.
  if (data.theme) {
    var root = document.documentElement;
    for (var key in data.theme) {
      if (Object.prototype.hasOwnProperty.call(data.theme, key)) {
        root.style.setProperty(key, data.theme[key]);
      }
    }
  }
  document.title = data.title + ' | Yassine Zidane';
  var metaDesc = document.getElementById('pageDescription');
  if (metaDesc && data.heroHighlight) metaDesc.setAttribute('content', data.heroHighlight);

  // Tags
  if (data.tags) {
    setHTML('projectTags', data.tags.map(function (t) {
      return '<span class="tag">' + t + '</span>';
    }).join(''));
  }

  // Title only. No role/timeline/team clutter in the header.
  setText('projectTitle', data.title);

  // Optional hero image
  var heroImageWrap = document.getElementById('projectHeroImageWrap');
  if (heroImageWrap) {
    if (data.heroImage) {
      heroImageWrap.innerHTML = '<img src="' + data.heroImage + '" alt="' + data.title + '">';
      heroImageWrap.style.display = 'block';
    } else {
      heroImageWrap.style.display = 'none';
    }
  }

  // Stats
  if (data.stats) {
    setHTML('projectStats', data.stats.map(function (s) {
      return '<div class="metric-item case-study-stat">' +
        '<span class="metric-val">' + s.val + '</span>' +
        '<span class="metric-lbl">' + s.label + '</span>' +
        '</div>';
    }).join(''));
  }

  // Project meta strip: role, timeline, team and platform at a glance
  var META_ICONS = {
    role: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>',
    timeline: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>',
    team: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>',
    platform: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>'
  };

  var metaItems = [];
  if (data.role) metaItems.push({ key: 'role', label: 'Role', value: data.role });
  if (data.timeline) metaItems.push({ key: 'timeline', label: 'Timeline', value: data.timeline });
  if (data.team) metaItems.push({ key: 'team', label: 'Team', value: data.team });
  if (data.platform) metaItems.push({ key: 'platform', label: 'Platform', value: data.platform });

  if (metaItems.length) {
    setHTML('projectMetaStrip', metaItems.map(function (m) {
      return '<div class="meta-item">' +
        '<div class="meta-icon">' + META_ICONS[m.key] + '</div>' +
        '<span class="meta-label">' + m.label + '</span>' +
        '<span class="meta-value">' + m.value + '</span>' +
        '</div>';
    }).join(''));
  }

  // Intro: high-level context
  setText('projectIntro', data.intro);

  // Problem statement: the specific ask
  setText('projectProblemStatement', data.problemStatement);

  // Challenge: icon cards when available, otherwise a plain paragraph
  var challengePara = document.getElementById('projectChallenge');
  var challengeGrid = document.getElementById('projectChallengeGrid');
  if (data.challengePoints && challengeGrid) {
    if (challengePara) challengePara.style.display = 'none';
    challengeGrid.innerHTML = data.challengePoints.map(function (c) {
      var icon = CHALLENGE_ICONS[c.icon] || CHALLENGE_ICONS['default'];
      return '<div class="challenge-card">' +
        '<div class="challenge-card-icon">' + icon + '</div>' +
        '<h4>' + c.title + '</h4>' +
        '<p>' + c.description + '</p>' +
        '</div>';
    }).join('');
    challengeGrid.style.display = 'grid';
  } else {
    setText('projectChallenge', data.challenge);
  }

  // Solution: numbered process steps when available, otherwise a paragraph
  var solutionPara = document.getElementById('projectSolution');
  var processList = document.getElementById('projectProcessSteps');
  if (data.process && processList) {
    if (solutionPara) solutionPara.style.display = 'none';
    processList.innerHTML = data.process.map(function (step, i) {
      var num = String(i + 1);
      if (num.length < 2) num = '0' + num;
      return '<li class="process-step">' +
        '<span class="process-step-num">' + num + '</span>' +
        '<div>' +
        '<h4>' + step.title + '</h4>' +
        '<p>' + step.what + '</p>' +
        '<p class="process-step-why"><strong>Why:</strong> ' + step.why + '</p>' +
        '</div>' +
        '</li>';
    }).join('');
    processList.style.display = 'flex';
  } else {
    setText('projectSolution', data.solution);
  }

  // Outcome
  setText('projectImpact', data.impactSummary || data.impact);

  // Takeaways (optional block)
  if (data.takeaways) {
    setHTML('projectTakeaways', data.takeaways.map(function (t) {
      return '<li>' + t + '</li>';
    }).join(''));
    var takeawaysBlock = document.getElementById('projectTakeawaysBlock');
    if (takeawaysBlock) takeawaysBlock.style.display = 'block';
  }

  // Retrospective (optional block)
  if (data.retrospective) {
    setHTML('projectRetrospective', data.retrospective.map(function (t) {
      return '<li>' + t + '</li>';
    }).join(''));
    var retroBlock = document.getElementById('projectRetroBlock');
    if (retroBlock) retroBlock.style.display = 'block';
  }
});