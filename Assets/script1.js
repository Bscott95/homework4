// Variables for header section
const $time = document.getElementById('time')
let secondsLeft = 60;
let highScoresRun = false

// Variables for start page section
const $startButton = document.querySelector('.startButton')
const $startPage = document.querySelector('.startPage')

// Variables for quiz section
const $quizContainer = document.querySelector('.quizContainer');
const $quiz = document.getElementById('quiz');
const $resultsContainer = document.getElementById('results');
const $submitButton = document.getElementById('submit');
const $slides = document.querySelectorAll('.slide')
const $previousButton = document.getElementById("previous");
const $nextButton = document.getElementById("next");
let currentSlide = 0;

// Variables for high score section
const $highScore = document.querySelector('.highScore');
const $finalScore = document.querySelector('#finalScore');
const $todoInput = $("#todo-text");
const $todoForm = $("#todo-form");
const $todoList = $("#todo-list");
const $todoCountSpan = $("#todo-count");
const $clearScores = document.querySelector('#clearScores')
const $goBack = document.querySelector('#goBack')
let todos = [];

// Array of questions and answers for quiz
const myQuestions = [
    {
        question: "Commonly used data types DO NOT include:",
        answers: {
            a: "strings",
            b: "booleans",
            c: "alerts",
            d: "numbers"
        },
        correctAnswer: "c"
    },
    {
        question: "The condition in an if / else statement is enclosed within ___",
        answers: {
            a: "quotes",
            b: "curly brackets",
            c: "parentheses",
            d: "square brackets"
        },
        correctAnswer: "b"
    },
    {
        question: "Arrays in JavaScript can be used to store ____",
        answers: {
            a: "numbers and strings",
            b: "other arrays",
            c: "booleans",
            d: "all of the above"
        },
        correctAnswer: "d"
    },
    // {
    //     question: "String values must be enclosed within ____ when being assigned to variables",
    //     answers: {
    //         a: "commas",
    //         b: "curly brackets",
    //         c: "quotes",
    //         d: "parentheses"
    //     },
    //     correctAnswer: "c"
    // },
    // {
    //     question: "A very useful tool used during development and debugging for printing content to the debugger is:",
    //     answers: {
    //         a: "JavaScript",
    //         b: "termina/bash",
    //         c: "for loops",
    //         d: "console.log"
    //     },
    //     correctAnswer: "d"
    // },
    // {
    //     question: "Who invented JavaScript?",
    //     answers: {
    //         a: "Douglas Crockford",
    //         b: "Sheryl Sandberg",
    //         c: "Brendan Eich"
    //     },
    //     correctAnswer: "c"
    // },
    // {
    //     question: "Which one of these is a JavaScript package manager?",
    //     answers: {
    //         a: "Node.js",
    //         b: "TypeScript",
    //         c: "npm"
    //     },
    //     correctAnswer: "c"
    // },
    // {
    //     question: "Which tool can you use to ensure code quality?",
    //     answers: {
    //         a: "Angular",
    //         b: "jQuery",
    //         c: "RequireJS",
    //         d: "ESLint"
    //     },
    //     correctAnswer: "d"
    // }
];

// When the start button is hit, startQuiz function runs
function startQuiz() {
    // starts timer
    setTimer() 
    // hides the start page HTML
    $startPage.setAttribute('class', 'hide');
    // Loads the quiz
    buildQuiz()
    showSlide(currentSlide);
    // scoreTracker();
}

// Timer Function that counts down from 60
function setTimer() {
    let timerInterval = setInterval(function () {
        secondsLeft--;
        $time.textContent = secondsLeft;

        if (secondsLeft === 0) {
            clearInterval(timerInterval);
            calculateResults();
            highScores();
        } else if (highScoresRun) {
            clearInterval(timerInterval);
        }

    }, 1000);
}

// function to build the quiz taking in an array of question, answers, and correct answer properties
function buildQuiz() {
    //Display the Quiz
    $quizContainer.classList.remove('hide') 
    // variable to store the HTML output of questions
    const output = [];
    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
            // variable to store the list of possible answers
            const answers = [];
            // for each available answer
            for (letter in currentQuestion.answers) {
                // add an HTML radio button
                answers.push(
                    `<label>
                        <input type="radio" name="question${questionNumber}" value="${letter}">
                        ${letter} : ${currentQuestion.answers[letter]}
                    </label>`
                );
            }
            // add this question and its answers to the output array
            output.push(
                `<div class = "slide">
                    <div class="question"> ${currentQuestion.question} </div>
                    <div class="answers"> ${answers.join('')} </div>
                </div>`
            );    
    });
    // combine output list into one string of HTML and put it on the page
    $quiz.innerHTML = output.join('');
}

