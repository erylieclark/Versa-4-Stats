// Set up all necessary variables
import document from "document";

let dataTypes     = [ "steps"];// "distance", "calories",
                      //"elevationGain", "activeMinutes" ];
let dataProgress  = [];

let getCurrentDataProgress = function(dataType) {
  let dataContainer = document.getElementById(dataType);
  return {
    dataType: dataType,
    dataContainer: dataContainer,
    arcBack: dataContainer.getElementById("arcBack"),
    arcFront: dataContainer.getElementById("arcFront"),
    dataCount: dataContainer.getElementById("dataCount"),
    dataIcon: dataContainer.getElementById("dataIcon"),
  }
}

for(var i=0; i < dataTypes.length; i++) {
  var currentData = dataTypes[i];
  dataProgress.push(getCurrentDataProgress(currentData));
}

// Refresh data, all other logic is in separate files
function refreshData(type) {
  let currentType = type.dataType;
  
  let currentDataProg = (userActivity.today.adjusted[currentType] || 0);
  let currentDataGoal = userActivity.goals[currentType];
  
  let currentDataArc = (currentDataProg / currentDataGoal) * 360;
  
  if (currentDataArc > 360) {
    currentDataArc = 360;
  }
  
  if(currentType==="distance") {
    currentDataProg = (currentDataProg * 0.000621371192).toFixed(2);
  }
  
  type.arcFront.sweepAngle = currentDataArc;
  type.dataCount.text = currentDataProg;
}

export function refreshAllData() {
  for(var i=0; i<dataTypes.length; i++) {
    refreshData(dataProgress[i]);
  }
}