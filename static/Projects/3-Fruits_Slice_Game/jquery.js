//when we load the page we are not playing
//Click on start/reset button
/////Are we playing?
////////yes
////////////reload page
////////no
////////////show trials left
////////////change button text to "reset game"
////////////1.create a random fruit
////////////define a random step
////////////2.move fruit down one step every 30sec
////////////Is fruit too low?
///////////////no => repeat nb2
///////////////yes => any trials left ?
//////////////////yes => repeat nb1
//////////////////no => show game over, button text: start game

//Slice a fruit
/////play sound
/////explode fruit

//when we load the page we are not playing
var playing = false;
var score;
var trialsLeft;
var fruits = [
  "apple",
  "banana",
  "cherries",
  "grapes",
  "guava",
  "mango",
  "orange",
  "pear",
  "pineapple",
];
var step;
var action;

$(function () {
  //Click on start/reset button
  $("#startreset").on("click", function () {
    //Are we playing?
    if (playing == true) {
      //yes
      //reload page
      window.location.reload();
    } else {
      //no, we are not playing
      playing = true; // game initiated
      score = 0; //set score to 0
      $("#scorevalue").html(score);
      //show trials left
      $("#trialsLeft").show();
      trialsLeft = 3; //initial number of trial
      addHearts();
      //hide game over box
      $("#gameOver").hide();
      //change button text to "reset game"
      $("#startreset").html("Reset Game");
      //start sending fruits
      startAction();
    }
  });

  $("#fruit1").on("mouseover", function () {
    score++;
    $("#scorevalue").html(score); //update value of score
    //document.getElementById("slicesound").play(); //play sound
    /*
     * If we use jquery selector, the result will be an array and the audio will be at index 0*/
    $("#slicesound")[0].play();

    //stop fruit
    clearInterval(action);
    //hide fruit
    $("#fruit1").hide("explode", 500); //slice fruit => to use args in hide(), we must embed "jquery UI" before else it won't work.
    //send new fruit
    setTimeout(startAction, 800); //Under 800 can cause a problem
  });

  //functions

  function addHearts() {
    $("#trialsLeft").empty();
    for (i = 0; i < trialsLeft; i++) {
      //append an image to trialsLeft element
      $("#trialsLeft").append(
        "<img src='img/heart.png' alt='heart' class='life' />"
      );
    }
  }

  function startAction() {
    //when game start, fruit is generated and appear
    $("#fruit1").show();
    chooseFruit(); //choose a random fruit
    //generate random horizontal position
    $("#fruit1").css({
      left: Math.round(($("#fruitsContainer").width() - 100) * Math.random()),
      top: -50,
    });
    //generate random step
    step = 1 + Math.round(5 * Math.random()); //change step
    //Move fruit down by one step every 10ms
    action = setInterval(function () {
      //position() return an object with "top" property which is the top position of our element.
      $("#fruit1").css("top", $("#fruit1").position().top + step);
      //check if the fruit is too low
      if ($("#fruit1").position().top > $("#fruitsContainer").height()) {
        //check if we have trials left
        if (trialsLeft > 1) {
          $("#fruit1").show();
          chooseFruit();
          $("#fruit1").css({
            left: Math.round(
              ($("#fruitsContainer").width() - 100) * Math.random()
            ),
            top: -50,
          });
          step = 1 + Math.round(5 * Math.random());
          //reduce trials by one
          trialsLeft--;
          //populate trialsLeft box
          addHearts();
        } else {
          //game over
          playing = false; //we are not playing anymore
          $("#startreset").html("Start Game"); //change button text
          $("#gameOver").show();
          $("#gameOver").html(
            "<p>Game Over!</p><p> Your score is " + score + ".</p>"
          );
          $("#trialsLeft").hide();
          stopAction(); //to stop dropping fuit we create new function to make code readable
        }
      }
    }, 10);
  }

  //generate a random fruit
  function chooseFruit() {
    $("#fruit1").attr(
      "src",
      "img/slice/" + fruits[Math.round(Math.random() * 8)] + ".png"
    );
  }

  function stopAction() {
    clearInterval(action);
    $("#fruit1").hide();
  }
});
