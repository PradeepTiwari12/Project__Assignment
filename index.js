/* ==========================================================================
   SEGMENT 4: BILINGUAL DATA (EN + HI) & 5-SCREEN ONBOARDING DEFINITIONS
   ========================================================================== */
let currentLang = 'en';
let currentStep = 1;
let selectedGoal = 'habit';
let checklistState = { pan: true, aadhaar: true };
let kycTimer = null;

const i18n = {
  en: {
    nav_split: "Connected Journey",
    nav_web: "Homepage Only",
    nav_app: "App Onboarding (5)",
    ticker_1: "🌱 <strong>1,420 first-time investors</strong> started with ₹100 today",
    ticker_2: "⚡ <strong>Avg. KYC Verification:</strong> 48 seconds with PAN + Aadhaar OTP",
    ticker_3: "📊 <strong>Nifty 50 Index Fund:</strong> Start a micro-SIP from ₹100/month",
    ticker_4: "🔒 <strong>SEBI Registered:</strong> Bank-grade 256-bit encryption",
    hero_badge: "✨ Built for India's First-Time Investors • Ultra-Lite (<25 KB)",
    hero_title: "Investing doesn’t have to feel scary. Start with just ₹100.",
    hero_subtitle: "No jargon, no hidden steps, and no heavy charts. Meet Ankur—your calm guide from your very first ₹100 mutual fund step to long-term wealth habits.",
    hero_cta_primary: "Start with ₹100 Now →",
    hero_cta_secondary: "See 2-Doc KYC Checklist",
    calc_title: "See how a small monthly habit grows",
    calc_slider_label: "Slide to adjust monthly investment (₹100 to ₹2,000):",
    calc_invested_label: "Total Put In (5 Years)",
    calc_projected_label: "Illustrative Value (@12% p.a.*)",
    calc_footnote: "*Illustrative projection for education only. Mutual fund returns depend on market performance and are not fixed.",
    prep_heading: "Ready in 3 simple steps (No surprises)",
    prep_subheading: "We tell you exactly what you need upfront so you never get stuck mid-way.",
    prep_1_title: "Keep PAN Card Ready",
    prep_1_desc: "Required by SEBI to verify your tax identity.",
    prep_2_title: "Aadhaar-Linked Mobile",
    prep_2_desc: "For a quick 6-digit DigiLocker OTP verification.",
    prep_3_title: "₹100 via Any UPI App",
    prep_3_desc: "Invest at your own pace. Pause or withdraw anytime.",
    ref_title: "🌱 Grow Together: Invite a friend to Sprout",
    ref_desc: "Share your calm investing journey. Track referrals inside the app after your first ₹100 investment.",
    ref_btn: "Copy Invite Link",
    compliance_text: "Mutual Fund investments are subject to market risks, read all scheme related documents carefully before investing. Past performance does not indicate future returns. Capital is at risk."
  },
  hi: {
    nav_split: "पूरी यात्रा (Web + App)",
    nav_web: "केवल होमपेज",
    nav_app: "ऐप ऑनबोर्डिंग (5)",
    ticker_1: "🌱 <strong>1,420 नए निवेशकों</strong> ने आज ₹100 से शुरुआत की",
    ticker_2: "⚡ <strong>औसत KYC समय:</strong> PAN और आधार OTP के साथ 48 सेकंड",
    ticker_3: "📊 <strong>निफ्टी 50 इंडेक्स फंड:</strong> ₹100/माह से माइक्रो-SIP शुरू करें",
    ticker_4: "🔒 <strong>SEBI पंजीकृत:</strong> 256-बिट बैंक-ग्रेड सुरक्षा",
    hero_badge: "✨ भारत के नए निवेशकों के लिए निर्मित • अल्ट्रा-लाइट (<25 KB)",
    hero_title: "निवेश से डरने की ज़रूरत नहीं। सिर्फ़ ₹100 से शुरुआत करें।",
    hero_subtitle: "कोई कठिन शब्द नहीं, कोई छुपा हुआ नियम नहीं। 'अंकुर' से मिलें—आपका शांत मार्गदर्शक जो पहले ₹100 से आपकी निवेश यात्रा को सरल बनाता है।",
    hero_cta_primary: "₹100 से शुरुआत करें →",
    hero_cta_secondary: "KYC दस्तावेज़ सूची देखें",
    calc_title: "देखें छोटी मासिक बचत कैसे बढ़ती है",
    calc_slider_label: "मासिक निवेश चुनें (₹100 से ₹2,000):",
    calc_invested_label: "कुल निवेश (5 वर्ष)",
    calc_projected_label: "अनुमानित मूल्य (@12% वार्षिक*)",
    calc_footnote: "*यह केवल समझने के लिए एक उदाहरण है। म्यूचुअल फंड रिटर्न बाज़ार के प्रदर्शन पर निर्भर करते हैं और निश्चित नहीं होते।",
    prep_heading: "3 आसान चरणों में शुरुआत (बिना किसी रुकावट के)",
    prep_subheading: "हम आपको पहले ही बता देते हैं कि किन दस्तावेज़ों की आवश्यकता होगी।",
    prep_1_title: "अपना PAN कार्ड पास रखें",
    prep_1_desc: "SEBI नियमों के अनुसार पहचान सत्यापन के लिए आवश्यक।",
    prep_2_title: "आधार से जुड़ा मोबाइल नंबर",
    prep_2_desc: "तेज़ 6-अंकीय डिजीलॉकर OTP सत्यापन के लिए।",
    prep_3_title: "किसी भी UPI ऐप से ₹100",
    prep_3_desc: "अपनी सुविधा से निवेश करें। कभी भी रोकें या निकालें।",
    ref_title: "🌱 साथ बढ़ें: अपने दोस्त को Sprout पर आमंत्रित करें",
    ref_desc: "अपने पहले ₹100 निवेश के बाद ऐप के अंदर अपने रेफरल ट्रैक करें।",
    ref_btn: "लिंक कॉपी करें",
    compliance_text: "म्यूचुअल फंड निवेश बाजार जोखिमों के अधीन हैं, निवेश करने से पहले योजना से जुड़े सभी दस्तावेजों को ध्यान से पढ़ें। पिछला प्रदर्शन भविष्य के रिटर्न की गारंटी नहीं देता है।"
  }
};

