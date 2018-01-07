function buildTrainBetweenStations (e) {
  var widgets = [];
  widgets.push(
    source,
    dest,
    date,
    submit('submitTrainBetweenStations')
  );
  return buildParentCard('Train Between Stations', widgets);
}

function submitTrainBetweenStations(e){
  var ret = railway.trainBetweenStations(e.formInput.source, e.formInput.dest, e.formInput.date);
  return ret.isFailed ?
    buildChildCard('Train Between Status', [buildErrorSection(ret.description)]):
    buildTrainBetweenStationsResult(ret);
}

function buildTrainBetweenStationsResult(ret) {
  var sections = [];
  ret.trains.forEach(function(v, i, a){
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
  
  return buildChildCard(e.formInput.date + ', ' + e.formInput.source + ' -> ' + e.formInput.dest, sections);
}
