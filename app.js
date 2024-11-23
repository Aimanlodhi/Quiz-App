document.getElementById('signUpForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Save user info in local storage
    localStorage.setItem('username', username);
    localStorage.setItem('password', password);

    alert('Account created successfully! Redirecting to login...');
    window.location.href = 'login.html';
});

document.getElementById('loginForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');

    if (username === storedUsername && password === storedPassword) {
        window.location.href = 'welcome.html';
    } else {
        alert('Invalid credentials! Please try again.');
    }
});

// Welcome Page Logic
if (document.getElementById('welcomeUser')) {
    const username = localStorage.getItem('username');
    document.getElementById('welcomeUser').textContent = username || 'User';
}

// Quiz Logic (Example of Quiz Questions)
const quizData = [
    { 
        question: "What is the capital of France?", options: ["Berlin", "Madrid", "Paris", "Rome"], answer: 2 },
    { question: "Which language runs in the browser?", options: ["Java", "Python", "JavaScript", "C++"], answer: 2 },
    // Add more questions here...
    {
        question: "Which planet is known as the Red Planet?", 
        options: ["Earth", "Mars", "Venus", "Saturn"], 
        answer: 1
    },
    {
        question: "What is the largest mammal in the world?", 
        options: ["Elephant", "Blue Whale", "Giraffe", "Shark"], 
        answer: 1
    },
    {
        question: "Who invented the telephone?", 
        options: ["Alexander Graham Bell", "Thomas Edison", "Nikola Tesla", "Albert Einstein"], 
        answer: 0
    },
    {
        question: "Which ocean is the largest?", 
        options: ["Atlantic Ocean", "Indian Ocean", "Southern Ocean", "Pacific Ocean"], 
        answer: 3
    },
    {
        question: "What is the chemical symbol for gold?", 
        options: ["Au", "Ag", "Pb", "Fe"], 
        answer: 0
    },
    {
        question: "Who painted the Mona Lisa?", 
        options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Claude Monet"], 
        answer: 2
    }
];

let currentQuestionIndex = 0;
let score = 0;

const questionEl = document.getElementById("question");
const optionsContainer = document.getElementById("options-container");
const nextButton = document.getElementById("next-btn");
const resultContainer = document.getElementById("result-container");
const quizContainer = document.getElementById("quiz-container");
const scoreEl = document.getElementById("score");
const restartButton = document.getElementById("restart-btn");



// Load a question
function loadQuestion() {
    const currentQuestion = quizData[currentQuestionIndex];
    questionEl.textContent = currentQuestion.question;

    optionsContainer.innerHTML = ""; // Clear previous options
    currentQuestion.options.forEach((option, index) => {
        const optionButton = document.createElement("button");
        optionButton.textContent = option;
        optionButton.classList.add("option-btn");
        optionButton.onclick = () => selectAnswer(index);
        optionsContainer.appendChild(optionButton);
        
    });
   
    nextButton.disabled = true; // Disable "Next" until an answer is selected
}

// Handle answer selection
function selectAnswer(selectedIndex) {
    const currentQuestion = quizData[currentQuestionIndex];

    // Highlight correct and incorrect answers
    const buttons = optionsContainer.querySelectorAll("button");
    buttons.forEach((button, index) => {
        if (index === currentQuestion.answer) {
            button.style.backgroundColor = "lightgreen"; // Correct answer
        } else if (index === selectedIndex) {
            button.style.backgroundColor = "blue"; // Selected wrong answer
        }
        button.disabled = true; // Disable all buttons after selection
    });

    // Update score if the answer is correct
    if (selectedIndex === currentQuestion.answer) {
        score++;
    }

    nextButton.disabled = false; // Enable "Next" button
    // nextButton.backgroundColor =("red")
}


   
// Show results
function showResults() {
    quizContainer.style.display = "none";
    resultContainer.style.display = "block";
    scoreEl.textContent = `${score} / ${quizData.length}`;
}

// Reset and restart the quiz
function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    quizContainer.style.display = "block";
    resultContainer.style.display = "none";
    loadQuestion();
}

// Handle "Next" button click
nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        loadQuestion();
    } else {
        showResults();
    }
});

// Handle "Restart" button click
restartButton.addEventListener("click", restartQuiz);

// Initial load
loadQuestion();












