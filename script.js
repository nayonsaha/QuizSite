const questions = [
    {
        question: "What is the capital of France?",
        answers: ["Berlin", "Madrid", "Paris", "Rome"],
        correct: 2
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: ["Earth", "Mars", "Jupiter", "Saturn"],
        correct: 1
    },
    {
        question: "What is the largest mammal in the world?",
        answers: ["Elephant", "Blue Whale", "Giraffe", "Great White Shark"],
        correct: 1
    },
    {
        question: "Who wrote 'Romeo and Juliet'?",
        answers: ["Charles Dickens", "Mark Twain", "William Shakespeare", "Jane Austen"],
        correct: 2
    }
    // Add more questions as needed
];

let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 10;

const questionElement = document.getElementById('question');
const answersElement = document.getElementById('answers');
const nextButton = document.getElementById('next');
const scoreElement = document.getElementById('score-value');
const resultContainer = document.getElementById('result');
const correctAnswersElement = document.getElementById('correct-answers');
const timeElement = document.getElementById('time');
const timeBar = document.getElementById('time-bar');
const quizContainer = document.getElementById('quiz');

function loadQuestion() {
    clearTimeout(timer);
    timeLeft = 10;
    timeElement.innerText = timeLeft;
    timeBar.style.animation = 'none'; // Reset animation
    timeBar.offsetHeight; // Trigger reflow
    timeBar.style.animation = 'fill 10s linear forwards'; // Restart animation

    const currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;
    answersElement.innerHTML = '';

    currentQuestion.answers.forEach((answer, index) => {
        const option = document.createElement('div');
        option.innerText = answer;
        option.className = 'option';
        option.addEventListener('click', () => selectAnswer(index));
        answersElement.appendChild(option);
    });

    startTimer();
}

function selectAnswer(index) {
    clearTimeout(timer);
    const correctIndex = questions[currentQuestionIndex].correct;

    if (index === correctIndex) {
        score++;
    }

    markAnswer(index, correctIndex);
    nextButton.classList.remove('hidden');
}

function markAnswer(selectedIndex, correctIndex) {
    const options = answersElement.querySelectorAll('.option');

    options.forEach((option, index) => {
        if (index === selectedIndex) {
            option.classList.add(selectedIndex === correctIndex ? 'correct' : 'incorrect');
        }
    });
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        timeElement.innerText = timeLeft;

        if (timeLeft <= 0) {
            clearTimeout(timer);
            markAnswer(-1, questions[currentQuestionIndex].correct); // Mark as incorrect
            nextButton.classList.remove('hidden');

            // Automatically move to the next question when time runs out
            setTimeout(() => {
                nextButton.click();
            }, 1000); // Wait 1 second after marking the answer
        }
    }, 1000);
}


function showResult() {
    quizContainer.classList.add('hidden');
    resultContainer.classList.remove('hidden');
    scoreElement.innerText = `${score} out of ${questions.length}`;

    questions.forEach((question, index) => {
        const li = document.createElement('li');
        li.innerText = `Q${index + 1}: ${question.answers[question.correct]}`;
        correctAnswersElement.appendChild(li);
    });

    // Remove the alert and just display the score
    const resultMessage = document.createElement('h3');
    resultMessage.innerText = `Congratulations! You scored ${score} out of ${questions.length}!`;
    resultContainer.appendChild(resultMessage);
}


document.getElementById('restart').addEventListener('click', () => {
    currentQuestionIndex = 0;
    score = 0;
    correctAnswersElement.innerHTML = '';
    resultContainer.classList.add('hidden');
    quizContainer.classList.remove('hidden');
    loadQuestion();
});

nextButton.addEventListener('click', () => {
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showResult();
    }
});

loadQuestion();
