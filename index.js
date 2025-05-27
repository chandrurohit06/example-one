const questions = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "London", "Paris", "Madrid"],
    answer: "Paris"
  },
  {
    question: "Which language runs in a browser?",
    options: ["Java", "C", "Python", "JavaScript"],
    answer: "JavaScript"
  },
  {
    question: "What does CSS stand for?",
    options: [
      "Central Style Sheet",
      "Cascading Style Sheets",
      "Cascading Simple Sheets",
      "Cars SUVs Sailboats"
    ],
    answer: "Cascading Style Sheets"
  }
];

let currentIndex = 0;
let score = 0;
let timer;
let timeLeft = 30;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const timeEl = document.getElementById("time");
const nextBtn = document.getElementById("nextBtn");
const quizBox = document.getElementById("quiz-box");
const resultBox = document.getElementById("result-box");
const scoreEl = document.getElementById("score");
const leaderboardBox = document.getElementById("leaderboard");
const leaderboardList = document.getElementById("leaderboardList");

function startQuiz() {
  currentIndex = 0;
  score = 0;
  timeLeft = 30;
  quizBox.classList.remove("hidden");
  resultBox.classList.add("hidden");
  leaderboardBox.classList.add("hidden");
  startTimer();
  loadQuestion();
}

function loadQuestion() {
  const q = questions[currentIndex];
  questionEl.textContent = q.question;
  optionsEl.innerHTML = "";

  q.options.forEach(opt => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.onclick = () => checkAnswer(opt);
    optionsEl.appendChild(btn);
  });
}

function checkAnswer(selected) {
  const correct = questions[currentIndex].answer;
  if (selected === correct) {
    score++;
  }
  nextBtn.disabled = false;
}

function nextQuestion() {
  currentIndex++;
  nextBtn.disabled = true;
  if (currentIndex < questions.length) {
    loadQuestion();
  } else {
    endQuiz();
  }
}

function startTimer() {
  clearInterval(timer);
  timeLeft = 30;
  timeEl.textContent = timeLeft;
  timer = setInterval(() => {
    timeLeft--;
    timeEl.textContent = timeLeft;
    if (timeLeft === 0) {
      clearInterval(timer);
      endQuiz();
    }
  }, 1000);
}

function endQuiz() {
  clearInterval(timer);
  quizBox.classList.add("hidden");
  resultBox.classList.remove("hidden");
  scoreEl.textContent = `${score} / ${questions.length}`;
}

function saveScore() {
  const name = document.getElementById("username").value.trim();
  if (!name) {
    alert("Please enter a name");
    return;
  }

  const leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
  leaderboard.push({ name, score });
  leaderboard.sort((a, b) => b.score - a.score);
  localStorage.setItem("leaderboard", JSON.stringify(leaderboard));

  showLeaderboard();
}

function showLeaderboard() {
  resultBox.classList.add("hidden");
  leaderboardBox.classList.remove("hidden");
  leaderboardList.innerHTML = "";

  const leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
  leaderboard.forEach(entry => {
    const li = document.createElement("li");
    li.textContent = `${entry.name} - ${entry.score}`;
    leaderboardList.appendChild(li);
  });
}

function restartQuiz() {
  startQuiz();
}

startQuiz();
