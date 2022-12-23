async function getData() {
  const res = await axios.get('http://127.0.0.1:5000/validate-guess');

}

const form = document.querySelector('#boggle_form');
form.addEventListener('submit', async function (e)){
  e.preventDefault();
  let userInput = document.querySelector('#user_guess_word').value;
}
