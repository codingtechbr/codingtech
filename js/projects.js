// Projects page functionality

document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    // Filter functionality
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    // Add animation
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Add hover effects to project cards
    projectCards.forEach(card => {
        const projectImage = card.querySelector('.project-image');
        
        card.addEventListener('mouseenter', () => {
            projectImage.style.transform = 'scale(1.05)';
        });
        
        card.addEventListener('mouseleave', () => {
            projectImage.style.transform = 'scale(1)';
        });
    });
    
    // Initialize all cards as visible
    projectCards.forEach(card => {
        card.style.transition = 'all 0.3s ease';
    });
});