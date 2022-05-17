$(function () {
  //define variables
  var mode = false; //app mode
  var timeCounter = 0; //time counter
  var lapCounter = 0; //lap counter
  var action; //variable for setInterval
  var lapNumber = 0; //Number of laps
  //minutes, seconds, centiseconds for time and lap
  var timeMinutes,
    timeSeconds,
    timeCentiseconds,
    lapMinutes,
    lapSeconds,
    lapCentiseconds;
  //On App load show start and lap buttons
  hideshowButtons("#startButton", "#lapButton");
  //click on startButton
  $("#startButton").on("click", function () {
    //mode to on
    mode = true;
    //show stop and lap buttons
    hideshowButtons("#stopButton", "#lapButton");
    //start counter
    startAction();
  });
  //click on stopButton
  $("#stopButton").on("click", function () {
    //show resume and reset buttons
    hideshowButtons("#resumeButton", "#resetButton");
    //stop counter
    clearInterval(action);
  });
  //click on resumeButton
  $("#resumeButton").on("click", function () {
    //show stop and lap buttons
    hideshowButtons("#stopButton", "#lapButton");
    //start counter
    startAction();
  });
  //click on resetButton
  $("#resetButton").on("click", function () {
    //reload the page
    location.reload();
  });
  //click on lapButton
  $("#lapButton").on("click", function () {
    //if mode is ON
    if (mode) {
      //stop action
      clearInterval(action);
      //resetLap and print lap details
      lapCounter = 0;
      addLap();
      //start counter
      startAction();
    }
  });

  //functions
  function hideshowButtons(x, y) {
    $(".control").hide();
    $(x).show();
    $(y).show();
  }
  //start the counter
  function startAction() {
    action = setInterval(function () {
      timeCounter++;
      //if minutes overcome some value 100 minutes, it is not necessary to continue.
      if (timeCounter == 100 * 60 * 100) {
        timeCounter = 0;
      }
      lapCounter++;
      if (timeCounter == 100 * 60 * 100) {
        timeCounter = 0;
      }
      updateTime();
    }, 10);
  }

  //updateTime : converts counters to min, sec, centisec
  function updateTime() {
    //1min=60*100centiseconds=6000centiseconds
    timeMinutes = Math.floor(timeCounter / 6000); //Math.floor to have a round number
    timeSeconds = Math.floor((timeCounter % 6000) / 100); //The rest of centisecconds wich is not convert to minutes is convert to second
    timeCentiseconds = (timeCounter % 6000) % 100; // the rest of centiseconds after converting to second
    $("#timeminute").text(format(timeMinutes)); //we change the html text in the element by our variable content
    $("#timesecond").text(format(timeSeconds));
    $("#timecentisecond").text(format(timeCentiseconds));

    lapMinutes = Math.floor(lapCounter / 6000); //Math.floor to have a round number
    lapSeconds = Math.floor((lapCounter % 6000) / 100); //The rest of centisecconds wich is not convert to minutes is convert to second
    lapCentiseconds = (lapCounter % 6000) % 100; // the rest of centiseconds after converting to second
    $("#lapminute").text(format(lapMinutes)); //we change the html text in the element by our variable content
    $("#lapsecond").text(format(lapSeconds));
    $("#lapcentisecond").text(format(lapCentiseconds));
  }

  //format numbers
  function format(number) {
    if (number < 10) {
      return "0" + number;
    } else {
      return number;
    }
  }

  //addLap function : print lap details inside the lap
  function addLap() {
    lapNumber++;
    var myLapDetails =
      "<div class='lap'>" +
      "<div class='laptimetitle'>" +
      "Lap" +
      lapNumber +
      "</div>" +
      "<div class='laptime'>" +
      "<span>" +
      format(lapMinutes) +
      "</span>" +
      ":<span>" +
      format(lapSeconds) +
      "</span>" +
      ":<span>" +
      format(lapCentiseconds) +
      "</span>" +
      "</div>" +
      "</div>";
    $(myLapDetails).prependTo("#laps"); //"prependTo" reverse the order of Lap added to the list.
  }
});
