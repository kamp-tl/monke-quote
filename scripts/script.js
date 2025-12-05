const RANDOM_QUOTE_API_URL = 'https://thequoteshub.com/api/'
const quoteDisplayElement = document.getElementById('quoteDisplay')
const quoteInputElement = document.getElementById('quoteInput')
const timerElement = document.getElementById('timer')
const quoteWall = document.getElementById('quoteWall')
// var count = document.getElementById('count');
// var input = document.getElementById('input');
var counter = 0;
let hasStarted = false 

quoteInputElement.addEventListener('keydown', (e) => {
	if (e.code === 'Space' && !hasStarted) {
e.preventDefault()
hasStarted=true
renderNewQuote()
startTimer();
}
})


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
	//console.log("display" + displayquote)
if (allCorrect) {
	const quotewallpaper = document.createElement("P")
	quotewallpaper.textContent = displayquote
	quoteWall.appendChild(quotewallpaper)
	quotewallpaper.classList.add('background-text')
}

if (allCorrect && counter < 5) renderNewQuote()
if (allCorrect && counter >= 5) hide()

})

// function limitLength (quote) {
// 	if (quote.length > 20) {
// 		getRandomQuote()
// 		return
// 	}
// }
async function getRandomQuote() {
	try {
		var quote = null
		let attempts = 0
		while ((quote === null || quote.length > 100)|| quote.length < 50){
	const response = await fetch(RANDOM_QUOTE_API_URL)
	let data = await response.json()
	quote=data.text
	quote=quote.replaceAll("’","'")
	quote=quote.replaceAll("—","-")
	//console.log(quote)
	attempts++
		}
	} catch(err){
		console.error('quote fetch error', err);
    return 'Error fetching quote';
  }
  return quote
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
let timerInterval

function startTimer() {
	if(timerInterval) clearInterval(timerInterval)
  timerElement.innerText = 0
  startTime = new Date()
  timerInterval = setInterval(() => {
    timerElement.innerText = getTimerTime()
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
