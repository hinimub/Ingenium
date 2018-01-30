var apikey_;

function setApiKey (apikey) {
  return apikey_ = apikey;
}

function scanResponseCode_ (res) {
  var err = {
    200: null,
    210: "Train doesn’t run on the date queried.",
    211: "Train doesn’t have journey class queried.",
    220: "Flushed PNR.",
    221: "Invalid PNR.",
    230: "Date chosen for the query is not valid for the chosen parameters.",
    404: "Data couldn’t be loaded on our servers. No data available.",
    405: "Data couldn’t be loaded on our servers. Request couldn’t go through.",
    500: "Unauthorized API Key.",
    501: "Account Expired.",
    502: "Invalid arguments passed."
  };
  return err[res.response_code];
}

function exec_ (url) {
  var res = JSON.parse(UrlFetchApp.fetch(url));
  var err = scanResponseCode_(res);
  return {
    err: err,
    res: res
  };
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
