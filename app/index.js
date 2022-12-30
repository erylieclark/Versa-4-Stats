import * as document from "document";
import * as messaging from "messaging";
import * as simpleClock from "./features/clock";
import * as progressData from "./features/progress_circles";

let background = document.getElementById("background");
let txtTime = document.getElementById("txtTime");
let txtDate = document.getElementById("txtDate");
let gradientDividerTop = document.getElementById("gradientDividerTop");
let gradientDividerBottom = document.getElementById("gradientDividerBottom");

// Message is received
messaging.peerSocket.onmessage = evt => {
  console.log(`App received: ${JSON.stringify(evt)}`);
  if (evt.data.key === "themeColor" && evt.data.newValue) {
    let color = JSON.parse(evt.data.newValue);
    console.log(`Setting date and time color: ${color}`);
    txtDate.style.fill = color;
    gradientDividerTop.gradient.colors.c2 = color;
    gradientDividerBottom.gradient.colors.c2 = color;
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

/* --------- PROGRESS CIRCLES ---------- */