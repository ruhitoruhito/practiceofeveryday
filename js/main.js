"use strict";
{
  const question = document.querySelector(".question");
  const choices = document.querySelector(".choices");
  const next = document.querySelector(".next");
  const result = document.querySelector(".result");
  const resultLabel = document.querySelector(".result > span");
  const lis = document.querySelectorAll(".choices > li");

  const quizSet = [
    { q: "what is A??", c: ["A0", "A1", "A2"] },
    { q: "what is B??", c: ["B0", "B1", "B2"] },
    { q: "what is C??", c: ["C0", "C1", "C2"] },
  ];

  let currentNum = 0;
  let score = 0;

  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i - 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }
  function checkAnswer(li) {
    if (li.textContent === quizSet[currentNum].c[0]) {
      li.classList.add("correct");
      score++;
    } else {
      li.classList.add("wrong");
    }
    choices.classList.add("disabled");
    next.classList.remove("disabled");
  }

  function setQuiz() {
    choices.classList.remove("disabled");
    next.classList.add("disabled");
    question.textContent = quizSet[currentNum].q;

    const shuffledChoices = shuffle([...quizSet[currentNum].c]);
    while (choices.firstChild) {
      choices.removeChild(choices.firstChild);
    }
    for (let i = 0; i < quizSet[currentNum].c.length; i++) {
      const li = document.createElement("li");
      li.textContent = shuffledChoices[i];
      li.addEventListener("click", () => {
        checkAnswer(li);
      });
      choices.appendChild(li);
    }
    if(currentNum === quizSet.length - 1){
        next.textContent = "Show Result"
    }
  }
  setQuiz();
  next.addEventListener("click", () => {
    if (currentNum === quizSet.length - 1) {
      result.classList.remove("hidden");
      resultLabel.textContent = `　　${score} / ${quizSet.length}`
    } else {
      currentNum++;
      setQuiz();
    }
  });
}
