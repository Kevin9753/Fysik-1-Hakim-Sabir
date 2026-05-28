// Enkel quiz-logik för Övningar (10 flervalsfrågor)

// Frågor och svar lagras i en lista med objekt
const quiz = [
  {
    q: "Vad kallas den hastighet ett föremål har vid ett givet ögonblick?",
    a: ["Medelhastighet", "Acceleration", "Momentanhastighet", "Fart"],
    correct: 2,
  },
  {
    q: "Vilken formel beskriver Newtons andra lag?",
    a: ["F = mv", "F = ma", "E = mc²", "p = mv"],
    correct: 1,
  },
  {
    q: "Vad är en våglängd?",
    a: [
      "Tiden för en svängning",
      "Avstånd mellan två toppar",
      "Maximal amplitud",
      "Frekvens",
    ],
    correct: 1,
  },
  { q: "Vilken enhet mäts frekvens i?", a: ["m", "s", "Hz", "N"], correct: 2 },
  {
    q: "Vad beskriver kinetisk energi?",
    a: ["Lägesenergi", "Rörelseenergi", "Värmeenergi", "Elektrisk energi"],
    correct: 1,
  },
  {
    q: "Vad är gravitationsacceleration (ca) nära jordytan?",
    a: ["9.8 m/s²", "1.6 m/s²", "0 m/s²", "3.7 m/s²"],
    correct: 0,
  },
  {
    q: "Vilken storhet är en vektor?",
    a: ["Energi", "Tid", "Hastighet", "Temperatur"],
    correct: 2,
  },
  {
    q: "Vad händer med hastigheten vid konstant acceleration?",
    a: [
      "Ökar linjärt med tiden",
      "Blir konstant",
      "Minskar linjärt med tiden",
      "Oscillerar",
    ],
    correct: 0,
  },
  {
    q: "Vilken enhet har kraft?",
    a: ["Watt", "Newton", "Joule", "Pascal"],
    correct: 1,
  },
  {
    q: "Vilket påstående är sant för en ideal fjäder (Hookes lag)?",
    a: ["F = kx", "E = 1/2 k x²", "a och b", "Båda A och B"],
    correct: 3,
  },
];

// Håller koll på aktuell fråga och poäng
let current = 0;
let score = 0;

// Hämta element från HTML
const qBox = document.getElementById("question-box");
const answersList = document.getElementById("answers-list");
const nextBtn = document.getElementById("next-btn");
const resultDiv = document.getElementById("result");

function renderQuestion() {
  // Visa fråga och svarsalternativ
  const item = quiz[current];
  qBox.textContent = `${current + 1}. ${item.q}`;
  answersList.innerHTML = "";
  item.a.forEach((ans, i) => {
    const li = document.createElement("li");
    li.className = "answer-item";
    li.innerHTML = `<label><input type="radio" name="answer" value="${i}"> ${ans}</label>`;
    answersList.appendChild(li);
  });
  // Nästa-knappen är avstängd tills användaren väljer ett svar
  nextBtn.disabled = true;
}

// Lyssna efter val av svar
answersList?.addEventListener("change", (e) => {
  if (e.target.name === "answer") nextBtn.disabled = false;
});

// Nästa-knapp tryckt
nextBtn.addEventListener("click", () => {
  const selected = document.querySelector('input[name="answer"]:checked');
  if (!selected) return;
  const val = parseInt(selected.value, 10);
  if (val === quiz[current].correct) score++;
  current++;
  if (current < quiz.length) {
    renderQuestion();
  } else {
    showResult();
  }
});

function showResult() {
  // Visa resultatet när quizet är klart
  qBox.style.display = "none";
  answersList.style.display = "none";
  nextBtn.style.display = "none";
  resultDiv.style.display = "block";
  resultDiv.innerHTML = `<h3>Resultat</h3><p>Du fick ${score} av ${quiz.length} rätt.</p><p><a class="btn" href="index.html">Tillbaka</a></p>`;
}

// Initiera quizet om alla element finns
if (qBox && answersList && nextBtn) renderQuestion();

function calculate() {
  let input = document.getElementById("calc-input").value;
  escapeHtml(input);
  try {
    let result = eval(input);
    document.getElementById("calc-result").innerText = input + " = " + result;
  } catch {
    document.getElementById("calc-result").innerText = "Ogiltigt uttryck";
  }
}

function escapeHtml(text) {
  //det här är koden som gör att en XSS attack inte är möjlig. Den byter ut alla tecken som kan leda till en XSS attack mot bokstäver som förstör den attacken
  return String(text)
    .replace(/&/g, "&amp;") // '&' byts ut till '&amp' osv. för varje rad
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
