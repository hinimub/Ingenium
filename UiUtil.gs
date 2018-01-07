function suggestTrain(e) {
   var suggestions = CardService.newSuggestions();
  var train = e.formInput.train.replace(/[^0-9]/g, '').substr(0, 5);
  /*
   var numSuggestions = parseInt(e.formInput.train);
   for(var i = 1; i <= numSuggestions; i++) {
     suggestions.addSuggestion('Suggestion ' + i);
   }
   */
  Logger.log(train);
  suggestions.addSuggestion(train)
   return CardService.newSuggestionsResponseBuilder()
       .setSuggestions(suggestions)
       .build();
 }


function validateTrain (train) {
  var train = train.replace(/[^0-9]/g, '').substr(0, 5);
  return {
    flag:/[0-9]{5}/.test(train),
    train:train
  };
}

function validateStationCode (staionCode) {
  return staionCode.toUpperCase();
}

function isValidDate (date) {
  var train = train.replace(/[^0-9]/g, '').substr(0, 5);
  return {
    flag:/[0-9]{5}/.test(train),
    train:train
  };
}

function validateInputs(e) {
//  validateTrain(e.formInput.train);
  /*
  return !(/[0-9]{5}/.test(e.formInput.train)) ?
    CardService.newActionResponseBuilder()
       .setNotification(CardService.newNotification()
           .setType(CardService.NotificationType.INFO)
           .setText("Train No. is NOT valid."))
  .build():null;
  */
}
