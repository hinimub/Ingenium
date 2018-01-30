function dispatcher(mode, inputs) {
  var userProperties = PropertiesService.getUserProperties();
  var railwayApiKey = userProperties.getProperty('INGENIUM_API_KEY');
  
  railway.setApiKey(railwayApiKey);
  switch(mode){
    case 'pnr':
      var ret = railway.pnrStatus(inputs.pnr);
      return ret.err ?
        buildChildCard('PNR Status', [buildErrorSection(ret.err)]) :
        buildPNRStatusResult(inputs, ret.res);
      
    case 'live':
      // Get Date of Departure (From PNR Status)
      if(!inputs.date) inputs.date = (function(train, station, doj){
        station = station.toUpperCase();
        var [day, month, year] = doj.split('-');
  
        var ret = railway.trainRoute(train).res;
        var date = new Date(year, month-1, day);

        var days = (function(ret){
          for(var i in ret.route){
            if(ret.route[i].station.code == station) return ret.route[i].day;
          }
        }(ret));

        date.setDate(date.getDate() - days + 1)

        return [date.getDate(), date.getMonth() + 1, date.getFullYear()].join('-');
      }(inputs.train, inputs.station, inputs.doj));
      
      var ret = railway.liveTrainStatus(inputs.train, inputs.date);
      return ret.err ?
        buildChildCard('Live Train Status', [buildErrorSection(ret.err)]) :
        buildLiveTrainStatusResult(inputs, ret.res);
      
    case 'seat':
      var ret = railway.seatAvailability(inputs.train, inputs.source, inputs.dest, inputs.date, inputs.pref, inputs.quota);
      return ret.err ?
        buildChildCard('Seat Availability', [buildErrorSection(ret.err)]) :
        buildSeatAvailabilityResult(inputs, ret.res);
      
    case 'fare':
      var ret = indianrail.fare(inputs.train, inputs.date, inputs.source, inputs.dest, inputs.pref, inputs.quota);
      return ret.errorMessage ?
        buildChildCard('Fare Enquiry', [buildErrorSection(ret.err)]) :
      buildFareEnquiryResult({
        train: {
          code:inputs.train
        },
        doj: inputs.date,
        source: inputs.source,
        dest: inputs.dest,
        class: inputs.pref,
        quota: inputs.quota,
        fare: ret.totalFare
      });
      
    case 'between':
       var ret = railway.trainBetweenStations(inputs.source, inputs.dest, inputs.date);
      return ret.err ?
        buildChildCard('Train Between Stations', [buildErrorSection(ret.err)]) :
      buildTrainBetweenStationsResult({
        date: inputs.date,
        source: inputs.source,
        dest: inputs.dest,
        trains: ret.res.trains
      });
  }
}
