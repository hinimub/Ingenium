function buildLiveTrainStatus (e) {
  var widgets = [];
    widgets.push(
      train,
      date,
      btnSubmit('live')
    );
  return buildParentCard('Live Train Status', widgets);
}

function buildLiveTrainStatusResult(inputs, ret) {
  var sections = [];
  ret.route.forEach(function(v, i, a){
    var text = '';
    text += 'ETA/ATA : ' + v.actarr;
    text += '<br>';
    text += 'ETD/ATD : ' + v.actdep;
    text += '<br>';
    text += v.has_departed ? v.status : '<font color="#9999ea">'+v.status+'</font>';
    
    var section = CardService.newCardSection()
      .setHeader(v.station.name)
      .setCollapsible(v.has_departed)
      .addWidget(CardService.newTextParagraph()
                 .setText(text));
    sections.push(section);
  });
  
  return buildChildCard(ret.train.number + ' - ' + ret.train.name, sections);
}