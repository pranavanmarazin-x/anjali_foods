// =============================================
//  ANJALI FOODS — script.js
// =============================================

// ===== NAVBAR: Transparent at top, blurred on scroll =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 30);
});

// ===== HAMBURGER MENU TOGGLE =====
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  hamburger.classList.toggle('is-open');
  const spans = hamburger.querySelectorAll('span');
  if (hamburger.classList.contains('is-open')) {
    spans[0].style.transform = 'translateY(7px) rotate(45deg)';
    spans[1].style.opacity   = '0';
    spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity   = '';
    spans[2].style.transform = '';
  }
});

// Close menu when a link is clicked (mobile UX)
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('is-open');
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity   = '';
    spans[2].style.transform = '';
  });
});

// ===== ACTIVE NAV LINK =====
const navAnchors = document.querySelectorAll('.nav-links a');
navAnchors.forEach(link => {
  link.addEventListener('click', () => {
    navAnchors.forEach(l => l.classList.remove('active'));
    link.classList.add('active');
  });
});

// ===== SCROLL-TRIGGERED ANIMATIONS (hero) =====
const animatedEls = document.querySelectorAll(
  '.animate-fade-up, .animate-fade-left, .animate-float'
);
const heroObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = 'running';
        heroObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);
animatedEls.forEach(el => {
  el.style.animationPlayState = 'paused';
  heroObserver.observe(el);
});

// ===== HERO PARALLAX on mouse move =====
const heroSection = document.querySelector('.hero');
const productImg  = document.querySelector('.product-img');
const bgShapes    = document.querySelectorAll('.hero-bg-shape');

if (heroSection && productImg) {
  heroSection.addEventListener('mousemove', (e) => {
    const rect = heroSection.getBoundingClientRect();
    const cx = rect.width  / 2;
    const cy = rect.height / 2;
    const dx = (e.clientX - rect.left - cx) / cx;
    const dy = (e.clientY - rect.top  - cy) / cy;
    productImg.style.transform =
      `translateY(${Math.sin(Date.now() / 1200) * 12}px) rotateY(${dx * 8}deg) rotateX(${-dy * 5}deg)`;
    bgShapes.forEach((shape, i) => {
      const factor = (i + 1) * 8;
      shape.style.transform = `translate(${dx * factor}px, ${dy * factor}px)`;
    });
  });
  heroSection.addEventListener('mouseleave', () => {
    productImg.style.transform = '';
    bgShapes.forEach(shape => { shape.style.transform = ''; });
  });
}

// =============================================
//  PRODUCT IMAGE AUTO SLIDER
// =============================================
const productImgs = document.querySelectorAll('.product-img');
const dots        = document.querySelectorAll('.dot');
let currentImg    = 0;

function showImage(index) {
  productImgs.forEach(img => img.classList.remove('active-img'));
  dots.forEach(dot => dot.classList.remove('active-dot'));
  productImgs[index].classList.add('active-img');
  dots[index].classList.add('active-dot');
  currentImg = index;
}

let sliderInterval = setInterval(() => {
  showImage((currentImg + 1) % productImgs.length);
}, 3000);

dots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    clearInterval(sliderInterval);
    showImage(i);
    sliderInterval = setInterval(() => {
      showImage((currentImg + 1) % productImgs.length);
    }, 3000);
  });
});

// =============================================
//  GENERIC SCROLL OBSERVER FACTORY
// =============================================
function makeObserver(threshold = 0) {
  return new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          entry.observer ? entry.observer.unobserve(entry.target) : null;
        }
      });
    },
    { threshold }
  );
}

// ===== WHY CHOOSE US cards =====
const whyObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        whyObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0 }
);
document.querySelectorAll('.why-card').forEach(card => whyObserver.observe(card));

// ===== ABOUT section =====
const aboutObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        aboutObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0 }
);
const aboutLeft = document.querySelector('.about-left');
if (aboutLeft) aboutObserver.observe(aboutLeft);
document.querySelectorAll('.about-icon-card').forEach(el => aboutObserver.observe(el));
document.querySelectorAll('.polaroid').forEach(el => aboutObserver.observe(el));

// ===== OWNER SECTION =====
const ownerObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        ownerObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 }
);
const ownerPhotoWrap = document.querySelector('.owner-photo-wrap');
const ownerContent   = document.querySelector('.owner-content');
if (ownerPhotoWrap) ownerObserver.observe(ownerPhotoWrap);
if (ownerContent)   ownerObserver.observe(ownerContent);

// ===== CONTACT section =====
const contactObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        contactObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0 }
);
[
  document.querySelector('.contact-left'),
  document.querySelector('.contact-right'),
  document.querySelector('.contact-map'),
  ...document.querySelectorAll('.contact-info-item')
].forEach(el => { if (el) contactObserver.observe(el); });

// ===== CONTACT FORM =====
const contactForm = document.getElementById('contactForm');
const submitBtn   = document.getElementById('submitBtn');
const btnText     = submitBtn.querySelector('.btn-text');
const btnLoader   = submitBtn.querySelector('.btn-loader');
const formSuccess = document.getElementById('formSuccess');
const formFail    = document.getElementById('formFail');

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const name    = document.getElementById('cf-name');
  const email   = document.getElementById('cf-email');
  const message = document.getElementById('cf-message');
  let valid = true;

  document.querySelectorAll('.form-error').forEach(el => el.classList.remove('show'));
  document.querySelectorAll('.form-group input, .form-group textarea').forEach(el => el.classList.remove('error'));

  if (!name.value.trim()) { name.classList.add('error'); name.nextElementSibling.classList.add('show'); valid = false; }
  if (!email.value.trim() || !/\S+@\S+\.\S+/.test(email.value)) { email.classList.add('error'); email.nextElementSibling.classList.add('show'); valid = false; }
  if (!message.value.trim()) { message.classList.add('error'); message.nextElementSibling.classList.add('show'); valid = false; }
  if (!valid) return;

  btnText.hidden = true; btnLoader.hidden = false;
  submitBtn.disabled = true; formSuccess.hidden = true; formFail.hidden = true;

  try {
    const res = await fetch('https://formspree.io/f/xykvpgaw', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ name: name.value, email: email.value, message: message.value })
    });
    if (res.ok) { formSuccess.hidden = false; contactForm.reset(); }
    else { formFail.hidden = false; }
  } catch { formFail.hidden = false; }
  finally { btnText.hidden = false; btnLoader.hidden = true; submitBtn.disabled = false; }
});

// ===== FOOTER animations =====
const footerObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        footerObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0 }
);
[
  document.querySelector('.footer-top'),
  document.querySelector('.footer-brand'),
  document.querySelector('.footer-bottom')
].forEach(el => { if (el) footerObserver.observe(el); });

// ===== FOOTER BRAND letter spacing on scroll =====
const brandText = document.querySelector('.footer-brand-text');
if (brandText) {
  window.addEventListener('scroll', () => {
    const rect = brandText.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      const progress = 1 - rect.top / window.innerHeight;
      brandText.style.letterSpacing = `${Math.min(progress * 0.06, 0.04)}em`;
    }
  });
}
