//variables
let playing = false;
let score;
let action;
let timeRemaining;
let correctAnswer;
let correctPosition;

//If we click on the start/reset
document.getElementById("startReset").onclick = function () {
  //if we are playing
  if (playing == true) {
    window.location.reload(); //reload page
  } else {
    //change mode to playing
    playing = true;
    //set score to 0
    score = 0;
    //if we are not playing
    document.getElementById("scoreValue").innerHTML = score;
    //show countdown box
    show("timeRemaining");
    timeRemaining = 60;
    document.getElementById("timeRemainingValue").innerHTML = timeRemaining;
    //hide game over box
    hide("gameOver");
    //change button to reset
    document.getElementById("startReset").innerHTML = "Reset Game";
    //start countdown
    startCountdown();
    //generate new Q&A
    generateQA();
  }
};
//if we click on answer Box
for (let i = 1; i < 5; i++) {
  document.getElementById("box" + i).onclick = function () {
    //check if we are playing
    if (playing == true) {
      //yes
      if (this.innerHTML == correctAnswer) {
        //correct answer
        //increase score
        score++;
        document.getElementById("scoreValue").innerHTML = score;
        //hide "wrong" box and show correct box for 1 sec
        hide("wrong");
        show("correct");
        setTimeout(function () {
          hide("correct");
        }, 1000);
        //generate new Q&A
        generateQA();
      } else {
        //wrong answer
        hide("correct");
        show("wrong");
        setTimeout(function () {
          hide("wrong");
        }, 1000);
      }
    }
  };
}

//no
//show try again box for 1 sec

//functions

