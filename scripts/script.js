import {getRandomQuote, renderNewQuote, startTimer, getTimerTime, hide, quoteInputElement, quoteDisplayElement} from './functions.js'
import {counter, hasStarted, startTime,timerInterval} from './variables.js'

//add an event listener to the textarea to run every input
quoteInputElement.addEventListener('input', (e) => { //user interaction 15% ✓
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


//script.js/functions.js/variables.js are importing data across files 3% ✓
//runs as expected 5% ✓
//engages user 5% ✓
//runs no errors 10% ✓
//commits 5% ✓
//README 2% ✓
//effort 5% you tell me 