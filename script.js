"use strict";
const btnPlay = document.querySelector(".btn-play");
const sectionPlay = document.querySelector("#play");
const colorSN = document.querySelector(".color-SN");
const colorEI = document.querySelector(".color-EI");
const colorContainer = document.querySelectorAll(".color-container");
const colorBox = document.querySelector(".colorBox");
const letsPlay = document.querySelector(".letsPlay");
const pickColor = document.querySelector(".pickColor");
const chosenColors = document.querySelectorAll(".chosenColor");
const chosenColorBox = document.querySelector(".chosenColors");

// const nextBtn = document.querySelectorAll(".next");
// btnPlay.addEventListener("click", function (e) {
//   e.preventDefault();
//   const sectionAdd = document.createElement("div");
//   const htmlPlay = `The Game begins...`;
//   sectionAdd.insertAdjacentHTML("beforeend", htmlPlay);
//   sectionAdd.classList.add("section");
//   section2.before(sectionAdd);
//   window.scrollTo({
//     top: window.innerHeight,
//     left: 0,
//     behavior: "smooth",
//   });
// });

btnPlay.addEventListener("click", function (e) {
  e.preventDefault();

  sectionPlay.classList.remove("hidden");
  colorSN.classList.add("hidden");

  sectionPlay.scrollIntoView();
});

// colorEI.addEventListener("click", function (e) {
//   colorContainer.forEach((c) => (c.style.opacity = 0.3));
// });

const messageGame = document.createElement("div");
const messageHTML = `You are probably a MBTI`;
messageGame.textContent = messageHTML;
messageGame.style.fontSize = "5rem";
messageGame.style.textAlign = "center";
messageGame.style.color = "white";
// messageGame.style.marginTop = "5rem";
messageGame.style.marginBottom = "6rem";

const gameResultMessage = `Game Result`;

colorContainer.forEach((c) =>
  c.addEventListener("click", function (e) {
    // this.style.display = "none";
    const message1 = e.target.dataset.value;
    // const message2 = e.target.style.backgroundColor;
    const message2 = window.getComputedStyle(e.target).backgroundColor;
    console.log(message1);
    console.log(message2);

    chosenColors.forEach((c) => {
      if (c.dataset.count === e.currentTarget.dataset.count) {
        c.style.backgroundColor = message2;
      }
    });

    // if (!e.currenTarget.closest(".color-btn-containter").nextElementSibling) {
    //   e.currenTarget.nextElementSibling.textContent = "Result";
    // }//not knowing why this does not work

    const nextBtn = e.currentTarget.nextElementSibling;
    console.log(nextBtn.textContent);
    moveNext(nextBtn, ".color-btn-containter", "hiddenColor");

    if (!nextBtn.closest(".color-btn-containter").nextElementSibling) {
      nextBtn.textContent = "Result";
    }
  })
);

const moveNext = function (nextBtn, parentContainer, styleAdd) {
  nextBtn.addEventListener("click", function (e) {
    nextBtn.closest(parentContainer).classList.add(styleAdd);
    if (!nextBtn.closest(parentContainer).nextElementSibling) {
      changeInfo(letsPlay, gameResultMessage);
      changeInfo(pickColor);
      showInfo(colorBox, messageGame);
      // nextBtn.closest(".chosenColors").style.display = "none";
      chosenColorBox.style.display = "none";
    }
    nextBtn
      .closest(parentContainer)
      .nextElementSibling.classList.remove(styleAdd);
  });
};
// moveNext(nextBtn, ".color-btn-containter", "hiddenColor");

// nextBtn.forEach((b) => {
//   b.addEventListener("click", function (e) {
//     this.closest(".color-btn-containter").classList.add("hiddenColor");
//     if (!this.closest(".color-btn-containter").nextElementSibling) {
//       changeInfo(letsPlay, gameResultMessage);
//       changeInfo(pickColor);
//       showInfo(colorBox, messageGame);
//     }
//     this.closest(".color-btn-containter").nextElementSibling.classList.remove(
//       "hiddenColor"
//     );
//   });
// });

// colorBox.append(messageGame);

const changeInfo = function (box, message = "") {
  box.textContent = message;
};

const showInfo = function (box, message) {
  box.append(message);
};

// window.addEventListener("DOMContentLoaded", function () {
//   sectionPlay.classList.add("hidden");
//   window.scrollTo({
//     top: 0,
//     left: 0,
//     behavior: "smooth",
//   });
// });
