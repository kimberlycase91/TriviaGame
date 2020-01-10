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
var time = 45; //holds the time left
var counter = 0; //keeps track of which question is being displayed, starting with i=0

//only display start button on page load
$(document).ready(function () {
    $("#quizDisplay").hide();

    //when start button is clicked, hide start button and show quiz content
    $("#startBtn").click(function () {
        $("#quizDisplay").toggle();
        $("#startBtn").hide();
        runQuiz();
        setInterval(countDown, 1000);
    })
})

function countDown() {
    if (time > 0) {
        time--;
        $("#timer").text(time + " seconds");
    }
}

function nextQuestion() {
    if (counter < questions.length - 1) {
        counter++;
        setInterval(countDown, 1000);
    }

    else {
        $("#quizDisplay").hide();
        $("#startBtn").toggle(); 
        var results = $("<div>").appendTo(".quizDisplay");
        $("<p>").appendTo(results).text("Correct: " + correct);
        $("<p>").appendTo(results).text("Incorrect: " + incorrect);
        $("<p>").appendTo(results).text("Unanswered: " + unanswered);
    }
}
function runQuiz() {
    displayQuestion()

    $(".choice").on("click", function () {
        userInput = $(this).val();

        //if time runs out, display correct answer and image and increment unanswered variable by 1
        if (time === 0) {
            unanswered++;
            displayAnswer();
        }
        //if user selects correct answer, display correct answer and imagne and increment correct variable by 1
        if (userInput === questions[counter].a) {
            correct++;
            displayAnswer();
        }
        //else if user selects an incorrect anwer, display correct answer and image and increment incorrect variable by 1
        else if (userInput != questions[counter]) {
            incorrect++;
            displayAnswer();
        }
        console.log("correct: " + correct);
        console.log("incorrect: " + incorrect);
        console.log("unanswered: " + unanswered);

    })
}
function displayQuestion() {
    $("#question").text(questions[counter].q);
    $("#btnA").text(questions[counter].d[0]);
    $("#btnB").text(questions[counter].d[1]);
    $("#btnC").text(questions[counter].d[2]);
    $("#btnD").text(questions[counter].d[3]);
}

//after each question in the array has been answered, change display to show "Here's how you did!", display correct, incorrect, and unanswered, and a start over button
function displayAnswer() {
    $("#correctAnswer").text("The correct answer is " + questions[counter].a);
    $("#btnA").hide();
    $("#btnB").hide();
    $("#btnC").hide();
    $("#btnD").hide();
    setTimeout(nextQuestion, 3000)
}

