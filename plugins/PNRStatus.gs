(function(global){
  'use strict';
 /*
  *  Model
  */
  var model = {};
  
  Object.defineProperty(model, 'error', { get: function(){ return this.response.err }});
  Object.defineProperty(model, 'trainNumber', { get: function(){ return this.response.train.number }});
  Object.defineProperty(model, 'trainName', { get: function(){ return this.response.train.name }});
  Object.defineProperty(model, 'date', { get: function(){ return this.response.doj }});
  Object.defineProperty(model, 'class', { get: function(){ return this.response.journey_class.code }});
  Object.defineProperty(model, 'fromStationCode', { get: function(){ return this.response.from_station.code }});
  Object.defineProperty(model, 'toStationCode', { get: function(){ return this.response.to_station.code }});
  Object.defineProperty(model, 'passengers', { get: function(){ return this.response.passengers }});
  Object.defineProperty(model, 'quota', { get: function(){ return this.passengers[0].booking_status.split('/').pop() ;}})

  Object.defineProperty(model, 'trainSectionText', { 
    get: function(){ return this.trainNumber + ' - ' + this.trainName + '<br>' + 'DOJ : ' + this.date }
  });
  Object.defineProperty(model, 'passengersSectionText', { 
    get: function(){
      return this.passengers.reduce(function(text, passenger){
        return text + passenger.no + '. ' + passenger.booking_status + ', ' + passenger.current_status + '<br>'
      }, '');
    }
  });
  
  
 /*
  *  View
  */
  function inputCard(e) {
    var pnr = ui.TextInput({'text':'PNR No.', 'name':'pnr'});  
    var submit = ui.submit({'onClick':'getPnrStatus'});
  
    return ui.Card({'title':'PNR Status', 'widgets':[pnr,submit], 'type':'parent'});
  }

  function resultsCard() {
    var train = ui.Section({'title':'Train', 'text': model.trainSectionText});
    var class = ui.Section({'title':'Class', 'text': model.class});
    var fromStation = ui.Section({'title':'From', 'text': model.fromStationCode});
    var toStation = ui.Section({'title':'To', 'text': model.toStationCode});
    var passengers = ui.Section({'title':'Passengers', 'text': model.passengersSectionText});
  

    var otherFunctions = ui.Section({'widgets':[
      ui.getLiveTrainStatus({'model': model}), 
      ui.getFare({'model':model})
    ]});

    var sections = [
      train,
      class,
      fromStation,
      toStation,
      passengers,
      otherFunctions
    ];
    return ui.Card({'title':'PNR Status - ' + model.pnrNumber, 'sections':sections, 'type':'child'});
  }

 /*
  *  Controller
  */
  function getPnrStatus(event) {
    model.pnrNumber = event.formInput.pnr;
    model.response = fetchRailwayAPI('pnr', event.formInput).res;
    if(model.error) return ui.Card({'title':'PNR Status', 'text':model.error, 'type':'error'});
    return resultsCard();
  }

  global.buildPNRStatus = inputCard;
  global.getPnrStatus = getPnrStatus;
})(this)