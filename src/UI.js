var train = CardService.newTextInput()
  .setFieldName('train')
  .setTitle('Train No.');
  
  var source = CardService.newTextInput()
  .setFieldName('source')
  .setTitle('Source Staion Code');
  
  var dest = CardService.newTextInput()
  .setFieldName('dest')
  .setTitle('Destination Station Code');
  
  var date = CardService.newTextInput()
    .setFieldName('date')
    .setTitle('Date')
    .setHint('DD-MM-YYYY');
  
  var pref = CardService.newSelectionInput()
    .setType(CardService.SelectionInputType.DROPDOWN)
    .setFieldName('pref')
    .setTitle('Class')
    .addItem('1A', '1A', false)
    .addItem('2A', '2A', false)
    .addItem('3A', '3A', false)
    .addItem('SL', 'SL', true)
    .addItem('2S', '2S', false)
    .addItem('EC', 'EC', false)
    .addItem('CC', 'CC', false);
  
  var quota = CardService.newSelectionInput()
    .setType(CardService.SelectionInputType.DROPDOWN)
    .setFieldName('quota')
    .setTitle('Quota')
    .addItem('General', 'GN', true)
    .addItem('Tatkal', 'TQ', false)
    .addItem('Premium Tatkal', 'PT', false)
    .addItem('Foreign Tourist', 'FT', false);

var submit = function (functionName) {
  return CardService.newTextButton()
     .setText('Submit')
     .setOnClickAction(CardService.newAction().
                       setFunctionName(functionName));
}

function addMenu(card){
  actions.forEach(function(v,i,a){
    card.addCardAction(CardService.newCardAction()
      .setText(v.text)
      .setOnClickAction(CardService.newAction()
        .setFunctionName(v.functionName)));
  });
  return card;
}

function buildParentCard(cardTitle, widgets){
  var card = CardService.newCardBuilder()
    .setHeader(CardService.newCardHeader().setTitle(cardTitle));
  
    var section = CardService.newCardSection();
  
  widgets.forEach(function(widget){
    section.addWidget(widget);
  });
  
  card.addSection(section);
  card = addMenu(card);
  return card.build();
}

function buildChildCard(cardTitle, sections){
  var card = CardService.newCardBuilder()
        .setHeader(CardService.newCardHeader()
           .setTitle(cardTitle));
  
  sections.forEach(function(section){ card.addSection(section) });
  
  card = addMenu(card).build();
  var nav = CardService.newNavigation().pushCard(card);
  return CardService.newActionResponseBuilder()
    .setNavigation(nav)
    .build();
}

function buildErrorSection (text) {
  return CardService.newCardSection().addWidget(CardService.newTextParagraph().setText(text));
}