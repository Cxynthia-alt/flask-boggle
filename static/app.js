async function getData(word) {
  const res = await axios.get('/validate-guess', { params: { guess: word } });
  return res
}

const form = document.querySelector('#boggle_form');
form.addEventListener('submit', async function (e) {
  e.preventDefault();
  let userInput = document.querySelector('#user_guess_word').value;
  const result = await getData(userInput)

})
