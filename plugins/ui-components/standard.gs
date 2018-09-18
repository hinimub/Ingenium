if(!ui) var ui = {};

ui.Action = function(options){
  var newAction = CardService.newAction();
  if(options['function']) newAction.setFunctionName(options['function']);
  if(options.params) newAction.setParameters(options.params);
  return newAction;
};

ui.ActionResponse = function(options){
  var newActionResponse = CardService.newActionResponseBuilder();
  if(options.notice) newActionResponse.setNotification(options.notice);
  if(options.navigation) newActionResponse.setNavigation(options.navigation);
  return newActionResponse.build();
};

ui.Card = function(options){
  if(options.type === 'error')
    return this.Card({'title':options.title, 'widgets':this.TextParagraph({'text':options.text}), 'type':'child'});
  var newCard = CardService.newCardBuilder();
  if(options.title) newCard.setHeader(CardService.newCardHeader().setTitle(options.title));
  if(options.sections){
    if(!Array.isArray(options.sections)) options.sections = [options.sections];
    options.sections.forEach(function(section){ newCard.addSection(section) })
  } else if(options.widgets) {
    var newSection = this.Section({'widgets':options.widgets});
    newCard.addSection(newSection);
  }
  switch (options.type) {
    case 'parent':
      return newCard.build();
    case 'child':
      //var nav = CardService.newNavigation().pushCard(addMenu(newCard).build());
      var nav = CardService.newNavigation().pushCard(newCard.build());
      return this.ActionResponse({'navigation':nav});
  }
};

ui.Section = function(options){
  var newSection = CardService.newCardSection();
  if(options.title) newSection.setHeader(options.title);
  if(options.collapsible) newSection.setCollapsible(options.collapsible);
  if(options.widgets) {
    if(!Array.isArray(options.widgets)) options.widgets = [options.widgets];
    options.widgets.forEach(function(widget){ newSection.addWidget(widget) })
  } else if(options.text) newSection.addWidget(this.TextParagraph({'text':options.text}));
  return newSection;
};

ui.Checkbox = function(options){
  options.type = 'checkbox';
  return this.SelectionInput(options);
};

ui.Dropdown = function(options){
  options.type = 'dropdown';
  return this.SelectionInput(options);
};

ui.Navigation = function(options){
  var newNavigation = CardService.newNavigation();
  if(options.updateCard) newNavigation.updateCard(options.updateCard);
  if(options.build === false) return newNavigation;
  return this.ActionResponse({'navigation':newNavigation});
};

ui.Notice = ui.Notiofication = function(options){
  var newNotification = CardService.newNotification();
  if(options.type) {
    switch (options.type) {
      case 'info':
        newNotification.setType(CardService.NotificationType.INFO);
        break;
    }
  } 
  if(options.text) newNotification.setText(options.text);
  if(options.build === false) return newNotification;
  return this.ActionResponse({'notice':newNotification});
};

ui.SelectionInput = function(options){
  var newSelectionInput = CardService.newSelectionInput();
    if(options.type){
      switch (options.type) {
        case 'checkbox':
          newSelectionInput.setType(CardService.SelectionInputType.CHECK_BOX);
          break;
        case 'radio button':
          newSelectionInput.setType(CardService.SelectionInputType.RADIO_BUTTON);
          break;
        case 'dropdown':
          newSelectionInput.setType(CardService.SelectionInputType.DROPDOWN);
          break;
      };
    };
    if(options.name) newSelectionInput.setFieldName(options.name);
    if(options.text) newSelectionInput.setTitle(options.text);
    if(options.items) {
      if(!Array.isArray(options.items)) options.items = [options.items];
      options.items.forEach(function(item){ newSelectionInput.addItem(item.text, item.value, item.selected) });
    }
    return newSelectionInput;
};


ui.TextButton = function(options){
  var newTextButton = CardService.newTextButton();
  if(options.text) newTextButton.setText(options.text);
  if(options.onClick) newTextButton.setOnClickAction(this.Action({'function':options.onClick, 'params':options.params}));
  return newTextButton;
};

ui.TextInput = function(options){
  var newTextInput = CardService.newTextInput();
  if(options.text) newTextInput.setTitle(options.text);
  if(options.name) newTextInput.setFieldName(options.name);
  if(options.hint) newTextInput.setHint(options.hint);
  if(options.value) newTextInput.setValue(options.value);
  if(options.multiline) newTextInput.setMultiline(options.multiline);
  return newTextInput;
};

ui.TextParagraph = function (options){
  var newTextParagraph = CardService.newTextParagraph();
  if(options.text) newTextParagraph.setText(options.text);
  return newTextParagraph;
};