document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.tag-btn');
    const terms = document.querySelectorAll('.glossary-term');
    const counter = document.getElementById('glossary-counter');
    
    if (!buttons.length || !terms.length) {
        return; // Exit if elements not found
    }
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const selectedTag = this.getAttribute('data-tag');
            
            // Update active button
            buttons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter terms
            let visibleCount = 0;
            terms.forEach(term => {
                if (selectedTag === 'all') {
                    term.style.display = 'block';
                    visibleCount++;
                } else {
                    const termTags = term.getAttribute('data-tags').split(',');
                    if (termTags.includes(selectedTag)) {
                        term.style.display = 'block';
                        visibleCount++;
                    } else {
                        term.style.display = 'none';
                    }
                }
            });
            
            // Update counter
            if (counter) {
                if (selectedTag === 'all') {
                    counter.textContent = `Showing all ${visibleCount} terms`;
                } else {
                    counter.textContent = `Showing ${visibleCount} of ${terms.length} terms`;
                }
            }
        });
    });
    
    // Set "All" as active by default and show initial count
    if (buttons.length > 0) {
        buttons[0].classList.add('active');
        if (counter) {
            counter.textContent = `Showing all ${terms.length} terms`;
        }
    }
});
