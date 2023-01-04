// set up variables
let resultSection = document.querySelector('#result')
let form = document.querySelector('#boggle_form');
let resultMsg = document.createElement('div')
let showScore = document.createElement('div')
let resultWordList = document.createElement('ul')
let resultWord = document.createElement('li')



resultMsg.setAttribute('class', 'resultMsg')
showScore.setAttribute('class', 'showScore')
resultWordList.setAttribute('class', 'wordList')
resultSection.append(resultWordList)


class BoogleGame {
  constructor() {
    this.score = 0;
    this.countTime = 0;
    this.timer = setInterval(tick, 1000)
  }

//GET reuquest to check the word
async function getData(word) {
  const res = await axios.get('/validate-guess', { params: { guess: word } });
  return res.data
}

// set a timer

async function tick() {
  this.countTime++
  if (this.countTime == 60) {
    clearInterval(this.timer)
    await addData()
    this.countTime = 0
  }

}


// form submission

form.addEventListener('submit', async function (e) {
  e.preventDefault();


  // get the result after checking the word in back-end
  let userInput = document.querySelector('#user_guess_word').value;
  let resultJSON = await getData(userInput)
  let result = resultJSON[userInput]
  let msg
  if (result == 'ok') {
    msg = "Dingdingding!"
    this.score += userInput.length
    resultWord.innerText = userInput
  } else if (result == 'not-on-board') { msg = 'The word is not on board' }
  else msg = 'It\'s not a word'

  //get the highest score

  // front-end
  resultMsg.innerText = msg

  resultWordList.append(resultWord)
  resultSection.append(resultMsg)

  form.reset();
})

//POST request to update score/count_submit
async function addData() {
  const res = await axios.post('/score-and-submission-times', { score: this.score })
  if (res.data.brokeRecord) {
    showScore.innerText = 'New record: ' + this.score
  } else {
    showScore.innerText = 'Final record: ' + this.score
  }
  resultSection.append(showScore)
}

}
