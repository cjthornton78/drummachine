///////////////// Control of drum machine buttons /////////////////

let flashButton = indivButton => {
    indivButton.style.backgroundColor = "#e6fff2";
    indivButton.style.boxShadow = "0px 0px 10px white";
}

let buttonClicked = indivButton => {
    //console.log("Click!");
    //console.log(indivButton.id);
    if (indivButton.isToggled) {
        indivButton.isToggled = false;
        indivButton.style.backgroundColor = "darkslategray";
        indivButton.style.removeProperty("box-shadow");
    }
    else {
        indivButton.isToggled = true;
        indivButton.style.backgroundColor = "#66ffb0";
        indivButton.style.boxShadow = "0px 0px 7px #e6fff2";
    }
    
    //console.log(indivButton.isToggled);
}

let playPauseF = () => {
    //console.log("PLAY/PAUSE");
    if (playpause.isToggled) {
        playpause.isToggled = false;
        playpause.style.backgroundColor = "#e4ff33";
        playpause.style.boxShadow = "0px 0px 7px #e4ff33";
    }
    else {
        playpause.isToggled = true;
        playpause.style.backgroundColor = "#9dfb9d";
        playpause.style.boxShadow = "0px 0px 7px #9dfb9d";
    }
}

let stopF = () => {
    //console.log("STOP");
    stop.style.backgroundColor = "#ff3333";
    stop.style.boxShadow = "0px 0px 7px #ff3333";
    playpause.style.backgroundColor = "rgba(0, 0, 0, 0)"; // Reset the colour Play/Pause button
    playpause.style.boxShadow = "0px 0px 0px";
    playpause.isToggled = false; // Reset the state of the Play/Pause button too
    beatButtonsList.forEach(item => {
        if (item.isCued && !item.isToggled) { // .isCued property is set by gridlooper.js
            item.style.backgroundColor = "darkslategray"; // Remove the cue bar on STOP
            item.style.boxShadow = "0px 0px 0px";
            item.isCued = false;
        }
        else if (item.isCued && item.isToggled) {
            item.style.backgroundColor = "#66ffb0"; // Remove the cue bar on STOP on toggled buttons too
            item.style.boxShadow = "0px 0px 7px #e6fff2";
            item.isCued = false;
        }        
    });
}

let clearF = () => {
    //console.log("CLEAR");
    clear.style.backgroundColor = "#e4ff33";
    clear.style.boxShadow = "0px 0px 7px #e4ff33";
    beatButtonsList.forEach(item => {
        if (item.isCued) { // .isCued property is set by gridlooper.js
            //console.log("Do not turn off button - it's part of the cue bar");
            item.style.backgroundColor = "#1aff88";
            item.style.boxShadow = "0px 0px 4px #e6fff2";
        }
        else {
            item.style.backgroundColor = "darkslategray";
            item.style.boxShadow = "0px 0px 0px";
        }
        item.isToggled = false;
        
    });
}

const beatButtonsList = document.querySelectorAll(".beatButton"); // Buttons for programming the beat
beatButtonsList.forEach(item => {
    item.addEventListener("mousedown", event => {
        flashButton(item);
    });
    item.addEventListener("click", event => {
        buttonClicked(item);
    });
});


///////////////// Control buttons /////////////////

const playpause = document.getElementById("playpause"); // PLAY/PAUSE
playpause.addEventListener("mousedown", event => {
    flashButton(playpause);
});
playpause.addEventListener("click", event => {
    playPauseF();
});


const stop = document.getElementById("stop"); // STOP
stop.addEventListener("mousedown", event => {
    flashButton(stop);
    stop.style.transition = "all 0s";
});
stop.addEventListener("click", event => {
    stopF();
});
stop.addEventListener("mouseout", event => {
    stop.style.transition = "all 3s"; // Fade the button out nicely
    stop.style.backgroundColor = "rgba(0, 0, 0, 0)";
    stop.style.boxShadow = "0px 0px 0px";
});


const clear = document.getElementById("clear"); // CLEAR
clear.addEventListener("mousedown", event => {
    flashButton(clear);
    clear.style.transition = "all 0s";
});
clear.addEventListener("click", event => {
    clearF();
});
clear.addEventListener("mouseout", event => {
    clear.style.transition = "all 3s"; // Fade the button out nicely
    clear.style.backgroundColor = "rgba(0, 0, 0, 0)";
    clear.style.boxShadow = "0px 0px 0px";
});

