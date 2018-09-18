/**
  *
  *
  */
if(!initializers) var initializers = [];

(function(global){
  'use strict';
  var pluginInfo = {
    'name':'ingenium-plugin-settings',
    'version':1.0,
    'title':'Settings',
    'entryPoint':'buildSettings',
    'hasCard':true
  };
 /*
  * Initializer
  */
  global.initializers.push({
    'function':function(){
      registerPlugin(pluginInfo);
    }
  });
 

 /*
  * Model
  */
  var settingsSections;
  
 /*
  * View
  */
  function settingsCard () {
    var updateButton = ui.TextButton({'text':'Update', 'onClick':'saveSettings'});
    var updateSection = ui.Section({'widgets':updateButton});
    settingsSections.push(updateSection);
    return ui.Card({'title':'Settings', 'sections':settingsSections, 'type':'parent'});
  }
  
 /*
  * Controller
  */
  function initAddSettingsSection(){
    settingsSections = [];
    return function addSettingsSection (section){
      settingsSections.push(section);
    };
  }
  function buildSettings(){
    return settingsCard();
  }
  function saveSettings(e){
    var newProperties = e.formInput;
    var userProperties = PropertiesService.getUserProperties();
    userProperties.setProperties(newProperties);

    return ui.Notice({'text':'Updated', 'type':'info'});
  }

  global.addSettingsSection = initAddSettingsSection();
  global.buildSettings = buildSettings;
  global.saveSettings = saveSettings;
})(this)