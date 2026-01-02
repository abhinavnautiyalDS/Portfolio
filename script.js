// Intro tabs
document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.intro-content').forEach(c => c.classList.remove('active'));

        tab.classList.add('active');
        document.getElementById(tab.dataset.tab + '-content').classList.add('active');
    });
});


// Project filters
document.querySelectorAll('.filter').forEach(filter => {
    filter.addEventListener('click', () => {
        document.querySelectorAll('.filter').forEach(f => f.classList.remove('active'));
        filter.classList.add('active');

        const category = filter.dataset.category;
        document.querySelectorAll('.project').forEach(p => {
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
