const body = document.body;
const logo = document.getElementById('google-logo');

const maxScroll = document.body.scrollHeight - window.innerHeight;
window.addEventListener('scroll', () => {
    const s = window.scrollY / maxScroll;
    const progress = Math.min(1, Math.max(0, s));
    logo.style.animationDelay = `-${progress * 2}s`;
});

body.addEventListener('touchstart', (e) => {
    let touch = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY
    };
    scan(touch);
});

const scan = (touch) => {
    const scanner = document.createElement('div');
    scanner.classList.add('scanner');
    scanner.style.left = `${-1000}px`;
    scanner.style.top = `${0}px`;
    body.appendChild(scanner);
    setTimeout(() => {
        body.removeChild(scanner);
    }, 300);
}