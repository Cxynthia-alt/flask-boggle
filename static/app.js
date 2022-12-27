let resultSection = document.querySelector('#result')
async function getData(word) {
  const res = await axios.get('/validate-guess', { params: { guess: word } });
  return res.data
}

const form = document.querySelector('#boggle_form');
form.addEventListener('submit', async function (e) {
  e.preventDefault();

  let userInput = document.querySelector('#user_guess_word').value;
  const resultJSON = await getData(userInput)
  let result = resultJSON[userInput]
  let msg
  if (result == 'ok') { msg = "Dingdingding!" }
  else if (result == 'not-on-board') { msg = 'The word is not on board' }
  else msg = 'It\'s not a word'

  // front-end
  let resultDiv = document.createElement('div')
  resultDiv.textContent = msg
  resultDiv.setAttribute('class', 'resultDiv')
  resultSection.appendChild(resultDiv)
  form.reset();

})
