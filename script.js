document.addEventListener("DOMContentLoaded", function() {
    const clock = document.getElementById("clock");
    const alarmsList = document.getElementById("alarmsList");
    const setAlarmButton = document.getElementById("setAlarm");
    const hoursInput = document.getElementById("hours");
    const minutesInput = document.getElementById("minutes");
    const secondsInput = document.getElementById("seconds");
    const alarmSound = document.getElementById("alarmSound");

    function updateClock() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, "0");
        const minutes = String(now.getMinutes()).padStart(2, "0");
        const seconds = String(now.getSeconds()).padStart(2, "0");
        clock.textContent = `${hours}:${minutes}:${seconds}`;
    }

    setInterval(updateClock, 1000);

    setAlarmButton.addEventListener("click", function() {
        const alarmTime = new Date();
        alarmTime.setHours(parseInt(hoursInput.value));
        alarmTime.setMinutes(parseInt(minutesInput.value));
        alarmTime.setSeconds(parseInt(secondsInput.value));

        const now = new Date();
        const timeDiff = alarmTime.getTime() - now.getTime();
        if (timeDiff <= 0) {
            alert("Please set a future time for the alarm.");
            return;
        }

        const newAlarm = document.createElement("li");
        newAlarm.classList.add("alarm-item");
        newAlarm.innerHTML = `
            <span class="alarm-time">${alarmTime.toLocaleTimeString()}</span>
            <button class="toggleAlarm">Enable</button>
        `;
        alarmsList.appendChild(newAlarm);

        setTimeout(() => {
            newAlarm.querySelector(".toggleAlarm").click();
            playAlarmSound();
            setTimeout(stopAlarmSound, 20000); // Stop alarm after 20 seconds
        }, timeDiff);
    });

    function playAlarmSound() {
        if (alarmSound.paused) {
            alarmSound.play().catch(error => {
                console.error("Error playing audio:", error);
            });
        }
    }

    function stopAlarmSound() {
        alarmSound.pause();
        alarmSound.currentTime = 0;
    }

    alarmsList.addEventListener("click", function(event) {
        const target = event.target;
        if (target.classList.contains("toggleAlarm")) {
            const alarmItem = target.closest(".alarm-item");
            if (target.textContent === "Enable") {
                target.textContent = "Disable";
            } else {
                target.textContent = "Enable";
            }
        }
    });
});

