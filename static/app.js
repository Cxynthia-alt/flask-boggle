// set up variables
let resultSection = document.querySelector('#result')
let countSubmit = 0;
let highestScore_point = 0;
let resultMsg = document.createElement('div')
let scoreDiv = document.createElement('div')
let submitDiv = document.createElement('div')
let highestScore = document.createElement('p')


resultMsg.setAttribute('id', 'resultMsg')
scoreDiv.setAttribute('id', 'score')
submitDiv.setAttribute('id', 'submitCount')


// GET request
async function getData(word) {
  const res = await axios.get('/validate-guess', { params: { guess: word } });
  return res.data
}

// set a timer
let countTime = 0;
setInterval(async function () {
  countTime++
  if (countTime == 60) {
    // make the api call and update how many times the game is played
    await addData(countSubmit)
    let resultJSON = await getData()
    highestScore_point = resultJSON['highest_score']
    clearinterval()
    countTime = 0
  }
}, 1000)


// form submission
const form = document.querySelector('#boggle_form');
form.addEventListener('submit', async function (e) {
  if (countTime > 60) {
    return
  }
  e.preventDefault();


  // get the result after checking the word in back-end
  let userInput = document.querySelector('#user_guess_word').value;
  let resultJSON = await getData(userInput)
  let result = resultJSON[userInput]
  let msg, score
  if (result == 'ok') {
    score = resultJSON['score']
    msg = "Dingdingding!"
    scoreDiv.innerText = 'Score:' + score
  } else if (result == 'not-on-board') { msg = 'The word is not on board' }
  else msg = 'It\'s not a word'

  // form submission counts
  countSubmit++


  // front-end
  resultMsg.innerText = msg
  submitDiv.innerText = 'Number of validation: ' + countSubmit
  highestScore.innerText = "Highest Score: " + highestScore_point


  resultSection.append(resultMsg)
  resultSection.append(scoreDiv)
  resultSection.append(submitDiv)
  resultSection.append(highestScore)
  form.reset();
})


async function addData(countSubmit) {
  const res = await axios.post('/score-and-submission-times', {
    data: {
      submissionCount: countSubmit
    }
  })
}
