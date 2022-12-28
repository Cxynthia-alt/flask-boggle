let resultSection = document.querySelector('#result')
let btn = document.querySelector('#submit')
let countSubmit = 0;
let scoreDiv = document.createElement('div')
let submitDiv = document.createElement('div')


scoreDiv.append(resultSection)
submitDiv.append(resultSection)

// GET request
async function getData(word) {
  const res = await axios.get('/validate-guess', { params: { guess: word } });
  console.log(res.data)
  return res.data
}

// set a timer
let countTime = 0;
function setUpTime() {
  setInterval(function () {
    countTime++
    if (countTime == 60) {
      clearinterval()
      countTime = 0
    }
  }, 1000)
}

// form submission
const form = document.querySelector('#boggle_form');
form.addEventListener('submit', async function (e) {
  if (countTime > 60) {
    return
  }
  e.preventDefault();


  // get the result after checking the word in back-end
  let userInput = document.querySelector('#user_guess_word').value;
  const resultJSON = await getData(userInput)
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
  let subResult = await addData(countSubmit)


  // front-end
  resultSection.innerText = msg
  form.reset();
})


//



async function addData(countSubmit) {
  const res = await axios.post('/score-and-submission-times', {
    submissionCount: countSubmit
  })
}
