async function getData(word) {
  // const res = await axios.get('http://127.0.0.1:5000/validate-guess');
  const res = await axios.post('/validate-guess', { params: { guess: word } });
  return res
}

const form = document.querySelector('#boggle_form');
form.addEventListener('submit', async function (e) {
  e.preventDefault();
  let userInput = document.querySelector('#user_guess_word').value;
  const result = await getData(userInput)
  console.log(result)
})
