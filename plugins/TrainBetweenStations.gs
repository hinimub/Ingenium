function buildTrainBetweenStations (e) {
  var widgets = [
    ui.source(),
    ui.dest(),
    ui.date(),
    ui.submit({'onClick':'getTrainBetweenStations'})
  ];

  return ui.Card({'title':'Train Between Stations', 'widgets':widgets, 'type':'parent'});
}

function getTrainBetweenStations(event){
      var inputs = event.formInput;
       var ret = railway.trainBetweenStations(inputs.source, inputs.dest, inputs.date);
      return ret.err ?
        ui.Card({'title':'Train Between Stations', 'text':ret.err, 'type':'error'}) :
      buildTrainBetweenStationsResult({
        date: inputs.date,
        source: inputs.source,
        dest: inputs.dest,
        trains: ret.res.trains
      });
}

function buildTrainBetweenStationsResult(e) {
  var sections = e.trains.map(function(v){
    var text = '';
    text += v.from_station.code + ' ( Dep. ) : ' + v.src_departure_time;
    text += '<br>';
    text += v.to_station.code + ' ( Arr. ) : ' + v.dest_arrival_time;
    text += '<br>';
    text += 'Travel Time : ' + v.travel_time;
    
    return ui.Section({'title':v.number + ' - ' + v.name, 'text':text});
  });
  return ui.Card({'title':e.date + ', ' + e.source + ' -> ' + e.dest, 'sections':sections, 'type':'child'});

}
