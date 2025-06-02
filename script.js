let shakeTimeout;

function updateTime() {
  const now = new Date();
  let hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12 || 12;
  const currentFormatted = `${hours}:${minutes} ${ampm.toUpperCase()}`;

  document.getElementById("current-time").textContent = `${hours}:${minutes}`;
  document.getElementById("ampm").textContent = ampm;
}

function checkAlarms() {
  const now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  const currentTime = `${hours}:${minutes.toString().padStart(2, "0")} ${ampm}`;

  const app = document.getElementById("appContainer");
  let alarmIsCurrentlyRinging = false;

  const alarms = document.querySelectorAll(".alarm");
  alarms.forEach((alarm) => {
    const timeText = alarm.querySelector(".time").textContent.trim();
    const isActive = alarm
      .querySelector(".toggle")
      .classList.contains("active");

    if (isActive && timeText === currentTime) {
      alarmIsCurrentlyRinging = true;
    }
  });

  if (alarmIsCurrentlyRinging && !app.classList.contains("shake")) {
    triggerShake();
  } else if (!alarmIsCurrentlyRinging && app.classList.contains("shake")) {
    stopShake();
  }
}

function triggerShake() {
  const app = document.getElementById("appContainer");
  clearTimeout(shakeTimeout);
  app.classList.add("shake");
  shakeTimeout = setTimeout(() => {
    app.classList.remove("shake");
  }, 40000);
}

function stopShake() {
  const app = document.getElementById("appContainer");
  app.classList.remove("shake");
  clearTimeout(shakeTimeout);
}

function toggleAlarm(toggleElement) {
  toggleElement.classList.toggle("active");
  const app = document.getElementById("appContainer");
  if (
    !toggleElement.classList.contains("active") &&
    app.classList.contains("shake")
  ) {
    stopShake();
  }
  checkAlarms();
}

setInterval(() => {
  updateTime();
  checkAlarms();
}, 1000);
updateTime();

function addAlarm() {
  const timeInput = document.getElementById("newTime").value;
  const labelInput = document.getElementById("newLabel").value || "Custom";

  if (!timeInput) return alert("Please enter time");

  const alarmList = document.getElementById("alarmList");

  const newAlarm = document.createElement("div");
  newAlarm.classList.add("alarm");
  newAlarm.innerHTML = `
        <div class="info">
          <span class="time">${formatTime(timeInput)}</span>
          <span class="label">${labelInput}</span>
        </div>
        <div class="toggle active" onclick="toggleAlarm(this)"></div>
      `;
  alarmList.appendChild(newAlarm);

  document.getElementById("newTime").value = "";
  document.getElementById("newLabel").value = "";
}

function formatTime(t) {
  let [h, m] = t.split(":");
  const ampm = h >= 12 ? "PM" : "AM";
  h = h % 12 || 12;
  return `${h}:${m} ${ampm}`;
}
