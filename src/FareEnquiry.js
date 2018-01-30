function buildFareEnquiry(e) {
  var widgets = [];
  
  widgets.push(
    train,
    source,
    dest,
    date,
    pref,
    quota,
    btnSubmit('fare')
  );
  return buildParentCard('Fare Enquiry', widgets);
}

function buildFareEnquiryResult(e) {
  var sections = [
    CardService.newCardSection()
        .setHeader(e.doj)
        .addWidget(
          CardService.newTextParagraph()
            .setText(e.fare))
  ];
  return buildChildCard('Fare Enquiry', sections);
}
