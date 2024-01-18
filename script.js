class Quiz {

    constructor(questions) {
        this.score = 0;
        this.questions = questions;
        this.questionIndex = 0;
    }


    getQuestionIndex() {
        return this.questions[this.questionIndex];
    }


    guess(answer) {
        if (this.getQuestionIndex().isCorrectAnswer(answer)) {
            this.score++;
        }
        this.questionIndex++;
    }

    isEnded() {
        return this.questionIndex === this.questions.length;
    }
}


class Question {

    constructor(text, choices, answer) {
        this.text = text;
        this.choices = choices;
        this.answer = answer;
    }

    isCorrectAnswer(choice) {
        return this.answer === choice;
    }
}

function displayQuestion() {
    if (quiz.isEnded()) {
        showScores();
    } else {
        let questionElement = document.getElementById("question");
        questionElement.innerHTML = quiz.getQuestionIndex().text;


        let choices = quiz.getQuestionIndex().choices;
        for (let i = 0; i < choices.length; i++) {
            let choiceElement = document.getElementById("choice" + i);
            choiceElement.innerHTML = choices[i];
            guess("btn" + i, choices[i]);
        }

        showProgress();
    }
}

function guess(id, guess) {

    let button = document.getElementById(id);
    button.onclick = function () {
        quiz.guess(guess);
        displayQuestion();
    }
}

function showProgress() {
    let currentQuestionNumber = quiz.questionIndex + 1;
    let progressElement = document.getElementById("progress");
    progressElement.innerHTML =
        `Question ${currentQuestionNumber} of ${quiz.questions.length}`;
}

function showScores() {

    let quizEndHTML =
        `
    <h1>Quiz Completed</h1>
    <h2 id="score"> You Scored: ${quiz.score} of ${quiz.questions.length} </h2>
    <div class="quiz-repeat">
        <a href="index.html"> Take Quiz Again</a>
    </div>
    `;

    let quizElement = document.getElementById("quiz");
    quizElement.innerHTML = quizEndHTML;
}



let questions = [
    new Question("Hyper Text Markup Language Stands For?", [
        "Jquery", "Css", "Html"], "Html"),
    new Question("Hyper Text Markup Language Stands For1?", [
        "Jquery1", "Css1", "Html1"], "Html1"),
    new Question("Hyper Text Markup Language Stands For2?", [
        "Jquery2", "Css2", "Html2"], "Html2"),
    new Question("Hyper Text Markup Language Stands For3?", [
        "Jquery3", "Css3", "Html3"], "Html3")
];

let quiz = new Quiz(questions);
displayQuestion();

//CountDown
let time = 10;
let quizTimeInMinutes = time * 60 * 60;
quizTime = quizTimeInMinutes / 60;

let counting = document.getElementById("count-down");

function startCountdown() {

    let quizTimer = setInterval(function () {

        if (quizTime <= 0) {
            clearInterval(quizTimer);
            showScores();
        } else {
            quizTime--;
            let sec = Math.floor(quizTime % 60);
            let min = Math.floor(quizTime / 60) %60;
            counting.innerHTML = `TIME: ${min}: ${sec}`;
        }
    }, 1000);
}


startCountdown();