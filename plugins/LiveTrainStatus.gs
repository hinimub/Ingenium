(function(global){
  'use strict';
  function buildLiveTrainStatus (e) {
    var widgets = [
        ui.train(),
        ui.date(),
        ui.submit({'onClick':'getLiveTrainStatus'})
    ];
    return ui.Card({'title':'Live Train Status', 'widgets':widgets, 'type':'parent'});
  }

  function getLiveTrainStatus(event){
    var inputs = getParametersFromEvent(event);

/*
var inputs = event.formInput;
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
        ui.Card({'title':'Live Train Status', 'text':ret.err, 'type':'error'}) :
        buildLiveTrainStatusResult(inputs, ret.res);
        */
      
}

function buildLiveTrainStatusResult(inputs, ret) {
  var sections = ret.route.map(function(v){
    var text = '';
    text += 'ETA/ATA : ' + v.actarr;
    text += '<br>';
    text += 'ETD/ATD : ' + v.actdep;
    text += '<br>';
    text += v.has_departed ? v.status : '<font color="#9999ea">'+v.status+'</font>';
    
    return ui.Section({'title':v.station.name, 'text':text, 'collapsible':v.has_departed});
  });
  
  return ui.Card({'title':ret.train.number + ' - ' + ret.train.name, 'sections':sections, 'type':'child'});
}
global.buildLiveTrainStatus = buildLiveTrainStatus;
global.getLiveTrainStatus = getLiveTrainStatus;
})(this)