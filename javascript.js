/// dev

const suits = ["♥", "♦", "♣", "♠"];
const ranks = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "t", "J", "Q", "K"];
let deck = [];
let oldDeck = [];
let headerText = "Random card";

for (const suit of suits) {
  for (const rank of ranks) {
    deck.push(`${rank}${suit}`);
  }
}

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;
  while (currentIndex > 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
}

let cardWidth = 160;
let cardHeight = 213;
function generatePage() {
  shuffle(deck);
  const appContainer = document.querySelector("#appContainer");
  appContainer.style.display = "flex";
  appContainer.style.flexDirection = "column";
  appContainer.style.alignItems = "center";

  function toggleTheme() { 
    var theme = document.getElementsByTagName('link')[0]; 
    if (theme.getAttribute('href') == 'light.css') { 
        theme.setAttribute('href', 'dark.css'); 
        themeToggleButton.textContent = "Light";
    } else { 
        theme.setAttribute('href', 'light.css'); 
        themeToggleButton.textContent = "Dark";
    } 
} 
  let themeToggleButton = document.createElement("button");
  themeToggleButton.id = "themeToggleButton";
  themeToggleButton.textContent = "Dark";
  
  themeToggleButton.addEventListener("click", toggleTheme);

  let header = document.createElement("h1");
  header.id = "header";
  header.textContent = headerText;

  let randomCardsContainer = document.createElement("div");
  randomCardsContainer.id = "randomCardsContainer";
  randomCardsContainer.style.width = cardWidth + "px";
  randomCardsContainer.style.height = cardHeight + "px";

  let button = document.createElement("button");
  button.id = "button";
  button.textContent = "Draw";
  button.style.height = "50px";
  button.style.width = "80px";
  button.style.borderRadius = "20px";
  button.addEventListener("click", function () {
    dealCard();
  });

  let underHeader = document.createElement("h2");
  underHeader.id = "underHeader";
  underHeader.textContent = "Previous cards:";

  let lastCardsContainer = document.createElement("div");
  lastCardsContainer.id = "lastCardsContainer";
  lastCardsContainer.style.display = "flex";
  lastCardsContainer.style.height = cardHeight + "px";
  lastCardsContainer.alignItems = "flex-end";

  appContainer.appendChild(themeToggleButton);
  appContainer.appendChild(header);
  appContainer.appendChild(randomCardsContainer);
  appContainer.appendChild(button);
  appContainer.appendChild(underHeader);
  appContainer.appendChild(lastCardsContainer);
}

let cardFontSize = 50;
let cardsDealt = 0;

function dealCard() {
  let randomCardsContainer = document.querySelector("#randomCardsContainer");
  let lastCardsContainer = document.querySelector("#lastCardsContainer");
  if (randomCardsContainer.firstChild) {
    cardsDealt++;
    randomCardsContainer.firstChild.id = "previousCard";
    let styleObject = document.getElementById("previousCard");
    styleObject.style.width = "150px";
    lastCardsContainer.appendChild(randomCardsContainer.firstChild);
    if (cardsDealt > 5) {
      lastCardsContainer.removeChild(lastCardsContainer.firstChild);
    }
  }
  /// give cards  in randomcardscontainer classname 1 to amount of cards

  if (deck.length != 0) {
    let randomCard = document.createElement("div");
    randomCard.id = "randomCard";
    randomCard.style.borderRadius = "10px";
    randomCard.style.border = "solid 3px black";
    randomCard.style.height = cardHeight + "px";

    let cardToAdd = deck.splice(0, 1);
    cardToAdd = cardToAdd[0];
    let number = cardToAdd.charAt(0);
    let type = cardToAdd.charAt(1);
    if (number == "t") {
      number = 10;
    }

    let numberContainer = document.createElement("div");
    numberContainer.textContent = number;
    numberContainer.style.padding = "5px";
    numberContainer.style.fontSize = cardFontSize + "px";
    numberContainer.style.textAlign = "center";

    let typeContainer = document.createElement("div");
    typeContainer.textContent = type;
    typeContainer.style.alignSelf = "center";
    typeContainer.style.fontSize = cardFontSize + "px";
    numberContainer.style.textAlign = "center";
    if (type === "♥" || type === "♦") {
      typeContainer.style.color = "red";
      numberContainer.style.color = "red";
    } else if (type === "♣" || type === "♠") {
      typeContainer.style.color = "black";
      numberContainer.style.color = "black";
    }
    let numberContainerCopy = numberContainer.cloneNode(true);

    numberContainerCopy.style.alignSelf = "flex-end";
    randomCard.style.justifyContent = "space-between";
    randomCard.style.display = "flex";
    randomCard.appendChild(numberContainer);
    randomCard.appendChild(typeContainer);
    randomCard.appendChild(numberContainerCopy);

    randomCardsContainer.appendChild(randomCard);
  }
  if (deck.length == 0) {
    console.log("no more cards");
  }

}
generatePage();
document.addEventListener("keydown", function (event) {
  if (event.key === " ") {
    dealCard();
  }
});

