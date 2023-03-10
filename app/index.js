import * as document from "document";
import * as messaging from "messaging";
import * as simpleClock from "./features/clock";
import * as activityArcs from "./features/activity";

let background = document.getElementById("background");

// Elements to change theme color
let txtTime = document.getElementById("txtTime");
let txtDate = document.getElementById("txtDate");
let gradientDividerTop = document.getElementById("gradientDividerTop");
let gradientDividerBottom = document.getElementById("gradientDividerBottom");

// Message is received
messaging.peerSocket.onmessage = evt => {
  console.log(`App received: ${JSON.stringify(evt.data)}`);

  //if(evt.data.oldValue){
  //  let old_data = JSON.parse(evt.data.oldValue);
  //  console.log(`Old Data: ${old_data}`);
  //}

  // Change the theme color of all elements
  if(evt.data.newValue){
    let new_data = JSON.parse(evt.data.newValue);
    switch(evt.data.key){
      case "themeColor":
        console.log(`Setting Theme Color: ${new_data}`);

        // Date and Gradient Bars
        txtDate.style.fill = new_data;
        gradientDividerTop.gradient.colors.c2 = new_data;
        gradientDividerBottom.gradient.colors.c2 = new_data;

        // Progress Circles
        let arc = document.getElementById("progressCircles").firstChild;
        while(arc){
          arc.getElementById("arcFront").style.fill = new_data;
          arc.getElementById("circleFill").style.fill = new_data;
          arc = arc.nextSibling;
        }
        break;
      case "circle0":
        console.log(`Updating Circle 0: ${new_data['values'][0]['name']}`);
        activityArcs.activities[0] = new_data['values'][0]['name'];
        //updateActivity(new_data['values'][0]['name'], 0);
        break;
      case "circle1":
        console.log(`Updating Circle 1: ${new_data['values'][0]['name']}`);
        activityArcs.activities[1] = new_data['values'][0]['name'];
        break;
      case "circle2":
        console.log(`Updating Circle 2: ${new_data['values'][0]['name']}`);
        activityArcs.activities[2] = new_data['values'][0]['name'];
        break;
    }
    console.log(`Activities List: ${activityArcs.activities}`);
    // Change the image
    activityArcs.updateActivityImages()
  }
};

// Message socket opens
messaging.peerSocket.onopen = () => {
  console.log("App Socket Open");
};

// Message socket closes
messaging.peerSocket.onclose = () => {
  console.log("App Socket Closed");
};

/* --------- CLOCK ---------- */
function clockCallback(data) {
  txtTime.text = data.time;
  txtDate.text = data.date;
}
simpleClock.initialize("minutes", "longDate", clockCallback);

/* --------- ACTIVITY ---------- */
function activityCallback(data) {
  let progressCircle = document.getElementById("progressCircles").firstChild;
  for (let i = 0; i < 3; i++){
    // Get the data associated with the activity that is getting updated
    let activityData = data[activityArcs.activities[i]];
    console.log(`Activity: ${activityArcs.activities[i]}, Raw: ${activityData.raw}, Goal: ${activityData.goal}`);

    // Update the sweep angle
    progressCircle.getElementById("arcFront").sweepAngle = activityData.sweep;

    progressCircle = progressCircle.nextSibling;
  }
}
activityArcs.initialize("seconds", activityCallback);
