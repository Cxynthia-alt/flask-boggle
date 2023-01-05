"use strict";
const resultSection = document.querySelector("#result");
const resultMsg = document.createElement("div");
const showScore = document.createElement("div");
const resultWordList = document.createElement("ul");
const resultWord = document.createElement("li");
const ERR_MSG_BY_ERR_CODE = {
  ok: "Dingdingding!",
  "not-on-board": "The word is not on board",
};

resultMsg.setAttribute("class", "resultMsg");
showScore.setAttribute("class", "showScore");
resultWordList.setAttribute("class", "wordList");


// eslint-disable-next-line no-unused-vars
class BoogleGame {
  constructor() {
    this.score = 0;
    this.countTime = 0;
    this.timer = setInterval(this.tick.bind(this), 1000);
    this.form = document.querySelector("#boggle_form");
    this.form.addEventListener("submit", this.eventHandler.bind(this));
  }

  //GET reuquest to check the word
  static async getData(word) {
    // eslint-disable-next-line no-undef
    const res = await axios.get("/validate-guess", { params: { guess: word } });
    return res.data;
  }

  // set a timer

  async tick() {
    this.countTime++;
    if (this.countTime === 60) {
      clearInterval(this.timer);
      await this.addData();
      this.countTime = 0;
    }
  }

  // form submission

  async eventHandler(e) {
    e.preventDefault();

    // get the result after checking the word in back-end
    const userInput = document.querySelector("#user_guess_word").value;
    const resultJSON = await BoogleGame.getData(userInput);
    const result = resultJSON[userInput];
    const msg = ERR_MSG_BY_ERR_CODE[result] || "It's not a word";
    if (result === "ok") {
      this.score += userInput.length;
      resultWord.innerText = userInput;
      resultWordList.append(resultWord);
      resultSection.append(resultWordList);
    }

    resultMsg.innerText = msg;

    resultSection.append(resultMsg);

    this.form.reset();
  }

  //POST request to update score/count_submit
  async addData() {
    const res = await axios.post("/score-and-submission-times", {
      score: this.score,
    });
    showScore.innerText =
      `${res.data.brokenRecord ? "New" : "Final"} record: ` + this.score;
    resultSection.append(showScore);
  }
}

new BoogleGame();
