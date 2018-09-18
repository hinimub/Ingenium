(function(global){
  'use strict';
  var plugins;
  function initRegisterPlugin(){
    plugins = [];
    return function registerPlugin(plugin){
      plugin.token = Math.random().toString(36).slice(-16);
      plugins.push(plugin);
      return plugin.token;
    };
  }
  
  function unregisterPlugin(token){
    plugins = plugins.filter(function(plugin){ return plugin.token !== token });
  }
  
  function isRegisteredPlugin(pluginInfo){
    if(pluginInfo.version == null) return !isEmptyArray(plugins.filter(function(plugin){return plugin.name === pluginInfo.name}));
  }
  
  //Initializers will run After Loaded All Script Files, and Before Build Any Card.
  function initialize(){
    //Run Initializers
    if(initializers) {
      initializers.sort(compare);
      var i;
      for(i = 0; i < initializers.length; i++) initializers[i]['function'](global);
    }
    //Delete Initializers and Register Service
    initializers = null;
    registerPlugin = null;
    unregisterPlugin = null;
  }

  //Program Entry Point
  function buildAddOn(e){
    initialize();
    plugins.filter(function(plugin){ return !(plugin.hasCard)}).forEach(function(plugin){ if(plugin.entryPoint) eval(plugin.entryPoint)() })
    //Build All Cards ( if exists ) finally
    return plugins.filter(function(plugin){ return plugin.hasCard }).map(function(plugin){ return eval(plugin.entryPoint)() });
  }
  
  global.registerPlugin = initRegisterPlugin();
  global.unregisterPlugin = unregisterPlugin;
  global.isRegisteredPlugin = isRegisteredPlugin;
  global.buildAddOn = buildAddOn;
})(this)
