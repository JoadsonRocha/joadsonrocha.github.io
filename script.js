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

  // Cursor Glow Effect (Interactive)
  document.addEventListener('mousemove', (e) => {
    const x = e.clientX;
    const y = e.clientY;
    
    // Update a CSS variable on the body for the glow position
    document.body.style.setProperty('--cursor-x', `${x}px`);
    document.body.style.setProperty('--cursor-y', `${y}px`);
  });

  // Intersection Observer for Fade-Up Animations on Scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const fadeUpObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Apply to project cards and sections
  const animatedElements = document.querySelectorAll('.project-card, .dashboard-box, .timeline-item');
  animatedElements.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(40px)';
    el.style.transition = 'opacity 0.8s cubic-bezier(0.23, 1, 0.32, 1), transform 0.8s cubic-bezier(0.23, 1, 0.32, 1)';
    
    // Add staggered delay based on child index if it's a grid item
    if (el.classList.contains('project-card')) {
       el.style.transitionDelay = `${(i % 3) * 100}ms`;
    }
    
    fadeUpObserver.observe(el);
  });
});

// Language Toggle Logic
const langToggle = document.getElementById('langToggle');
const translations = {
  pt: {
    'nav-home': 'Inicio',
    'nav-about': 'Sobre Mim',
    'nav-blog': 'Blog',
    'nav-contact': 'Contato',
    'nav-projects': 'Projetos Desktop',
    'nav-dashboard': 'Dashboard',
    'nav-goals': 'Meta Diária',
    'header-subtitle': 'Gestor em TI & Desenvolvedor Full Stack • Especialista em Projetos Ágeis • Formado em Pedagogia, História e Física • Apaixonado por Tecnologia e Inovação',
    'section-projects-title': 'Meus Projetos',
    'project-lumina-desc': 'Visualizador e apresentador de imagens de alta performance com design Glassmorphism e modo projeção.',
    'project-multdownload-desc': 'Ferramenta para Baixar vídeos e áudios do YouTube em alta qualidade com interface performática.',
    'project-mediafinder-desc': 'Aplicativo desktop para organizar e assistir vídeos locais com busca inteligente e capas automáticas.',
    'project-youfinder-desc': 'O YouFinder é um reprodutor minimalista de vídeos do YouTube, desenvolvido em Electron, que transforma a forma de assistir conteúdos online com controle de telas.',
    'project-multdownloader-desc': 'Aplicativo em Python/Tk Desktop para baixar vídeos e reels com FFMPEG integrado.',
    'project-hiasd-desc': 'Sistema desenvolvido em HTML/CSS/JS com funcionalidades de interface moderna e lógica em JavaScript.',
    'project-hiasdpy-desc': 'Versão Python do sistema HIASD, trazendo automações, lógica avançada e execução local.',
    'project-kivy-desc': 'Versão Android do MultDownloader desenvolvida com Kivy, interface mobile e FFMPEG integrado.',
    'project-flex-desc': 'Aplicativo web simples para cálculo entre gasolina e etanol.',
    'section-dashboard-title': 'Painel de Estudos',
    'dashboard-desc': 'Confira aqui o painel de estudos em uma área dedicada. Clique para abrir o painel completo e continuar seus estudos.',
    'dashboard-btn': 'Abrir Painel',
    'btn-github': 'Ver no GitHub',
    'btn-exec': 'Executavel',
    'footer-text': '© 2025 Joadson Rocha — Desenvolvedor Web • Boa Vista - RR'
  },
  en: {
    'nav-home': 'Home',
    'nav-about': 'About Me',
    'nav-blog': 'Blog',
    'nav-contact': 'Contact',
    'nav-projects': 'Desktop Projects',
    'nav-dashboard': 'Dashboard',
    'nav-goals': 'Daily Goals',
    'header-subtitle': 'IT Manager & Full Stack Developer • Agile Specialist • Degree in Pedagogy, History, and Physics • Passionate about Technology and Innovation',
    'section-projects-title': 'My Projects',
    'project-lumina-desc': 'High-performance image viewer and presenter with Glassmorphism design and projection mode.',
    'project-multdownload-desc': 'Tool to download YouTube videos and audio in high quality with a high-performance interface.',
    'project-mediafinder-desc': 'Desktop app to organize and watch local videos with smart search and automatic covers.',
    'project-youfinder-desc': 'YouFinder is a minimalist YouTube video player developed in Electron that transforms how you watch online content with screen control.',
    'project-multdownloader-desc': 'Python/Tk desktop app for downloading videos and reels with integrated FFmpeg.',
    'project-hiasd-desc': 'System developed in HTML/CSS/JS with modern interface features and JavaScript logic.',
    'project-hiasdpy-desc': 'Python version of the HIASD system, bringing automation, advanced logic, and local execution.',
    'project-kivy-desc': 'Android version of MultDownloader developed with Kivy, mobile interface, and integrated FFmpeg.',
    'project-flex-desc': 'Simple web app for calculating gasoline vs ethanol.',
    'section-dashboard-title': 'Study Dashboard',
    'dashboard-desc': 'Check out the study dashboard in a dedicated area. Click to open the full panel and continue your studies.',
    'dashboard-btn': 'Open Dashboard',
    'btn-github': 'View on GitHub',
    'btn-exec': 'Executable',
    'footer-text': '© 2025 Joadson Rocha — Web Developer • Boa Vista - RR'
  }
};

let currentLang = localStorage.getItem('language') || 'pt';

function updateLanguage(lang) {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang][key]) {
      // Check if it's a list item link or button with an icon
      const icon = el.querySelector('i');
      if (icon) {
        // Keep icon, update text after it
        const span = el.querySelector('span');
        if (span) {
           span.innerText = translations[lang][key];
        } else {
           // If no span, replace text node or create one
           const textNode = Array.from(el.childNodes).find(node => node.nodeType === 3 && node.textContent.trim().length > 0);
           if (textNode) {
             textNode.textContent = ' ' + translations[lang][key];
           } else {
             el.appendChild(document.createTextNode(' ' + translations[lang][key]));
           }
        }
      } else {
        el.innerText = translations[lang][key];
      }
    }
  });
  
  if (langToggle) {
    langToggle.querySelector('span').innerText = lang.toUpperCase();
  }
  
  localStorage.setItem('language', lang);
  document.documentElement.lang = lang === 'pt' ? 'pt-br' : 'en';
}

if (langToggle) {
  langToggle.addEventListener('click', () => {
    currentLang = currentLang === 'pt' ? 'en' : 'pt';
    updateLanguage(currentLang);
  });
}

// Trigger initial load
document.addEventListener('DOMContentLoaded', () => {
  updateLanguage(currentLang);
  // ... existing DOMContentLoaded logic ...
});

// Contact Form Logic (from contato.html)
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const msg = currentLang === 'pt' 
      ? `Obrigado, ${name}! 🙌\n\nSua mensagem foi recebida. Responderemos em breve.`
      : `Thank you, ${name}! 🙌\n\nYour message has been received. We will respond soon.`;
    alert(msg);
    this.reset();
  });
}
