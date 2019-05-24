// question counter
var q_counter = 1;
		
// score initialise to 0
var score = 0;

// set current true answer
var theAnswer;

// get first question
let url = "/next?q=" + q_counter;
$.ajax({
    type:"GET",
    url:url,
    async:false,
    dataType: "json",
    success: function(data){

    // Console log API results
    console.log(data);

    // Update chart and feedback img
    $("#chart").attr("src", data[2]);
    $("#feedback_src").attr("src", data[3]);

    // Update questions and answers
    $("p").html(data[1])
    let y = document.getElementsByTagName("label");
    let x = document.getElementsByName("answer");
    for (let i = 0; i < 5; i++) {
        y[i].innerText = data[i + 4];
        x[i].value = data[i + 4];
    }

    // Return true answer
    theAnswer = data[9];

    },
    error: function(errorMessage){
        alert("Error");
    }
});

// on radio click, show submit
$('input[name=answer]').click(function() {
    $('#submitSection').fadeIn();
});

// validation on submit
$('#submit').click(function() {
    $("html, body").animate({ scrollTop: 0}, "slow");

    // get answer from radio
    let answer = $('input[name=answer]:checked').val();

    // if no answer given, raise alert, else check answer
    if (answer == null || answer == undefined) {
        $('#answerWarning').css("display", "block");
    } else {
        $('#answerWarning').css("display", "none");
        if (answer == theAnswer && $(".continue").text() == "Submit") {
            $('#tickCorrect').css("display", "block");
            score++;
            console.log("Score: " + score);
        } else {

            // if counter is at 30 (end of test) hide everything and show results
            if (q_counter == 30) {
                let percent = Math.round((score/30) * 100);
                $("#chart").css("display","none");
                $("#answers").css("display","none");
                $("#feedback_img").css("display","none");
                $("#submit").css("display","none");
                $("h3").html("End of Test");
                
                // show results section
                $("#resultsSection").fadeIn();
                $("p").html("You scored " + score + " out of 30 which is " + percent + "%");
                $("#progressBar").html(percent + "%").attr("aria-valuenow", percent).css("width", percent + "%");
                
                return;
            }

            $('#tickIncorrect').css("display", "block");
        }

        // get next question if continue button clicked
        if ($(".continue").text() == "Submit") {
            $(".continue").text("Continue");
        } else {
            // increment question counter
            q_counter++;

            // remove check from radio
            $('input[name=answer]:checked').prop('checked', false);

            // set counter as title
            $("h3").html("Question " + q_counter + " of 30");

            // process ajax request
            let url = "/next?q=" + q_counter;
            $.ajax({
                type:"GET",
                url:url,
                async:false,
                dataType: "json",
                success: function(data){

                // Console log API results
                console.log(data)

                // Update chart and feedback img
                $("#chart").attr("src", data[2])
                $("#feedback_src").attr("src", data[3])

                // Update questions and answers
                $("p").html(data[1]);
                let y = document.getElementsByTagName("label");
                let x = document.getElementsByName("answer");
                for (let i = 0; i < 5; i++) {
                    y[i].innerText = data[i + 4];
                    x[i].value = data[i + 4];
                } 

                // Return next true answer
                theAnswer = data[9];
                
                },
                error: function(errorMessage){
                    alert("Error");
                }
            });

            // prepare and reset for next question
            $("#feedback_img").css("display", "none");
            $('#tickCorrect').css("display", "none");
            $('#tickIncorrect').css("display", "none");
            $("html, body").animate({ scrollTop: 0}, "slow");
            $(".continue").text("Submit");
            $('#submitSection').css("display", "none");
        }
        

    }
});

// show feedback on link click
$(".feedback").click(function() {
    $("#feedback_img").css('display', 'block');
    $("html, body").animate({scrollTop: $(document).height() }, "slow");
});

// try again button, restarts the form
$("#tryAgain").click(function() {
    document.location.href='/'
});

// create timer and update countdown every second
document.getElementById('timer').innerHTML = 30 + ":" + 00;
startTimer();

function startTimer() {
  var presentTime = document.getElementById('timer').innerHTML;
  var timeArray = presentTime.split(/[:]+/);
  var m = timeArray[0];
  var s = checkSecond((timeArray[1] - 1));
  if (s==59){m=m-1}
  if (m < 0) {
    alert('timer completed');
    return;
  }
  
  document.getElementById('timer').innerHTML =
    m + ":" + s;

  setTimeout(startTimer, 1000);
}

function checkSecond(sec) {
  if (sec < 10 && sec >= 0) {sec = "0" + sec}; // add zero in front of numbers < 10
  if (sec < 0) {sec = "59"};
  return sec;
}