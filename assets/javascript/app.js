//global variables 
var questions = [
    {
        q: "Who is the youngest Disney princess?",
        d: ["Ariel", "Belle", "Pocahontas", "Snow White"],
        a: "Snow White"
    },
    {
        q: "Which is the only Disney princess with brothers?",
        d: ["Jasmine", "Merida", "Rapunzel", "Tiana"],
        a: "Merida"
    },
    {
        q: "Which princess was born royalty?",
        d: ["Belle", "Cinderella", "Anastasia", "Tianna"],
        a: "Anastasia"
    },
    {
        q: "Are Anna and Elsa considered Disney princesses?",
        d: ["Yes", "No"],
        a: "No"
    },
    
    {
        q: "Which is the only Disney princess with dimples?",
        d: ["Ariel", "Merida", "Rapunzel", "Tiana"],
        a: "Tiana"
    },
    {
        q: "Which is the only Disney princess with a tattoo?",
        d: ["Jasmine", "Merida", "Mulan", "Pocahontas"],
        a: "Pocahontas"
    },
    {
        q: "True or false, Tinkerbell was once considered a Disney Princess.",
        d: ["True", "False"],
        a: "True"
    },
    {
        q: "Which is the only Disney princess that is not the main character of her movvie?",
        d: ["Aurora", "Belle", "Jasmine", "Merida"],
        a: "Jasmine"
    },
    {
        q: "which Disney princess has the biggest eyes?",
        d: ["Ariel", "Rapunzel", "Moana", "Tiana"],
        a: "Rapunzel"
    },
    {
        q: "Which Disney princess has a star on the Hollywood Walk of Fame?",
        d: ["Ariel", "Snow White", "Tiana", "Pocahontas"],
        a: "Snow White"
    },
    {
        q: "Which is the only princess based on a real person?",
        d: ["Merida", "Mulan", "Pocahontas", "Snow White"],
        a: "Pocahontas"
    },
    {
        q: "Which is not a requirement to be an official Disney princess?",
        d: ["Be born into or become royalty", "Have an animal friend/sidekcik", "Be human or human-like", "Have a primary role in an animated film "],
        a: "Have an animal friend/sidekcik"
    },
]
var correct = 0; //keeps track of correct answers
var incorrect = 0; //keeps track of incorrect answers
var unanswered = 0; //keeps track  of unanswered questions
var intervalID;
var time; //holds the time left
var counter = 0; //keeps track of which question is being displayed, starting with i=0
var answerChosen = 0;
var timerID;
var timesupID;
var results = $("<div>").appendTo(".container").hide();
results.addClass("resultsDiv");
var correctScore = $("<p>").appendTo(results);
var incorrectScore = $("<p>").appendTo(results);
var unansweredScore = $("<p>").appendTo(results);

//only display start button on page load
$(document).ready(function () {
    $("#quizDisplay").hide();

    //when start button is clicked, hide start button and results (for restart) and show quiz content
    $("#startBtn").click(function () {
        $("#quizDisplay").show();
        $("#startBtn").hide();
        $(".resultsDiv").hide();
        $("#correctAnswer").hide();
        counter = 0;
        correct = 0;
        incorrect = 0;
        unanswered = 0;
        displayQuestion();
    })
})

//restarts time, displays question (loops through )
function displayQuestion() {
    time = 10;
    $("#timer").show();
    clearTimeout(timerID);
    clearTimeout(timesupID)
    clearInterval(intervalID);
    intervalID = setInterval(countDown, 1000);
    timesupID = setTimeout(handleNoAnswer, 10005);
    $("#questionsAnswers").empty();
    $("#correctAnswer").hide();
    $("#questionsAnswers").html(questions[counter].q);

    for (var i = 0; i < 4; i++) {
        var a = $("<button>");
        a.addClass("distractor");
        a.attr("data-name", questions[counter].d[i]);
        a.text(questions[counter].d[i]);
        $(a).appendTo("#questionsAnswers").before("<br/>")
    }

}
//after each question in the array has been answered, change display to show "Here's how you did!", display correct, incorrect, and unanswered, and a start over button
function displayAnswer() {
    clearTimeout(timesupID);
    $("#timeRemaining").hide();
    $(".distractor").hide();
    $("#correctAnswer").show();
    $("#correctAnswer").text("The correct answer is " + questions[counter].a);
}

//decrement timer, show in timer div
function countDown() {
    if (time > 0) {
        time -= 1;
        $("#timeRemaining").show();
        $("#timer").show();
        $("#timer").text(time + " seconds");
    }

}


function handleClick() {
    answerChosen = true;
    var userInput = $(this).text();

    //if user selects correct answer, display correct answer and imagne and increment correct variable by 1
    if (userInput === questions[counter].a) {
        console.log("You got it!");
        correct++;
        clearQuestion();

    }
    //else if user selects an incorrect answer, display correct answer and image and increment incorrect variable by 1
    if (userInput != questions[counter].a) {
        console.log("Nope!")
        incorrect++;
        clearQuestion();
    }
};

//if no button is clicked, increments unanswered
function handleNoAnswer() {
    unanswered++;
    clearQuestion();
}

function clearQuestion() {
    $("#timer").hide();
    displayAnswer();
    timerID = setTimeout(nextQuestion, 3000);
}

function nextQuestion() {
    if (counter < questions.length - 1) {
        counter++;
        displayQuestion();
    }

    else {
        $("#quizDisplay").hide();
        $("#startBtn").show();
        $(".resultsDiv").show();
        $(correctScore).text("Correct: " + correct)
        $(incorrectScore).text("Incorrect: " + incorrect);
        $(unansweredScore).text("Unanswered: " + unanswered);
    }
}


$(document).on("click", ".distractor", handleClick);
