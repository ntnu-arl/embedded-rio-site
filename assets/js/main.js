/**
 * Embedded Bare-Metal Radar-Inertial Odometry
 * Clean & Lightweight Academic Project JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Theme Management (Light / Dark)
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const themeIcon = document.getElementById('theme-icon');
  
  const savedTheme = localStorage.getItem('embedded-rio-theme');
  // Default to dark navy blue theme
  const currentTheme = savedTheme || 'dark';
  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeIcon(currentTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const activeTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('embedded-rio-theme', newTheme);
      updateThemeIcon(newTheme);
    });
  }

  function updateThemeIcon(theme) {
    if (!themeIcon) return;
    if (theme === 'dark') {
      themeIcon.innerHTML = `
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>
      `;
      themeToggleBtn.setAttribute('title', 'Switch to light mode');
    } else {
      themeIcon.innerHTML = `
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      `;
      themeToggleBtn.setAttribute('title', 'Switch to dark mode');
    }
  }

  // 2. Mobile Navigation Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const navLinks = document.getElementById('nav-links');

  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('mobile-open');
    });

    navLinks.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('mobile-open');
      });
    });
  }

  // 3. Tab Switching Component
  const tabLinks = document.querySelectorAll('.tab-link');
  tabLinks.forEach(link => {
    link.addEventListener('click', () => {
      const container = link.closest('.panel-card');
      if (!container) return;
      const targetId = link.getAttribute('data-tab');

      container.querySelectorAll('.tab-link').forEach(b => b.classList.remove('active'));
      container.querySelectorAll('.tab-content').forEach(p => p.classList.remove('active'));

      link.classList.add('active');
      const targetPanel = container.querySelector(`#${targetId}`);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }
    });
  });

  // 4. Copy to Clipboard Functionality
  const copyButtons = document.querySelectorAll('.copy-button, .copy-btn');
  copyButtons.forEach(btn => {
    btn.addEventListener('click', async () => {
      const targetId = btn.getAttribute('data-copy-target');
      let textToCopy = '';

      if (targetId) {
        const targetElem = document.getElementById(targetId);
        if (targetElem) {
          textToCopy = targetElem.innerText.trim();
        }
      } else {
        textToCopy = btn.getAttribute('data-copy-text') || '';
      }

      if (!textToCopy) return;

      try {
        await navigator.clipboard.writeText(textToCopy);
        const originalContent = btn.innerHTML;
        btn.classList.add('copied');
        btn.textContent = 'Copied!';
        setTimeout(() => {
          btn.innerHTML = originalContent;
          btn.classList.remove('copied');
        }, 2000);
      } catch (err) {
        console.error('Failed to copy text:', err);
      }
    });
  });

  // 5. Lightbox Modal for Image Inspection
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxCloseBtn = document.getElementById('lightbox-close-btn');

  function openLightbox(src, caption) {
    if (!lightboxModal || !lightboxImg) return;
    lightboxImg.src = src;
    lightboxImg.alt = caption || 'Enlarged inspection view';
    if (lightboxCaption) {
      lightboxCaption.textContent = caption || '';
    }
    lightboxModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightboxModal) return;
    lightboxModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal || e.target === lightboxCloseBtn || e.target.closest('#lightbox-close-btn')) {
        closeLightbox();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightboxModal.classList.contains('active')) {
        closeLightbox();
      }
    });
  }

  // Bind zoomable elements
  const zoomables = document.querySelectorAll('[data-zoomable]');
  zoomables.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.tagName === 'IMG' ? item : item.querySelector('img');
      if (img) {
        const fullSrc = img.getAttribute('data-full-src') || img.src;
        const caption = item.getAttribute('data-caption') || img.alt || '';
        openLightbox(fullSrc, caption);
      }
    });
  });

  // 6. Active Navigation Highlighting on Scroll
  const navSections = document.querySelectorAll('section[id], header[id]');
  const navLinksItems = document.querySelectorAll('.nav-links .nav-link');

  function handleScrollSpy() {
    let currentId = '';
    const scrollPos = window.scrollY + 100;

    navSections.forEach(sec => {
      const secTop = sec.offsetTop;
      const secHeight = sec.offsetHeight;
      if (scrollPos >= secTop && scrollPos < secTop + secHeight) {
        currentId = sec.getAttribute('id');
      }
    });

    navLinksItems.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', handleScrollSpy, { passive: true });
  handleScrollSpy();
});
