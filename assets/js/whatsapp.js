/**
 * VAAV — whatsapp.js
 * Botón flotante de WhatsApp con inyección dinámica de HTML
 */
(function () {
  'use strict';

  const WA_PHONE = '524421243598';
  const WA_MOBILE = 'https://wa.me/' + WA_PHONE;
  const WA_DESKTOP = 'https://web.whatsapp.com/send?phone=' + WA_PHONE;

  const svgIcon = `
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.117.549 4.103 1.504 5.833L.057 23.077c-.082.316.194.6.513.526l5.403-1.418A11.944 11.944 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.007-1.374l-.359-.214-3.727.977.996-3.638-.234-.374A9.774 9.774 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/>
    </svg>`;

  function injectWhatsApp() {
    const isMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);

    // Mobile button
    const mobileBtn = document.createElement('a');
    mobileBtn.className = 'whatsapp-float hide-desktop';
    mobileBtn.href = WA_MOBILE;
    mobileBtn.target = '_blank';
    mobileBtn.rel = 'noopener noreferrer';
    mobileBtn.setAttribute('aria-label', 'Contáctanos por WhatsApp');
    mobileBtn.innerHTML = svgIcon;

    // Desktop button
    const desktopBtn = document.createElement('a');
    desktopBtn.className = 'whatsapp-float show-desktop';
    desktopBtn.href = WA_DESKTOP;
    desktopBtn.target = '_blank';
    desktopBtn.rel = 'noopener noreferrer';
    desktopBtn.setAttribute('aria-label', 'Contáctanos por WhatsApp Web');
    desktopBtn.innerHTML = svgIcon;

    // Adjust bottom offset if other fixed elements exist
    mobileBtn.style.bottom = '28px';
    mobileBtn.style.right = '28px';
    desktopBtn.style.bottom = '28px';
    desktopBtn.style.right = '28px';

    document.body.appendChild(mobileBtn);
    document.body.appendChild(desktopBtn);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectWhatsApp);
  } else {
    injectWhatsApp();
  }
})();
