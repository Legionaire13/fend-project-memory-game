'use strict'
let moveCounter = 0,
    cardsPaired = 0,
    gameTimer, gameTimerActive = false,
    numberOfTries = [],
    openCardsList = [];
const movesPlaceholder = document.querySelector(".moves");
const starsPlaceholder = document.querySelector(".stars");
const timerPlaceholder = document.querySelector(".timer");
const endgameScorePanel = document.querySelector(".endgame__score-panel");
const restartButton = document.querySelector(".restart");
const modalWindow = document.querySelector(".endgame__blackbox");
const startingDeck = document.querySelector(".deck");
const blured = document.querySelector(".container");

readyToPlay();

restartButton.addEventListener("click", gameRestart);

// restart game event listener
function gameRestart() {
    gameTimerStop(gameTimer);
    readyToPlay();
}

// starts game timer countdown
function gameTimerStart() {
    let min = 0,
        sec = 1;

    gameTimerActive = true;

    return gameTimer = setInterval(function () {

        (sec < 10) ? timerPlaceholder.innerHTML = `${min}:0${sec}`: timerPlaceholder.innerHTML = `${min}:${sec}`;
        if (sec == 59) {
            min++;
            sec = 0;
        } else {
            sec++;
        }

    }, 1000);

}

// stop timer countdown
function gameTimerStop(val) {
    gameTimerActive = false;
    return clearInterval(val);
}

// setting up for game sessian
function readyToPlay() {

    // game initial condition
    startingDeck.removeEventListener("click", readyToPlay);

    timerPlaceholder.innerHTML = "0:00";

    modalWindow.classList.remove("display_modal");
    blured.classList.remove("blured");

    //some values are set to default
    moveCounter = 0;
    cardsPaired = 0;
    openCardsList = [];

    setCounter();
    setStarRating();

    // clear deck
    function clearDeck() {

        while (startingDeck.firstChild) {
            startingDeck.removeChild(startingDeck.firstChild);
        }

    }
    clearDeck();

    // Shuffle function from http://stackoverflow.com/a/2450976
    function shuffle(array) {
        let currentIndex = array.length,
            temporaryValue, randomIndex;

        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

    // generate cards
    function generateCards() {
        const fragment = document.createDocumentFragment();

        while (fragment.childElementCount < 16) {
            const newCard = document.createElement("li");
            const newCardItem = document.createElement("i");

            newCard.classList.add("card");
            newCardItem.classList.add("fa");

            newCard.append(newCardItem);
            fragment.appendChild(newCard);
        }

        return startingDeck.append(fragment);
    }
    generateCards();

    // setting shuffled cards to the deck
    function setShuffledClasses() {
        const elementCollection = startingDeck.getElementsByClassName("fa");
        const array = ["fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-anchor", "fa-leaf", "fa-bicycle", "fa-diamond", "fa-bomb", "fa-leaf", "fa-bomb", "fa-bolt", "fa-bicycle", "fa-paper-plane-o", "fa-cube"];

        shuffle(array);
        for (let i = 0; i < startingDeck.childElementCount; i++) {
            elementCollection[i].classList.add(array[i]);
        }
    }
    setShuffledClasses();

    startingDeck.addEventListener("click", matchCheck);
}

// check if cards match
function matchCheck(event) {
    const card = event.target;

    //timer starts when first click is made
    if (card.nodeName === "LI") {
        if (!gameTimerActive) {
            gameTimerStart();
        }

        if (card.classList[1] !== "open") {
            //visually opens cards
            function openCard() {
                return card.classList.add("open", "show");
            }

            // adds card to the array if correct card opened
            function addCardToList() {
                return openCardsList.push(card);
            }

            if (openCardsList.length < 2) {
                openCard();
                addCardToList();
            }
        }

        function isMatched() {
            if (openCardsList.length === 2) {
                const a = openCardsList[0];
                const b = openCardsList[1];

                // blocking user click during the checking process
                startingDeck.removeEventListener("click", matchCheck);

                // success visualization
                if (a.firstChild.classList[1] === b.firstChild.classList[1]) {
                    a.classList.add("match");
                    b.classList.add("match");
                    cardsPaired++;
                }

                // hiding pair of cards
                setTimeout(function () {
                    a.classList.remove("open", "show");
                    b.classList.remove("open", "show");

                    // remove elements from "list"
                    openCardsList = [];

                    // unblock user click
                    startingDeck.addEventListener("click", matchCheck);
                }, 500);

                moveCounter++;
                setCounter();

                // check if player wins
                function checkWinCondition() {
                    if (cardsPaired === 8) {

                        gameTimerStop(gameTimer);

                        //win report
                        showModal();
                    }
                }
                checkWinCondition();
            }
        }

        isMatched();

        setStarRating();
    }
}



// counter of moves
function setCounter() {
    movesPlaceholder.textContent = moveCounter;
}

// star rate
function setStarRating() {
    let rate;

    if (moveCounter < 14) {
        rate = `<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>`;
    } else if ((moveCounter >= 14) && (moveCounter < 20)) {
        rate = `<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>`;
    } else {
        rate = `<li><i class="fa fa-star"></i></li>`;
    }
    return starsPlaceholder.innerHTML = rate;
}

// creation of modal widow
function showModal() {

    const tryResults = {};
    const fragment = document.createDocumentFragment();

    modalWindow.classList.add("display_modal");
    blured.classList.add("blured");

    numberOfTries.push(tryResults);
    tryResults.number = numberOfTries.length;
    tryResults.rate = starsPlaceholder.innerHTML;
    tryResults.moves = moveCounter;
    tryResults.time = timerPlaceholder.innerHTML;

    const newTry = document.createElement("div");
    newTry.classList.add("endgame__try");

    // number of tries
    const newTryNumber = document.createElement("span");
    newTryNumber.classList.add("endgame__number");
    newTryNumber.innerHTML = `#${tryResults.number}`;
    newTry.append(newTryNumber);

    // stars
    const newTryRate = document.createElement("ul");
    newTryRate.classList.add("endgame__stars");
    newTryRate.innerHTML = tryResults.rate;
    newTry.append(newTryRate);

    // number of moves
    const newTryMoves = document.createElement("span");
    newTryMoves.classList.add("endgame__moves");
    newTryMoves.innerHTML = `${tryResults.moves} Moves`;
    newTry.append(newTryMoves);

    // time results
    const newTryTimer = document.createElement("span");
    newTryTimer.classList.add("endgame__timer");
    newTryTimer.innerHTML = tryResults.time;
    newTry.append(newTryTimer);

    fragment.append(newTry);

    modalWindow.addEventListener("click", readyToPlay);

    return endgameScorePanel.append(fragment);
}