// responsible for the slides one sees while shifting through the quiz. Takes in an int variable 
// of what slide we are currently on
function showSlide(n) {
    document.querySelectorAll('.slide')[currentSlide].classList.remove('active-slide');
    document.querySelectorAll('.slide')[n].classList.add('active-slide');
    currentSlide = n;
    // if we're on the first slide, don't show a previous button
    if (currentSlide === 0) {
        $previousButton.style.display = 'none';
    }
    else {
        $previousButton.style.display = 'inline-block';
    }
    // if we're on the last slide, don't show a next button
    if (currentSlide === document.querySelectorAll('.slide').length - 1) {
        $nextButton.style.display = 'none';
        $submitButton.style.display = 'inline-block';
    }
    else {
        $nextButton.style.display = 'inline-block';
        $submitButton.style.display = 'none';
    }
}

// add or decrease currentSlide count by 1
function showNextSlide() {
    showSlide(currentSlide + 1);
}

function showPreviousSlide() {
    showSlide(currentSlide - 1);
}

// tracks final score at the end of the quiz
function calculateResults() {
    // gather answer containers from our quiz
    const $answerContainers = $quiz.querySelectorAll('.answers');
    // keep track of user's answers
    let numCorrect = 0;
    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
        // find selected answer
        const answerContainer = $answerContainers[questionNumber];
        const selector = `input[name=question${questionNumber}]:checked`;
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;
        // if answer is correct
        if (userAnswer === currentQuestion.correctAnswer) {
            // add to the number of correct answers
            numCorrect++;
        }
    });
    finalScore = secondsLeft + numCorrect * 10
    return finalScore;
}

// shows results of each question at each stage
function scoreTracker() {
    // again, gather answer containers from quiz
    const $answerContainers = $quiz.querySelectorAll('.answers');
    // pull answerContainer for the slide -1 as the page shifts to the next slide
    const answerContainer = $answerContainers[currentSlide - 1];
    // var for the correct answer
    const correctAnswer = myQuestions[currentSlide - 1].correctAnswer
    // var for the checked answer
    const selector = `input[name=question${currentSlide - 1}]:checked`;
    const userAnswer = (answerContainer.querySelector(selector) || {}).value;
    finalScore = secondsLeft
    // checks if answer is correct or not and delivers a coresponding output message.
    // updates secondsLeft variable if inccorect
    if (correctAnswer === userAnswer) {
        $resultsContainer.innerHTML = `that's right! Plus 10 points to your score!`
    } else {
        secondsLeft = secondsLeft - 10;
        $resultsContainer.innerHTML = `incorrect - that will cost you 10 seconds`
    }
}

// runs the high score page at the end of the quiz
function highScores() {
    // show the HTML for the page
    $quizContainer.setAttribute('class', 'hide');
    $highScore.classList.remove('hide')
    // update the finalScore
    $finalScore.textContent = finalScore
    // set var to true as it relates to setTimer function and stopping the clock
    highScoresRun = true;
};

function renderTodos() {
    // Clear todoList element and update todoCountSpan
    $todoList.html('');
    // Render a new li for each todo
    for (let i = 0; i < todos.length; i++) {
        const todo = todos[i];
        const $li = $('<li>');
        $li.text(todo);
        $li.attr('data-index', i);
        $todoList.append($li);
    };
};

function init() {
    // check if there are todos in localStorage
    if (localStorage.getItem("todos")) {
        const savedTodos = JSON.parse(localStorage.getItem("todos"))
        todos.push(...savedTodos);
    }
    // Render todos to the DOM
    renderTodos();
};

function storeTodos() {
    // Add code here to stringify the todos array and save it to the "todos" key in localStorage
    localStorage.setItem('todos', JSON.stringify(todos));
};

// When form is submitted...
$todoForm.on("submit", function (event) {
    event.preventDefault();
    // var todoText = $todoInput.value.trim();
    const todoText = $todoInput.val().trim() + ': ' + finalScore;
    // Return from function early if submitted todoText is blank
    if (todoText === "") {
        return;
    }
    // Add new todoText to todos array, clear the input
    todos.push(todoText);
    $todoInput.val('');
    // Store updated todos in localStorage, re-render the list
    storeTodos();
    renderTodos();
});

// when go back is hit - reset necessary areas
function goBack() {
    console.log('ran Go Back')
    $startPage.classList.remove('hide')
    $highScore.setAttribute('class', 'hide');
    currentSlide = 0
    secondsLeft = 60
    highScoresRun = false
    $resultsContainer.innerHTML = '';
};

// Clear storage, the todos array, and li's on screen
function clearStorage() {
    localStorage.clear();
    $todoList.innerHTML = '';
    // why does above not work?
    document.querySelector('#todo-list').innerHTML = ''
    todos = []
}

// initializes local storage
init();

// // starts timer after start button is clicked away
$startButton.addEventListener('click', startQuiz)

// when the next button is clicked
$previousButton.addEventListener("click", showPreviousSlide);
$nextButton.addEventListener("click", showNextSlide);
$nextButton.addEventListener("click", scoreTracker);

// on submit, show results and move to high scores page
$submitButton.addEventListener('click', calculateResults);
$submitButton.addEventListener('click', highScores);

// Highscores buttons
$goBack.addEventListener('click', goBack);
$clearScores.addEventListener('click', clearStorage);