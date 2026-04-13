/* ═══════════════════════════════════════════════════
   Revise — Cookie Consent + GA4
   GDPR-compliant: analytics loads ONLY after consent
   ═══════════════════════════════════════════════════ */

(function() {
  // ── Config ──
  var GA_ID = 'G-YCFFR5K8J9';

  var STORAGE_KEY = 'revise_cookie_consent';
  var consent = localStorage.getItem(STORAGE_KEY);

  // If already consented, load GA immediately
  if (consent === 'accepted') loadGA();

  // If already decided, don't show banner
  if (consent) return;

  // ── Build banner ──
  var banner = document.createElement('div');
  banner.id = 'cookieBanner';
  banner.setAttribute('role', 'dialog');
  banner.setAttribute('aria-label', 'Cookie-samtykke');
  banner.innerHTML =
    '<div class="cb-inner">' +
      '<p class="cb-text">Vi bruger cookies til at analysere trafik og forbedre din oplevelse. ' +
      '<a href="#" class="cb-link" id="cbMore">L\u00e6s mere</a></p>' +
      '<div class="cb-buttons">' +
        '<button class="cb-btn cb-decline" id="cbDecline">Kun n\u00f8dvendige</button>' +
        '<button class="cb-btn cb-accept" id="cbAccept">Accepter alle</button>' +
      '</div>' +
    '</div>' +
    '<div class="cb-details" id="cbDetails">' +
      '<p><strong>N\u00f8dvendige cookies</strong> — Altid aktive. Bruges til kontaktformular (FormSubmit) og gemmer dit cookie-valg.</p>' +
      '<p><strong>Analyse cookies</strong> — Google Analytics 4. Hj\u00e6lper os forst\u00e5 hvordan siden bruges, s\u00e5 vi kan forbedre den. Disse aktiveres kun med dit samtykke.</p>' +
    '</div>';

  // ── Inject styles ──
  var style = document.createElement('style');
  style.textContent =
    '#cookieBanner{position:fixed;bottom:0;left:0;right:0;z-index:10000;' +
    'background:rgba(26,23,20,0.95);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);' +
    'padding:20px 24px;font-family:"DM Sans",sans-serif;color:#f4f1ea;' +
    'transform:translateY(100%);animation:cbSlideUp .4s ease .5s forwards}' +
    '@keyframes cbSlideUp{to{transform:translateY(0)}}' +
    '.cb-inner{max-width:1100px;margin:0 auto;display:flex;align-items:center;gap:20px;flex-wrap:wrap}' +
    '.cb-text{font-size:14px;line-height:1.6;opacity:.8;flex:1;min-width:280px;margin:0}' +
    '.cb-link{color:#f4f1ea;opacity:.6;transition:opacity .2s}' +
    '.cb-link:hover{opacity:1}' +
    '.cb-buttons{display:flex;gap:10px;flex-shrink:0}' +
    '.cb-btn{font-family:"Instrument Sans",sans-serif;font-size:13px;font-weight:500;' +
    'padding:10px 20px;border-radius:6px;border:none;cursor:pointer;transition:all .2s;letter-spacing:.3px}' +
    '.cb-decline{background:transparent;color:#f4f1ea;border:1px solid rgba(244,241,234,.2)}' +
    '.cb-decline:hover{border-color:rgba(244,241,234,.4)}' +
    '.cb-accept{background:#f4f1ea;color:#1a1714}' +
    '.cb-accept:hover{opacity:.9}' +
    '.cb-details{max-width:1100px;margin:0 auto;display:none;padding-top:16px;border-top:1px solid rgba(244,241,234,.1);margin-top:16px}' +
    '.cb-details.open{display:block}' +
    '.cb-details p{font-size:13px;line-height:1.6;opacity:.5;margin:0 0 8px}' +
    '.cb-details strong{opacity:1;font-weight:500}' +
    '#cookieBanner.cb-hidden{animation:cbSlideDown .3s ease forwards}' +
    '@keyframes cbSlideDown{to{transform:translateY(100%)}}' +
    '@media(max-width:768px){' +
    '.cb-inner{flex-direction:column;align-items:stretch;gap:14px}' +
    '.cb-buttons{justify-content:stretch}.cb-btn{flex:1;text-align:center}}';

  document.head.appendChild(style);
  document.body.appendChild(banner);

  // ── Events ──
  document.getElementById('cbAccept').addEventListener('click', function() {
    localStorage.setItem(STORAGE_KEY, 'accepted');
    loadGA();
    closeBanner();
  });

  document.getElementById('cbDecline').addEventListener('click', function() {
    localStorage.setItem(STORAGE_KEY, 'declined');
    closeBanner();
  });

  document.getElementById('cbMore').addEventListener('click', function(e) {
    e.preventDefault();
    document.getElementById('cbDetails').classList.toggle('open');
  });

  function closeBanner() {
    banner.classList.add('cb-hidden');
    setTimeout(function() { banner.remove(); }, 400);
  }

  // ── GA4 loader ──
  function loadGA() {
    if (GA_ID === 'G-XXXXXXXXXX') return; // Skip if placeholder
    if (document.getElementById('ga4script')) return; // Already loaded

    var s = document.createElement('script');
    s.id = 'ga4script';
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);

    window.dataLayer = window.dataLayer || [];
    function gtag() { window.dataLayer.push(arguments); }
    gtag('js', new Date());
    gtag('config', GA_ID, { anonymize_ip: true });
  }
})();
