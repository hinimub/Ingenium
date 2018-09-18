function isString(obj) {
  return (typeof (obj) === "string" || obj instanceof String);
}

function isEmptyArray(arr){
  return !(arr.length);
}

function isEmptyObject(obj){
  return !Object.keys(obj).length;
}

function getParametersFromEvent(event){
  return !isEmptyObject(event.formInput) ? event.formInput : event.parameters;
}

//http://www.akichan.tech/entry/2018/03/20/213731
var compare = function(x, y) {
    var a = x.rank;
    var b = y.rank;
    if (a !== a && b !== b) return 0;
    if (a !== a) return 1;
    if (b !== b) return -1; 
    
    if (a == null && b == null) return 0;
    if (a == null) return 1;
    if (b == null) return -1;
    
    if (a === '' && b === '') return 0;
    if (a === '') return 1;
    if (b === '') return -1;
    
    return a < b ? -1 : (a > b ? 1 : 0);
}