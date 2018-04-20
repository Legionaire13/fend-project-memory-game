const moveCounter = 0; 
const timerInitialValue = 0;
const openCardsList = [];


/*
 * (+) Create a list that holds all of your cards
 */
const startingDeck = document.querySelector('.deck');

/*
 * (+) Display the cards on the page
 *   - (+) shuffle the list of cards using the provided "shuffle" method below
 *   - (+) loop through each card and create its HTML
 *   - (+) add each card's HTML to the page
 */

// setting up for game sessian
function readyToPlay() {

    //clear deck (убрать когда будет все готово в html)
    function clearDeck() {

        while (startingDeck.firstChild) {
            startingDeck.removeChild(startingDeck.firstChild);
        }

    };
    clearDeck();
    const openCardsList = []; //should be empty

    // Shuffle function from http://stackoverflow.com/a/2450976
    function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;

        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

    //generate cards
    function generateCards() {
        const fragment = document.createDocumentFragment();

        while (fragment.childElementCount < 16) {
            const newCard = document.createElement('li');
            const newCardItem = document.createElement('i');

            newCard.classList.add('card');
            newCardItem.classList.add('fa');
            
            newCard.append(newCardItem);
            fragment.appendChild(newCard);
        }

        return startingDeck.append(fragment);
    }
    generateCards();
    
    // setting shuffled cards to the deck
    function setShuffledClasses() {
        const elementCollection = startingDeck.getElementsByClassName('fa');
        const array = ['fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt', 'fa-cube', 'fa-anchor', 'fa-leaf', 'fa-bicycle', 'fa-diamond', 'fa-bomb', 'fa-leaf', 'fa-bomb', 'fa-bolt', 'fa-bicycle', 'fa-paper-plane-o', 'fa-cube'];
        
        shuffle(array);
        for (i = 0; i < startingDeck.childElementCount; i++) {
            elementCollection[i].classList.add(array[i]);
        }
    }
    setShuffledClasses();
    // startingDeck.addEventListener('click', gameSessionStart);
    startingDeck.addEventListener('click', matchCheck);
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - (+) display the card's symbol (put this functionality in another function that you call from this one)
 *  - (+) add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - (+) if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

//добавить сюда потом все
// function gameSessionStart() {
// 
// }

//check if cards match
function matchCheck(event) {
    const card = event.target;

    function openCard() {
        return card.classList.add('open', 'show');
    }    
    if (card.nodeName === 'LI') {
        openCard();//visually opens cards
    }

    function addCardToList() {
        if (card.nodeName === 'LI' && openCardsList.length < 2) {          
            return openCardsList.push(card);
        }
    }
    addCardToList();//adds card to the array

    function isMatched() {
        if (card.nodeName === 'LI' && openCardsList.length === 2){
            const a = openCardsList[0];
            const b = openCardsList[1];

            if (a.firstChild.classList[1] === b.firstChild.classList[1]) {
                a.classList.add('match');//match visualization
                b.classList.add('match');//match visualization
            }
            while(openCardsList.length) {
                openCardsList.pop();//remove elements from "list"
            }
            setTimeout(function() {                    
                a.classList.remove('open', 'show');
                b.classList.remove('open', 'show');
            }, 500);
        }
    }
    isMatched();

}