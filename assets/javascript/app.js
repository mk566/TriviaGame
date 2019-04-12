$(document).ready(() => {


    var board = $("#form-area");

    var countStartNum = 15;

    var questions = [{
        question: "Which is the only American Football team to go a whole season undefeated, including the Super Bowl?",
        answers: ["Green Bay Packers", "Dallas Cowboys", "New England Patriots", "Miami Dolphins"],
        rightAnswer: "Miami Dolphins",
        image: "assets/images/Dolphins"
    },
    {
        question: "How many NBA championships did Michael Jordan win with the Chicago Bulls?",
        answers: ["6", "5", "8", "3"],
        rightAnswer: "6",
        image: "assets/images/Dolphins"

    },
    {
        question: "Which American Football team won the first two Super Bowls (in 1967 and 1968)?",
        answers: ["Chicago Bears", "Green Bay Packers", "Dallas Cowboys", "New York Jets"],
        rightAnswer: "Green Bay Packers",
        image: "assets/images/Dolphins"

    },
    {
        question: "Which racing driver holds the record for the most Formula One World Drivers' Championship wins, with seven titles?",
        answers: ["Lewis Hamilton", "Sebastion Vettel", "Michael Andretti", "Michael Schumacher"],
        rightAnswer: "Michael Schumacher",
        image: "assets/images/Dolphins"

    },
    {
        question: "Which NFL team appeared in four consecutive Super Bowls from 1991 - 1994 and lost them all?",
        answers: ["Green Bay Packers", "Buffalo Bills", "New York Giants", "San Francisco 49er's"],
        rightAnswer: "Buffalo Bills",
        image: "assets/images/Dolphins"

    },
    {
        question: "Which golf tournament did Tiger Woods win by 12 strokes in 1997 to record his first major championship win?",
        answers: ["The Masters", "Players Championship", "US Open", "British Open"],
        rightAnswer: "The Masters",
        image: "assets/images/Dolphins"

    },
    {
        question: " Which country won the first ever soccer World Cup in 1930?",
        answers: ["Brazil", "Argentina", "England", "Uruguay"],
        rightAnswer: "Uruguay",
        image: "assets/images/Dolphins"

    },
    {
        question: "Who is the NFL's all-time leading rusher?",
        answers: ["Bo Jackson", "Barry Sanders", "Emmitt Smith", "Thermon Thomas"],
        rightAnswer: "Emmitt Smith",
        image: "assets/images/Dolphins"

    },
    {

        question: "Raging Bull, the classic 1980 movie is about which real life boxer?",
        answers: ["Joe Frazier", "Mohamed Ali", "Jake LaMotta", "Floyd Mayweather"],
        rightAnswer: "Jake LaMotta",
        image: "assets/images/Dolphins"


    },

    {
        question: "Which is the only team to play in every soccer World Cup tournament?",
        answers: ["Brazil", "Argentina", "England", "France"],
        rightAnswer: "Brazil",
        image: "assets/images/Dolphins"

    }];


    var clock;

    var quiz = {

        questions: questions,
        currentQuestion: 0,
        counter: countStartNum,
        correct: 0,
        incorrect: 0,


        countdown: function () {
            quiz.counter--;
            $("#counter-digit").html(quiz.counter);

            if (quiz.counter === 5) {
                $("#counter-digit").css("color", "red");
            }
            if (quiz.counter === 0) {
                quiz.timeOver();
            }
        },


        // function that loads the first question
        grabQuestion: function () {
            $("#counter-digit").css("color", "yellow");
            // set our countdown interval to one second  
            clock = setInterval(quiz.countdown, 1000);
            // remove our start button from form-area div

            $("#start").remove();
            // put the first question in our form-area div 
            board.html("<h2>" + questions[this.currentQuestion].question + "</h2>");
            // for loop to append the current question's answer options to our buttons
            for (var i = 0; i < questions[this.currentQuestion].answers.length; i++) {
                board.append("<button class='answer-button' id='button' data-name='" + questions[this.currentQuestion].answers[i]
                    + "'>" + questions[this.currentQuestion].answers[i] + "</button>");
            }
        },

        // function to change to the next question
        deckQuestion: function () {
            $("#counter-digit").css("color", "yellow");
            quiz.counter = countStartNum;
            $("#counter-digit").text(quiz.counter);
            quiz.currentQuestion++;
            quiz.grabQuestion();
        },

        // function to control what happens when a question is not answered within the time limit
        timeOver: function () {

            clearInterval(clock);

            $("#counter-digit").html(quiz.counter);
            // jquery to call the sound that plays when a question times out due to no answer    

            // append the form-area div to display our "you took too long" message and display the correct answer
            board.html("<h2>You took too long to answer!</h2>");
            board.append("<h3>Correct Answer: " + questions[this.currentQuestion].rightAnswer);
            board.append("<img id='test' src='" + questions[this.currentQuestion].image + "' />");
            // if statement to control how long our "you took too long" message appears in form-area div 
            if (quiz.currentQuestion === questions.length - 1) {
                // show quiz results if last question    
                setTimeout(quiz.results, 6 * 1000);
            }
            // show next question if not last question  
            else {
                setTimeout(quiz.deckQuestion, 6 * 1000);
            }
        },

        // function to control what happens at the end of the quiz
        results: function () {



            clearInterval(clock);

            $("#counter-digit").text(quiz.counter);
            
                // append passed message, results, and our start over? button to our quiz area div
                board.append("<h3>Correct Answers: " + quiz.correct + "</h3>");
                board.append("<h3>Incorrect Answers: " + quiz.incorrect + "</h3>");
                board.append("<h3>Unanswered: " + (questions.length - (quiz.incorrect + quiz.correct)) + "</h3>");
                board.append("<br><button id='start-over'>Start Over?</button>");
            
        },

        // function that controls what happens when a correct or incorrect answer button is clicked
        clicked: function (e) {
            clearInterval(clock);
            if ($(e.target).attr("data-name") === questions[this.currentQuestion].rightAnswer) {
                this.guessedCorrectly();
            }
            else {
                this.guessedIncorrectly();
            }
        },

        // function that controls what happens when a question is answered incorrectly
        guessedIncorrectly: function () {
            quiz.incorrect++;

            clearInterval(clock);

            // append our inaccurate message, our correct answer was message, and display our correct answer image    
            board.html("<h2>You Are In Error!</h2>");
            board.append("<h3>Correct Answer: " + questions[quiz.currentQuestion].rightAnswer + "</h3>");

            // if statement that controls how long our incorrect answer message, correct answer was message, and correct answer image are shown 
            if (quiz.currentQuestion === questions.length - 1) {
                // if last question then show results    
                setTimeout(quiz.results, 6 * 1000);
            }
            // if not last question then load next question  
            else {
                setTimeout(quiz.deckQuestion, 6 * 1000);
            }
        },

        // function that controls what happens when a question is answered correctly
        guessedCorrectly: function () {

            clearInterval(clock);

            quiz.correct++;

            // append our "verified" message, "good guess you nerd" message, and our correct answer image to form-area div
            board.html("<h2>Verified!</h2>");
            board.append("<h3>Good Guess</h3>");
            // board.append("<img class='img-fluid' id='test' src='" + questions[quiz.currentQuestion] + "' />");

            // if statement that controls how long our "verified" and "good guess" messages and correct answer image are displayed
            if (quiz.currentQuestion === questions.length - 1) {
                // if last question then show quiz results    
                setTimeout(quiz.results, 6 * 1000);
            }
            // if not last question then load next question  
            else {
                setTimeout(quiz.deckQuestion, 6 * 1000);
            }
        },

        // function to control resetting the quiz 
        reset: function () {
            $("#counter-digit").css("color", "yellow");
            this.currentQuestion = 0;
            this.counter = countStartNum;
            this.correct = 0;
            this.incorrect = 0;
            this.grabQuestion();
        }
    };

    // all of our on click events
    $(document).on("click", "#start-over", () => {
        quiz.reset();


    });

    $(document).on("click", ".answer-button", (e) => {
        quiz.clicked(e);
    });

    $(document).on("click", "#start", () => {
        // prepend time remaining to pre-form <h2> id
        $("#pre-form").prepend("<h2>Time Remaining: <span id='counter-digit'>15</span> Seconds</h2>");
        quiz.grabQuestion();
        // jquery to call our background noises
    });
});