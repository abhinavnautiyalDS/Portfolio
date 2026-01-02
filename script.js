// Intro tabs
const tabs = document.querySelectorAll('.tab');
const contents = document.querySelectorAll('.intro-content');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        contents.forEach(c => c.classList.remove('active'));

        tab.classList.add('active');
        document
            .getElementById(tab.dataset.tab + '-content')
            .classList.add('active');
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
            p.style.display =
                category === 'all' || p.dataset.category === category
                    ? 'block'
                    : 'none';
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

window.onclick = e => {
    if (e.target === modal) closeModal();
};
