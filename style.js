// Set form subject from pricing buttons
function setFormSubject(subjectText) {
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    if(subjectInput) subjectInput.value = subjectText;
    if(messageInput) messageInput.value = "Hi, I'm interested in: " + subjectText + ".\n\n";
}

// FAQ Toggle
function toggleFaq(element) {
    const content = element.querySelector('.hidden, .block:not(.flex)');
    const icon = element.querySelector('i');
    
    if(content.classList.contains('hidden')) {
        content.classList.remove('hidden');
        content.classList.add('block');
        icon.classList.remove('fa-plus');
        icon.classList.add('fa-minus');
        icon.style.transform = 'rotate(180deg)';
    } else {
        content.classList.add('hidden');
        content.classList.remove('block');
        icon.classList.add('fa-plus');
        icon.classList.remove('fa-minus');
        icon.style.transform = 'rotate(0deg)';
    }
}

// Formspree Form Handling
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const formStatus = document.getElementById('formStatus');
    
    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Show loading state
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Sending...';
            submitBtn.disabled = true;
            submitBtn.classList.add('opacity-50');
            
            if (formStatus) {
                formStatus.classList.add('hidden');
            }
            
            try {
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: new FormData(form),
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    // Success
                    form.reset();
                    submitBtn.innerHTML = '<i class="fas fa-check mr-2"></i> Sent!';
                    submitBtn.classList.remove('bg-black');
                    submitBtn.classList.add('bg-green-600');
                    
                    if (formStatus) {
                        formStatus.textContent = 'Message sent successfully!';
                        formStatus.classList.remove('hidden');
                        formStatus.classList.add('text-green-600');
                    }
                    
                    // Reset button after 3 seconds
                    setTimeout(() => {
                        submitBtn.innerHTML = originalBtnText;
                        submitBtn.classList.remove('bg-green-600');
                        submitBtn.classList.add('bg-black');
                        submitBtn.disabled = false;
                        submitBtn.classList.remove('opacity-50');
                    }, 3000);
                } else {
                    throw new Error('Form submission failed');
                }
            } catch (error) {
                // Error
                submitBtn.innerHTML = '<i class="fas fa-exclamation-triangle mr-2"></i> Error';
                submitBtn.classList.remove('bg-black');
                submitBtn.classList.add('bg-red-600');
                
                if (formStatus) {
                    formStatus.textContent = 'Oops! Something went wrong. Please try again.';
                    formStatus.classList.remove('hidden');
                    formStatus.classList.add('text-red-600');
                }
                
                setTimeout(() => {
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.classList.remove('bg-red-600');
                    submitBtn.classList.add('bg-black');
                    submitBtn.disabled = false;
                    submitBtn.classList.remove('opacity-50');
                }, 3000);
            }
        });
    }
    
    // Mobile Menu functionality
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const closeMenuBtn = document.getElementById('closeMenu');
    const mobileMenu = document.getElementById('mobileMenu');

    if (mobileMenuBtn && closeMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.remove('translate-x-full');
        });

        closeMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.add('translate-x-full');
        });

        // Close menu when a link is clicked
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('translate-x-full');
            });
        });
    }

    // Back to top button visibility
    const backToTopBtn = document.getElementById('backToTop');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            backToTopBtn.classList.remove('opacity-0', 'pointer-events-none');
        } else {
            backToTopBtn.classList.add('opacity-0', 'pointer-events-none');
        }
    });

    // Scroll to top
    if(backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Web Dev Section Horizontal Scroll Buttons - Show one by one
    const scrollLeft = document.getElementById('scrollLeft');
    const scrollRight = document.getElementById('scrollRight');
    const webdevScroll = document.getElementById('webdevScroll');

    if (scrollLeft && scrollRight && webdevScroll) {
        // Get the width of one card plus gap for scrolling one at a time
        const getScrollAmount = () => {
            const card = webdevScroll.querySelector('.project-card');
            if (card) {
                return card.offsetWidth + 16; // card width + gap
            }
            return 400; // default fallback
        };

        scrollLeft.addEventListener('click', () => {
            webdevScroll.scrollBy({
                left: -getScrollAmount(),
                behavior: 'smooth'
            });
        });

        scrollRight.addEventListener('click', () => {
            webdevScroll.scrollBy({
                left: getScrollAmount(),
                behavior: 'smooth'
            });
        });
    }
    
    // Projects Carousel Functionality
    const carouselTrack = document.querySelector('.carousel-track');
    const carouselSlides = document.querySelectorAll('.carousel-slide');
    const carouselPrev = document.querySelector('.carousel-prev');
    const carouselNext = document.querySelector('.carousel-next');
    const carouselDots = document.querySelectorAll('.carousel-dot');
    
    let currentSlide = 0;
    const totalSlides = carouselSlides.length;
    
    if (carouselTrack && carouselSlides.length > 0) {
        // Function to go to specific slide
        const goToSlide = (index) => {
            if (index < 0) {
                index = totalSlides - 1;
            } else if (index >= totalSlides) {
                index = 0;
            }
            
            currentSlide = index;
            const translateX = -currentSlide * 100;
            carouselTrack.style.transform = `translateX(${translateX}%)`;
            
            // Update dots
            carouselDots.forEach((dot, i) => {
                if (i === currentSlide) {
                    dot.classList.remove('bg-white');
                    dot.classList.add('bg-black');
                } else {
                    dot.classList.remove('bg-black');
                    dot.classList.add('bg-white');
                }
            });
        };
        
        // Previous button click
        if (carouselPrev) {
            carouselPrev.addEventListener('click', () => {
                goToSlide(currentSlide - 1);
            });
        }
        
        // Next button click
        if (carouselNext) {
            carouselNext.addEventListener('click', () => {
                goToSlide(currentSlide + 1);
            });
        }
        
        // Dot navigation
        carouselDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                goToSlide(index);
            });
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            const projectsSection = document.getElementById('projects');
            if (projectsSection) {
                const rect = projectsSection.getBoundingClientRect();
                const isVisible = rect.top <= window.innerHeight && rect.bottom >= 0;
                
                if (isVisible) {
                    if (e.key === 'ArrowLeft') {
                        goToSlide(currentSlide - 1);
                    } else if (e.key === 'ArrowRight') {
                        goToSlide(currentSlide + 1);
                    }
                }
            }
        });
        
        // Touch/swipe support for mobile
        let touchStartX = 0;
        let touchEndX = 0;
        
        const carouselContainer = document.querySelector('.carousel-container');
        if (carouselContainer) {
            carouselContainer.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
            }, { passive: true });
            
            carouselContainer.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
            }, { passive: true });
        }
        
        const handleSwipe = () => {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;
            
            if (diff > swipeThreshold) {
                // Swipe left - next slide
                goToSlide(currentSlide + 1);
            } else if (diff < -swipeThreshold) {
                // Swipe right - previous slide
                goToSlide(currentSlide - 1);
            }
        };
        
        // Auto-advance slides (optional - disabled by default)
        // let autoSlideInterval = setInterval(() => {
        //     goToSlide(currentSlide + 1);
        // }, 5000);
        
        // Pause auto-slide on hover
        // carouselContainer.addEventListener('mouseenter', () => {
        //     clearInterval(autoSlideInterval);
        // });
        
        // carouselContainer.addEventListener('mouseleave', () => {
        //     autoSlideInterval = setInterval(() => {
        //         goToSlide(currentSlide + 1);
        //     }, 5000);
        // });
    }
});

