var newColor = '';
var sequencePlayer = [];
var n = 0;
var sequence = [];
var color = '';
var record = 0; 

function start() { // When the begin button is pressed the game starts
    document.querySelector(".begin").disabled = true;
    updateCountdown(startGame);
}

function updateCountdown(callback) { // Countdown to start the game
    let seconds = 3;
    document.getElementById("msg").innerHTML = seconds;

    function countTime() {
        if (seconds === 0) {
            document.getElementById("msg").innerHTML = "GO!";
            callback();
        } else {
            document.getElementById("msg").innerHTML = seconds;
            seconds--;
            setTimeout(countTime, 1000);
        }
    }
    countTime();
}

async function startGame() {
    sequencePlayer = [];
    sequence = [];
    document.querySelector(".blue").disabled = false;
    document.querySelector(".green").disabled = false;
    document.querySelector(".yellow").disabled = false;
    document.querySelector(".red").disabled = false;
    await delay(500);
    while (n === 0) {
        document.getElementById("msg").innerHTML = "";
        sequencePlayer = [];
        await delay(500);
        await showColor();
        document.getElementById("msg").innerHTML = "Your time";
        for (let i = 0; i<sequence.length; i++) {
            await waitTap();
            if (sequencePlayer[i] !== sequence[i]) {
                await playerLose();
            }
        }
    }
    n = 0;
}

async function showColor() {
    newColor = Math.floor(Math.random() * 4) + 1;
    sequence.push(newColor);
    await changeCss(); 
}

async function changeCss() {
    let buttonSelector = '';
    let buttonActive = '';
    for (let i = 0; i<sequence.length; i++) {
        color = sequence[i];
        switch (color) {
            case 1:
                buttonSelector = ".red";
                buttonActive = "active_red";
                break;
            case 2:
                buttonSelector = ".green";
                buttonActive = "active_green";
                break;
            case 3:
                buttonSelector = ".yellow";
                buttonActive = "active_yellow";
                break;
            case 4:
                buttonSelector = ".blue";
                buttonActive = "active_blue";
                break;
        }
        var buttonElement = document.querySelector(buttonSelector);
        buttonElement.classList.add(buttonActive);
        await delay(750);
        buttonElement.classList.remove(buttonActive);
        await delay(200);
    }
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function wait(num) {
    sequencePlayer.push(num);

    for (let i = 0; i<sequence.length; i++) {
        if (sequence[i] !== sequencePlayer[i]) {
            return n = 1;
        }
        else {
            return n = 0;
        }
    }
}

function waitTap() { // When any button is pressed, we resolve the promise
    return new Promise(resolve => {
        document.querySelector(".red").addEventListener("click", function (wait) {
            resolve(wait);
        });
        document.querySelector(".green").addEventListener("click", function (wait) {
            resolve(wait);
        });
        document.querySelector(".yellow").addEventListener("click", function (wait) {
            resolve(wait);
        });
        document.querySelector(".blue").addEventListener("click", function (wait) {
            resolve(wait);
        });
    });
}

function playerLose() {
    document.getElementById("msg").innerHTML = "You lose!<br>"+(sequence.length-1)+" points";
    if (record<(sequence.length-1)) {
        record = (sequence.length-1);
    }
    document.getElementById("record").innerHTML = "Record: "+record+" points";
    //reset variables to restart game
    newColor = "";
    sequencePlayer = [];
    n = 1;
    sequence = [];
    color = "";
    document.querySelector(".blue").disabled = true;
    document.querySelector(".green").disabled = true;
    document.querySelector(".yellow").disabled = true;
    document.querySelector(".red").disabled = true;
    document.querySelector(".begin").disabled = false;
}