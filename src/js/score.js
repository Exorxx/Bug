let score = 0;
let highScore = localStorage.getItem("highScore") || 0;
document.getElementById("high-score").textContent = highScore;

function updateScore() {
  document.getElementById("score").textContent = score;
  if (score > highScore) {
    highScore = score;
    localStorage.setItem("highScore", highScore);
    document.getElementById("high-score").textContent = highScore;
  }
}
