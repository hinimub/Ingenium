function buildTrainBetweenStations (e) {
  var widgets = [];
  widgets.push(
    source,
    dest,
    date,
    btnSubmit('between')
  );
  return buildParentCard('Train Between Stations', widgets);
}

function buildTrainBetweenStationsResult(e) {
  var sections = [];
  e.trains.forEach(function(v, i, a){
    var text = '';
    text += v.from_station.code + ' ( Dep. ) : ' + v.src_departure_time;
    text += '<br>';
    text += v.to_station.code + ' ( Arr. ) : ' + v.dest_arrival_time;
    text += '<br>';
    text += 'Travel Time : ' + v.travel_time;
    var section = CardService.newCardSection()
      .setHeader(v.number + ' - ' + v.name)
      .addWidget(CardService.newTextParagraph()
                 .setText(text));
    sections.push(section);
  });
  
  return buildChildCard(e.date + ', ' + e.source + ' -> ' + e.dest, sections);
}
