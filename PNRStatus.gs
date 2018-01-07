function buildPNRStatus(e) {
  var widgets = [];
  var pnr = CardService.newTextInput()
    .setTitle('PNR No.')
    .setFieldName('pnr');

  widgets.push(
    pnr,
    submit('submitPNRStatus')
  );
  
  return buildParentCard('PNR Status', widgets);
}

function submitPNRStatus(e){
  var ret = railway.pnrStatus(e.formInput.pnr);
  return ret.isFailed ?
    buildChildCard('PNR Status', [buildErrorSection(ret.description)]) :
    buildPNRStatusResult(ret);
}

function buildPNRStatusResult(ret) {
  var sections = [];
  var train = CardService.newCardSection()
    .setHeader('Train')
    .addWidget(CardService.newTextParagraph()
              .setText(ret.train.number + ' - ' + ret.train.name));
  var class = CardService.newCardSection()
    .setHeader('Class')
    .addWidget(CardService.newTextParagraph()
              .setText(ret.journey_class.code));
  var reservedUpto = CardService.newCardSection()
    .setHeader('Reserved Upto')
    .addWidget(CardService.newTextParagraph()
              .setText(ret.reservation_upto.code));
  var toStation = CardService.newCardSection()
    .setHeader('To')
    .addWidget(CardService.newTextParagraph()
              .setText(ret.to_station.code));
  
  var passengers = CardService.newCardSection()
    .setHeader('Passengers')
    .addWidget(CardService.newTextParagraph()
               .setText('No. | Booking | Current<br>' + function(){
                 return ret.passengers.map(function(passenger){
                   return passenger.no + '. ' + passenger.booking_status + ', ' + passenger.current_status;
                 }).join('<br>');
               }()));
  
  sections.push(
    train,
    class,
    reservedUpto,
    toStation,
    passengers
  );
  return buildChildCard('PNR Status - ' + e.formInput.pnr, sections);
}
