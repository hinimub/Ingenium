function submit(e) {
  var mode = e.parameters.mode;
  
  if(Object.keys(e.formInput).length) var inputs = e.formInput;
  else var inputs = JSON.parse(e.parameters.inputs);
  
  return dispatcher(mode, inputs);
}