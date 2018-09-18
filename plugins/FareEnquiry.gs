(function(global){
  'use strict';
 /*
  *  Model
  */
  var model = {};
  
  Object.defineProperty(model, 'trainNumber', {get: function(){ return this.inputs.trainNumber }});
  Object.defineProperty(model, 'date', {get: function(){ return this.inputs.date }});
  Object.defineProperty(model, 'fromStationCode', {get: function(){ return this.inputs.fromStationCode }});
  Object.defineProperty(model, 'toStationCode', {get: function(){ return this.inputs.toStationCode }});
  Object.defineProperty(model, 'class', {get: function(){ return this.inputs.class }});
  Object.defineProperty(model, 'quota', {get: function(){ return this.inputs.quota }});
  
  Object.defineProperty(model, 'error', {get: function(){ return this.response.errorMessage }});
  Object.defineProperty(model, 'totalFare', {get: function(){ return this.response.totalFare }});
  
  Object.defineProperty(model, 'totalFareSectionText', {get: function(){ return 'Total Fare:<br>Rs.' + this.totalFare }});
  
 /*
  *  View
  */
  function buildFareEnquiry(e) {
    var widgets = [
      ui.train(),
      ui.source(),
      ui.dest(),
      ui.date(),
      ui.pref(),
      ui.quota(),
      ui.submit({'onClick':'getFare'})
    ];
    return ui.Card({'title':'Fare Enquiry', 'widgets':widgets, 'type':'parent'});
  }
  
  function buildFareEnquiryResult(e) {
    var section = ui.Section({'title':date, 'text': model.totalFareSectionText});

    return ui.Card({'title':'Fare Enquiry', 'sections':section, 'type':'child'});
  }

  /*
   *  Controller
   */
  function getFare(event){
    model.inputs = getParametersFromEvent(event);
    model.response = indianrail.fare(model.trainNumber, model.date, model.fromStationCode, model.toStationCode, model.class, model.quota);

    if(model.error) return ui.Card({'title':'Fare Enquiry', 'text':model.response.err, 'type':'error'});
    return buildFareEnquiryResult();
  }

  global.getFare = getFare;
  global.buildFareEnquiry = buildFareEnquiry;
})(this)