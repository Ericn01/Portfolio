// Simple page navigation
const showPage = (pageId) => {
    // Hide all pages
    document.querySelectorAll('.page-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Show selected page
    document.getElementById(pageId).classList.add('active');
    
    // Update navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    document.querySelector(`[data-page="${pageId}"]`).classList.add('active');
}

/**
 * This function is responsible for initializing event listeners. 
 */
const initEventListeners = () => {
    // Projects page click handler
    const projectsList = document.querySelectorAll('.project-card.is-project');
    if (projectsList) projectsList.forEach(card => {
        card.addEventListener('click', (e) => {
            e.preventDefault(); 
            // Retrieve the project name / id 
            const projectName = card.dataset.name;
            // Navigate to project showcase page
            window.location.href = `projectShowcase.html?project=${encodeURIComponent(projectName)}`;
        });
    });

    // CTA on main page click handler 
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) ctaButton.addEventListener('click', (e) => {
        e.preventDefault();
        showPage('projects');
    });


    // Add click listeners to navigation
    const navLinks = document.querySelectorAll('.nav-link');
    if (navLinks) navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const pageId = link.dataset.page;
            showPage(pageId);
        });
    });

    // Add subtle parallax effect to background grid
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('body::before');
        if (parallax) {
            parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
}

initEventListeners();