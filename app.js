// Funmintom Website JavaScript

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initSearch();
    initTabs();
    initFilters();
    initSmoothScrolling();
    initScrollSpy();
});

// Navigation functionality
function initNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('.nav__link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!navToggle.contains(event.target) && !navMenu.contains(event.target)) {
                navMenu.classList.remove('active');
            }
        });
    }
}

// Search functionality
function initSearch() {
    const searchToggle = document.getElementById('search-toggle');
    const searchModal = document.getElementById('search-modal');
    const searchClose = document.getElementById('search-close');
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');

    // Search data - all searchable content
    const searchData = [
        // Strategies
        { title: 'Court Coverage', content: 'In singles, players must cover the entire court alone. Maintain central base position and use split-step technique for efficient movement.', section: 'strategies', category: 'Singles Strategy' },
        { title: 'Attacking Backhand', content: 'Most players have weaker backhands. Exploit this by consistently targeting your opponent\'s backhand corner.', section: 'strategies', category: 'Singles Strategy' },
        { title: 'Four Corners Movement', content: 'Move your opponent to all four corners using long diagonals to tire them out and create gaps.', section: 'strategies', category: 'Singles Strategy' },
        { title: 'Formation Play', content: 'Master both offensive and defensive formations. Rotate seamlessly based on shuttle position.', section: 'strategies', category: 'Doubles Strategy' },
        { title: 'Ready Position', content: 'Keep low center of gravity, neutral grip, and racket head pointing down for explosive split steps.', section: 'strategies', category: 'Defensive Strategy' },
        
        // Rules
        { title: 'Rally Point System', content: 'First to 21 points wins a game. Point scored on every rally regardless of who serves.', section: 'rules', category: 'Scoring' },
        { title: 'Court Dimensions', content: 'Length: 13.4m for both singles and doubles. Width: 6.1m for doubles, 5.18m for singles.', section: 'rules', category: 'Court' },
        { title: 'Service Rules', content: 'Serve must be hit below waist level. Racket head must point downward when hitting shuttle.', section: 'rules', category: 'Service' },
        
        // Equipment
        { title: 'Racket Weight Guide', content: '4U (80-84g) optimal for most players - Good balance of speed and power.', section: 'equipment', category: 'Rackets' },
        { title: 'Feather Shuttlecocks', content: 'Better flight stability, professional tournament standard, superior trajectory.', section: 'equipment', category: 'Shuttlecocks' },
        { title: 'Badminton Shoes', content: 'Non-marking sole essential for indoor courts. Cushioning for shock absorption during jumps.', section: 'equipment', category: 'Shoes' },
        
        // Blog topics
        { title: '5 Essential Badminton Techniques', content: 'Learn the fundamental techniques that form the foundation of excellent badminton play.', section: 'blog', category: 'Training Tips' },
        { title: 'Advanced Footwork Patterns', content: 'Master complex footwork patterns to improve your court coverage and reaction time.', section: 'blog', category: 'Advanced Techniques' },
        { title: 'Mental Strategies', content: 'Develop the mental toughness needed to maintain focus and composure during intense matches.', section: 'blog', category: 'Mental Game' }
    ];

    if (searchToggle && searchModal) {
        // Open search modal
        searchToggle.addEventListener('click', function() {
            searchModal.classList.remove('hidden');
            searchInput.focus();
        });

        // Close search modal
        searchClose.addEventListener('click', function() {
            searchModal.classList.add('hidden');
            searchInput.value = '';
            searchResults.innerHTML = '';
        });

        // Close modal when clicking outside
        searchModal.addEventListener('click', function(event) {
            if (event.target === searchModal) {
                searchModal.classList.add('hidden');
                searchInput.value = '';
                searchResults.innerHTML = '';
            }
        });

        // Search functionality
        searchInput.addEventListener('input', function() {
            const query = this.value.toLowerCase().trim();
            
            if (query.length < 2) {
                searchResults.innerHTML = '';
                return;
            }

            const results = searchData.filter(item => 
                item.title.toLowerCase().includes(query) ||
                item.content.toLowerCase().includes(query) ||
                item.category.toLowerCase().includes(query)
            );

            displaySearchResults(results, query);
        });
    }

    function displaySearchResults(results, query) {
        if (results.length === 0) {
            searchResults.innerHTML = '<div class="search-result-item">No results found for "' + query + '"</div>';
            return;
        }

        searchResults.innerHTML = results.map(result => {
            const highlightedTitle = highlightText(result.title, query);
            const highlightedContent = highlightText(result.content.substring(0, 100) + '...', query);
            
            return `
                <div class="search-result-item" onclick="navigateToSection('${result.section}')">
                    <strong>${highlightedTitle}</strong><br>
                    <small style="color: var(--color-primary);">${result.category}</small><br>
                    <span style="color: var(--color-text-secondary);">${highlightedContent}</span>
                </div>
            `;
        }).join('');
    }

    function highlightText(text, query) {
        const regex = new RegExp(`(${query})`, 'gi');
        return text.replace(regex, '<mark style="background-color: var(--color-bg-3); padding: 1px 2px; border-radius: 2px;">$1</mark>');
    }

    // Navigate to section from search results
    window.navigateToSection = function(sectionId) {
        searchModal.classList.add('hidden');
        searchInput.value = '';
        searchResults.innerHTML = '';
        
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };
}

