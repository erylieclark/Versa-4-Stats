// Set up all necessary variables
import document from "document";
import { me } from "appbit";
import { today, goals } from "user-activity";
import clock from "clock";
import { units } from "user-settings";

// A global list for keeping track of what is displayed
export let activities = ["Steps", "Steps", "Steps"];
let activityImages = {
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
  "Active Zone Minutes": {
    open: "icons/activeMinutes_transparent.png",
    complete: "icons/activeMinutes_complete.png"
  }
}

let activityCallback;

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


export function initialize(granularity, callback) {
  if (me.permissions.granted("access_activity")) {
    clock.granularity = granularity;
    clock.addEventListener("tick", tickHandler);
    activityCallback = callback;
  } else {
    console.log("Denied User Activity permission");
    callback({
      "Steps": getDeniedStats(),
      "Calories": getDeniedStats(),
      "Distance": getDeniedStats(),
      "ElevationGain": getDeniedStats(),
      "Active Zone Minutes": getDeniedStats()
    });
  }
}

let activityData = () => {
  return {  
    "Steps": getSteps(),
    "Calories": getCalories(),
    "Distance": getDistance(),
    "ElevationGain": getElevationGain(),
    "Active Zone Minutes": getActiveZoneMinutes(),
  };  
}

function tickHandler(evt) {
  activityCallback(activityData());
}

function getSweepAngle(progress, goal){
  let sweepAngle = (progress / goal) * 360;
  
  if (sweepAngle > 360) {
    sweepAngle = 360;
  }

  return sweepAngle;
}

function getActiveZoneMinutes() {
  let currentDataProg = (today.adjusted.activeZoneMinutes.total || 0);
  let currentDataGoal = goals.activeZoneMinutes.total;
  let currentDataArc = getSweepAngle(currentDataProg, currentDataGoal);

  return {
    sweep: currentDataArc,
    raw: currentDataProg,
    goal: currentDataGoal,
    pretty: (currentDataProg < 60 ? "" : Math.floor(currentDataProg/60) + "h,") + ("0" + (currentDataProg%60)).slice("-2") + "m"
  }
}

function getCalories() {
  let currentDataProg = (today.adjusted.calories || 0);
  let currentDataGoal = goals.calories;
  let currentDataArc = getSweepAngle(currentDataProg, currentDataGoal);
  
  return {
    sweep: currentDataArc,
    raw: currentDataProg,
    goal: currentDataGoal,
    pretty: currentDataProg > 999 ? Math.floor(currentDataProg/1000) + "," + ("00"+(currentDataProg%1000)).slice(-3) : currentDataProg 
  }
}

function getDistance() {
  let currentDataProg = (today.adjusted.distance || 0);
  let currentDataGoal = goals.distance;
  let currentDataArc = getSweepAngle(currentDataProg, currentDataGoal);
  
  currentDataProg = currentDataProg / 1000;

  let u = "km";
  if(units.distance === "us") {
    currentDataProg *= 0.621371;
    u = "mi";
  }
  return {
    sweep: currentDataArc,
    raw: currentDataProg,
    goal: currentDataGoal,
    pretty: `${currentDataProg.toFixed(2)}${u}`
  }
}

function getElevationGain() {
  let currentDataProg = (today.adjusted.elevationGain || 0);
  let currentDataGoal = goals.elevationGain;
  let currentDataArc = getSweepAngle(currentDataProg, currentDataGoal);
  return {
    sweep: currentDataArc,
    raw: currentDataProg,
    goal: currentDataGoal,
    pretty: `+${currentDataProg}`
  }
}

function getSteps() {
  let currentDataProg = (today.adjusted.steps || 0);
  let currentDataGoal = goals.steps;
  let currentDataArc = getSweepAngle(currentDataProg, currentDataGoal);

  return {
    sweep: currentDataArc,
    raw: currentDataProg,
    goal: currentDataGoal,
    pretty: currentDataProg > 999 ? Math.floor(currentDataProg/1000) + "," + ("00"+(currentDataProg%1000)).slice(-3) : currentDataProg 
  }
}

function getDeniedStats() {
  return {
    raw: 0,
    pretty: "Denied"
  }
}