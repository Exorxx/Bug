let score = 0;
let highScore = localStorage.getItem('highScore') || 0;
document.getElementById('high-score').textContent = highScore;

let timedMode = false;
let timeLeft = 60;
let timerInterval = null;
let spawnInterval = null;
let baseSpawnTime = 500;

function updateScore() {
  document.getElementById('score').textContent = score;
  if (score > highScore) {
    highScore = score;
    localStorage.setItem('highScore', highScore);
    document.getElementById('high-score').textContent = highScore;
  }
}

function spawnBug() {
  const bug = document.createElement('img');
  bug.src = '/bugs/bug1.svg';
  bug.classList.add('bug');

  let x = Math.random() * window.innerWidth;
  let y = Math.random() * window.innerHeight;

  bug.style.left = x + 'px';
  bug.style.top = y + 'px';

  document.getElementById('bug-container').appendChild(bug);

  let speed = 1 + Math.random() * 1.5;
  let angle = Math.random() * Math.PI * 2;
  let wiggleTime = 0;

  function updateRotation() {
    const wiggle = Math.sin(wiggleTime) * 0.2;
    bug.style.transform = `rotate(${angle + Math.PI / 2 + wiggle}rad)`;
  }

  bug.addEventListener('click', () => {
    bug.remove();
    score++;
    updateScore();
  });

  function moveBug() {
    wiggleTime += 0.2;
    if (Math.random() < 0.01) {
      angle += (Math.random() - 0.5) * Math.PI / 2;
    }
    x += Math.cos(angle) * speed;
    y += Math.sin(angle) * speed;

    bug.style.left = x + 'px';
    bug.style.top = y + 'px';
    updateRotation();

    if (x < -50 || y < -50 || x > window.innerWidth + 50 || y > window.innerHeight + 50) {
      bug.remove();
      return;
    }

    requestAnimationFrame(moveBug);
  }

  moveBug();
}

function clearBugs() {
  document.querySelectorAll('.bug').forEach(bug => bug.remove());
}

// Button & score references
const playBtn = document.getElementById('play-btn');
const infoBtn = document.getElementById('info-btn');
const scoreContainer = document.getElementById('score-container');

function showButtons() {
  playBtn.style.display = 'block';
  infoBtn.style.display = 'block';
  scoreContainer.style.display = 'none';
}

function hideButtons() {
  playBtn.style.display = 'none';
  infoBtn.style.display = 'none';
}

function startCountdown(callback) {
  const blurOverlay = document.createElement('div');
  blurOverlay.id = 'blur-overlay';
  document.body.appendChild(blurOverlay);

  let countdown = 5;
  const countdownEl = document.createElement('div');
  countdownEl.style.position = 'fixed';
  countdownEl.style.top = '50%';
  countdownEl.style.left = '50%';
  countdownEl.style.transform = 'translate(-50%, -50%)';
  countdownEl.style.fontSize = '48px';
  countdownEl.style.color = 'red';
  countdownEl.style.zIndex = '10000';
  document.body.appendChild(countdownEl);

  const countdownInterval = setInterval(() => {
    countdownEl.textContent = countdown;
    countdown--;
    if (countdown < 0) {
      clearInterval(countdownInterval);
      countdownEl.remove();
      blurOverlay.remove(); // Remove blur
      callback();
    }
  }, 1000);
}


function startGame() {
  hideButtons();
  score = 0;
  updateScore();
  scoreContainer.style.display = 'block';
  startCountdown(() => {
    startTimedMode();
  });
}

playBtn.addEventListener('click', startGame);

infoBtn.addEventListener('click', () => {
  console.log("infoBtn pressed")
  const popup = document.createElement('div');
  popup.id = 'info-popup';
  popup.style.position = 'fixed';
  popup.style.top = '50%';
  popup.style.left = '50%';
  popup.style.transform = 'translate(-50%, -50%)';
  popup.style.background = '#fff';
  popup.style.padding = '20px';
  popup.style.border = '2px solid #000';
  popup.style.zIndex = '10001';
  popup.style.display = 'block'
  popup.innerHTML = `
    <h2>How to Play</h2>
    <p>Click on the bugs to squash them!<br>
    You have 60 seconds to squash as many bugs as possible.</p>
    <button id="close-info">Close</button>
  `;
  document.body.appendChild(popup);
  document.getElementById('close-info').addEventListener('click', () => {
    popup.remove();
  });
});

function startTimedMode() {
  timedMode = true;
  score = 0;
  updateScore();
  timeLeft = 60;
  document.getElementById('time-left').textContent = timeLeft;
  document.getElementById('timer').style.display = 'block';

  clearBugs();
  for (let i = 0; i < 5; i++) spawnBug();

  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    timeLeft--;
    document.getElementById('time-left').textContent = timeLeft;

    let difficultyFactor = Math.max(100, baseSpawnTime - (60 - timeLeft) * 6);
    clearInterval(spawnInterval);
    spawnInterval = setInterval(spawnBug, difficultyFactor);

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      clearInterval(spawnInterval);
      alert(`Time's up! You squashed ${score} bugs!`);
      showButtons();
    }
  }, 1000);
}

// Idle mode (no timer)
spawnInterval = setInterval(spawnBug, baseSpawnTime);
for (let i = 0; i < 5; i++) spawnBug();
