/* ══ SCROLL PROGRESS ════════════════════════════════ */
window.addEventListener('scroll', () => {
  const p = document.getElementById('progress-bar');
  if (p) {
    p.style.width = (window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100) + '%';
  }
}, { passive: true });

/* ══ PRELOADER ══════════════════════════════════════ */
const preText = document.getElementById('preText');
const preCounter = document.getElementById('preCounter');

if (preText) {
  'drafted3'.split('').forEach((ch, i) => {
    const s = document.createElement('span');
    s.className = 'pre-letter'; s.textContent = ch;
    s.style.animationDelay = (i * 0.065 + 0.15) + 's';
    preText.appendChild(s);
  });
}

if (preCounter) {
  let cnt = 0;
  const ct = setInterval(() => {
    cnt = Math.min(cnt + Math.ceil(Math.random() * 8), 100);
    preCounter.textContent = String(cnt).padStart(3, '0');
    if (cnt >= 100) clearInterval(ct);
  }, 25);
}

setTimeout(() => {
  const pre = document.getElementById('preloader');
  if (pre) {
    pre.style.transition = 'clip-path 0.9s cubic-bezier(.77,0,.18,1), opacity 0.4s ease 0.5s';
    pre.style.clipPath = 'inset(0 0 100% 0)';
    pre.style.opacity = '0';

    const main = document.getElementById('main');
    if (main) main.classList.add('visible');

    setTimeout(() => {
      const wordmark = document.getElementById('wordmark');
      const heroTagline = document.getElementById('heroTagline');
      const heroRoles = document.getElementById('heroRoles');
      const navWrap = document.getElementById('navWrap');
      const startBtnWrap = document.getElementById('startBtnWrap');
      
      if (wordmark) wordmark.classList.add('in');
      if (heroTagline) heroTagline.classList.add('in');
      if (heroRoles) heroRoles.classList.add('in');
      if (navWrap) navWrap.classList.add('in');
      if (startBtnWrap) startBtnWrap.classList.add('in');
    }, 80);

    setTimeout(() => pre.style.display = 'none', 1100);
  }
}, 2100);

/* ══ MOBILE NAVIGATION TOGGLE ═══════════════════════ */
const navToggle = document.getElementById('navToggle');
const navDrawer = document.getElementById('navDrawer');
const drawerLinks = document.querySelectorAll('.drawer-link');

function toggleNav() {
  if (!navToggle || !navDrawer) return;
  
  navToggle.classList.toggle('active');
  navDrawer.classList.toggle('active');
  
  // Prevent body scroll when drawer is open
  document.body.style.overflow = navDrawer.classList.contains('active') ? 'hidden' : '';
}

function closeNav() {
  if (!navToggle || !navDrawer) return;
  
  navToggle.classList.remove('active');
  navDrawer.classList.remove('active');
  document.body.style.overflow = '';
}

if (navToggle) {
  navToggle.addEventListener('click', toggleNav);
}

// Close drawer when clicking a link
drawerLinks.forEach(link => {
  link.addEventListener('click', closeNav);
});

// Close drawer on escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && navDrawer && navDrawer.classList.contains('active')) {
    closeNav();
  }
});

/* ══ PARALLAX WORDMARK ══════════════════════════════ */
window.addEventListener('scroll', () => {
  const wrap = document.querySelector('.wordmark-wrap');
  if (wrap) {
    wrap.style.transform = `translateY(${window.scrollY * 0.12}px)`;
  }
}, { passive: true });

/* ══ INTERSECTION OBSERVER ══════════════════════════ */
function observe(el, cb, threshold = 0.12) {
  if (!el) return;
  new IntersectionObserver((entries, obs) => {
    entries.forEach(e => { 
      if (e.isIntersecting) { 
        cb(e.target); 
        obs.unobserve(e.target); 
      } 
    });
  }, { threshold }).observe(el);
}

// Observe section titles
document.querySelectorAll('.js-title').forEach(el => observe(el, t => t.classList.add('in')));

// Observe work cards with staggered animation
document.querySelectorAll('.js-cards').forEach(grid => {
  observe(grid, () => {
    grid.querySelectorAll('.work-card').forEach((c, i) => {
      setTimeout(() => c.classList.add('in'), i * 100);
    });
  }, 0.08);
});

// Observe stats section
document.querySelectorAll('.js-stats').forEach(el => {
  observe(el, t => {
    t.classList.add('in');
    t.querySelectorAll('.count-num').forEach(num => {
      const target = +num.dataset.target; 
      let cur = 0;
      const step = Math.ceil(target / 30);
      const timer = setInterval(() => {
        cur = Math.min(cur + step, target); 
        num.textContent = cur;
        if (cur >= target) clearInterval(timer);
      }, 40);
    });
  });
});

