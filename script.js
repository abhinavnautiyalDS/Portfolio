// Introduction tabs
const tabs = document.querySelectorAll('.tab');
const contents = document.querySelectorAll('.intro-content');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        contents.forEach(c => {
            c.classList.remove('active');
            c.style.display = 'none';
        });
        
        const target = document.getElementById(tab.dataset.tab + '-content');
        target.classList.add('active');
        target.style.display = 'block';
    });
});

// Project filters
const filters = document.querySelectorAll('.filter');
const projects = document.querySelectorAll('.project');

filters.forEach(filter => {
    filter.addEventListener('click', () => {
        filters.forEach(f => f.classList.remove('active'));
        filter.classList.add('active');
        
        const category = filter.dataset.category;
        projects.forEach(p => {
            if (category === 'all' || p.dataset.category === category) {
                p.style.display = 'block';
            } else {
                p.style.display = 'none';
            }
        });
    });
});

// Modal
const modal = document.getElementById('cert-modal');

function openModal() {
    modal.style.display = 'block';
}

function closeModal() {
    modal.style.display = 'none';
}

window.onclick = function(event) {
    if (event.target == modal) {
        closeModal();
    }
}
