function buildSeatAvailability(e) {
  var widgets = [];
  widgets.push(
    train,
    date,
    source,
    dest,
    pref,
    quota,
    btnSubmit('seat')
  );
  return buildParentCard('Seat Availability', widgets);
}

function buildSeatAvailabilityResult (inputs, ret) {
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