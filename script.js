var questions = [{
    question: "1. How do you add an element to the beginning of an array?",
    choices: ["array.shift", "array.push", "array.pull", "array.unshift"],
    correctAnswer: 1
}, {
    question: "2. What tag is the bootstrap cdn placed inside the html document?",
    choices: ["p", "body", "head", "header"],
    correctAnswer: 2
}, {
    question: "3. What symbol is used to access DOM elements in JavaScript using jQuery?",
    choices: ["?", "&", "%", "$"],
    correctAnswer: 3
}, {
    question: "4. How do you comment out a line of code in JavaScript?",
    choices: ["!-- --", "//", "**", "<<"],
    correctAnswer: 1
}, {
    question: "5. What is the main requirement needed to call an API?",
    choices: ["API secret", "API code", "API key", "code key"],
    correctAnswer: 2
},{
	question: "6. Which of these will return data from an API?",
    choices: ["POST", "GET", "FETCH", "GET and FETCH"],
    correctAnswer: 3
}];

var currentQuestion = 0;
var viewingAns = 0;
var correctAnswers = 0;
var quizOver = false;
var iSelectedAnswer = [];
var c=90;
var t;

$(document).ready(function () {
    displayCurrentQuestion();
    $(this).find(".quizMessage").hide();
	$(this).find('#preBtn').hide();
	//(".preButton").attr('disabled', 'disabled');
	
	timedCount();
	
	$(this).find(".preButton").on("click", function () {		
        if (!quizOver) {
			if(currentQuestion == 0) { return false; }
	
			if(currentQuestion == 1) {
			  $("#preBtn").hide();
			}
			
			currentQuestion--; 
			if (currentQuestion < questions.length) {
				displayCurrentQuestion();
			} 					
		} else {
			if(viewingAns == 3) { return false; }
			currentQuestion = 0; viewingAns = 3;
			viewResults();		
		}
});

	
	
    $(this).find(".nextButton").on("click", function () 
	{
        if (!quizOver) 
		{
			
            var val = $("input[type='radio']:checked").val();

            if (val == undefined) 
			{
                $(document).find(".quizMessage").text("Please select an answer");
                $(document).find(".quizMessage").show();
            } 
			else 
			{
                
                $(document).find(".quizMessage").hide();
				if (val == questions[currentQuestion].correctAnswer) 
				{
					correctAnswers++;
				}
				if (val != questions[currentQuestion].correctAnswer) {
					wrongAnswer();
				}
				iSelectedAnswer[currentQuestion] = val;
				
				currentQuestion++; 
				if(currentQuestion >= 1) {
					  $('.preButton').prop("disabled", false);
				}
				if (currentQuestion < questions.length) 
				{
					displayCurrentQuestion();
					
				} 
				else 
				{
					displayScore();
					$('#iTimeShow').html('Quiz Time Completed!');
					$('#timer').html("You scored: " + correctAnswers + " out of: " + questions.length);
					c=185;
					$(document).find(".preButton").text("View Answer");
					$(document).find(".nextButton").text("Play Again?");
					quizOver = true;
					return false;
					
				}
			}
					
		}	
		else 
		{
			quizOver = false; $('#iTimeShow').html('Time Remaining:'); iSelectedAnswer = [];
			$(document).find(".nextButton").text("Next Question");
			$(document).find(".preButton").text("Previous Question");
			 $(".preButton").attr('disabled', 'disabled');
			resetQuiz();
			viewingAns = 1;
			displayCurrentQuestion();
			hideScore();
		}
    });
});

function wrongAnswer() {
	alert("WRONG");
	c = c - 10
}

function timedCount() {
	// var hours = parseInt( c / 3600 ) % 24;
	var minutes = parseInt( c / 60 ) % 60;
	var seconds = c % 60;
	var result = (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds  < 10 ? "0" + seconds : seconds);            
	$('#timer').html(result);
		
	if(c == 0 ) {
		displayScore();
		$('#iTimeShow').html('Quiz Time Completed!');
		$('#timer').html("You scored: " + correctAnswers + " out of: " + questions.length);
		c=90;
		$(document).find(".preButton").text("View Answer");
		$(document).find(".nextButton").text("Play Again?");
		quizOver = true;
		return false;
	}
		
	c = c - 1;
	t = setTimeout(function() {
		timedCount()
	},1000);
}	
	
function displayCurrentQuestion() 
{

	if(c == 90) { c = 90; timedCount(); }
    var question = questions[currentQuestion].question;
    var questionClass = $(document).find(".quizContainer > .question");
    var choiceList = $(document).find(".quizContainer > .choiceList");
    var numChoices = questions[currentQuestion].choices.length;
    
    $(questionClass).text(question);

    $(choiceList).find("li").remove();
    var choice;
	
	
    for (i = 0; i < numChoices; i++) 
	{
        choice = questions[currentQuestion].choices[i];
		
		if(iSelectedAnswer[currentQuestion] == i) {
			$('<li><input type="radio" class="radio-inline" checked="checked"  value=' + i + ' name="dynradio" />' +  ' ' + choice  + '</li>').appendTo(choiceList);
		} else {
			$('<li><input type="radio" class="radio-inline" value=' + i + ' name="dynradio" />' +  ' ' + choice  + '</li>').appendTo(choiceList);
		}
    }
}

function resetQuiz()
{
    currentQuestion = 0;
    correctAnswers = 0;
    hideScore();
}

function displayScore()
{
    $(document).find(".quizContainer > .result").text("You scored: " + correctAnswers + " out of: " + questions.length);
    $(document).find(".quizContainer > .result").show();
}

function hideScore() 
{
    $(document).find(".result").hide();
}

function viewResults() 
{

	if(currentQuestion == 10) { currentQuestion = 0;return false; }
	if(viewingAns == 1) { return false; }

	hideScore();
    var question = questions[currentQuestion].question;
    var questionClass = $(document).find(".quizContainer > .question");
    var choiceList = $(document).find(".quizContainer > .choiceList");
    var numChoices = questions[currentQuestion].choices.length;
    
    $(questionClass).text(question);
    
    $(choiceList).find("li").remove();
    var choice;
	
	
	for (i = 0; i < numChoices; i++) 
	{
        choice = questions[currentQuestion].choices[i];
		
		if(iSelectedAnswer[currentQuestion] == i) {
			if(questions[currentQuestion].correctAnswer == i) {
				$('<li style="border:2px solid green;margin-top:10px;"><input type="radio" class="radio-inline" checked="checked"  value=' + i + ' name="dynradio" />' +  ' ' + choice  + '</li>').appendTo(choiceList);
			} else {
				$('<li style="border:2px solid red;margin-top:10px;"><input type="radio" class="radio-inline" checked="checked"  value=' + i + ' name="dynradio" />' +  ' ' + choice  + '</li>').appendTo(choiceList);
			}
		} else {
			if(questions[currentQuestion].correctAnswer == i) {
				$('<li style="border:2px solid green;margin-top:10px;"><input type="radio" class="radio-inline" value=' + i + ' name="dynradio" />' +  ' ' + choice  + '</li>').appendTo(choiceList);
			} else {
				$('<li><input type="radio" class="radio-inline" value=' + i + ' name="dynradio" />' +  ' ' + choice  + '</li>').appendTo(choiceList);
			}
		}
    }
	
	currentQuestion++;
	
	setTimeout(function()
		{
			viewResults();
		},3000);
}
