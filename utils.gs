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
