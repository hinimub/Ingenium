if(!ui) var ui = {};

ui.date = function(options){
  options = options ? options : {};
  var hint = !options.hint ? 'DD-MM-YYYY' : options.hint;
  return this.TextInput({'name':'date', 'text':'Date', 'hint':hint});
};

ui.dest = function(){
  return this.TextInput({'name':'toStationCode', 'text':'Destination Station Code'});
};

ui.pref = function(){
  var items =
  [
    {'text': '1A', 'value': '1A', 'selected':false},
    {'text': '2A', 'value': '2A', 'selected':false},
    {'text': '3A', 'value': '3A', 'selected':false},
    {'text': 'SL', 'value': 'SL', 'selected':true},
    {'text': '2S', 'value': '2S', 'selected':false},
    {'text': 'EC', 'value': 'EC', 'selected':false},
    {'text': 'CC', 'value': 'CC', 'selected':false}
  ];
  return this.Dropdown({'name':'class', 'text':'Class', 'items':items});
};

ui.quota = function(){
  var items =
  [
    {'text':'General', 'value':'GN', 'selected':true},
    {'text':'Tatkal', 'value':'TQ', 'selected':false},
    {'text':'Premium Tatkal', 'value':'PT', 'selected':false},
    {'text':'Foreign Tourist', 'value':'FT', 'selected':false}
  ];
  return this.Dropdown({'name':'quota', 'text':'Quota', 'items':items});
};

ui.source = function(){
  return this.TextInput({'name':'fromStationCode', 'text':'Source Staion Code'});
};

ui.submit = function(options){
  options.text = 'submit';
  return this.TextButton(options);
};

ui.train = function(){
  return this.TextInput({'name':'trainNumber', 'text':'Train No.'});
};

ui.getFare = function(options){
  if(options.model){
    var params = {};
    var model = options.model;
    params.trainNumber = model.trainNumber;
    params.fromStationCode = model.fromStationCode;
    params.toStationCode = model.toStationCode;
    params.date = model.date;
    params.class = model.class;
    params.quota = model.quota;
  } else var params = options.params;
  return this.TextButton({'text':'Get Fare', 'onClick':'getFare', 'params':params});
};

ui.getLiveTrainStatus = function(options){
  if(options.model){
    var params = {};
    var model = options.model;
    params.trainNumber = model.trainNumber;
    params.date = model.date;
  } else var params = options.params;
  return this.TextButton({'text':'Get Live Train Status', 'onClick':'getLiveTrainStatus', 'params':params});
}
