const totalFortuneTellerFrames = 42;
const totalChromeFrames = 6;

const fortuneTellerFramePath = (i) => `./assets/fortune-teller/${i}.png`;
const chromeFramePath = (i) => `./assets/chrome/${i}.jpg`;

// DOM elements
const googleLogo = document.getElementById("googleLogo");
const fortuneTeller = document.getElementById("fortuneTeller");
const body = document.body;

// --- Preload GIF frames ---
const fortuneTellerFrames = [];
for (let i = 1; i <= totalFortuneTellerFrames; i++) {
  const img = new Image();
  img.src = fortuneTellerFramePath(i);
  fortuneTellerFrames.push(img);
}

const chromeFrames = [];
for (let i = 1; i <= totalChromeFrames; i++) {
  const img = new Image();
  img.src = chromeFramePath(i);
  chromeFrames.push(img);
}

// --- Scroll Animation ---
function animate() {
  const scrollMax = document.body.scrollHeight - innerHeight;
  const progress = window.scrollY / scrollMax; // 0 → 1

  // STEP 1: Google logo
  if (progress < 0.15) {
    const p = progress / 0.15;
    googleLogo.style.transform = `scale(${p}) translateX(0px)`;
  } else if (progress < 0.3) {
    const p = (progress - 0.15) / 0.15;
    googleLogo.style.opacity = 1 - p;
  } else {
    googleLogo.style.opacity = 0;
  }

  // STEP 2: GIF
  if (progress < 0.3) {
    fortuneTeller.style.opacity = 0;
    const p = progress / 0.3;
    animateGif(p, totalChromeFrames, googleLogo, chromeFrames);
  } else if (progress < 0.35) {
    const p = (progress - 0.3) / 0.05;
    fortuneTeller.src = fortuneTellerFrames[0].src;
    fortuneTeller.style.opacity = p;
    fortuneTeller.style.transform = `translateY(${200 - 200 * p}px)`;
  } else if (progress <= 0.4) {
    const p = (progress - 0.35) / 0.05;
    fortuneTeller.src = fortuneTellerFrames[0].src;
    fortuneTeller.style.opacity = 1;
  } else if (progress <= 0.7) {
    const p = (progress - 0.4) / 0.3;
    animateGif(p, totalFortuneTellerFrames, fortuneTeller, fortuneTellerFrames);
    fortuneTeller.style.opacity = 1;
    fortuneTeller.style.transform = `translateY(0px)`;
  } else {
    fortuneTeller.src = fortuneTellerFrames[41].src;
    const p = (progress - 0.7) / 0.3;
    const rotateDeg = p * 45;
    const scaleX = 1 + p * 3.0; // change multiplier to taste
    const scaleY = 1 + p * 3.0;
    fortuneTeller.style.transform = `translateY(0px) rotate(${rotateDeg}deg) scaleX(${scaleX}) scaleY(${scaleY})`;
    fortuneTeller.style.filter = `blur(${p}px)`;
  }

  requestAnimationFrame(animate);
}

function animateGif(progress, totalFrames, image, frames) {
  const frameIndex = Math.min(
    totalFrames - 1,
    Math.floor(progress * totalFrames)
  );
  image.src = frames[frameIndex].src;
}

body.addEventListener("touchstart", () => {
  scan();
});

const scan = () => {
  const scanner = document.createElement("div");
  scanner.classList.add("scanner");
  scanner.style.left = `${-1000}px`;
  scanner.style.top = `${0}px`;
  body.appendChild(scanner);
  setTimeout(() => {
    body.removeChild(scanner);
  }, 300);
};

const bottomShadow = document.querySelector(".page-shadow.bottom");
window.addEventListener("scroll", () => (bottomShadow.style.opacity = 0));

requestAnimationFrame(animate);
