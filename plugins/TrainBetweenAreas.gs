function buildTrainBetweenAreas (e) {
  var areaSelection = function (title, fieldName) {
    var anorakStation = '1hocW_LZ0PlvM_S7O5RVMgPUhq_Gs3bbHgoxRYNz0';
    //DISTINCT 使えない。
    var sql = 'SELECT Area FROM ' + anorakStation + ' GROUP BY Area';
    var retAnorakStation = FusionTables.Query.sql(sql);
    var selection = CardService.newSelectionInput()
        .setType(CardService.SelectionInputType.DROPDOWN)
        .setTitle(title)
        .setFieldName(fieldName);
    retAnorakStation.rows.forEach(function(row){
      selection.addItem(row[0], row[0], false);
    }); 
    return selection;
  }
  var fromArea = areaSelection('From', 'fromArea');
  var toArea = areaSelection('To', 'toArea');
  
  var time = CardService.newSelectionInput()
        .setType(CardService.SelectionInputType.DROPDOWN)
        .setTitle("Time")
        .setFieldName("time")
        .addItem("Anorak", "anorak", true)
        .addItem("All", "all", false)
        .addItem("Ante Meridiem", "am", false)
        .addItem("Post Meridiem", "pm", false);
  
  var widgets = [
    fromArea,
    toArea,
    ui.date(),
    time,
    ui.submit({'onClick':'buildTrainBetweenAreas'})
  ];

  return ui.Card({'title':'Train Between Areas', 'widgets':widgets, 'type':'parent'});
}

