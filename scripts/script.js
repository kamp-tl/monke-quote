const RANDOM_QUOTE_API_URL = 'https://api.quotable.io/random'
const quoteDisplayElement = document.getElementById('quoteDisplay')
const quoteInputElement = document.getElementById('quoteInput')
const timerElement = document.getElementById('timer')
const quoteWall = document.getElementById('quoteWall')
// var count = document.getElementById('count');
// var input = document.getElementById('input');
var counter = 1;

quoteInputElement.addEventListener('input', () => {
 const arrayQuote = quoteDisplayElement.querySelectorAll('span')
 const arrayInput = quoteInputElement.value.split('')

 let allCorrect = true
 arrayQuote.forEach((characterSpan, index) => {
 	const characterInput = arrayInput[index]
 	if (characterInput == null) {
 		characterSpan.classList.remove('correct')
 		characterSpan.classList.remove('incorrect')
 		allCorrect = false 
 	}
 	else if (characterInput === characterSpan.innerText) {
 		characterSpan.classList.add('correct')
 		characterSpan.classList.remove('incorrect')
 	} 
 	else {
 		characterSpan.classList.remove('correct')
 		characterSpan.classList.add('incorrect')
 		allCorrect = false
 	}
 })

	var displayquote = arrayInput.join('')
	console.log(displayquote)
if (allCorrect) {
	const quotewallpaper = document.createElement("P")
	quotewallpaper.textContent = displayquote
	quoteWall.appendChild(quotewallpaper)
	quotewallpaper.classList.add('background-text')
}

if (allCorrect && counter < 6) renderNewQuote()
if (allCorrect && counter >= 6) hide()

})


function getRandomQuote() {
	return fetch(RANDOM_QUOTE_API_URL)
		.then(response => response.json())
		.then(data => data.content)

}


async function renderNewQuote() {
	const quote = await getRandomQuote()
	//const quote = "test"
	quoteDisplayElement.innerHTML = ''
	quote.split('').forEach(character => {
		const characterSpan = document.createElement('span')
		characterSpan.innerText = character
	 	quoteDisplayElement.appendChild(characterSpan)
	})
	quoteInputElement.value = null
	counter++
	startTimer() 
}

let startTime

function startTimer() {
  timerElement.innerText = 0
  startTime = new Date()
  setInterval(() => {
    timer.innerText = getTimerTime()
  }, 1000)
}

function getTimerTime() {
  return Math.floor((new Date() - startTime) / 1000)
}

function hide() {
  var x = document.getElementById("box");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
  if (timerElement.style.display === "none") {
    timerElement.style.display = "block";
  } else {
    timerElement.style.display = "none";
  }
}
