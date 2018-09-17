(function(global){
  var userProperties = PropertiesService.getUserProperties();

  var obj = {};
  obj.getProperty = function(key){
    if(!isString(key)) throw new TypeError('Argument is NOT String.');
    
    return userProperties.getProperty(key);
  };
  obj.setProperty = function(key, value){
    if(!isString(key) || !isString(value))
    throw new TypeError('Arguments are NOT Strings.');
    
    userProperties.setProperty(key, value);
  };
  
  obj.setProperties = function(properties){
    userProperties.setProperties(properties);
  };
  
  obj.getCurrentOrSetDefault = function(key, defaultValue){
    var current = this.getProperty(key);
    if(current) return current;
    this.setProperty(defaultValue);
    return defaultValue;
  };
  obj.setDefaultOrGetCurrent = obj.getCurrentOrSetDefault;
 
  global.userProperties = obj;
})(this)
