const body = document.body;
const logo = document.getElementById('google-logo');

const maxScroll = document.body.scrollHeight - window.innerHeight;
window.addEventListener('scroll', () => {
    const s = window.scrollY / maxScroll;
    const progress = Math.min(1, Math.max(0, s));
    logo.style.animationDelay = `-${progress * 2}s`;
});