// Tab functionality for strategies section
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            const targetContent = document.getElementById(targetTab);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
}

// Filter functionality for equipment and news sections
function initFilters() {
    // Equipment filters
    const equipmentFilters = document.querySelectorAll('#equipment .filter-btn');
    const equipmentCategories = document.querySelectorAll('#equipment .equipment-category');

    equipmentFilters.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            equipmentFilters.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Show/hide categories
            equipmentCategories.forEach(category => {
                const categoryType = category.getAttribute('data-category');
                if (filter === 'all' || filter === categoryType) {
                    category.style.display = 'block';
                } else {
                    category.style.display = 'none';
                }
            });
        });
    });

    // News filters
    const newsFilters = document.querySelectorAll('#news .filter-btn');
    const newsCards = document.querySelectorAll('#news .news-card');

    newsFilters.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            newsFilters.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Show/hide news cards
            newsCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                if (filter === 'all' || filter === cardCategory) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll spy for active navigation highlighting
function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav__link');
    const header = document.querySelector('.header');
    
    function updateActiveNav() {
        const scrollPosition = window.scrollY + 100;
        
        // Add/remove sticky header class
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Update active navigation link
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Throttle scroll events for better performance
    let ticking = false;
    function handleScroll() {
        if (!ticking) {
            requestAnimationFrame(updateActiveNav);
            ticking = true;
            setTimeout(() => { ticking = false; }, 10);
        }
    }
    
    window.addEventListener('scroll', handleScroll);
    updateActiveNav(); // Initial call
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add loading animation to buttons
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('btn') && event.target.textContent.includes('Read')) {
        event.target.style.opacity = '0.7';
        event.target.textContent = 'Loading...';
        
        setTimeout(() => {
            event.target.style.opacity = '1';
            event.target.textContent = 'Read More';
        }, 1000);
    }
});

// Add hover effect to cards
function addCardHoverEffects() {
    const cards = document.querySelectorAll('.strategy-card, .blog-card, .news-card, .quick-nav__card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
            this.style.boxShadow = 'var(--shadow-lg)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'var(--shadow-sm)';
        });
    });
}

// Initialize card hover effects after DOM is loaded
setTimeout(addCardHoverEffects, 100);

// Keyboard navigation support
document.addEventListener('keydown', function(event) {
    // Close modals with Escape key
    if (event.key === 'Escape') {
        const searchModal = document.getElementById('search-modal');
        if (searchModal && !searchModal.classList.contains('hidden')) {
            searchModal.classList.add('hidden');
            document.getElementById('search-input').value = '';
            document.getElementById('search-results').innerHTML = '';
        }
    }
    
    // Open search with Ctrl/Cmd + K
    if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
        event.preventDefault();
        const searchModal = document.getElementById('search-modal');
        if (searchModal) {
            searchModal.classList.remove('hidden');
            document.getElementById('search-input').focus();
        }
    }
});

// Add scroll-based animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.strategy-card, .blog-card, .news-card, .rule-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });
}

// Initialize animations after a short delay
setTimeout(initScrollAnimations, 500);

// Performance optimization: Lazy load non-critical content
function initLazyLoading() {
    const lazyElements = document.querySelectorAll('[data-lazy]');
    
    const lazyObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                element.classList.add('loaded');
                lazyObserver.unobserve(element);
            }
        });
    });
    
    lazyElements.forEach(el => lazyObserver.observe(el));
}

initLazyLoading();