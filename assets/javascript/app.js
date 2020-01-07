//global variables 
var questions = [] //holds questions and answer options as objects;
var correct = 0; //keeps track of correct answers
var incorrect = 0; //keeps track of incorrect answers
var unanswered = 0; //keeps track  of unanswered questions

//only display start button...
$(document).ready(function () {
    $("#quizDisplay").hide();

    //when start button is clicked, hide start button and show quiz content
    $("#startBtn").click(function () {
        $("#quizDisplay").toggle();
        $("#startBtn").hide();

        //loop through each question in array
        for (var i=0; i < questions.length; i++) {
        //display question for set amount of time
       
        //if time runs out, display correct answer and image and increment unanswered variable by 1
        
        //else if user selects correct answer, display correct answer and imagne and increment correct variable by 1

        //else if user selects an incorrect anwer, display correct answer and image and increment incorrect variable by 1
    
        //after each question in the array has been answered, change display to show "Here's how you did!", display correct, incorrect, and unanswered, and a start over button
    }
    });
})