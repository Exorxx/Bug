let gameActive = false;
let timerInterval = null;
let spawnInterval = null;
let timeLeft = 60;
let baseSpawnTime = 500;

let playBtn = document.getElementById("play-btn");

playBtn.addEventListener("click", startGame);

function startGame() {
  gameActive = true;
  document.querySelector(".gamename").style.display = "none";
  playBtn.style.display = "none";
  infoBtn.style.display = "none";
  document.getElementById("score-container").style.display = "block";

  clearBugs();

  startCountdown(() => startTimedMode());
}

function startTimedMode() {
  score = 0;
  updateScore();
  timeLeft = 60;
  document.getElementById("time-left").textContent = timeLeft;
  document.getElementById("timer").style.display = "block";

  for (let i = 0; i < 5; i++) spawnBug(false);

  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    timeLeft--;
    document.getElementById("time-left").textContent = timeLeft;

    let difficultyFactor = Math.max(100, baseSpawnTime - (60 - timeLeft) * 6);
    clearInterval(spawnInterval);
    spawnInterval = setInterval(() => spawnBug(false), difficultyFactor);

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      clearInterval(spawnInterval);
      alert(`Time's up! You squashed ${score} bugs!`);
      endGame();
    }
  }, 1000);
}

function endGame() {
  window.gameActive = false;
  document.querySelector(".gamename").style.display = "block";
  playBtn.style.display = "block";
  infoBtn.style.display = "block";
  document.getElementById("timer").style.display = "none";
  clearBugs();
}
