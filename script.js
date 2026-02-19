let attempts = 0;

const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const question = document.getElementById("question");

const texts = [
  "Did you miss the YES button? 🤔",
  "Pretty sure that was meant to be YES 😉",
  "Oops! Wrong choice detected 🚨",
  "Be a hero. Click YES 🦸‍♂️",
  "Your mouse seems confused 🖱️",
  "Try again... but correctly 😌",
  "Permanent sounds nice, right? 😎",
  "This is a YES-only zone 🚧",
  
  
];

function moveNoButton() {
  attempts++;

  // Update question text
  question.textContent =
    texts[Math.min(attempts - 1, texts.length - 1)];

  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  const btnRect = noBtn.getBoundingClientRect();
  const questionRect = question.getBoundingClientRect();
  const yesRect = yesBtn.getBoundingClientRect();

  let x, y;
  let safe = false;

  // Try multiple positions until one doesn't overlap important areas
  for (let i = 0; i < 20 && !safe; i++) {
    x = Math.random() * (viewportWidth - btnRect.width);
    y = Math.random() * (viewportHeight - btnRect.height);

    const futureRect = {
      left: x,
      right: x + btnRect.width,
      top: y,
      bottom: y + btnRect.height
    };

    const overlapsQuestion =
      futureRect.bottom > questionRect.top &&
      futureRect.top < questionRect.bottom &&
      futureRect.right > questionRect.left &&
      futureRect.left < questionRect.right;

    const overlapsYes =
      futureRect.bottom > yesRect.top &&
      futureRect.top < yesRect.bottom &&
      futureRect.right > yesRect.left &&
      futureRect.left < yesRect.right;

    if (!overlapsQuestion && !overlapsYes) safe = true;
  }

  noBtn.style.position = "fixed";
  noBtn.style.left = x + "px";
  noBtn.style.top = y + "px";

  // Shrink NO
  const noScale = Math.max(0.35, 1 - attempts * 0.12);
  noBtn.style.transform = `scale(${noScale})`;

  // Grow YES
  const yesScale = 1 + attempts * 0.15;
  yesBtn.style.transform = `scale(${yesScale})`;
  yesBtn.style.zIndex = "10";

  // Remove NO after many attempts
  if (attempts >= texts.length) {
    noBtn.style.display = "none";
    question.textContent = "Okay okay 😌 Just press YES 😌";
  }
}

// Desktop hover
noBtn.addEventListener("mouseover", moveNoButton);

// Mobile touch
noBtn.addEventListener("touchstart", (e) => {
  e.preventDefault();
  moveNoButton();
});

// YES click
yesBtn.addEventListener("click", () => {
  document.body.innerHTML = `
    <div style="
      height:100vh;
      display:flex;
      flex-direction:column;
      align-items:center;
      justify-content:center;
      font-family:Segoe UI, sans-serif;
      
      color:black;
      text-align:center;
    ">
      <h1 style="font-size:48px;margin-bottom:10px;">🎉 YAYYYY 🎉</h1>
      <p style="font-size:22px;margin-bottom:25px;">
        You're officially my favorite person 😎
      </p>
      <img src="/another-one-dj-khaled.gif"
           style="max-width:320px;border-radius:15px;">
    </div>
  `;
});

console.log("Max attempts:", texts.length);
