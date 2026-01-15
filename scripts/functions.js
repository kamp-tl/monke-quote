const RANDOM_QUOTE_API_URL = 'https://thequoteshub.com/api/'
export const quoteDisplayElement = document.getElementById('quoteDisplay')
export const quoteInputElement = document.getElementById('quoteInput')
const timerElement = document.getElementById('timer')
const quoteWall = document.getElementById('quoteWall')
let counter = 0;
let hasStarted = false
let startTime
let timerInterval

export async function getRandomQuote() {	//async await ✓ 15%
	try {
		let quote = null
		let fetchCounter = 0;
		//keep searching until you find a quote with acceptable length
		while ((quote === null || quote.length > 100)|| quote.length < 65){
			const response = await fetch(RANDOM_QUOTE_API_URL) //fetch ✓ 20%
			const data = await response.json()
			//console.log(data.quote)
			//kanye api key is .quote quotehub is .text
			//change uncommon characters 
			quote=data.text
			quoteEdit(quote)
		}
		if (fetchCounter > 50){
			throw new Error('over 50 fetch attempts')
		}
		return quote
	}   catch(err){
		    console.error('quote fetch error: ', err);
            return 'Error Fetching Quote';
        }
	}
//split quote into array of its characters and create a span for each 	
export async function renderNewQuote() {
	const quote = await getRandomQuote()
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

export function startTimer() {
	if(timerInterval) clearInterval(timerInterval)
  timerElement.innerText = 0
  startTime = new Date()
  timerInterval = setInterval(() => {
    timerElement.innerText = getTimerTime()
  }, 1000)
}

export function getTimerTime() {
  return Math.floor((new Date() - startTime) / 1000)
}

export function hide() {
  let x = document.getElementById("box");
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

export function quoteEdit(quote){
	quote=quote.replaceAll("’","'")
		quote=quote.replaceAll("—","-")
		quote=quote.replaceAll('“','"')
		quote=quote.replaceAll('  ',' ')
		quote=quote.replaceAll('…','...')
        return quote
}