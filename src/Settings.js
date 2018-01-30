function buildSettings () {
  var userProperties = PropertiesService.getUserProperties();
  var railwayApiKey = userProperties.getProperty('INGENIUM_API_KEY');
  if(!railwayApiKey) railwayApiKey = '';
  
  var apiKey = CardService.newTextInput()
  .setFieldName('apiKey')
  .setTitle('API Key')
  .setValue(railwayApiKey);
  
  var update = CardService.newTextButton()
     .setText('Update')
     .setOnClickAction(
       CardService.newAction().setFunctionName('updateApiKey')
     );
  
  return buildParentCard('Settings', [apiKey, update]);
}

function updateApiKey (e) {
  var apiKey = e.formInput.apiKey;
  var userProperties = PropertiesService.getUserProperties();
  userProperties.setProperty('INGENIUM_API_KEY', apiKey);
  
  return CardService.newActionResponseBuilder()
       .setNotification(CardService.newNotification()
           .setType(CardService.NotificationType.INFO)
           .setText("Updated API Key")).build();
}