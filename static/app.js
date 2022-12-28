let resultSection = document.querySelector('#result')
async function getData(word) {
  const res = await axios.get('/validate-guess', { params: { guess: word } });
  return res.data
}

const form = document.querySelector('#boggle_form');
form.addEventListener('submit', async function (e) {
  e.preventDefault();
  setTimeout(function () {
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
    resultSection.innerText = msg + '. Youre score is ' + score
    form.reset();
    document.querySelector('#user_guess_word').value = "";
  }, 60000)

})
