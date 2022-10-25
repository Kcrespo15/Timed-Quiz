// Var to set questions, choices, and answers.
var questions = [

    {
        question:" Inside the HTML document, where do you place your JavaScript code?" ,
        options: ["a. js", "b. javascript", "c. scripting", "d. script"],
        answer: "Inside the <script> element"
    },

    {
        question:"What operator is used to assign a value to a declared variable?",
        options: ["Double-equal (==)","Colon (:)","Question mark (?)","Equal sign (=)"],
        answer: "Equal sign (=)" 
    },

    {
        question:" How do we declare a conditional statement in JavaScript?",
        options: ["a. for loop","if...else","b. while loop","difference...between"],
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

var questionsSection = document.querySelector("#questionsSection");
var currentTime = document.querySelector("#timerClock");
var startTime = document.querySelector("#startBtn");

// delcaring number variables
var score = 0;
var questionIndex = 0;
var secondsLeft = 75;
var holdInterval = 0;
var penalty = 10;
var ulCreate = document.createElement("ul");


startTime.addEventListener("click", function () {
    // We are checking zero because its originally set to zero
    if (holdInterval === 0) {
        holdInterval = setInterval(function () {
            secondsLeft--;
            currentTime.textContent = "Time: " + secondsLeft;

            if (secondsLeft <= 0) {
                clearInterval(holdInterval);
                allDone();
                currentTime.textContent = "Time's up!";
            }
        }, 1000);
    }
    render(questionIndex);
});

// Renders questions and choices to page: 
function render(questionIndex) {
    // Clears existing data 
    questionsSection.innerHTML = "";
    ulCreate.innerHTML = "";
    // For loops to loop through all info in array
    for (var i = 0; i < questions.length; i++) {
        // Appends question title only
        var userQuestion = questions[questionIndex].question;
        var userChoices = questions[questionIndex].options;
        questionsSection.textContent = userQuestion;
    }
    // New for each for question choices
    userChoices.forEach(function (newItem) {
        var listItem = document.createElement("li");
        listItem.textContent = newItem;
        questionsSection.appendChild(ulCreate);
        ulCreate.appendChild(listItem);
        listItem.addEventListener("click", (compare));
    })
}
// Event to compare choices with answer
function compare(event) {
    var element = event.target;

    if (element.matches("li")) {

        var createDiv = document.createElement("div");
        createDiv.setAttribute("id", "createDiv");
        // Correct condition 
        if (element.textContent == questions[questionIndex].answer) {
            score++;
            createDiv.textContent = "Correct! The answer is:  " + questions[questionIndex].answer;
            // Correct condition 
        } else {
            // Will deduct -5 seconds off secondsLeft for wrong answers
            secondsLeft = secondsLeft - penalty;
            createDiv.textContent = "Wrong! The correct answer is:  " + questions[questionIndex].answer;
        }

    }
    // Question Index determines number question user is on
    questionIndex++;

    if (questionIndex >= questions.length) {
        // All done will append last page with user stats
        allDone();
        createDiv.textContent = "End of quiz!" + " " + "You got  " + score + "/" + questions.length + " Correct!";
    } else {
        render(questionIndex);
    }
    questionsSection.appendChild(createDiv);

}
// All done will append last page
function allDone() {
    questionsSection.innerHTML = "";
    currentTime.innerHTML = "";

    // Heading:
    var createH1 = document.createElement("h1");
    createH1.setAttribute("id", "createH1");
    createH1.textContent = "All Done!"

    questionsSection.appendChild(createH1);

    // Paragraph
    var createP = document.createElement("p");
    createP.setAttribute("id", "createP");

    questionsSection.appendChild(createP);

    // Calculates time remaining and replaces it with score
    if (secondsLeft >= 0) {
        var timeRemaining = secondsLeft;
        var createP2 = document.createElement("p");
        clearInterval(holdInterval);
        createP.textContent = "Your final score is: " + timeRemaining;

        questionsSection.appendChild(createP2);
    }

    // Label
    var createLabel = document.createElement("label");
    createLabel.setAttribute("id", "createLabel");
    createLabel.textContent = "Enter your initials: ";

    questionsSection.appendChild(createLabel);

    // input
    var createInput = document.createElement("input");
    createInput.setAttribute("type", "text");
    createInput.setAttribute("id", "initials");
    createInput.textContent = "";

    questionsSection.appendChild(createInput);

    // submit
    var createSubmit = document.createElement("button");
    createSubmit.setAttribute("type", "submit");
    createSubmit.setAttribute("id", "Submit");
    createSubmit.textContent = "Submit";

    questionsSection.appendChild(createSubmit);

    // Event listener to capture initials and local storage for initials and score
    createSubmit.addEventListener("click", function () {
        var initials = createInput.value;

        if (initials === null) {

            console.log("No value entered!");

        } else {
            var finalScore = {
                initials: initials,
                score: timeRemaining
            }
            console.log(finalScore);
            var allScores = localStorage.getItem("allScores");
            if (allScores === null) {
                allScores = [];
            } else {
                allScores = JSON.parse(allScores);
            }
            allScores.push(finalScore);
            var newScore = JSON.stringify(allScores);
            localStorage.setItem("allScores", newScore);
            // Travels to final page
            window.location.replace("./highScores.html");
        }
    });

}
