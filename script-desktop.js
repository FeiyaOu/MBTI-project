"use strict";
const btnPlay = document.querySelector(".btn-play");
const sectionPlay = document.querySelector("#play");
const navBar = document.querySelector(".navBar");
const navBarMobile = document.querySelector(".navBarMobile");
const colorSN = document.querySelector(".color-SN");
const colorEI = document.querySelector(".color-EI");
const colorContainer = document.querySelectorAll(".color-container");
const colorBtnContainers = document.querySelectorAll(".color-btn-containter");
const colorBox = document.querySelector(".colorBox");
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
const GameMessage2 = document.querySelector(".pickColor").textContent;
const infoBox = document.querySelectorAll(".info-box");
const btnSurvey = document.querySelector(".btn-survey");

//navigation bar mouse event
navBar.addEventListener("mouseover", function (e) {
  e.target.style.transition = "all 0.5s ease";
  e.target.style.backgroundColor = "white";
  e.target.style.color = "black";
});

navBar.addEventListener("mouseout", function (e) {
  e.target.style.transition = "all 0.5s ease";
  e.target.style.backgroundColor = "black";
  e.target.style.color = "white";
});

//section2 titles mouse event
infoBox.forEach((Box) => {
  Box.addEventListener("mouseover", function () {
    Box.children[0].style.backgroundColor = "rgb(168, 225, 180)";
    Box.children[0].style.color = "black";
    Box.children[0].style.transition = "all 0.5s ease";
  });
});
infoBox.forEach((Box) => {
  Box.addEventListener("mouseout", function () {
    Box.children[0].style.backgroundColor = "black";
    Box.children[0].style.color = "white";
    Box.children[0].style.transition = "all 0.5s ease";
  });
});

//game result table content
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

//section1 play button
btnPlay.addEventListener("click", function (e) {
  e.preventDefault();
  btnPlay.textContent = "Play Again";
  btnPlay.style.fontSize = "2rem";
  sectionPlay.classList.remove("hidden");
  colorBtnContainers.forEach((cbc) => {
    if (cbc.dataset.count !== "1") {
      cbc.classList.add("hiddenColor");
    }
  });

  btnDownload.classList.add("hiddenTable");

  //sectionAdd play game;
  const a1 = Array.from(colorBtnContainers);
  const colorBtnContainerEI = a1.find(
    (div) => div.getAttribute("data-count") === "1"
  );

  colorBtnContainerEI.classList.remove("hiddenColor");

  chosenColorBox.style.display = "";

  changeInfo(pickColor, GameMessage2);

  resultTable.classList.add("hiddenTable");

  chosenColors.forEach((cc) => (cc.style.backgroundColor = "black"));

  sectionPlay.scrollIntoView();
});

//create pdf with resultTable, create download function;

async function downloadPDF() {
  resultTable.querySelector(".table-colors").style.color = "black";
  const { jsPDF } = window.jspdf;

  // Use html2canvas to capture the form as an image
  const canvas = await html2canvas(resultTable, { scale: 2 });
  const imgData = canvas.toDataURL("image/png");

  const pdf = new jsPDF();
  const imgProps = pdf.getImageProperties(imgData);
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

  pdf.addImage(imgData, "PNG", 0, 50, pdfWidth, pdfHeight);
  pdf.save("Game Result.pdf");
}

//pdf download event
const throttledDownloadPDF = _.throttle(downloadPDF, 5000, {
  leading: true,
  trailing: false,
});

const btnDownload = document.querySelector(".download");
btnDownload.addEventListener("click", function () {
  throttledDownloadPDF();
});
/////////////////////
//play game,choose colors
colorContainer.forEach((c) =>
  c.addEventListener("click", function (e) {
    const message1 = e.target.dataset.value;

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

//play game, next button function
const moveNext = function (nextBtn, parentContainer, styleAdd) {
  nextBtn.addEventListener("click", function (e) {
    nextBtn.closest(parentContainer).classList.add(styleAdd);
    if (!nextBtn.closest(parentContainer).nextElementSibling) {
      changeInfo(pickColor);

      chosenColorBox.style.display = "none";
      resultTable.classList.remove("hiddenTable");
      btnDownload.classList.remove("hiddenTable");
    }
    nextBtn
      .closest(parentContainer)
      .nextElementSibling.classList.remove(styleAdd);
  });
};

const changeInfo = function (box, message = "") {
  box.textContent = message;
};

const showInfo = function (box, message) {
  box.append(message);
};

const hideInfo = function (box, message) {
  box.removeChild(message);
};

/////////////
//section4 survey slider

btnSurvey.addEventListener("click", function () {
  btnSurvey.closest(".surveyInvite").classList.add("hiddenSurvey");
  btnSurvey.parentElement.nextElementSibling.classList.remove("hiddenSurvey");
  for (let i = 1; i < 7; i++) {
    clearRadioSelection(`question${i}`);
  }
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
    btnSurvey.closest(".surveyInvite").classList.remove("hiddenSurvey");
    btnSurvey.parentElement.nextElementSibling.classList.add("hiddenSurvey");
  } else {
    btnSubmit.classList.add("hiddenSurvey");
    currclick--;
  }
  slidesMove(currclick);
};

btnL.addEventListener("click", previousSlide);
btnR.addEventListener("click", nextSlide);

//section4 submit button
btnSubmit.addEventListener("click", function () {
  btnSubmit.parentElement.classList.add("hiddenSurvey");
  btnSubmit.parentElement.nextElementSibling.classList.remove("hiddenSurvey");
});

//section4 back button
const btnBack = document.querySelector(".btn-back");
btnBack.addEventListener("click", function () {
  currclick = 0;
  btnSubmit.classList.add("hiddenSurvey");
  btnSurvey.closest(".surveyInvite").classList.remove("hiddenSurvey");
  btnSubmit.parentElement.nextElementSibling.classList.add("hiddenSurvey");
});

function clearRadioSelection(name) {
  const radios = document.getElementsByName(name);
  console.log(radios);
  for (let i = 0; i < radios.length; i++) {
    radios[i].checked = false;
  }
}

//section 2 modal

const boxOpenModal = document.querySelectorAll(".info-box");
const closeBoxModal = document.querySelectorAll(".close-infoModal");
const infoModalBox = document.querySelectorAll(".info-modal");
const openModal = function (infoModal) {
  infoModal.classList.remove("hiddenInfoModal");
};

const closeModal = function (infoModal) {
  infoModal.classList.add("hiddenInfoModal");
};

boxOpenModal.forEach((box) => {
  box.addEventListener("click", function () {
    openModal(infoModalBox[box.dataset.count - 1]);
  });
});

closeBoxModal.forEach((box) => {
  box.addEventListener("click", function () {
    closeModal(infoModalBox[box.dataset.count - 1]);
  });
});
