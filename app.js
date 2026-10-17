/* ==========================================================================
   SEGMENT 5: MASCOT SVG GENERATOR & INTERACTIVE CONTROLLERS
   ========================================================================== */

// Generates the Minimal Apple-Grade Botanical SVG Mascot ("Ankur") for steps 1..5
function getAnkurSvg(step) {
  const leafScale = 0.55 + (step * 0.11);
  const showSecondLeaf = step >= 3;
  const showBloom = step === 5;

  return `
    <svg class="ankur-svg" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle class="ankur-ring" cx="36" cy="36" r="31" stroke="#0F6E46" stroke-width="1.5" stroke-dasharray="6 4" opacity="0.45"/>
      <circle cx="36" cy="36" r="25" fill="#FFFFFF" stroke="#D5E2DA" stroke-width="1.5"/>
      <g class="ankur-core" style="transform: scale(${leafScale});">
        <path d="M36 52C42.6274 52 48 46.6274 48 40C48 33.3726 36 20 36 20C36 20 24 33.3726 24 40C24 46.6274 29.3726 52 36 52Z" fill="url(#seedGrad)"/>
        ${showSecondLeaf ? `<path d="M36 38C36 28 45 22 52 22C52 30 46 38 36 38Z" fill="#10B981" opacity="0.85"/>` : ''}
        ${step >= 2 ? `<path d="M36 42C36 33 27 27 20 27C20 35 26 42 36 42Z" fill="#059669" opacity="0.9"/>` : ''}
        ${showBloom ? `<circle cx="36" cy="17" r="5" fill="#D97706"/>` : ''}
      </g>
      <defs>
        <linearGradient id="seedGrad" x1="24" y1="20" x2="48" y2="52" gradientUnits="userSpaceOnUse">
          <stop stop-color="#10B981"/>
          <stop offset="1" stop-color="#0F6E46"/>
        </linearGradient>
      </defs>
    </svg>
  `;
}

// Renders current onboarding screen (1 to 5)
function renderOnboarding() {
  const stepData = onboardingScreens[currentLang][currentStep - 1];
  document.getElementById('stepCounterText').textContent =
    currentLang === 'en' ? `SCREEN ${currentStep} OF 5` : `स्क्रीन ${currentStep} / 5`;
  document.getElementById('stageLabelText').textContent = stepData.stage;
  document.getElementById('mascotSpeechText').textContent = `"${stepData.mascotSpeech}"`;
  document.getElementById('mascotSvgContainer').innerHTML = getAnkurSvg(currentStep);

  const pills = document.querySelectorAll('#stepPills .step-pill');
  pills.forEach((pill, idx) => pill.classList.toggle('active', idx < currentStep));

  document.getElementById('screenContentArea').innerHTML = `
    <h2 style="font-size:1.35rem; font-weight:800; margin-bottom:0.5rem;">${stepData.title}</h2>
    <p style="font-size:0.925rem; color:var(--text-secondary); margin-bottom:1.25rem;">${stepData.desc}</p>
    ${stepData.render()}
  `;

  document.getElementById('prevStepBtn').style.visibility = currentStep === 1 ? 'hidden' : 'visible';
  document.getElementById('nextStepBtn').textContent = stepData.cta;

  // Screen 4 Anti-Freeze Heartbeat Timer
  if (kycTimer) clearInterval(kycTimer);
  if (currentStep === 4) {
    let sec = 4;
    kycTimer = setInterval(() => {
      sec = (sec % 12) + 1;
      const el = document.getElementById('liveTimerCount');
      if (el) el.textContent = currentLang === 'en' ? `(${sec}s elapsed)` : `(${sec}s)`;
    }, 1000);
  }
}

function changeStep(delta) {
  if (currentStep === 5 && delta === 1) {
    alert(currentLang === 'en'
      ? "🎉 First ₹100 Investment Completed! Welcome to Sprout 2.0."
      : "🎉 आपका पहला ₹100 निवेश पूरा हुआ! Sprout 2.0 में आपका स्वागत है।");
    currentStep = 1;
  } else {
    currentStep = Math.min(5, Math.max(1, currentStep + delta));
  }
  renderOnboarding();
}

function jumpToStep(stepNum) {
  currentStep = stepNum;
  renderOnboarding();
}

function startOnboardingFromHero() {
  currentStep = 1;
  renderOnboarding();
  document.querySelector('.onboarding-column').scrollIntoView({ behavior: 'smooth' });
}

function selectGoal(goalKey) {
  selectedGoal = goalKey;
  renderOnboarding();
}

function toggleCheck(field, val) {
  checklistState[field] = val;
}

// Homepage ₹100 SIP Calculator
function updateCalculator(monthlyVal) {
  const P = parseInt(monthlyVal, 10);
  const r = 0.12 / 12;
  const n = 5 * 12;
  const invested = P * n;
  const futureVal = Math.round(P * (((Math.pow(1 + r, n) - 1) / r) * (1 + r)));

  const suffix = currentLang === 'en' ? '/ mo' : '/ माह';
  document.getElementById('sipAmountDisplay').textContent = `₹${P.toLocaleString('en-IN')} ${suffix}`;
  document.getElementById('totalInvestedVal').textContent = `₹${invested.toLocaleString('en-IN')}`;
  document.getElementById('projectedVal').textContent = `₹${futureVal.toLocaleString('en-IN')}`;
}

// Instant Language Switcher (English <-> Hindi)
function toggleLanguage() {
  currentLang = currentLang === 'en' ? 'hi' : 'en';
  document.documentElement.lang = currentLang;
  document.getElementById('langLabel').textContent =
    currentLang === 'en' ? 'हिन्दी में देखें' : 'Switch to English';

  const dict = i18n[currentLang];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) el.innerHTML = dict[key];
  });

  updateCalculator(document.getElementById('sipSlider').value);
  renderOnboarding();
}

// View Switcher (Both / Web Only / App Only)
function setViewMode(mode) {
  const mainEl = document.getElementById('mainLayout');
  mainEl.classList.remove('view-only-web', 'view-only-app');
  if (mode === 'web') mainEl.classList.add('view-only-web');
  if (mode === 'app') mainEl.classList.add('view-only-app');

  document.getElementById('viewBothBtn').classList.toggle('active', mode === 'both');
  document.getElementById('viewWebBtn').classList.toggle('active', mode === 'web');
  document.getElementById('viewAppBtn').classList.toggle('active', mode === 'app');
}

function copyReferralLink() {
  const btn = document.getElementById('refBtn');
  btn.textContent = currentLang === 'en' ? '✓ Invite Link Copied!' : '✓ लिंक कॉपी हो गया!';
  setTimeout(() => { btn.textContent = i18n[currentLang].ref_btn; }, 2200);
}

// Initialize App
document.addEventListener('DOMContentLoaded', renderOnboarding);