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

  // Change the theme color of all elements
  if(evt.data.newValue){
    let data = JSON.parse(evt.data.newValue);
    switch(evt.data.key){
      case "themeColor":
        console.log(`Setting Theme Color: ${data}`);

        // Date and Gradient Bars
        txtDate.style.fill = data;
        gradientDividerTop.gradient.colors.c2 = data;
        gradientDividerBottom.gradient.colors.c2 = data;

        // Progress Circles
        let arc = document.getElementById("progressCircles").firstChild;
        while(arc){
          arc.getElementById("arcFront").style.fill = data;
          arc.getElementById("circleFill").style.fill = data;
          arc = arc.nextSibling;
        }
        break;
      case "circle1":
        console.log(`Circle1: ${data['values'][0]['name']}`);
        updateActivity(data['values'][0]['name'], 0);
        break;
      case "circle2":
        console.log(`Circle1: ${data['values'][0]['name']}`);
        updateActivity(data['values'][0]['name'], 1);
        break;
      case "circle3":
        console.log(`Circle1: ${data['values'][0]['name']}`);
        updateActivity(data['values'][0]['name'], 2);
        break;
    }
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
let updateActivity = function(activity, idx){
    //let activity = newValue['values'][0][['name']];
    console.log(`Setting Activity ${idx + 1}: ${activity}`);

    // Set the new activity in the list
    activityArcs.activities[idx] = activity;
    console.log(`Activities List: ${activityArcs.activities}`);

}
/*function activityCallback(data) {
  activities.forEach((item, index) => {
    let img = item.firstChild;
    let txt = img.nextSibling;
    txt.text = data[Object.keys(data)[index]].pretty;
  });
}
activityArcs.initialize("seconds", activityCallback);
*/