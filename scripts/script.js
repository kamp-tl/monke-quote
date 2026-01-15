import {getRandomQuote, renderNewQuote, startTimer, getTimerTime, hide, quoteInputElement, quoteDisplayElement} from './functions.js'

//const RANDOM_QUOTE_API_URL = 'https://api.kanye.rest/'
//const RANDOM_QUOTE_API_URL = 'https://thequoteshub.com/api/'
//const quoteDisplayElement = document.getElementById('quoteDisplay')
//const quoteInputElement = document.getElementById('quoteInput')
// const timerElement = document.getElementById('timer')
// const quoteWall = document.getElementById('quoteWall')
// let count = document.getElementById('count');
// let input = document.getElementById('input');
let counter = 0;
let hasStarted = false
let startTime
let timerInterval
//add an event listener to the textarea to run every input
quoteInputElement.addEventListener('input', (e) => { //user interaction ✓ 15%
//start game and prevent keypress besides space 
if (e.code === 'Space' && !hasStarted) {
	e.preventDefault()
	hasStarted=true
	renderNewQuote()
	startTimer();
	} else if (e.code !== 'Space' && !hasStarted) {
		e.preventDefault()
	}
 const arrayQuote = quoteDisplayElement.querySelectorAll('span')
 const arrayInput = quoteInputElement.value.split('')
//for every new letter compare each character of both arrays and add appropriate class
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
//if the arrays match then add the quote to the wall 
	let displayquote = arrayInput.join('')
if (allCorrect) {
	const quotewallpaper = document.createElement("P")
	quotewallpaper.textContent = displayquote
	quoteWall.appendChild(quotewallpaper)
	quotewallpaper.classList.add('background-text')
}
//
if (allCorrect && counter < 5) renderNewQuote()
if (allCorrect && counter >= 5) hide()
// if there are less than five quotes, send to the wall, otherwise hide the container 
})

// async function getRandomQuote() {	//asynch await ✓ 15%
// 	try {
// 		let quote = null
// 		let fetchCounter = 0;
// 		//keep searching until you find a quote with acceptable length
// 		while ((quote === null || quote.length > 100)|| quote.length < 65){
// 			const response = await fetch(RANDOM_QUOTE_API_URL) //fetch ✓ 20%
// 			const data = await response.json()
// 			//console.log(data.quote)
// 			//kanye api key is .quote quotehub is .text
// 			//change uncommon characters 
// 			quote=data.text
// 			quoteEdit(quote)
// 		}
// 		if (fetchCounter > 50){
// 			throw new Error('over 50 fetch attempts')
// 		}
// 		return quote
// 	} catch(err){
// 		console.error('quote fetch error: ', err);
//     return 'Error Fetching Quote';
//   }
// 	}
// //split quote into array of its characters and create a span for each 	
// async function renderNewQuote() {
// 	const quote = await getRandomQuote()
// 	quoteDisplayElement.innerHTML = ''
// 	quote.split('').forEach(character => {
// 		const characterSpan = document.createElement('span')
// 		characterSpan.innerText = character
// 	 	quoteDisplayElement.appendChild(characterSpan)
// 	})
// 	quoteInputElement.value = null
// 	counter++
// 	startTimer() 
// }

// function startTimer() {
// 	if(timerInterval) clearInterval(timerInterval)
//   timerElement.innerText = 0
//   startTime = new Date()
//   timerInterval = setInterval(() => {
//     timerElement.innerText = getTimerTime()
//   }, 1000)
// }

// function getTimerTime() {
//   return Math.floor((new Date() - startTime) / 1000)
// }

// function hide() {
//   let x = document.getElementById("box");
//   if (x.style.display === "none") {
//     x.style.display = "block";
//   } else {
//     x.style.display = "none";
//   }
//   if (timerElement.style.display === "none") {
//     timerElement.style.display = "block";
//   } else {
//     timerElement.style.display = "none";
//   }
// }

// function quoteEdit(quote){
// 	quote=quote.replaceAll("’","'")
// 		quote=quote.replaceAll("—","-")
// 		quote=quote.replaceAll('“','"')
// 		quote=quote.replaceAll('  ',' ')
// 		quote=quote.replaceAll('…','...')
// }
