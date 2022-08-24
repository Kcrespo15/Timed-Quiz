// Var to set questions, choices, and answers.
var questions = [

    {
        question:" Inside the HTML document, where do you place your JavaScript code?" ,
        options: ["Inside the <script> element","In the <footer> element","Inside the <link> element","Inside the <head> element"],
        answer: "Inside the <script> element"
    },

    {
        question:"What operator is used to assign a value to a declared variable?",
        options: ["Double-equal (==)","Colon (:)","Question mark (?)","Equal sign (=)"],
        answer: "Equal sign (=)" 
    },

    {
        question:" How do we declare a conditional statement in JavaScript?",
        options: ["for loop","if...else","while loop","difference...between"],
        answer: "if...else"
    },

    {
        question:"How do we stop a loop from from repeating indefinitely?",
        options: ["We have to explicitly end the loop with the break keyword.","A loop will stop executing when the condition is true.","When we have iterated through half of the condition.","A loop will stop executing when the condition is false."],
        answer: "A loop will stop executing when the condition is false" 
    },

    {
        question: "Which statement below is not true about functions in JavaScript?",
        options: ["Functions are able to be recursive.","A function must always be assigned an identifier","Functions can receive arguments that can alter the output of a function","Functions can be reused throughout your code"],
        answer: "A function must always be assigned an identifier"
     },

];

// delcaring variables with selector/create
var container = document.getElementById("container");
var startTime = document.getElementById("startBtn");
var currentTime = document.getElementById("timerClock");
var questionsSection = document.getElementById("questionsSection");
var ulEl = document.createElement("ul");


// delcaring number variables
// var timeLeft = 60;
var timer, counter = 60;
var deduction = 10;
var score = 0;
var questionIndex = 0;
var startInterval = 0;
var endTime = 0;


// function to start timer
function timerCountDown() {
    document.getElementById("counter").innerHTML = counter;
    timer = setInterval(function() {
        counter--;
        document.getElementById('counter').innerHTML = counter;
        if (counter === 0 && endTime ===0 ) {
            clearInterval(timer);
            endGame();
        }
    }, 1000 );

}

startTime.addEventListener('click', startQuiz);

// function to start quiz 

function startQuiz() {
    timerCountDown()
    questionsSection.innerHTML = ''
}
