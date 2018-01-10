function buildSeatAvailability(e) {
  var widgets = [];
  widgets.push(
    train,
    date,
    source,
    dest,
    pref,
    quota,
    submit('submitSeatAvailavility')
  );
  return buildParentCard('Seat Availability', widgets);
}

function submitSeatAvailavility (e) {
  var ret = railway.seatAvailability(e.formInput.train, e.formInput.source, e.formInput.dest, e.formInput.date, e.formInput.pref, e.formInput.quota);
  return ret.isFailed ? 
    buildChildCard('Seat Availability', [buildErrorSection(ret.description)]) :
                   buildSeatAvailabilityResult(ret);
}

function buildSeatAvailabilityResult (ret) {
  var title = ret.train.number + ' - ' + ret.from_station.code + ' -> ' + ret.to_station.code + ' ( ' + ret.journey_class.code + ', ' + ret.quota.code + ' )';
  var sections = ret.availability.map(function(e){
    var section = 
      CardService.newCardSection()
        .setHeader(e.date)
        .addWidget(
          CardService.newTextParagraph()
            .setText(e.status));
    return section;
  });
  
  return buildChildCard(title, sections);
}