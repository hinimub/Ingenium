var actions =
    [
      'PNR Status',
      'Live Train Status',
      'Seat Availability',
      'Train Between Stations',
    ].map(function(e){
      var hash = {};
      hash.text = e;
      hash.functionName = 'build' + hash.text.replace(/\s/g, '');
      hash.card = eval(hash.functionName);
      return hash;
    });

function buildAddOn(e) {
  return actions.map(function(v){ return v.card() });
}