// Observe workflow section
document.querySelectorAll('.js-wf-left').forEach(el => observe(el, t => t.classList.add('in')));

document.querySelectorAll('.js-step').forEach((el, i) => {
  observe(el, t => setTimeout(() => t.classList.add('in'), i * 120));
});

// Observe about section
document.querySelectorAll('.js-about').forEach(el => observe(el, t => t.classList.add('in')));

// Observe contact section
document.querySelectorAll('.js-contact').forEach(el => observe(el, t => t.classList.add('in')));

// Observe footer
document.querySelectorAll('.js-footer').forEach(el => {
  observe(el, t => {
    const footer = t.querySelector('footer');
    if (footer) {
      footer.style.opacity = '1';
      footer.style.transform = 'translateY(0)';
    }
  });
});

/* ══ FORM VALIDATION ════════════════════════════════ */
const form = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const successEl = document.getElementById('formSuccess');
const errorEl = document.getElementById('formError');

// Real-time validation
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');

function validateField(input, validationFn) {
  if (!input) return true;
  
  const value = input.value.trim();
  const isValid = validationFn(value);
  
  if (isValid) {
    input.classList.remove('error');
    input.classList.add('valid');
  } else {
    input.classList.remove('valid');
    input.classList.add('error');
  }
  
  return isValid;
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateName(name) {
  return name.length >= 2;
}

function validateMessage(msg) {
  return msg.length >= 10;
}

// Add real-time validation listeners
if (nameInput) {
  nameInput.addEventListener('blur', () => validateField(nameInput, validateName));
  nameInput.addEventListener('input', () => {
    if (nameInput.classList.contains('error')) {
      validateField(nameInput, validateName);
    }
  });
}

if (emailInput) {
  emailInput.addEventListener('blur', () => validateField(emailInput, validateEmail));
  emailInput.addEventListener('input', () => {
    if (emailInput.classList.contains('error')) {
      validateField(emailInput, validateEmail);
    }
  });
}

if (messageInput) {
  messageInput.addEventListener('blur', () => validateField(messageInput, validateMessage));
  messageInput.addEventListener('input', () => {
    if (messageInput.classList.contains('error')) {
      validateField(messageInput, validateMessage);
    }
  });
}

// Form submission
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Validate all required fields
    const isNameValid = validateField(nameInput, validateName);
    const isEmailValid = validateField(emailInput, validateEmail);
    const isMessageValid = validateField(messageInput, validateMessage);
    
    if (!isNameValid || !isEmailValid || !isMessageValid) {
      errorEl.className = 'form-status error';
      errorEl.textContent = '✕ Please fill in all required fields correctly.';
      errorEl.style.display = 'flex';
      successEl.style.display = 'none';
      return;
    }
    
    // Hide status messages
    if (successEl) successEl.style.display = 'none';
    if (errorEl) errorEl.style.display = 'none';
    
    // Update button state
    if (submitBtn) {
      submitBtn.innerHTML = '<span>Sending…</span><div class="btn-arrow">⟳</div>';
      submitBtn.disabled = true;
    }
    
    try {
      const res = await fetch(form.action, {
        method: 'POST', 
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });
      
      if (res.ok) {
        if (successEl) {
          successEl.className = 'form-status success';
          successEl.style.display = 'flex';
        }
        form.reset();
        
        // Remove validation classes
        [nameInput, emailInput, messageInput].forEach(input => {
          if (input) {
            input.classList.remove('valid', 'error');
          }
        });
        
        if (submitBtn) {
          submitBtn.innerHTML = '<span>Sent ✓</span><div class="btn-arrow">✓</div>';
        }
        
        setTimeout(() => {
          if (submitBtn) {
            submitBtn.innerHTML = '<span>Send Message</span><div class="btn-arrow">→</div>';
            submitBtn.disabled = false;
          }
          if (successEl) successEl.style.display = 'none';
        }, 4000);
        
      } else {
        throw new Error();
      }
    } catch (err) {
      if (errorEl) {
        errorEl.className = 'form-status error';
        errorEl.textContent = '✕ Something went wrong. Please try again.';
        errorEl.style.display = 'flex';
      }
      if (submitBtn) {
        submitBtn.innerHTML = '<span>Send Message</span><div class="btn-arrow">→</div>';
        submitBtn.disabled = false;
      }
    }
  });
}

/* ══ SMOOTH SCROLL FOR ANCHOR LINKS ════════════════ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href && href.length > 1) {
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  });
});

/* ══ ENHANCED CARD HOVER EFFECTS ════════════════════ */
document.querySelectorAll('.work-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transform = 'translateY(-4px)';
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

