window.addEventListener('DOMContentLoaded', () => {
  const minutesDisplay = document.getElementById('minutes');
  const secondsDisplay = document.getElementById('seconds');
  const sessionLengthInput = document.getElementById('session-length');
  const breakLengthInput = document.getElementById('break-length');
  const longBreakLengthInput = document.getElementById('long-break-length');
  const longBreakIntervalInput = document.getElementById('long-break-interval');
  const startButton = document.getElementById('start');
  const pauseButton = document.getElementById('pause');
  const resetButton = document.getElementById('reset');
  const notificationSound = document.getElementById('notification');
  const sessionCountDisplay = document.getElementById('session-count');
  const longBreakCountDisplay = document.getElementById('long-break-count');

  let timer;
  let totalSeconds;
  let sessionLength;
  let breakLength;
  let longBreakLength;
  let longBreakInterval;
  let sessionCount = 0;
  let longBreakCount = 0;

  function updateSettings() {
    sessionLength = parseInt(sessionLengthInput.value) * 60;
    breakLength = parseInt(breakLengthInput.value) * 60;
    longBreakLength = parseInt(longBreakLengthInput.value) * 60;
    longBreakInterval = parseInt(longBreakIntervalInput.value);
  }

  function updateTimer() {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    minutesDisplay.textContent = String(minutes).padStart(2, '0');
    secondsDisplay.textContent = String(seconds).padStart(2, '0');

    if (totalSeconds === 0) {
      clearInterval(timer);
      notificationSound.play();

      if (sessionCount % longBreakInterval === 0) {
        totalSeconds = longBreakLength;
        longBreakCount++;
        longBreakCountDisplay.textContent = longBreakCount;
      } else {
        totalSeconds = breakLength;
      }
      sessionCount++;
      sessionCountDisplay.textContent = sessionCount;
      timer = setInterval(updateTimer, 1000);
    } else {
      totalSeconds--;
    }
  }

  function startTimer() {
    updateSettings();
    totalSeconds = sessionLength;
    sessionCount++;
    sessionCountDisplay.textContent = sessionCount;
    timer = setInterval(updateTimer, 1000);
    startButton.disabled = true;
    pauseButton.disabled = false;
  }

  function pauseTimer() {
    clearInterval(timer);
    startButton.disabled = false;
    pauseButton.disabled = true;
  }

  function resetTimer() {
    clearInterval(timer);
    totalSeconds = sessionLength;
    updateTimer();
    startButton.disabled = false;
    pauseButton.disabled = true;
  }

  startButton.addEventListener('click', startTimer);
  pauseButton.addEventListener('click', pauseTimer);
  resetButton.addEventListener('click', resetTimer);
});




const themes = [
    {
      background: "#fff",
      color: "#000",
      primaryColor: "#fff"
  },
  {
      background: "#000",
      color: "#fff",
      primaryColor: "#000"
  },
    {
        background: "#1A1A2E",
        color: "#FFFFFF",
        primaryColor: "#0F3460"
    },
    {
        background: "#461220",
        color: "#FFFFFF",
        primaryColor: "#E94560"
    },
    {
        background: "#192A51",
        color: "#FFFFFF",
        primaryColor: "#967AA1"
    },
    {
        background: "#231F20",
        color: "#FFF",
        primaryColor: "#BB4430"
    }
  ];
  
  const setTheme = (theme) => {
    const root = document.querySelector(":root");
    root.style.setProperty("--background", theme.background);
    root.style.setProperty("--color", theme.color);
    root.style.setProperty("--primary-color", theme.primaryColor);
    root.style.setProperty("--glass-color", theme.glassColor);
  };
  
  const displayThemeButtons = () => {
    const btnContainer = document.querySelector(".theme-btn-container");
    themes.forEach((theme) => {
        const div = document.createElement("div");
        div.className = "theme-btn";
        div.style.cssText = `background: ${theme.background}; width: 25px; height: 25px`;
        btnContainer.appendChild(div);
        div.addEventListener("click", () => setTheme(theme));
    });
  };
  
  displayThemeButtons();
  