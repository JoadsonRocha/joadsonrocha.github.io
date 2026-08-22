// Menu Toggle Logic
function toggleMenu() {
  const menuSide = document.getElementById('menuSide');
  if (menuSide) {
    menuSide.classList.toggle('open');
  }
}

// Theme Toggle Logic
const themeToggle = document.getElementById('themeToggle');
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
    const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
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
});

if (backToTopBtn) {
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Project Category Filtering Logic
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('#projectsGrid .project-card');

  if (!filterBtns.length || !projectCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const categories = (card.getAttribute('data-category') || '').split(' ');
        if (filterValue === 'all' || categories.includes(filterValue)) {
          card.style.display = 'flex';
          requestAnimationFrame(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          });
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            if (!card.getAttribute('data-category')?.split(' ').includes(document.querySelector('.filter-btn.active')?.getAttribute('data-filter')) && document.querySelector('.filter-btn.active')?.getAttribute('data-filter') !== 'all') {
              card.style.display = 'none';
            }
          }, 300);
        }
      });
    });
  });
}

// DOM Content Loaded Handler
document.addEventListener('DOMContentLoaded', () => {
  // Close menu when clicking a link (for mobile)
  const menuLinks = document.querySelectorAll('.menu-side a');
  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      const menuSide = document.getElementById('menuSide');
      if (menuSide) menuSide.classList.remove('open');
    });
  });

  // Cursor Glow Effect (Interactive)
  document.addEventListener('mousemove', (e) => {
    const x = e.clientX;
    const y = e.clientY;
    document.body.style.setProperty('--cursor-x', `${x}px`);
    document.body.style.setProperty('--cursor-y', `${y}px`);
  });

  // Intersection Observer for Fade-Up Animations on Scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -40px 0px"
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
  const animatedElements = document.querySelectorAll('.project-card, .saas-card, .dashboard-box, .cv-card, .cv-edu-card, .cv-skill-group');
  animatedElements.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.7s cubic-bezier(0.23, 1, 0.32, 1), transform 0.7s cubic-bezier(0.23, 1, 0.32, 1)';
    if (el.classList.contains('project-card') || el.classList.contains('saas-card')) {
      el.style.transitionDelay = `${(i % 3) * 80}ms`;
    }
    fadeUpObserver.observe(el);
  });

  // Initialize filters
  initProjectFilters();

  // Apply language
  updateLanguage(currentLang);
});

