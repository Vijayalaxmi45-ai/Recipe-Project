document.addEventListener('DOMContentLoaded', () => {
    // Scroll Behavior
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.classList.add('shadow-sm');
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.85)';
            navbar.classList.remove('shadow-sm');
        }
    });

    // BW Mode Toggle Logic
    const toggleBtn = document.getElementById('bwToggle');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('bw-mode');
            const isDarkMode = document.body.classList.contains('bw-mode');
            localStorage.setItem('theme', isDarkMode ? 'bw' : 'light');
            toggleBtn.innerHTML = isDarkMode ? '<i class="bi bi-sun"></i> Light Mode' : '<i class="bi bi-moon"></i> Noir Mode';
        });

        // Load saved theme
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'bw') {
            document.body.classList.add('bw-mode');
            toggleBtn.innerHTML = '<i class="bi bi-sun"></i> Light Mode';
        }
    }

    // Database Simulation (Registration)
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const userData = {
                name: document.getElementById('regName').value,
                email: document.getElementById('regEmail').value,
                timestamp: new Date().toISOString()
            };

            let users = JSON.parse(localStorage.getItem('users') || '[]');
            users.push(userData);
            localStorage.setItem('users', JSON.stringify(users));

            alert('Registration data saved to LocalStorage Database! Welcome, ' + userData.name);
            registerForm.reset();
        });
    }

    // Animate UI elements on load
    const elementsToAnimate = document.querySelectorAll('.recipe-card, .section-title, .hero-content');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-up');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    elementsToAnimate.forEach(el => observer.observe(el));

    // Handle Recipe Modal if exists
    const recipeModal = document.getElementById('recipeModal');
    if (recipeModal) {
        recipeModal.addEventListener('show.bs.modal', function (event) {
            const button = event.relatedTarget;
            const title = button.getAttribute('data-bs-title');
            const description = button.getAttribute('data-bs-desc');
            const ingredients = JSON.parse(button.getAttribute('data-bs-ingredients') || '[]');
            const steps = JSON.parse(button.getAttribute('data-bs-steps') || '[]');

            const modalTitle = recipeModal.querySelector('.modal-title');
            const modalBody = recipeModal.querySelector('.modal-body');

            modalTitle.textContent = title;
            
            let htmlContent = `<p class="lead">${description}</p>
                               <div class="row mt-4">
                                <div class="col-md-5">
                                    <h5 class="fw-bold"><i class="bi bi-list-check me-2"></i>Ingredients</h5>
                                    <ul class="list-group list-group-flush mb-4 mb-md-0">
                                        ${ingredients.map(ing => `<li class="list-group-item border-0 ps-0"><i class="bi bi-circle-fill me-2" style="font-size: 0.5rem; color: #ff6b6b"></i>${ing}</li>`).join('')}
                                    </ul>
                                </div>
                                <div class="col-md-7">
                                    <h5 class="fw-bold"><i class="bi bi-journal-text me-2"></i>Instructions</h5>
                                    <ol class="ps-3">
                                        ${steps.map(step => `<li class="mb-2 ps-2">${step}</li>`).join('')}
                                    </ol>
                                </div>
                               </div>`;
            
            modalBody.innerHTML = htmlContent;
        });
    }

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
