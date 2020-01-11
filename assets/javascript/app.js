//global variables 
var questions = [
    {
        q: "what color is the sky?",
        d: ["red", "blue", "green", "yellow"],
        a: "blue"
    },
    {
        q: "which is a vowel?",
        d: ["a", "b", "c", "d"],
        a: "a"
    }
]
var correct = 0; //keeps track of correct answers
var incorrect = 0; //keeps track of incorrect answers
var unanswered = 0; //keeps track  of unanswered questions
var intervalID;
var delayButtonAlert;
var time = 10; //holds the time left
var counter = 0; //keeps track of which question is being displayed, starting with i=0
var answerChosen = 0;
var results = $("<div>").appendTo(".container").hide();
        results.addClass("resultsDiv");
        var correctScore = $("<p>").appendTo(results).text("Correct: " + correct);
        var incorrectScore = $("<p>").appendTo(results).text("Incorrect: " + incorrect);
        var unanswered = $("<p>").appendTo(results).text("Unanswered: " + unanswered);

//only display start button on page load
$(document).ready(function () {
    $("#quizDisplay").hide();

    //when start button is clicked, hide start button and show quiz content
    $("#startBtn").click(function () {
        $("#quizDisplay").toggle();
        $("#startBtn").hide();
        $(".resultsDiv").hide();
        $("#correctAnswer").hide();
        counter = 0;
        correct = 0;
        incorrect = 0;
        unanswered = 0;
        runQuiz();
    })
})

function countDown() {
    if (time > 0) {
        time-=1;
        $("#timer").show();
        $("#timer").text(time + " seconds");
    }
    delayButtonAlert = setTimeout(handleNoAnswer, 10000);
}

function clearQuestion() {
    $("#timer").hide();
    displayAnswer();
    intervalID = setTimeout(nextQuestion, 3000);
    delayButtonAlert = setTimeout(handleNoAnswer, 10000);
}

function nextQuestion() {
    if (counter < questions.length - 1) {
        counter++;
        runQuiz();
    }

    else {
        $("#quizDisplay").hide();
        $("#startBtn").show();
        $(".resultsDiv").show();
    }
}

function runQuiz() {
    // clearTimeout(intervalID)
    displayQuestion();
    // setInterval(countDown, 1000);
    $("#correctAnswer").hide();
}

function handleClick () {
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

function handleNoAnswer () {
    if (answerChosen != true) {
        unanswered++;
        clearQuestion();
    }
    else {
        return
    }
}

function displayQuestion() {
    time = 10;
    clearInterval(intervalID);
    setInterval(countDown, 1000);
    $("#questionsAnswers").empty();
    $("#questionsAnswers").html(questions[counter].q);

    for (var i = 0; i < 4; i++) {
        var a = $("<button>");
        a.addClass("distractor");
        a.attr("data-name", questions[counter].d[i]);
        a.text(questions[counter].d[i]);
        $("#questionsAnswers").append(a);
    }
}


//after each question in the array has been answered, change display to show "Here's how you did!", display correct, incorrect, and unanswered, and a start over button
function displayAnswer() {
    $(".distractor").hide();
    $("#timer").hide();
    $("#correctAnswer").show();
    $("#correctAnswer").text("The correct answer is " + questions[counter].a);
}

$(document).on("click", ".distractor", handleClick);