//start counter
function startCountdown() {
  action = setInterval(function () {
    //reduce time by 1 sec in loops
    timeRemaining--;
    document.getElementById("timeRemainingValue").innerHTML = timeRemaining;
    //timeleft?
    //no->game over
    if (timeRemaining == 0) {
      //game over
      stopCountdown();
      document.getElementById("gameOver").style.display = "block";
      document.getElementById("gameOver").innerHTML =
        "<p>Game Over!</p><p>your score is " + score + ".</p>";
      hide("timeRemaining");
      hide("correct");
      hide("wrong");
      playing = false;
      document.getElementById("startReset").innerHTML = "Start Game";
    }
    //yes->continue
  }, 1000);
}
//stop counter
function stopCountdown() {
  clearInterval(action);
}
//hide an element
function hide(Id) {
  document.getElementById(Id).style.display = "none";
}
//show an element
function show(Id) {
  document.getElementById(Id).style.display = "block";
}
//generate multiplication question and multiple answers
function generateQAMult() {
  //to have a variable between 1 and 10 randomly
  let x = 1 + Math.round(9 * Math.random());
  let y = 1 + Math.round(9 * Math.random());
  correctAnswer = x * y;
  document.getElementById("question").innerHTML = x + "x" + y;
  correctPosition = 1 + Math.round(3 * Math.random());
  //get the corresponding box and fill it with the correct answer
  document.getElementById("box" + correctPosition).innerHTML = correctAnswer;
  //Array to store all anwser correct and wrong
  let answers = [];
  //anwsers.push(correctAnswer);
  answers = [correctAnswer];

  //fill other boxes with wrong answers
  for (i = 1; i < 5; i++) {
    if (i !== correctPosition) {
      //a wrong answer
      let wrongAnswer;
      do {
        //we execute this code at least one to define wrongAnswer then we check the condition
        wrongAnswer =
          (1 + Math.round(9 * Math.random())) *
          (1 + Math.round(9 * Math.random()));
      } while (answers.indexOf(wrongAnswer) > -1); //if true it means wrongAnswer is inside Array so we "do" again
      /*//other way to check wrongAnswer is not duplicate
      function check() {
        if (answers.includes(wrongAnswer)) {
          console.log("nouveau wrongAnswer");
          wrongAnswer =
            (1 + Math.round(9 * Math.random())) *
            (1 + Math.round(9 * Math.random()));
        } else {
          answers.push(wrongAnswer);
        }
      }
      if (answers.includes(wrongAnswer)) {
        console.log("nouveau wrongAnswer");
        wrongAnswer =
          (1 + Math.round(9 * Math.random())) *
          (1 + Math.round(9 * Math.random()));
        check(); //fonction récursive
      } else {
        answers.push(wrongAnswer);
      }
      console.log(answers);*/
      //get the current box in the loop and assing wrong answer
      document.getElementById("box" + i).innerHTML = wrongAnswer;
      answers.push(wrongAnswer);
    }
  }
}
//generate dision question and multiple answers
function generateQADiv() {
  let x = 1 + Math.round(9 * Math.random());
  let y = 1 + Math.round(9 * Math.random());

  correctAnswerDecimal = x / y;
  correctAnswer = correctAnswerDecimal.toFixed(3);
  document.getElementById("question").innerHTML = x + "/" + y;
  correctPosition = 1 + Math.round(3 * Math.random());
  document.getElementById("box" + correctPosition).innerHTML = correctAnswer;
  let answers = [correctAnswer];
  for (let i = 1; i < 5; i++) {
    if (i !== correctPosition) {
      let wrongAnswer;
      do {
        wrongAnswer =
          (1 + Math.round(9 * Math.random())) /
          (1 + Math.round(9 * Math.random()));
        twoDecimalWrongAnswer = wrongAnswer.toFixed(3);
      } while (answers.indexOf(twoDecimalWrongAnswer) > -1);
      document.getElementById("box" + i).innerHTML = twoDecimalWrongAnswer;
      answers.push(twoDecimalWrongAnswer);
    }
  }
}
//generate addition question and multiple answers
function generateQAAdd() {
  let x = 1 + Math.round(99 * Math.random());
  let y = 1 + Math.round(99 * Math.random());

  correctAnswer = x + y;
  document.getElementById("question").innerHTML = x + "+" + y;
  correctPosition = 1 + Math.round(3 * Math.random());
  document.getElementById("box" + correctPosition).innerHTML = correctAnswer;
  let answers = [correctAnswer];
  for (let i = 1; i < 5; i++) {
    if (i !== correctPosition) {
      let wrongAnswer;
      do {
        wrongAnswer =
          1 +
          Math.round(99 * Math.random()) +
          (1 + Math.round(99 * Math.random()));
      } while (answers.indexOf(wrongAnswer) > -1);
      document.getElementById("box" + i).innerHTML = wrongAnswer;
      answers.push(wrongAnswer);
    }
  }
}
//generate subtraction question and multiple answers
function generateQASub() {
  let x;
  let y;

  do {
    x = 1 + Math.round(99 * Math.random());
    y = 1 + Math.round(99 * Math.random());
    correctAnswer = x - y;
  } while (correctAnswer < 0);
  document.getElementById("question").innerHTML = x + "-" + y;
  correctPosition = 1 + Math.round(3 * Math.random());
  document.getElementById("box" + correctPosition).innerHTML = correctAnswer;
  let answers = [correctAnswer];
  for (let i = 1; i < 5; i++) {
    if (i !== correctPosition) {
      let wrongAnswer;
      do {
        do {
          wrongAnswer =
            1 +
            Math.round(99 * Math.random()) -
            (1 + Math.round(99 * Math.random()));
        } while (wrongAnswer < 0);
      } while (answers.indexOf(wrongAnswer) > -1);
      document.getElementById("box" + i).innerHTML = wrongAnswer;
      answers.push(wrongAnswer);
    }
  }
}

function generateQA() {
  let randomNum = 1 + Math.round(3 * Math.random());
  switch (randomNum) {
    case 1:
      generateQAMult();
      break;
    case 2:
      generateQAAdd();
      break;
    case 3:
      generateQADiv();
      break;
    case 4:
      generateQASub();
      break;
  }
}
