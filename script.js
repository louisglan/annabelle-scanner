const totalFrames = 42;
const framePath = (i) => `./assets/${i}.jpg`;

// DOM elements
const googleLogo = document.getElementById("googleLogo");
const gifFrame = document.getElementById("gifFrame");
const tbc = document.getElementById("tbc");

// --- Preload GIF frames ---
const frames = [];
for (let i = 1; i <= totalFrames; i++) {
  const img = new Image();
  img.src = framePath(i);
  frames.push(img);
}

// --- Scroll Animation ---
function animate() {
  const scrollMax = document.body.scrollHeight - innerHeight;
  const progress = window.scrollY / scrollMax; // 0 → 1

  // STEP 1: Google logo
  if (progress < 0.15) {
    const p = progress / 0.15;
    googleLogo.style.opacity = p;
    googleLogo.style.transform = `scale(${p}) translateX(0px)`;
  } else if (progress < 0.3) {
    googleLogo.style.opacity = 1;
    const p = (progress - 0.15) / 0.15;
    googleLogo.style.transform = `scale(1) translateX(${p * 400}px)`;
  } else {
    googleLogo.style.opacity = 0;
  }

  // STEP 2: GIF
  if (progress < 0.3) {
    gifFrame.style.opacity = 0;
  } else if (progress < 0.35) {
    const p = (progress - 0.3) / 0.05;
    gifFrame.style.opacity = p;
    gifFrame.style.transform = `translateY(${200 - 200 * p}px)`;
  } else {
    const p = (progress - 0.35) / 0.65;
    const frameIndex = Math.min(totalFrames - 1, Math.floor(p * totalFrames));
    gifFrame.src = frames[frameIndex].src;
    gifFrame.style.opacity = 1;
    gifFrame.style.transform = `translateY(0px)`;
  }

  // STEP 3: TBC
  // if (progress >= 0.6) {
  //   const p = (progress - 0.6) / 0.4;
  //   tbc.style.opacity = p;
  //   tbc.style.transform = `translateX(-50%) scale(${0.5 + p * 0.8})`;
  // } else {
  //   tbc.style.opacity = 0;
  // }

  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
