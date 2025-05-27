// Task 1: Declare The Task Array and The Interval ID
// TODO: Begin by declaring an array to hold your one-time tasks (`oneTimeTasks`) and variables for any interval IDs you'll need for continuous tasks (`monitoringTaskId`).
const interval = 2000;
const countdownInterval = 1000;
let oneTimeTasks = [];
let monitoringTaskId = [];

function createP(text) {
    document.body.insertAdjacentHTML("afterbegin", `<p>${text}</p>`);
    console.log(text);
}

// Task 2: Add One-Time Task Function
function addOneTimeTask(func, delay) {
    // TODO: Write a function named `addOneTimeTask` that accepts a function (`func`) and a delay (`delay`) as parameters.
    // This function should add an object containing both parameters into the `oneTimeTasks` array.
    oneTimeTasks.push({func: func, delay: delay});
}

// Task 3: Run One-Time Tasks Function
function runOneTimeTasks() {
    // TODO: Create a function named `runOneTimeTasks` that iterates over the `oneTimeTasks` array and uses `setTimeout` to schedule each task according to its delay.
    return new Promise((resolve) => {
        // Create an array of Promises for each task
        const taskPromises = oneTimeTasks.map((task) => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    task.func();
                    resolve();
                }, task.delay);
            });
        });
        // Wait for all tasks to complete
        Promise.all(taskPromises).then(() => {
            resolve();
        });
    });
}

// Task 4: Start Monitoring Function
function startMonitoring() {
    // TODO: Write a function named `startMonitoring` that uses `setInterval` to simulate continuous monitoring. This function should print a message every few seconds and store the interval ID in `monitoringTaskId`.
    createP("Starting continuous monitoring of space station parameters...");
    let intervalID = setInterval(() => {
        createP("Monitoring space station conditions...");
        // Mock-up condition checks
        const oxygenLevel = Math.random() * 100; // Mock-up oxygen level percentage.
        const powerStatus = Math.random() > 0.1 ? "Stable" : "Critical"; // Mock-up power status.
        const communicationCheck =
            Math.random() > 0.05 ? "All systems go" : "Communication error"; // Mock-up communication system check.
        createP(
            `Oxygen Level: ${oxygenLevel.toFixed(
                2
            )}% | Power Status: ${powerStatus} | Communication: ${communicationCheck}`
        );
    }, interval);
    monitoringTaskId.push(intervalID);
    intervalID = setInterval(() => {
        // Monitoring weather conditions
        createP("Starting continuous monitoring of weather conditions...");
        const weatherCondition = Math.random() > 0.5 ? "Clear" : "Stormy"; // Mock-up weather condition.
        // from 0 - 30
        const temperature = Math.random() * 30; // Mock-up temperature in Celsius.
        const humidity = Math.random() * 100; // Mock-up humidity.
        createP(
            `Weather Condition: ${weatherCondition} | Temperature: ${temperature.toFixed(
                2
            )}°C | Humidity: ${humidity.toFixed(2)}%`
        );
    }, interval);
    monitoringTaskId.push(intervalID);
}

// Task 5: Stop Monitoring Function
function stopMonitoring() {
    // TODO: Implement a function named `stopMonitoring` that stops the continuous monitoring by using `clearInterval` on `monitoringTaskId`.
    for (let i = 0; i < monitoringTaskId.length; i++) {
        clearInterval(monitoringTaskId[i]);
    }
    createP(
        "Stopping continuous monitoring of space station & weather conditions..."
    );
}

// Task 6: Start Countdown Function
function startCountdown(duration) {
    let timeLeft = duration;
    createP("Starting countdown...");
    // TODO: Create a function named `startCountdown` that takes a duration parameter. Use `setInterval` to decrease the countdown every second and print the remaining time. Use `clearInterval` to stop the countdown when it reaches zero, printing a "Liftoff!" message.
    return new Promise((resolve) => {
        let dur = timeLeft;
        if (!dur) {
            resolve();
            return;
        }
        let countdownID = setInterval(() => {
            createP("T-minus " + dur + " seconds");
            dur--;
            if (dur < 0) {
                clearInterval(countdownID);
                createP("Liftoff!");
                resolve();
            }
        }, countdownInterval);
    });
}

function preSetup() {
    // System Check
    addOneTimeTask(() => {
        createP("========System Check=========");
        createP("Verify Propulsion System: OK");
        createP("Avionics and Guidance: OK");
        createP("Payload Integration: OK");
        createP("Environmental System: OK");
    }, 0);
    // Safety Check
    addOneTimeTask(() => {
        createP("=========Safety Check=========");
        createP("Clear Launch Zone: OK");
        createP("Emergency Response Readiness: OK");
        createP("Range Safety Check: OK");
    }, 4000);
    // Coordinate Check: Begins.
    addOneTimeTask(() => {
        createP("========Coordinate Check=========");
        createP("Mission Control Briefing: OK");
        createP("Go/No-Go Poll: OK");
        createP("Timing Synchronization: OK");
    }, 5000);
    // Compliance Check
    addOneTimeTask(() => {
        createP("========Compliance Check=========");
        createP("Regulatory Approvals: OK");
        createP("Fight Plan Review: OK");
        createP("Log Pre-Launch Data: OK");
    }, 6000);
}

// Task 7: Schedule Pre-Launch Activities and Launch
// NOTE: I did not use addOneTimeTask to schedule stopMonitoring and startCountdown because I wanted to use the Promise returned by runOneTimeTasks to ensure that the tasks are executed in order.
// This is a simple simulation of a space mission control system.
async function scheduleMission() {
    // TODO: Use the functions you've created to schedule the pre-launch system check, start and stop monitoring, and execute the countdown. Make sure to adjust the delays appropriately to simulate a real mission timeline.
    preSetup();
    startMonitoring();
    await runOneTimeTasks();
    stopMonitoring();
    await startCountdown(10);
}

scheduleMission(); // Starts the mission.
