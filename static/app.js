let resultSection = document.querySelector('#result')
let btn = document.querySelector('#submit')

// GET request
async function getData(word) {
  const res = await axios.get('/validate-guess', { params: { guess: word } });
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

  let userInput = document.querySelector('#user_guess_word').value;
  const resultJSON = await getData(userInput)
  let result = resultJSON[userInput]
  let msg, score
  if (result == 'ok') {
    score = result.length
    msg = "Dingdingding!"
  } else if (result == 'not-on-board') { msg = 'The word is not on board' }
  else msg = 'It\'s not a word'

  // front-end
  resultSection.innerText = msg
  form.reset();
})


// POST request
let countSubmit = 0;
btn.onclick = function () {
  countSubmit++;
}


async function addData(countSubmit) {
  const res = await axios.post('/score-and-submission-times', {
    submissionCount: countSubmit
  })

}
