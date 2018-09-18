/**
 * @fileOverview Ingenium plugin to edit the User Properties.
 *     Need other plugins to add card sections.
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
  var settingsSectionBuilders;
  
 /*
  * View
  */
  function settingsCard () {
    var settingsSections = settingsSectionBuilders.map(function(settingsSectionBuilder){
      return settingsSectionBuilder();
    });
    var updateButton = ui.TextButton({
      'text':'Update',
      'onClick':'saveSettings',
      'params': {
        'json': JSON.stringify({
          'settingsSectionBuilders': settingsSectionBuilders.map(function(settingsSectionBuilder){
            return settingsSectionBuilder.toString();
      })})}});
    
    var updateSection = ui.Section({'widgets':updateButton});
    settingsSections.push(updateSection); 

    return ui.Card({'title':'Settings', 'sections':settingsSections, 'type':'parent'});
  }
  
 /*
  * Controller
  */
  function initAddSettingsSectionBuilder(){
    settingsSectionBuilders = [];
    return function addSettingsSectionBuilder (section){
      settingsSectionBuilders.push(section);
    };
  }
  function buildSettings(){
    return settingsCard();
  }
  function saveSettings(event){
    settingsSectionBuilders = JSON.parse(event.parameters.json).settingsSectionBuilders.map(function(settingsSectionBuilder){
      return eval(settingsSectionBuilder)
    });
  
    var newProperties = event.formInput;
    var userProperties = PropertiesService.getUserProperties();
    userProperties.setProperties(newProperties);

    return ui.ActionResponse({
      'notice':ui.Notice({'text':'Updated', 'type':'info', 'build':false}),
      'navigation':ui.Navigation({'updateCard':buildSettings(), 'build':false})
      });
    //return ui.Notice({'text':'Updated', 'type':'info'});
  }

  global.addSettingsSectionBuilder = initAddSettingsSectionBuilder();
  global.buildSettings = buildSettings;
  global.saveSettings = saveSettings;
})(this)