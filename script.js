"use strict";
const btnPlay = document.querySelector(".btn-play");
const sectionPlay = document.querySelector("#play");
const colorSN = document.querySelector(".color-SN");
const colorEI = document.querySelector(".color-EI");
const colorContainer = document.querySelectorAll(".color-container");
const colorBtnContainers = document.querySelectorAll(".color-btn-containter");
const colorBox = document.querySelector(".colorBox");
const letsPlay = document.querySelector(".letsPlay");
const pickColor = document.querySelector(".pickColor");
const chosenColors = document.querySelectorAll(".chosenColor");
const chosenColorBox = document.querySelector(".chosenColors");
const typeEI = document.querySelector(".tableInfo-typeEI");
const typeSN = document.querySelector(".tableInfo-typeSN");
const typeTF = document.querySelector(".tableInfo-typeTF");
const typeJP = document.querySelector(".tableInfo-typeJP");
const tableTypes = document.querySelectorAll(".table-type");
const tableColors = document.querySelectorAll(".table-color");
const tableContent = document.querySelectorAll(".table-content");
const resultTable = document.querySelector(".result");
const GameMessage1 = document.querySelector(".letsPlay").textContent;
const GameMessage2 = document.querySelector(".pickColor").textContent;
const btnSurvey = document.querySelector(".btn-survey");

const tableContentDetails = [
  [
    {
      type: "E",
      description: `Extraverts are energized by 
social interactions and enjoy engaging with a wide range of 
people and activities.`,
    },
    {
      type: "I",
      description: `Introverts recharge by spending 
  time alone and prefer deep, meaningful conversations 
  over large social gatherings.`,
    },
  ],
  [
    {
      type: "S",
      description: `Sensors focus on the present and 
    concrete details, preferring to deal with information that 
    is tangible and practical.`,
    },
    {
      type: "N",
      description: `Intuitives are future-oriented 
    and enjoy thinking about possibilities and abstract concepts.`,
    },
  ],
  [
    {
      type: "T",
      description: `Thinkers prioritize logic and objectivity,
       making decisions based on facts and rational analysis.`,
    },
    {
      type: "F",
      description: `Feelers prioritize harmony and empathy, 
    making decisions based on values and the impact on others.`,
    },
  ],
  [
    {
      type: "J",
      description: `Judgers prefer structure and organization, enjoying 
    plans and schedules that allow them to control and predict their environment.`,
    },
    {
      type: "P",
      description: `Perceivers prefer flexibility and spontaneity, 
    enjoying an open-ended approach that allows them to adapt to new information.`,
    },
  ],
];

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
  colorBtnContainers.forEach((cbc) => {
    if (cbc.dataset.count !== "1") {
      cbc.classList.add("hiddenColor");
    }
  });

  const a1 = Array.from(colorBtnContainers);
  const colorBtnContainerEI = a1.find(
    (div) => div.getAttribute("data-count") === "1"
  );

  colorBtnContainerEI.classList.remove("hiddenColor");

  // colorSN.classList.add("hidden");
  chosenColorBox.style.display = "";
  changeInfo(letsPlay, GameMessage1);
  changeInfo(pickColor, GameMessage2);
  messageGame.remove();
  resultTable.classList.add("hiddenTable");

  chosenColors.forEach((cc) => (cc.style.backgroundColor = "black"));

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

    tableTypes.forEach((t) => {
      if (t.dataset.count === e.currentTarget.dataset.count) {
        t.textContent = e.target.dataset.value;
        t.style.color = message2;
      }
    });

    tableColors.forEach((cl) => {
      if (cl.dataset.count === e.currentTarget.dataset.count) {
        cl.style.backgroundColor = message2;
        cl.textContent = e.target.dataset.info;
      }
    });

    // const t1 = tableContentDetails[+e.currentTarget.dataset.count - 1];
    // console.log(t1);

    tableContent.forEach((tc) => {
      if (tc.dataset.count === e.currentTarget.dataset.count) {
        const t1 = tableContentDetails[+e.currentTarget.dataset.count - 1];
        const t2 = t1.flat();
        const t3 = t2.find((obj) => obj.type === e.target.dataset.value);
        console.log(t3);
        tc.textContent = t3.description;
      }
    });

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
      resultTable.classList.remove("hiddenTable");
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

const hideInfo = function (box, message) {
  box.removeChild(message);
};

// window.addEventListener("DOMContentLoaded", function () {
//   sectionPlay.classList.add("hidden");
//   window.scrollTo({
//     top: 0,
//     left: 0,
//     behavior: "smooth",
//   });
// });
/////////////
//survey slider

btnSurvey.addEventListener("click", function () {
  btnSurvey.closest(".surveyInvite").classList.add("hiddenSurvey");
  btnSurvey.parentElement.nextElementSibling.classList.remove("hiddenSurvey");
});

//slide effect
const surveyQs = document.querySelectorAll(".survey-question");
const btnL = document.querySelector(".survey-btn-left");
const btnR = document.querySelector(".survey-btn-right");
const btnSubmit = document.querySelector(".survey-submit");

const slidesMove = function (clickCount) {
  surveyQs.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - clickCount)}%)`) //not 100*${i} but ${100*i}
  );
};

slidesMove(0);

let currclick = 0;
const maxclick = surveyQs.length;

const nextSlide = function () {
  if (currclick === maxclick - 1) {
    currclick = maxclick - 1;
  } else if (currclick === maxclick - 2) {
    btnSubmit.classList.remove("hiddenSurvey");
    currclick++;
  } else {
    currclick++;
  }
  slidesMove(currclick);
};

const previousSlide = function () {
  if (currclick === 0) {
    currclick = 0;
  } else {
    currclick--;
  }
  slidesMove(currclick);
};

btnL.addEventListener("click", previousSlide);
btnR.addEventListener("click", nextSlide);

btnSubmit.addEventListener("click", function () {
  btnSubmit.parentElement.classList.add("hiddenSurvey");
  btnSubmit.parentElement.nextElementSibling.classList.remove("hiddenSurvey");
});
