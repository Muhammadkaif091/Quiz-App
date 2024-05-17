const questions = [
    {
        question: "Which is largest animal in the world?",
        answers: [
            {test: "Shark" , correct: false},
            {test: "Blue Whale" , correct: true},
            {test: "Elephant" , correct: false},
            {test: "Giraffe" , correct: false},
        ]
    },
    {
        question: "HTML stand for?",
        answers: [
            {test: "Hypertext Markup Language" , correct: true},
            {test: "hmtl" , correct: false},
            {test: "hypertype markup language" , correct: false},
            {test: "Hypertypeof markup language" , correct: false},
        ]   
    },
    {
        question: "Which is smallest country in the world?",
        answers: [
            {test: "Vatican City" , correct: true},
            {test: "Bhutan" , correct: false},
            {test: "Nepal" , correct: false},
            {test: "Shri Lanka" , correct: false},
        ]   
    },
    {
        question: "Which is largest desert in the world?",
        answers: [
            {test: "kalahari" , correct: false},
            {test: "Gobi" , correct: false},
            {test: "Sahara" , correct: true},
            {test: "Antarctica" , correct: false},
        ]   
    },
    {
        question: "Which is smallest continent in the world?",
        answers: [
            {test: "Asia" , correct: false},
            {test: "Australia" , correct: true},
            {test: "Arctic" , correct: false},
            {test: "Africa" , correct: false},
        ]   
    }
];
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");



let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}


function  showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct
        }  
        button.addEventListener("click" , selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
            selectedBtn.classList.add("correct");
            score++;
        }else{
            selectedBtn.classList.add("incorrect");
        }
        Array.from(answerButtons.children).forEach(button => {
            if(button.dataset.correct === "true"){
                button.classList.add("correct");
            }
            button.disabled = true;
        });
        nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}


function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}


nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();