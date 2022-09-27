const startButton = document.getElementById('start-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const nextButton = document.getElementById('next-btn')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
	currentQuestionIndex++
	setNextQuestion()
})

function startGame(){
	startButton.classList.add('hide')
	shuffledQuestions = questions.sort(() => Math.random() - 0.5)
	currentQuestionIndex = 0;
	questionContainerElement.classList.remove('hide')
	setNextQuestion()
}

function setNextQuestion() {
	resetState()
	showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(q){
	questionElement.innerText = q.question
	q.answers.forEach(answer => {
		const button = document.createElement('button')
		button.innerText = answer.text
		button.classList.add('btn')
		if (answer.correct) {
			button.dataset.correct = answer.correct
		}
		button.addEventListener('click', selectAnswer)
		answerButtonsElement.appendChild(button)
	})
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e){
	const selectedButton = e.target
	const correct = selectedButton.dataset.correct
	setStatusClass(document.body, correct)
	Array.from(answerButtonsElement.children).forEach(button => {
		setStatusClass(button, button.dataset.correct)
	})
	if (shuffledQuestions.length > currentQuestionIndex + 1) {
		nextButton.classList.remove('hide')
	} else {
		startButton.innerText = 'Restart'
		startButton.classList.remove('hide')
	}
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
{
	question: 'What is 2 + 2?',
	answers: [
	{text: '4', correct: true},
	{text: '22', correct: false}
	]

},
{
	question: 'What is 4*4?',
	answers: [
	{text: '16', correct: true},
	{text: '44', correct: false}
	]

},
{
	question: 'King of Web development?',
	answers: [
	{text: 'Piyush Kesarwani', correct: true},
	{text: 'Web dev symplified', correct: true},
	{text: 'CodeWithHarry', correct: true},
	{text: 'Dev Ed', correct: true}
	]

},
{
	question: 'What is 4*5?',
	answers: [
	{text: '20', correct: true},
	{text: '45', correct: false}
	]

},
{
	question: 'Do you know What is Promise in javaScript?',
	answers: [
	{text: 'I do not know', correct: true},
	{text: 'I know', correct: false}
	]

}
]