// Language Toggle Logic & Dictionary
const langToggle = document.getElementById('langToggle');
const translations = {
  pt: {
    'nav-home': 'Inicio',
    'nav-about': 'Sobre Mim',
    'nav-cv': 'Currículo',
    'nav-blog': 'Blog',
    'nav-contact': 'Contato',
    'header-role': 'FULL STACK DEVELOPER | GESTOR DE TI • GERENTE DE PROJETOS & EDTECH | PROFESSOR',
    'header-subtitle': 'Profissional de Tecnologia e Educação com graduação em Gestão em TI, MBA em Gestão Ágil de Projetos e ampla formação em desenvolvimento ágil (Scrum/Design Thinking), gestão da qualidade (ISO 9000) e cibersegurança. Experiência prática em desenvolvimento Front-End & Full Stack, soluções EdTech, planejamento de projetos e sistemas de dados.',
    'btn-view-cv': 'Acessar Currículo Completo',
    'btn-download-pdf': 'Baixar PDF Oficial',
    'btn-view-saas': 'Aplicações SaaS no Ar',
    'tag-featured-saas': 'SaaS & Aplicações em Produção',
    'title-saas-showcase': 'Produtos Ativos no Ar',
    'section-projects-title': 'Portfólio de Projetos',
    'filter-all': 'Todos',
    'filter-saas': 'SaaS & Destaques',
    'filter-desktop': 'Desktop & Electron',
    'filter-web': 'Web & Full Stack',
    'filter-mobile': 'Mobile & PWA',
    'filter-tools': 'Utilidades & Scripts',
    'saas-stratis-desc': 'Plataforma robusta para planejamento estratégico ágil, governança de projetos, alinhamento de metas e visão executiva de alta produtividade.',
    'saas-risemindr-desc': 'Ecossistema digital focado em construção de hábitos consistentes, gestão de tempo, foco e analytics comportamental de desempenho.',
    'saas-mestrio-desc': 'Aplicação em nuvem para automação e centralização operacional, gerenciamento modular de fluxos e visualização inteligente de métricas.',
    'btn-access-saas': 'Acessar stratisplanner.com.br',
    'btn-access-risemindr': 'Acessar risemindr.com',
    'btn-access-mestrio': 'Acessar Mestrio App',
    'btn-access': 'Visitar App',
    'project-lumina-desc': 'Visualizador e apresentador de imagens de alta performance com design Glassmorphism e modo projeção.',
    'project-multdownload-desc': 'Ferramenta para Baixar vídeos e áudios do YouTube em alta qualidade com interface performática.',
    'project-mediafinder-desc': 'Aplicativo desktop para organizar e assistir vídeos locais com busca inteligente e capas automáticas.',
    'project-youfinder-desc': 'Reprodutor minimalista de vídeos do YouTube em Electron, transformando a visualização online com controle de telas.',
    'project-multdownloader-desc': 'Aplicativo em Python/Tk Desktop para baixar vídeos e reels com FFMPEG integrado.',
    'project-hiasd-desc': 'Sistema desenvolvido com funcionalidades de interface moderna e lógica em JavaScript.',
    'project-hiasdpy-desc': 'Versão Python do sistema HIASD, trazendo automações, lógica avançada e execução local.',
    'project-kivy-desc': 'Versão Android do MultDownloader desenvolvida com Kivy, interface mobile e FFMPEG integrado.',
    'project-flex-desc': 'Aplicativo web simples e rápido para cálculo de paridade entre gasolina e etanol.',
    'btn-github': 'Ver no GitHub',
    'btn-exec': 'Executável',
    'footer-text': '© 2025 Joadson Rocha — Gestor em TI & Desenvolvedor Full Stack • Boa Vista - RR',
    'cv-back': 'Voltar ao Portfólio',
    'cv-print': 'Imprimir / Salvar PDF',
    'cv-role': 'FULL STACK DEVELOPER | GESTOR DE TI • GERENTE DE PROJETOS & EDTECH | PROFESSOR',
    'cv-summary-title': 'Resumo Executivo',
    'cv-summary-text': 'Profissional de Tecnologia e Educação com graduação em Gestão em TI, MBA em Gestão Ágil de Projetos e ampla formação em desenvolvimento ágil (Scrum/Design Thinking), gestão da qualidade (ISO 9000) e cibersegurança. Experiência prática sólida em desenvolvimento Front-End & Full Stack, soluções EdTech inovadoras, planejamento estratégico de projetos e arquitetura de sistemas de dados. Criador e mantenedor de produtos SaaS no ar (StratisPlanner, RiseMindr, Mestrio) e ferramentas desktop de alto impacto (Lumina, MultDownload).',
    'cv-saas-title': 'Produtos em Produção & SaaS Criados',
    'cv-stratis-desc': 'SaaS focado em governança ágil, acompanhamento de OKRs, metas estratégicas, gestão de prazos e visão executiva de projetos corporativos.',
    'cv-risemindr-desc': 'Ecossistema para gerenciamento de foco, rotinas inteligentes e metas de alto rendimento, integrando analytics comportamental e visual moderno.',
    'cv-mestrio-desc': 'Aplicação distribuída com foco em otimização de fluxos operacionais, dashboards dinâmicos e controle modular de recursos.',
    'cv-exp-title': 'Experiência Profissional',
    'cv-exp1-title': 'Gestor em TI, Desenvolvedor Full Stack & Fundador',
    'cv-exp2-title': 'Consultor em Tecnologia da Informação & Desenvolvedor',
    'cv-edu-title': 'Formação Acadêmica Multidisciplinar',
    'cv-skills-title': 'Competências Técnicas, Governança & EdTech',
    'cv-lang-title': 'Idiomas',
    'cv-soft-title': 'Diferenciais & Soft Skills',
    'cv-contact-btn': 'Entrar em Contato'
  },
  en: {
    'nav-home': 'Home',
    'nav-about': 'About Me',
    'nav-cv': 'Resume / CV',
    'nav-blog': 'Blog',
    'nav-contact': 'Contact',
    'header-role': 'FULL STACK DEVELOPER | IT MANAGER • AGILE PROJECT MANAGER & EDTECH | PROFESSOR',
    'header-subtitle': 'Technology and Education Professional with degree in IT Management, MBA in Agile Project Management, and strong background in agile development (Scrum/Design Thinking), quality management (ISO 9000), and cybersecurity. Hands-on experience in Front-End & Full Stack development, EdTech solutions, project planning, and data systems.',
    'btn-view-cv': 'View Full Resume (CV)',
    'btn-download-pdf': 'Download Official PDF',
    'btn-view-saas': 'Live SaaS Products',
    'tag-featured-saas': 'SaaS & Production Applications',
    'title-saas-showcase': 'Active Live Products',
    'section-projects-title': 'Project Portfolio',
    'filter-all': 'All',
    'filter-saas': 'SaaS & Featured',
    'filter-desktop': 'Desktop & Electron',
    'filter-web': 'Web & Full Stack',
    'filter-mobile': 'Mobile & PWA',
    'filter-tools': 'Utilities & Scripts',
    'saas-stratis-desc': 'Robust platform for agile strategic planning, project governance, goal alignment, and high-productivity executive insights.',
    'saas-risemindr-desc': 'Digital ecosystem focused on building consistent habits, time management, focus, and behavioral performance analytics.',
    'saas-mestrio-desc': 'Cloud application for operational automation, modular workflow management, and intelligent metrics visualization.',
    'btn-access-saas': 'Visit stratisplanner.com.br',
    'btn-access-risemindr': 'Visit risemindr.com',
    'btn-access-mestrio': 'Visit Mestrio App',
    'btn-access': 'Visit App',
    'project-lumina-desc': 'High-performance image viewer and presenter with Glassmorphism design and projection mode.',
    'project-multdownload-desc': 'Tool to download YouTube videos and audio in high quality with a high-performance interface.',
    'project-mediafinder-desc': 'Desktop app to organize and watch local videos with smart search and automatic covers.',
    'project-youfinder-desc': 'Minimalist YouTube video player in Electron, transforming online viewing with screen controls.',
    'project-multdownloader-desc': 'Python/Tk desktop app for downloading videos and reels with integrated FFmpeg.',
    'project-hiasd-desc': 'System developed with modern interface features and JavaScript logic.',
    'project-hiasdpy-desc': 'Python version of the HIASD system, bringing automation, advanced logic, and local execution.',
    'project-kivy-desc': 'Android version of MultDownloader developed with Kivy, mobile interface, and integrated FFmpeg.',
    'project-flex-desc': 'Fast and simple web app for calculating gasoline vs ethanol parity.',
    'btn-github': 'View on GitHub',
    'btn-exec': 'Executable',
    'footer-text': '© 2025 Joadson Rocha — IT Manager & Full Stack Developer • Boa Vista - RR',
    'cv-back': 'Back to Portfolio',
    'cv-print': 'Print / Save PDF',
    'cv-role': 'FULL STACK DEVELOPER | IT MANAGER • AGILE PROJECT MANAGER & EDTECH | PROFESSOR',
    'cv-summary-title': 'Executive Summary',
    'cv-summary-text': 'Technology and Education Professional with degree in IT Management, MBA in Agile Project Management, and strong background in agile development (Scrum/Design Thinking), quality management (ISO 9000), and cybersecurity. Hands-on experience in Front-End & Full Stack development, EdTech solutions, project planning, and data systems. Creator and maintainer of live SaaS products (StratisPlanner, RiseMindr, Mestrio) and high-impact desktop software.',
    'cv-saas-title': 'Production SaaS & Live Products',
    'cv-stratis-desc': 'SaaS focused on agile governance, OKR tracking, strategic milestones, deadline management, and executive project overview.',
    'cv-risemindr-desc': 'Ecosystem for focus management, smart routines, and high-performance goals with behavioral analytics.',
    'cv-mestrio-desc': 'Distributed cloud application designed for workflow optimization, dynamic dashboards, and modular resource control.',
    'cv-exp-title': 'Professional Experience',
    'cv-exp1-title': 'IT Manager, Full Stack Developer & Founder',
    'cv-exp2-title': 'Information Technology Consultant & Developer',
    'cv-edu-title': 'Multidisciplinary Academic Background',
    'cv-skills-title': 'Technical, Governance & EdTech Skills',
    'cv-lang-title': 'Languages',
    'cv-soft-title': 'Key Strengths & Soft Skills',
    'cv-contact-btn': 'Get in Touch'
  }
};

let currentLang = localStorage.getItem('language') || 'pt';

function updateLanguage(lang) {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang] && translations[lang][key]) {
      const icon = el.querySelector('i');
      if (icon) {
        const span = el.querySelector('span');
        if (span) {
          span.innerText = translations[lang][key];
        } else {
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

// Contact Form Logic (from contato.html)
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const msg = currentLang === 'pt'
      ? `Obrigado, ${name}! 🙌\n\nSua mensagem foi recebida com sucesso. Entrarei em contato em breve.`
      : `Thank you, ${name}! 🙌\n\nYour message has been successfully received. I will reach out soon.`;
    alert(msg);
    this.reset();
  });
}
