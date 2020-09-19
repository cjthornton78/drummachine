let beatsPerMinute = 120; // Default value, just in case
let timeInterval = 15000 / beatsPerMinute; // Note to self: see my Drum Machine BPM Timings sheet on Google Drive to see the steps for this calculation
let timingVar = "";
let isPaused = true;
let position;
let pausePosition;
let beatLength = 16; // Number of beats on the grid
let numberOfInstruments = 8; // Adding this so the logic can be updated to use more instruments more easily if I want to in future

let looper = (position) => {
    if (position >= beatLength) {
        position = 0; // Returns the loop back to the start in case of an error
    }
    timingVar = setTimeout(loopTimer, timeInterval);
    let previousColumn = 4; // Set default value
    let previousGrid = 4; // Set default value - TODO (optional) - build in option to use more grids for a longer loop - see beatLength variable above
    function loopTimer() {
        positionCounter.innerHTML = parseInt(position) + 1;
        timeInterval = 15000 / beatsPerMinute;

        if ((parseInt(position) % 4) == 0) { // Figure out which the previous column was so its lights can be turned off
            previousColumn = 4;
            previousGrid = Math.floor((parseInt(position) / 4));
            if (previousGrid == 0) {
                previousGrid = 4; // Easiest way to catch & correct the grid getting rounded to zero when the loop loops
            }
        }
        else {
            previousColumn = (parseInt(position) % 4);
            previousGrid = Math.floor((parseInt(position) / 4) + 1);
        }

        for(let row = 1; row < (numberOfInstruments + 1); row++){ // Now light each button in the column
            let thisButton = document.getElementById("b" + Math.floor((parseInt(position) / 4) + 1) + row + ((parseInt(position) % 4) + 1));
            let previousButton = document.getElementById("b" + previousGrid + row + previousColumn);
            thisButton.isCued = true; // Flag buttons which are currently part of the cue bar so that CLEAR doesn't switch them off
            previousButton.isCued = false;

            if (thisButton.isToggled == true) {
                //console.log("play instrument " + "b" + Math.floor((parseInt(position) / 4) + 1) + row + ((parseInt(position) % 4) + 1)); // the isToggled property of the button is set by buttonControl.js

                switch (row) {
                    case 1:
                        console.log("play cowbell");
                        var sample = document.getElementById("808_cowbell");
                        sample.pause(); // Pause this sample if it's already playing
                        sample.currentTime = 0; // Reset this sample
                        sample.play();
                        break;
                    case 2:
                        console.log("play clap");
                        var sample = document.getElementById("808_clap");
                        sample.pause();
                        sample.currentTime = 0;
                        sample.play();
                        break;
                    case 3:
                        console.log("play tom");
                        var sample = document.getElementById("808_tom");
                        sample.pause();
                        sample.currentTime = 0;
                        sample.play();
                        break;
                    case 4:
                        console.log("play cymbal");
                        var sample = document.getElementById("808_cymbal");
                        sample.pause();
                        sample.currentTime = 0;
                        sample.play();
                        break;
                    case 5:
                        console.log("play hihat open");
                        var sample = document.getElementById("808_hihatopen");
                        sample.pause();
                        sample.currentTime = 0;
                        sample.play();
                        break;
                    case 6:
                        console.log("play hihat closed");
                        var sample = document.getElementById("808_hihatclosed");
                        sample.pause();
                        sample.currentTime = 0;
                        sample.play();
                        break;
                    case 7:
                        console.log("play snare");
                        var sample = document.getElementById("808_snare");
                        sample.pause();
                        sample.currentTime = 0;
                        sample.play();
                        break;
                    case 8:
                        console.log("play kick");
                        var sample = document.getElementById("808_kick");
                        sample.pause();
                        sample.currentTime = 0;
                        sample.play();
                        break;
                    default :
                        console.log("play nothing");
                }

                thisButton.style.backgroundColor = "#e6fff2"; // Flash the button when the timing bar hits it
                thisButton.style.boxShadow = "0px 0px 12px #e6fff2";
                if (previousButton.isToggled == true) { // Check if previous button is also toggled before greying it
                    //console.log("do not clear the previous button");
                    previousButton.style.backgroundColor = "#66ffb0"; // De-flash the button but keep it lit
                    previousButton.style.boxShadow = "0px 0px 7px #e6fff2";
                }
                else {
                    previousButton.style.backgroundColor = "darkslategray"; // Turn off previous button
                    previousButton.style.boxShadow = "0px 0px 0px";
                }
            }
            else { // If the button isn't toggled then light it to lower value
                thisButton.style.backgroundColor = "#1aff88";
                thisButton.style.boxShadow = "0px 0px 4px #e6fff2";
                if (previousButton.isToggled == true) { // Check if previous button is also toggled before greying it
                    //console.log("do not clear the previous button");
                    previousButton.style.backgroundColor = "#66ffb0"; // De-flash the button but keep it lit
                    previousButton.style.boxShadow = "0px 0px 7px #e6fff2";
                }
                else {
                    previousButton.style.backgroundColor = "darkslategray"; // Turn off previous button
                    previousButton.style.boxShadow = "0px 0px 0px";
                }
            }
        }

        position++;
        position = position % beatLength; // Makes the position loop
        timingVar = setTimeout(loopTimer, timeInterval);
    }
}

const loopPlayPause = document.getElementById("playpause");
loopPlayPause.addEventListener("click", event => {
    //console.log("Position = " + position);
    if (!position){ // Makes sure position is an integer in range
        position = 0;
    }

    if (isPaused) { // PLAY - if/else toggles the button functionality between play & pause
        looper(position); // Pass in position here
        isPaused = false;
    }
    else { // PAUSE
        pausePosition = positionCounter.innerHTML;
        clearTimeout(timingVar); // Stops the interval timer
        isPaused = true; // Reset the isPaused bool to the initial state
        position = pausePosition;
    }
});


const loopStop = document.getElementById("stop");
loopStop.addEventListener("click", event => {
    clearTimeout(timingVar); // Stops the interval timer
    isPaused = true; // Reset the isPaused bool to the initial state
    position = 0;
    positionCounter.innerHTML = 0;
});

const positionCounter = document.getElementById("positionCounter");
positionCounter.innerHTML = "0";

const bpmControl = document.getElementById("bpmControl");
const bpmValueC = document.getElementById("bpmValueC");
const bpmValueH = document.getElementById("bpmValueH");
const bpmSlider = document.getElementById("bpmSlider");
bpmSlider.value = 120; // Set a default value

bpmSlider.oninput = function () {
    console.log(bpmSlider.value);
    beatsPerMinute = bpmSlider.value;
    bpmValueC.innerHTML = beatsPerMinute;
    bpmValueH.innerHTML = "BPM: <span id=\"headerBpmValue\">" + beatsPerMinute + "</span>";
}