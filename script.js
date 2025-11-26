// Menu Toggle Logic
function toggleMenu() {
  const menuSide = document.getElementById('menuSide');
  menuSide.classList.toggle('open');
}

// Theme Toggle Logic
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const icon = themeToggle ? themeToggle.querySelector('i') : null;

if (themeToggle) {
  // Check local storage
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
    if (icon) icon.classList.replace('fa-moon', 'fa-sun');
  }

  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    if (currentTheme === 'light') {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'dark');
      if (icon) icon.classList.replace('fa-sun', 'fa-moon');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
      if (icon) icon.classList.replace('fa-moon', 'fa-sun');
    }
  });
}

// Scroll Progress & Back to Top Logic
const scrollProgress = document.getElementById('scrollProgress');
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  // Scroll Progress
  if (scrollProgress) {
    const totalHeight = document.body.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / totalHeight) * 100;
    scrollProgress.style.width = `${progress}%`;
  }

  // Back to Top
  if (backToTopBtn) {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  }

  // Timeline Animation
  showTimelineOnScroll();
});

if (backToTopBtn) {
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Close menu when clicking a link (for mobile)
document.addEventListener('DOMContentLoaded', () => {
  const menuLinks = document.querySelectorAll('.menu-side a');
  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      document.getElementById('menuSide').classList.remove('open');
    });
  });

  // Project Cards Animation (from index.html)
  const projectCards = document.querySelectorAll('.project-card');
  if (projectCards.length > 0) {
    projectCards.forEach((card, i) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      setTimeout(() => {
        card.style.transition = 'opacity 0.5s, transform 0.5s';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, 300 + i * 200);
    });
  }

  // Trigger timeline check on load
  showTimelineOnScroll();
});

// Timeline Animation Function
function showTimelineOnScroll() {
  const timelineItems = document.querySelectorAll('.timeline-item');
  if (timelineItems.length > 0) {
    timelineItems.forEach(item => {
      const rect = item.getBoundingClientRect();
      if (rect.top < window.innerHeight - 50) {
        item.classList.add('visible');
      }
    });
  }
}

// Contact Form Logic (from contato.html)
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    alert(`Obrigado, ${name}! 🙌\n\nSua mensagem foi recebida. Responderemos em breve.`);
    this.reset();
  });
}
