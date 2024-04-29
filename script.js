window.addEventListener("DOMContentLoaded", () => {
  const minutesDisplay = document.getElementById("minutes");
  const secondsDisplay = document.getElementById("seconds");
  const sessionLengthInput = document.getElementById("session-length");
  const breakLengthInput = document.getElementById("break-length");
  const longBreakLengthInput = document.getElementById("long-break-length");
  const longBreakIntervalInput = document.getElementById("long-break-interval");
  const startButton = document.getElementById("start");
  const pauseButton = document.getElementById("pause");
  const resetButton = document.getElementById("reset");
  const resumeButton = document.getElementById("resume");
  const resetStorageButton = document.getElementById("reset-storage");
  const notificationSound = document.getElementById("notification"); // Assuming you have an audio element with id="notification"
  const sessionCountDisplay = document.getElementById("session-count");
  const shortBreakCountDisplay = document.getElementById("short-break-count");
  const longBreakCountDisplay = document.getElementById("long-break-count");
  let condition = document.getElementById("condition");
  let timer;
  let totalSeconds;
  let sessionLength;
  let breakLength;
  let longBreakLength;
  let longBreakInterval;
  let sessionCount = 0;
  let shortBreakCount = 0;
  let longBreakCount = 0;
  let determine = 0;

  function updateSettings() {
    sessionLength = parseInt(sessionLengthInput.value) * 60;
    breakLength = parseInt(breakLengthInput.value) * 60;
    longBreakLength = parseInt(longBreakLengthInput.value) * 60;
    longBreakInterval = parseInt(longBreakIntervalInput.value);
  }

  function updateTimer() {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    minutesDisplay.textContent = String(minutes).padStart(2, "0");
    secondsDisplay.textContent = String(seconds).padStart(2, "0");

    if (totalSeconds === 0) {
      clearInterval(timer);
      notificationSound.play();
      determine++;

      if ((determine - shortBreakCount) % longBreakInterval === 0) {
        totalSeconds = longBreakLength;
        longBreakCount++;
        longBreakCountDisplay.textContent = longBreakCount;
        condition.textContent = "long break";
      } else if (determine % 2 !== 0) {
        totalSeconds = breakLength;
        shortBreakCount++; // Increment short break counter on break start
        condition.textContent = "short break";
      } else if (determine % 2 == 0) {
        totalSeconds = sessionLength;
        sessionCount++;
        condition.innerHTML = "work time";
      }

      sessionCountDisplay.textContent = sessionCount;
      shortBreakCountDisplay.textContent = shortBreakCount; // Update short break count display

      timer = setInterval(updateTimer, 1000);
    } else {
      totalSeconds--;
    }
  }

  startButton.addEventListener("click", function () {
    updateSettings();
    totalSeconds = sessionLength;
    sessionCount++;
    condition.innerHTML = "work time";
    sessionCountDisplay.textContent = sessionCount;
    shortBreakCountDisplay.textContent = shortBreakCount; // Display initial short break count
    longBreakCountDisplay.textContent = longBreakCount; // Display initial long break count

    // Store counters in localStorage before starting timer
    localStorage.setItem("sessionCount", sessionCount);
    localStorage.setItem("shortBreakCount", shortBreakCount);
    localStorage.setItem("longBreakCount", longBreakCount);

    timer = setInterval(updateTimer, 1000);
    startButton.style.display = "none";
    pauseButton.style.display = "inline";
    resetButton.style.display = "inline";
    resumeButton.style.display = "none";
  });

  pauseButton.addEventListener("click", function () {
    clearInterval(timer);
    startButton.style.display = "none";
    pauseButton.style.display = "none";
    resetButton.style.display = "inline";
    resumeButton.style.display = "inline";
  });

  resumeButton.addEventListener("click", function () {
    timer = setInterval(updateTimer, 1000);
    startButton.style.display = "none";
    resumeButton.style.display = "none";
    pauseButton.style.display = "inline";
    resumeButton.style.display = "none";
  });

  resetButton.addEventListener("click", function () {
    clearInterval(timer);
    totalSeconds = sessionLength;
    updateTimer();
    startButton.style.display = "inline";
    resetButton.style.display = "none";
    resumeButton.style.display = "none";
    pauseButton.style.display = "none";
  });

  resetStorageButton.addEventListener("click", function () {
    localStorage.removeItem("sessionCount");
    localStorage.removeItem("shortBreakCount");
    localStorage.removeItem("longBreakCount");
    0;
    sessionCount = 0;
    shortBreakCount = 0;
    longBreakCount = 0;

    sessionCountDisplay.textContent = sessionCount;
    shortBreakCountDisplay.textContent = shortBreakCount;
    longBreakCountDisplay.textContent = longBreakCount;
  });

  // Load counters from localStorage on page load
  sessionCount = parseInt(localStorage.getItem("sessionCount")) || 0;
  shortBreakCount = parseInt(localStorage.getItem("shortBreakCount")) || 0;
  shortBreakCount = parseInt(localStorage.getItem("shortBreakCount")) || 0;

  resumeButton.style.display = "none";
  pauseButton.style.display = "none";
  resetButton.style.display = "none";
});
