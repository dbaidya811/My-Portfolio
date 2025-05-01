// Hide loading overlay on window load
window.addEventListener('load', function() {
    const overlay = document.getElementById('loading-overlay');
    if (overlay) {
        overlay.classList.add('hidden');
        setTimeout(() => overlay.style.display = 'none', 500);
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav ul');
    
    menuToggle.addEventListener('click', function() {
        nav.classList.toggle('active');
        this.querySelector('i').classList.toggle('fa-times');
        this.querySelector('i').classList.toggle('fa-bars');
    });
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                nav.classList.remove('active');
                menuToggle.querySelector('i').classList.remove('fa-times');
                menuToggle.querySelector('i').classList.add('fa-bars');
            }
        });
    });
    
    // Sticky Header
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Portfolio Filter
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // Smooth Scrolling for Anchor Links with animation time display
    function scrollToWithDuration(targetY, duration = 700) {
        const startY = window.pageYOffset;
        const diff = targetY - startY;
        let startTime = null;

        // Optional: Show scroll time animation (e.g., progress bar at top)
        let scrollBar = document.getElementById('scroll-time-bar');
        if (!scrollBar) {
            scrollBar = document.createElement('div');
            scrollBar.id = 'scroll-time-bar';
            scrollBar.style.position = 'fixed';
            scrollBar.style.top = '0';
            scrollBar.style.left = '0';
            scrollBar.style.height = '4px';
            scrollBar.style.width = '0%';
            scrollBar.style.background = 'var(--primary-color)';
            scrollBar.style.zIndex = '3000';
            scrollBar.style.transition = 'width 0s';
            document.body.appendChild(scrollBar);
        }
        scrollBar.style.width = '0%';
        scrollBar.style.display = 'block';

        function step(currentTime) {
            if (!startTime) startTime = currentTime;
            const time = currentTime - startTime;
            const percent = Math.min(time / duration, 1);
            window.scrollTo(0, startY + diff * percent);
            scrollBar.style.width = (percent * 100) + '%';
            if (percent < 1) {
                requestAnimationFrame(step);
            } else {
                setTimeout(() => { scrollBar.style.display = 'none'; }, 200);
            }
        }
        requestAnimationFrame(step);
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerOffset = 70;
                const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerOffset;

                scrollToWithDuration(offsetPosition, 700);
            }
        });
    });
    
    // Animate Skill Bars on Scroll
    const skillBars = document.querySelectorAll('.skill-level');
    
    function animateSkillBars() {
        skillBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0';
            
            setTimeout(() => {
                bar.style.width = width;
            }, 100);
        });
    }
    
    // Intersection Observer for skill bars
    const skillsSection = document.querySelector('.skills');
    const observerOptions = {
        threshold: 0.2
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBars();
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    if (skillsSection) {
        observer.observe(skillsSection);
    }
    
    // Form Submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const subject = this.querySelector('input[type="text"]:nth-of-type(2)').value;
            const message = this.querySelector('textarea').value;

            // Reset form
            this.reset();
        });
    }
    
    // Current Year for Footer
    const yearSpan = document.querySelector('.footer-bottom p');
    if (yearSpan) {
        const currentYear = new Date().getFullYear();
        yearSpan.textContent = yearSpan.textContent.replace('2023', currentYear);
    }

    // Hero text animation on load
    const heroText = document.querySelectorAll('.hero-content h1, .hero-content h2, .hero-content p, .hero-buttons');
    heroText.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px)';
    });
    setTimeout(() => {
        heroText.forEach(el => {
            el.style.opacity = '';
            el.style.transform = '';
            el.style.animationPlayState = 'running';
        });
    }, 100);

    // Scroll animation for sections
    const scrollElements = document.querySelectorAll('section, .service-card, .skill-category, .about-content, .portfolio-item');
    scrollElements.forEach(el => el.classList.add('scroll-animate'));

    function handleScrollAnimation() {
        scrollElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight - 80) {
                el.classList.add('visible');
            }
        });
    }
    window.addEventListener('scroll', handleScrollAnimation);
    handleScrollAnimation();
});