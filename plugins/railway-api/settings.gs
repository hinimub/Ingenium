/**
 * This Plugin add Edit RailwayAPI-key Section to 'ingenium-plugin-settings'
 */

if(!initializers) var initializers = [];
(function(global){
  'use strict';
  var pluginInfo = {
    'name':'ingenium-plugin-railwayapi',
    'version':1.0,
    'entryPoint':'doNothing'
  };
 /*
  * Initializer
  */
  global.initializers.push({
    'function':function(global){
      var token = registerPlugin(pluginInfo);

      //Will Run After Registerd All Plugins
      global.initializers.push({
        'function': function(){
          if(!isRegisteredPlugin({'name':'ingenium-plugin-settings'})) return unregisterPlugin(token);
          var propertyName = 'INGENIUM_API_KEY';
          var userProperties = PropertiesService.getUserProperties();
          var railwayApiKey = userProperties.getProperty(propertyName);
          if(!railwayApiKey) railwayApiKey = ''
  
          var keyInput =
            ui.TextInput({'name':propertyName, 'text':'API Key', 'value':railwayApiKey});
          var section = ui.Section({'title':'RailwayAPI', 'widgets':keyInput});
          addSettingsSection(section);
        }
      });
    },
    'rank':0
  });

function fetchRailwayAPI(mode, inputs) {
  var userProperties = PropertiesService.getUserProperties();
  var railwayApiKey = userProperties.getProperty('INGENIUM_API_KEY');
  
  railway.setApiKey(railwayApiKey);
  switch(mode){
    case 'pnr':
      return railway.pnrStatus(inputs.pnr);
    case 'live':
      return railway.liveTrainStatus(inputs.train, inputs.date);
    case 'seat':
      return railway.seatAvailability(inputs.train, inputs.source, inputs.dest, inputs.date, inputs.pref, inputs.quota);
    case 'between':
       return railway.trainBetweenStations(inputs.source, inputs.dest, inputs.date);
  };
}
})(this)

function doNothing(){}

/*
function submit(e) {
  var mode = e.parameters.mode;
  
  if(Object.keys(e.formInput).length) var inputs = e.formInput;
  else var inputs = JSON.parse(e.parameters.inputs);

  return dispatcher(mode, inputs);
}
*/