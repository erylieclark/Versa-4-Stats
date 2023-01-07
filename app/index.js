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
let circle1 = document.getElementById("circle1");
let circle2 = document.getElementById("circle2");
let circle3 = document.getElementById("circle3");
//let circle_elements = document.getElementsByClassName("arc-style");

// Elements to change activity
let circles = ["circle1", "circle2", "circle3"]
// Default Values
// Presumably I can export this list as a global variable?
let activities = ["steps", "distance", "calories", "activeMinutes"]


// Message is received
messaging.peerSocket.onmessage = evt => {
  console.log(`App received: ${JSON.stringify(evt)}`);

  // Change the theme color of all elements
  if (evt.data.key === "themeColor" && evt.data.newValue) {
    // Get the Color
    let color = JSON.parse(evt.data.newValue);
    console.log(`Setting Theme Color: ${color}`);

    // Date and Gradient Bars
    txtDate.style.fill = color;
    gradientDividerTop.gradient.colors.c2 = color;
    gradientDividerBottom.gradient.colors.c2 = color;

    // Progress Circles
    circle1.getElementById("arcFront").style.fill = color;
    circle2.getElementById("arcFront").style.fill = color;
    circle3.getElementById("arcFront").style.fill = color;
  }
  
  // If evt.data.key in circles
  if (evt.data.key === "circle1" && evt.data.newValue) {
    let activity = JSON.parse(evt.data.newValue);
    console.log(`Setting Activity 1: ${activity}`);
    // Get the index of the key in the circles list
    //circles.forEach((item, index) => {
    //  if evt.data.key === ""
    //});
    // Replace activities[index] with newvalue

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
  activities.forEach((item, index) => {
    let img = item.firstChild;
    let txt = img.nextSibling;
    txt.text = data[Object.keys(data)[index]].pretty;
  });
}
activityArcs.initialize("seconds", activityCallback);