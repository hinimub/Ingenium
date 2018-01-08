var apikey_ = '123456';

function scanResponseCode_ (res) {
  switch (res.response_code) {
    case 200:
      return res;
    case 210:
      return {isFailed:true, description:"Train doesn’t run on the date queried."};
    case 211:
      return {isFailed:true, description:"Train doesn’t have journey class queried."};
    case 220:
      return {isFailed:true, description:"Flushed PNR."};
    case 221:
      return {isFailed:true, description:"Invalid PNR."};
    case 230:
      return {isFailed:true, description:"Date chosen for the query is not valid for the chosen parameters."};
    case 404:
      return {isFailed:true, description:"Data couldn’t be loaded on our servers. No data available."};
    case 405:
      return {isFailed:true, description:"Data couldn’t be loaded on our servers. Request couldn’t go through."};
    case 500:
      return {isFailed:true, description:"Unauthorized API Key."};
    case 501:
      return {isFailed:true, description:"Account Expired."};
    case 502:
      return {isFailed:true, description:"Invalid arguments passed."};
  }
}

function exec_ (url) {
  var response = UrlFetchApp.fetch(url);
  return scanResponseCode_(JSON.parse(response));
}

/**
 * @param {string} pnr PNR No. ( 10 digit )
 */
function pnrStatus (pnr) {
  var url = 'https://api.railwayapi.com/v2/pnr-status/pnr/'+pnr+'/apikey/'+apikey_+'/';
  return exec_(url);
}

function trainRoute (train) {
  var url = 'https://api.railwayapi.com/v2/route/train/'+train+'/apikey/'+apikey_+'/';
  return exec_(url);
}

function liveTrainStatus (train, date) {
  var url = 'https://api.railwayapi.com/v2/live/train/'+train+'/date/'+date+'/apikey/'+apikey_+'/';
  return exec_(url);
}

function seatAvailability (train, source, dest, date, pref, quota) {
  var url = 'https://api.railwayapi.com/v2/check-seat/train/'+train+'/source/'+source+'/dest/'+dest+'/date/'+date+'/pref/'+pref+'/quota/'+quota+'/apikey/'+apikey_+'/';
  return exec_(url);
}

function trainBetweenStations (source, dest, date) {
  var url = 'https://api.railwayapi.com/v2/between/source/'+source+'/dest/'+dest+'/date/'+date+'/apikey/'+apikey_+'/';
  return exec_(url);
}

function fareEnquiry (train, source, dest, date, pref, quota, age) {
  var url = 'https://api.railwayapi.com/v2/fare/train/'+train+'/source/'+source+'/dest/'+dest+'/age/'+age+'/pref/'+pref+'/quota/'+quota+'/date/'+date+'/apikey/'+apikey_+'/';
  return exec_(url);
}
