// Set up all necessary variables
import document from "document";
import { me } from "appbit";

// Presumably I can export this list as a global variable?
export let activities = ["Steps", "Steps", "Steps"];
export let activityImages = {
  "Steps": {
    open: "icons/steps_transparent.png",
    complete: "icons/steps_complete.png"
  },
  "Distance": {
    open: "icons/distance_transparent.png",
    complete: "icons/distance_complete.png"
  },
  "Calories": {
    open: "icons/calories_transparent.png",
    complete: "icons/calories_complete.png"
  },
  "Active Minutes": {
    open: "icons/activeMinutes_transparent.png",
    complete: "icons/activeMinutes_complete.png"
  }
}
let dataTypes     = [ "circle1"];// "distance", "calories",
                      //"elevationGain", "activeMinutes" ];
let dataProgress  = [];

export function updateActivityImages(){
    let arc = document.getElementById("progressCircles").firstChild;
    for (let i = 0; i < 3; i++){
      // Figure out which icon to update to
      let icon = activityImages[activities[i]]
      console.log(`Updating Circle ${i}: ${JSON.stringify(icon)}`);
      arc.getElementById("dataIcon").href = icon.open;
      arc = arc.nextSibling;
    }

}

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

let activityCallback;

export function initialize(granularity, callback) {
  if (me.permissions.granted("access_activity")) {
    clock.granularity = granularity;
    clock.addEventListener("tick", tickHandler);
    activityCallback = callback;
  } else {
    console.log("Denied User Activity permission");
    callback({
      steps: getDeniedStats(),
      calories: getDeniedStats(),
      distance: getDeniedStats(),
      elevationGain: getDeniedStats(),
      activeMinutes: getDeniedStats()
    });
  }
}

let activityData = () => {
  return {  
    steps: getSteps(),
    calories: getCalories(),
    distance: getDistance(),
    elevationGain: getElevationGain(),
    activeMinutes: getActiveMinutes()
  };  
}

function tickHandler(evt) {
  activityCallback(activityData());
}

function getActiveMinutes() {
  let val = (today.adjusted.activeMinutes || 0);
  return {
    raw: val,
    pretty: (val < 60 ? "" : Math.floor(val/60) + "h,") + ("0" + (val%60)).slice("-2") + "m"
  }
}

function getCalories() {
  let val = (today.adjusted.calories || 0);
  return {
    raw: val,
    pretty: val > 999 ? Math.floor(val/1000) + "," + ("00"+(val%1000)).slice(-3) : val
  }
}

function getDistance() {
  let val = (today.adjusted.distance || 0) / 1000;
  let u = "km";
  if(units.distance === "us") {
    val *= 0.621371;
    u = "mi";
  }
  return {
    raw: val,
    pretty: `${val.toFixed(2)}${u}`
  }
}

function getElevationGain() {
  let val = today.adjusted.elevationGain || 0;
  return {
    raw: val,
    pretty: `+${val}`
  }
}

function getSteps() {
  let val = (today.adjusted.steps || 0);
  return {
    raw: val,
    pretty: val > 999 ? Math.floor(val/1000) + "," + ("00"+(val%1000)).slice(-3) : val
  }
}

function getDeniedStats() {
  return {
    raw: 0,
    pretty: "Denied"
  }
}