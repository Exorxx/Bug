function startCountdown(callback) {
  let blurOverlay = document.createElement("div");
  blurOverlay.id = "blur-overlay";
  blurOverlay.style.zIndex = 2;
  document.body.appendChild(blurOverlay);

  let countdown = 5;
  let countdownEl = document.createElement("div");
  countdownEl.style.position = "fixed";
  countdownEl.style.top = "50%";
  countdownEl.style.left = "50%";
  countdownEl.style.transform = "translate(-50%, -50%)";
  countdownEl.style.fontSize = "48px";
  countdownEl.style.color = "red";
  countdownEl.style.zIndex = 3;
  document.body.appendChild(countdownEl);

  let interval = setInterval(() => {
    countdownEl.textContent = countdown;
    countdown--;
    if (countdown < 0) {
      clearInterval(interval);
      countdownEl.remove();
      blurOverlay.remove();
      callback();
    }
  }, 1000);
}

let infoBtn = document.getElementById("info-btn");
infoBtn.addEventListener("click", () => {
  let popup = document.createElement("div");
  popup.id = "info-popup";
  popup.style.display = "block";
  popup.innerHTML = `
    <h2>How to Play</h2>
    <p>Click on the bugs to squash them!<br>
    You have 60 seconds to squash as many bugs as possible.</p>
    <button id="close-info">Close</button>
  `;
  document.body.appendChild(popup);
  document.getElementById("close-info").addEventListener("click", () => {
    popup.remove();
  });
});
