if(!initializers) var initializers = [];

(function(global){
  'use strict';
  var pluginInfo = {
    'name': 'ingenium-plugin-seat-availability',
    'version':1.0,
    'title':'Seat Availability',
    'entryPoint':'buildSeatAvailability',
    'hasCard':true,
    'require':['ingenium-plugin-ui-components']
  };
 /*
  * Initializer
  */
  global.initializers.push({
    'function':function(){
      registerPlugin(pluginInfo);
    }
  });
 /*
  * Model
  */
  var model = {};
  Object.defineProperty(model, 'trainNumber', { get: function(){ return this.inputs.trainNumber }});
  Object.defineProperty(model, 'date', { get: function(){ return this.inputs.date }});
  Object.defineProperty(model, 'fromStationCode', { get: function(){ return this.inputs.fromStationCode }});
  Object.defineProperty(model, 'toStationCode', { get: function(){ return this.inputs.toStationCode }});
  Object.defineProperty(model, 'class', { get: function(){ return this.inputs.class }});
  Object.defineProperty(model, 'quota', { get: function(){ return this.inputs.quota }});
  
  Object.defineProperty(model, 'error', { get: function(){ return this.response.err }});
  
  Object.defineProperty(model, 'resultsCardTitle', { get: function(){
    return this.trainNumber + ' - ' + this.fromStationCode + ' → ' + this.toStaionCode + ' ( ' + this.class + ', ' + this.quota + ' )';
  }});
  
 /*
  * View
  */
  function buildSeatAvailability(e) {
    var widgets = [
      ui.train(),
      ui.date(),
      ui.source(),
      ui.dest(),
      ui.pref(),
      ui.quota(),
      ui.submit({'onClick':'getSeatAvailability'})
    ];
    return ui.Card({'title':'Seat Availability', 'widgets':widgets, 'type':'parent'});
  }

function buildSeatAvailabilityResult () {
  var sections = model.response.availability.map(function(e){
    var widgets = [ui.TextParagraph({'text':e.status})];
    if(isRegisteredPlugin({'name':'ingenium-plugin-fare-enquiry'}))
      widgets.push(ui.fare({'params':{}}));
    return ui.Section({'title': e.date, 'widgets':widgets});
  });
  return ui.Card({'title':model.resultsCardTitle, 'sections':sections, 'type':'child'});
}

 /*
  * Controller
  */
  function getSeatAvailability(event){
    model.inputs = getParametersFromEvent(event);
    model.response = function(train, from, to, date, pref, quota){
      var userProperties = PropertiesService.getUserProperties();
      var railwayApiKey = userProperties.getProperty('INGENIUM_API_KEY');
      railway.setApiKey(railwayApiKey);
      
      return railway.seatAvailability(train, from, to, date, pref, quota);
      
    }(model.trainNumber, model.fromStationCode, model.toStationCode, model.date, model.class, model.quota);
    
    if(model.error) return ui.Card({'title':'Seat Availability', 'text':model.error, 'type':'error'});
    model.response = model.response.res;
    
    return buildSeatAvailabilityResult();
  }
  
  global.buildSeatAvailability = buildSeatAvailability;
  global.getSeatAvailability = getSeatAvailability;
})(this)