const onboardingScreens = {
  en: [
    {
      stage: "Stage 1: The Seed",
      mascotSpeech: "65% of beginners tell us investing feels scary. Let's take the pressure off—pick a small ₹100 goal to test the waters.",
      title: "1. Pick your first ₹100 habit",
      desc: "You don't need thousands of rupees. Choose what feels right today:",
      cta: "Lock in ₹100 Goal →",
      render: () => `
        <div class="option-list">
          <button class="option-btn ${selectedGoal === 'habit' ? 'selected' : ''}" onclick="selectGoal('habit')">
            <div>
              <strong style="display:block;">🌱 Build a ₹100 Monthly Habit</strong>
              <span style="font-size:0.8rem; color:var(--text-secondary);">Learn by doing with small pocket change</span>
            </div>
            <span>${selectedGoal === 'habit' ? '●' : '○'}</span>
          </button>
          <button class="option-btn ${selectedGoal === 'rainy' ? 'selected' : ''}" onclick="selectGoal('rainy')">
            <div>
              <strong style="display:block;">☔ Rainy Day Cushion</strong>
              <span style="font-size:0.8rem; color:var(--text-secondary);">Start setting aside extra savings</span>
            </div>
            <span>${selectedGoal === 'rainy' ? '●' : '○'}</span>
          </button>
          <button class="option-btn ${selectedGoal === 'learn' ? 'selected' : ''}" onclick="selectGoal('learn')">
            <div>
              <strong style="display:block;">📘 Just Exploring with ₹100</strong>
              <span style="font-size:0.8rem; color:var(--text-secondary);">See how mutual funds work firsthand</span>
            </div>
            <span>${selectedGoal === 'learn' ? '●' : '○'}</span>
          </button>
        </div>
      `
    },
    {
      stage: "Stage 2: Grounding Roots",
      mascotSpeech: "Wait! Before we start KYC, let's make sure you have 2 things nearby so you don't get stuck mid-way.",
      title: "2. 60-Second Document Check",
      desc: "SEBI regulations require a one-time identity check. Tick both boxes when you have them handy:",
      cta: "I Have Both Ready →",
      render: () => `
        <div>
          <label class="checklist-box">
            <input type="checkbox" ${checklistState.pan ? 'checked' : ''} onchange="toggleCheck('pan', this.checked)" />
            <div>
              <strong style="display:block; font-size:0.92rem;">I know my 10-digit PAN Number</strong>
              <span style="font-size:0.78rem; color:var(--text-secondary);">Format: ABCDE1234F (No photo upload needed)</span>
            </div>
          </label>
          <label class="checklist-box">
            <input type="checkbox" ${checklistState.aadhaar ? 'checked' : ''} onchange="toggleCheck('aadhaar', this.checked)" />
            <div>
              <strong style="display:block; font-size:0.92rem;">My Aadhaar-linked phone is with me</strong>
              <span style="font-size:0.78rem; color:var(--text-secondary);">To receive a 6-digit OTP from DigiLocker</span>
            </div>
          </label>
        </div>
      `
    },
    {
      stage: "Stage 3: First Sprout",
      mascotSpeech: "Just two fields! No lengthy 20-box forms. We fetch your verified KYC details directly via DigiLocker.",
      title: "3. Frictionless Instant KYC",
      desc: "Enter your permanent account number to connect with CKYC / DigiLocker:",
      cta: "Verify with OTP →",
      render: () => `
        <div>
          <label for="panInput" style="display:block; font-size:0.85rem; font-weight:700; margin-bottom:6px;">Permanent Account Number (PAN)</label>
          <input id="panInput" class="text-input" type="text" value="ABCDE1234F" maxlength="10" style="margin-bottom:1rem;" />
          <div style="padding:12px; border:1px solid var(--border-color); border-radius:var(--radius-md); background:var(--bg-primary); font-size:0.85rem;">
            ✅ Verify paperlessly using <strong>[Aadhaar Redacted]</strong> OTP via official DigiLocker gateway.
          </div>
        </div>
      `
    },
    {
      stage: "Stage 4: Active Growth",
      mascotSpeech: "Hold tight! The app is NOT frozen—I'm talking to the central KYC registry right now. Usually takes ~15 seconds.",
      title: "4. Live KYC Status (Don't Close)",
      desc: "We show you every live handshake so you know the app is working:",
      cta: "KYC Approved! Plant ₹100 →",
      render: () => `
        <div class="verification-tracker" aria-live="polite">
          <div class="verify-step"><span>✅</span><span><strong>Step 1:</strong> PAN status confirmed (1s)</span></div>
          <div class="verify-step"><span>✅</span><span><strong>Step 2:</strong> DigiLocker OTP matched (3s)</span></div>
          <div class="verify-step">
            <span class="pulse-dot"></span>
            <span><strong>Step 3:</strong> Syncing CKYC... <strong id="liveTimerCount">(4s elapsed)</strong></span>
          </div>
        </div>
      `
    },
    {
      stage: "Stage 5: Full Bloom",
      mascotSpeech: "Congratulations! Your KYC is verified. Now plant your first ₹100 seed into a diversified India index fund.",
      title: "5. Plant Your First ₹100",
      desc: "One tap with any UPI app. Pause or withdraw your money whenever you need.",
      cta: "Pay ₹100 via UPI ✓",
      render: () => `
        <div style="background:var(--bg-subtle); border:1.5px solid var(--brand-primary); border-radius:var(--radius-md); padding:1rem;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
            <strong style="font-size:0.95rem;">Nifty 50 Direct Index Fund</strong>
            <span style="background:var(--brand-primary); color:#fff; padding:2px 8px; border-radius:99px; font-size:0.75rem; font-weight:700;">₹100 First Step</span>
          </div>
          <p style="font-size:0.8rem; color:var(--text-secondary);">Invests across India's top 50 companies • Zero exit load • Moderately High Risk</p>
        </div>
      `
    }
  ],
  hi: [
    {
      stage: "चरण 1: बीज (Seed)",
      mascotSpeech: "65% नए निवेशकों को शुरुआत में डर लगता है। चलिए बिना किसी दबाव के सिर्फ़ ₹100 से शुरुआत करें।",
      title: "1. अपनी पहली ₹100 की आदत चुनें",
      desc: "आज के लिए अपना छोटा लक्ष्य चुनें:",
      cta: "₹100 का लक्ष्य चुनें →",
      render: () => `
        <div class="option-list">
          <button class="option-btn ${selectedGoal === 'habit' ? 'selected' : ''}" onclick="selectGoal('habit')">
            <div><strong style="display:block;">🌱 ₹100 मासिक निवेश की आदत</strong></div>
            <span>${selectedGoal === 'habit' ? '●' : '○'}</span>
          </button>
          <button class="option-btn ${selectedGoal === 'rainy' ? 'selected' : ''}" onclick="selectGoal('rainy')">
            <div><strong style="display:block;">☔ आपातकालीन बचत (Rainy Day)</strong></div>
            <span>${selectedGoal === 'rainy' ? '●' : '○'}</span>
          </button>
        </div>
      `
    },
    {
      stage: "चरण 2: मज़बूत जड़ें",
      mascotSpeech: "रुकिए! KYC शुरू करने से पहले यह सुनिश्चित करें कि आपके पास ये 2 चीज़ें पास में हैं।",
      title: "2. 60-सेकंड दस्तावेज़ जांच",
      desc: "दोनों बॉक्स पर टिक करें जब वे आपके पास हों:",
      cta: "मेरे पास दोनों तैयार हैं →",
      render: () => `
        <div>
          <label class="checklist-box">
            <input type="checkbox" ${checklistState.pan ? 'checked' : ''} onchange="toggleCheck('pan', this.checked)" />
            <div><strong style="display:block; font-size:0.92rem;">मुझे अपना 10-अंकीय PAN नंबर पता है</strong></div>
          </label>
          <label class="checklist-box">
            <input type="checkbox" ${checklistState.aadhaar ? 'checked' : ''} onchange="toggleCheck('aadhaar', this.checked)" />
            <div><strong style="display:block; font-size:0.92rem;">आधार से जुड़ा फ़ोन मेरे पास है</strong></div>
          </label>
        </div>
      `
    },
    {
      stage: "चरण 3: पहला अंकुर",
      mascotSpeech: "सिर्फ़ दो जानकारियां! हम डिजीलॉकर के माध्यम से आपका KYC तुरंत सत्यापित करते हैं।",
      title: "3. आसान और तेज़ KYC",
      desc: "डिजीलॉकर से जुड़ने के लिए अपना PAN नंबर दर्ज करें:",
      cta: "OTP से सत्यापित करें →",
      render: () => `
        <div>
          <input id="panInput" class="text-input" type="text" value="ABCDE1234F" maxlength="10" style="margin-bottom:1rem;" />
          <div style="padding:12px; border:1px solid var(--border-color); border-radius:var(--radius-md); background:var(--bg-primary); font-size:0.85rem;">
            ✅ आधिकारिक डिजीलॉकर गेटवे के माध्यम से <strong>[Aadhaar Redacted]</strong> OTP द्वारा पेपरलेस सत्यापन।
          </div>
        </div>
      `
    },
    {
      stage: "चरण 4: सक्रिय विकास",
      mascotSpeech: "थोड़ा प्रतीक्षा करें! ऐप हैंग या बंद नहीं हुआ है—मैं अभी केंद्रीय KYC रजिस्ट्री से जुड़ रहा हूँ।",
      title: "4. लाइव KYC स्थिति (बंद न करें)",
      desc: "हम आपको हर लाइव चरण दिखाते हैं:",
      cta: "KYC पूर्ण! ₹100 निवेश करें →",
      render: () => `
        <div class="verification-tracker" aria-live="polite">
          <div class="verify-step"><span>✅</span><span><strong>चरण 1:</strong> PAN की पुष्टि हो गई (1s)</span></div>
          <div class="verify-step"><span>✅</span><span><strong>चरण 2:</strong> डिजीलॉकर OTP सत्यापित (3s)</span></div>
          <div class="verify-step"><span class="pulse-dot"></span><span><strong>चरण 3:</strong> CKYC प्रोफ़ाइल जुड़ रही है... <strong id="liveTimerCount">(4s)</strong></span></div>
        </div>
      `
    },
    {
      stage: "चरण 5: पूर्ण विकास",
      mascotSpeech: "बधाई हो! आपका KYC पूरा हो गया है। अब अपना पहला ₹100 निवेश करें।",
      title: "5. अपना पहला ₹100 निवेश करें",
      desc: "किसी भी UPI ऐप से एक टैप में भुगतान करें।",
      cta: "UPI से ₹100 भुगतान करें ✓",
      render: () => `
        <div style="background:var(--bg-subtle); border:1.5px solid var(--brand-primary); border-radius:var(--radius-md); padding:1rem;">
          <strong style="font-size:0.95rem;">निफ्टी 50 डायरेक्ट इंडेक्स फंड (₹100)</strong>
          <p style="font-size:0.8rem; color:var(--text-secondary);">भारत की शीर्ष 50 बड़ी कंपनियों में निवेश • शून्य निकासी शुल्क</p>
        </div>
      `
    }
  ]
};
