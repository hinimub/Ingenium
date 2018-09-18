function addMenu(card){
  actions.forEach(function(v,i,a){
    card.addCardAction(CardService.newCardAction()
      .setText(v.text)
      .setOnClickAction(CardService.newAction()
        .setFunctionName(v.functionName)));
  });
  return card;
}
