if(!initializers) var initializers = [];

//Settings Section
initializers.push({'function':function registerSettings(){
  var templateName = 'INGENIUM_MAIL_DRAFT_TEMPLATE';
  
  var mailDraftTemplate = userProperties.getCurrentOrSetDefault(templateName, '');
  var mailDraftTemplateInput = ui.TextInput({'name':templateName, 'multiline':true, 'value':mailDraftTemplate});

  var section = ui.Section({'title':'Template', 'widgets':mailDraftTemplateInput});
  addSettingsSection(section);
},'rank':99});


(function(global){
  var functionTitle = 'Conductor'
 /*
  * Model
  */
  var request = {};
  var response = {};
 /*
  * View
  */
  function inputCard () {
    var widgets = [
      ui.source(),
      ui.dest(),
      ui.date({'hint': 'DD-MM-YYYY or YYYYMMDD'}),
      ui.TextButton({'text':'submit', 'onClick':'searchTrains'})
    ];
    return ui.Card({'title':functionTitle, 'widgets':widgets, 'type': 'parent'});
  }

  function buildEMailDraftResult(e) {
    var sections = [];
    e.trains.forEach(function(v, i, a){
      var checkbox = ui.Checkbox({
        'name':'checkbox_field',
        'items':{
          'text':v.trainNumber + ' - ' + v.trainName,
          'value':JSON.stringify(v),
          'selected':false}});
    var text = '';
    text += v.fromStnCode + ' : ' + v.departureTime;
    text += '  →  ';
    text += v.toStnCode + ' : ' + v.arrivalTime;
    text += '<br>';
    const classes = [
      '1A',
      '2A',
      '3A',
      'SL',
      '2S',
      'EC',
      'CC'
    ];
    classes.forEach(function(class){
      text += '<br>';
      text += class + ' : ' + ((typeof v[class] !== "undefined") && (v[class].availablityType == 1) ? v[class].totalFare : " - ");
    });

    sections.push(ui.Section({'widgets':[checkbox, ui.TextParagraph({'text':text})]}));
  });
  
  sections.push(ui.Section({'widgets':ui.TextButton({'text':'Compose', 'onClick':'buildComposedDraft'})}));
  return ui.Card({'title':e.date + ', ' + e.source + ' -> ' + e.dest, 'sections':sections, 'type':'child'});
}

  function buildComposedDraft(e){
    var trains = e.formInputs.checkbox_field.map(function(json){ return JSON.parse(json) });
    var draft = '以下の金額はすべて手数料込の価格となっております。\n'
    draft += trains.map(function(train){
      var header = '・' + train.trainNumber + ' ' + train.trainName + '\n';
      header += train.fromStnCode + ' : ' + train.departureTime;
      header += '  →  ';
      header += train.toStnCode + ' : ' + train.arrivalTime;
      header += '\n'
      var body = train.avlClasses.reduce(function(acc, class){
        if (train[class].availablityType == 1)
          return acc + class + ' : ' + (parseInt(train[class].totalFare, 10) + 400) + 'ルピー\n';
        return acc;
      }, '');
      return header + body;
    }).join('\n');
    return ui.Card({'widgets':ui.TextParagraph({'text':draft}), 'type':'child'});
  }
  
 /*
  * Controller
  */
  function searchTrains(e){
   request = e.formInput;
   response = comprehensive.trainsBetweenStations(request.fromStationCode, request.toStationCode, request.date.split('-').reverse().join(''));

   if(response.errorMessage) return ui.Card({'title':functionTitle, 'text':response.errorMessage, 'type':'error'});
   return buildEMailDraftResult();
  }

  global.buildConductor = inputCard;
  global.searchTrains = searchTrains;
  global.buildComposedDraft = buildComposedDraft;
})(this)