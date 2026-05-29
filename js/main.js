// Category dropdown
const catBtn = document.getElementById('catBtn');
const catDropdown = document.getElementById('catDropdown');

if (catBtn && catDropdown) {
  catBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    catDropdown.classList.toggle('open');
  });
  document.addEventListener('click', () => catDropdown.classList.remove('open'));
}

// Mobile menu
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const headerMenu = document.getElementById('headerMenu');
if (mobileMenuBtn && headerMenu) {
  mobileMenuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = headerMenu.classList.toggle('open');
    mobileMenuBtn.setAttribute('aria-expanded', String(isOpen));
  });

  headerMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      headerMenu.classList.remove('open');
      mobileMenuBtn.setAttribute('aria-expanded', 'false');
    });
  });

  document.addEventListener('click', (e) => {
    if (!headerMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
      headerMenu.classList.remove('open');
      mobileMenuBtn.setAttribute('aria-expanded', 'false');
    }
  });
}

// TOC generation and active highlight
const tocNav = document.getElementById('tocNav');
const tocSidebar = document.getElementById('tocSidebar');
const tocLabel = document.getElementById('tocLabel');

if (tocNav) {
  const headings = document.querySelectorAll('.article-body h2, .article-body h3');

  headings.forEach((h, i) => {
    if (!h.id) {
      h.id = 'heading-' + i;
    }
    const a = document.createElement('a');
    a.href = '#' + h.id;
    a.textContent = h.textContent;
    if (h.tagName === 'H3') {
      a.className = 'toc-h3';
    }
    tocNav.appendChild(a);
  });

  const tocLinks = tocNav.querySelectorAll('a');

  function updateTOC() {
    let activeId = '';
    const scrollPos = window.scrollY + 120;
    for (const h of headings) {
      if (h.offsetTop <= scrollPos) {
        activeId = h.id;
      } else {
        break;
      }
    }
    tocLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + activeId);
    });
  }

  if (headings.length > 0) {
    window.addEventListener('scroll', updateTOC);
    updateTOC();
  }
}

// TOC collapse on mobile
if (tocLabel && tocSidebar) {
  tocLabel.addEventListener('click', () => {
    tocSidebar.classList.toggle('collapsed');
  });
}

// Lightbox for article images
const lightboxOverlay = document.getElementById('lightboxOverlay');
const lightboxImg = document.getElementById('lightboxImg');

if (lightboxOverlay && lightboxImg) {
  document.querySelectorAll('.article-body img').forEach(img => {
    img.addEventListener('click', () => {
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightboxOverlay.classList.add('active');
    });
  });

  lightboxOverlay.addEventListener('click', () => {
    lightboxOverlay.classList.remove('active');
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      lightboxOverlay.classList.remove('active');
    }
  });
}
