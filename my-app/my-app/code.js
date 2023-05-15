//hides all cards and buttons besides the New Hand button
hideElement("hitORstayLabel");
hideButtons();
hideExtraCards();
var pointTotal = 0;
var currentCard = 0;
var cardNumber;
var cardText;
var cardValueList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 11];
var points = pointTotal;
var randomCardNumber;
var cardSymbolsList = ["♠","♣","♥","♦"];
var cardNumberList = ["A", 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"];
var dealedCardsList = [];
//Creates 2 random cards and shows the hit or stay buttons as well as displaying buttons to pick the value 
//for ace IF there is a ace
onEvent("NewHandButton", "click", function( ) {
  showElement("hitORstayLabel");
  showElement("HitButton");
  showElement("StayButton");
  pointTotal = 0;
  hideExtraCards();
  setText("Card0", "");
  setText("Card1", "");
  setText("PointTotalTextbox", "Point Total: " + pointTotal);
  for (var i = dealedCardsList.length ; i > 0 ; i--) {
    removeItem(dealedCardsList, 0);
  }
  randomCards("Card0");
  ace();
  updateScore();
  randomCards("Card1");
  ace();
  updateScore();
  check21();
  currentCard = 2;
  
});
//"draws" another card from the deck
onEvent("HitButton", "click", function( ) {
    if (currentCard < 5) {
      showElement("Card" + currentCard);
      randomCards("Card" + currentCard);
      ace();
      currentCard = currentCard +1;
    }
    updateScore();
    check21();
  });
  //Hides all elements except New Hand Button and the cards drawn
onEvent("StayButton", "click", function( ) {
  hideElement("hitORstayLabel");
  hideElement("HitButton");
  hideElement("StayButton");
  check21();
});
onEvent("RulesButton", "click", function( ) {
  setScreen("RulesScreen");
});
onEvent("backButton", "click", function( ) {
  setScreen("MainScreen");
});
//creates random cards or "draws a card from the deck" and adds that card to a list so that when another
//card is created and it was created before, a new different card is created so there are no duplicates
function randomCards(cardNum) {
  randomCardNumber = randomNumber(0, cardNumberList.length - 1);
  var randomSymbol = randomNumber(0, cardSymbolsList.length - 1);
  var Symbol = cardSymbolsList[randomSymbol];
  cardNumber = cardNumberList[randomCardNumber];
  cardText = cardNumber + Symbol;
  //checks if the card has already been created/"drawn" and if it has it creats a new card
  for (var i = 0; i < dealedCardsList.length; i++) {
    if (cardText == dealedCardsList[i]) {
      randomCardNumber = randomNumber(0, cardNumberList.length - 1);
      randomSymbol = randomNumber(0, cardSymbolsList.length - 1);
      Symbol = cardSymbolsList[randomSymbol];
      cardNumber = cardNumberList[randomCardNumber];
      cardText = cardNumber + Symbol;
    }
  }
  appendItem(dealedCardsList, cardText);
  setProperty(cardNum, "text", cardText);
}
function hideButtons() {
  hideElement("StayButton");
  hideElement("HitButton");
}
function hideExtraCards() {
  hideElement("Card2");
  hideElement("Card3");
  hideElement("Card4");
  hideElement("GameResultsTextBox");
  hideElement("Ace11Button");
  hideElement("Ace1Button");
}
//Checks if your points are 21 which means you get a blackjack or if you went over 21 which means you busted
function check21() {
  if (pointTotal == 21) {
    hideElement("HitButton");
    hideElement("StayButton");
    hideElement("hitORstayLabel");
    setText("GameResultsTextBox", "BLACKJACK!");
    showElement("GameResultsTextBox");
  } else if (pointTotal > 21) {
    hideElement("HitButton");
    hideElement("StayButton");
    hideElement("hitORstayLabel");
    setText("GameResultsTextBox", "BUST!");
    showElement("GameResultsTextBox");
  }
}
// Reveals two buttons that allow the user to pick if they want their ace to have a point value of 1 or 11
function ace(){
if (cardNumber == "A" && currentCard < 6  ) {
    showElement("Ace11Button");
    showElement("Ace1Button");
    onEvent("Ace11Button", "click", function( ) {
      pointTotal = points + cardValueList[13];
      hideElement("Ace11Button");
      hideElement("Ace1Button");
      setProperty("PointTotalTextbox", "text", "Point Total: " + pointTotal);
      check21();
    });
    onEvent("Ace1Button", "click", function( ) {
      pointTotal = points + cardValueList[0];
      hideElement("Ace11Button");
      hideElement("Ace1Button");
      setProperty("PointTotalTextbox", "text", "Point Total: " + pointTotal);
      check21();
    });
  }
}
//Updates the amount of points you have everytime you draw a card or get a new hand
function updateScore() {
  cardValueList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 11];
  points = pointTotal;
  if (getProperty("Card0", "text") == cardText && cardNumber == "A") {
    pointTotal = 11;
    hideElement("Ace11Button");
    hideElement("Ace1Button");
  }
  for (var i = 1; i < cardNumberList.length; i++) {
    if (cardNumberList[i] == cardNumber) {
      pointTotal = points + cardValueList[i];
      setProperty("PointTotalTextbox", "text", "Point Total: " + pointTotal);
    }
  }
}
