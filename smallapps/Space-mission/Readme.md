## Prework

Simplified Pre-Job Checklist Before Rocket Launch with Estimated Times

### 1. One-Time Tasks

These tasks are performed once during the pre-launch phase.

-   **System Checks**: Verify propulsion, avionics, payload, and environmental systems.
    _Estimated Time_: 7,200 seconds (120 minutes)
    _Rationale_: Involves a comprehensive, one-off validation of subsystems through automated and manual testing.

-   **Safety Protocols**: Clear launch zone, ready emergency teams, and check range safety.
    _Estimated Time_: 1,800 seconds (30 minutes)
    _Rationale_: A single coordinated effort to evacuate, position teams, and verify safety systems.

-   **Coordination**: Brief mission control, conduct go/no-go poll, sync timing.
    _Estimated Time_: 1,200 seconds (20 minutes)
    _Rationale_: A one-time briefing and decision-making process involving key stakeholders.

-   **Compliance**: Confirm regulatory approvals, review flight plan, log data.
    _Estimated Time_: 1,800 seconds (30 minutes)
    _Rationale_: A single review and documentation process to ensure regulatory and mission readiness.

**Total Estimated Time for One-Time Tasks**: 12,000 seconds (200 minutes or ~3.3 hours)

### 2. Continuous Monitoring Tasks

These tasks involve ongoing observation or repeated checks during the pre-launch phase.

-   **Ground Equipment**: Inspect umbilicals, launch platform, and monitor weather.  
    _Estimated Time_: 3,600 seconds (60 minutes)  
    _Rationale_: Involves continuous weather monitoring and periodic checks of equipment, as conditions may change during the pre-launch window.

**Total Estimated Time for Continuous Monitoring Tasks**: 3,600 seconds (60 minutes or 1 hour)

**Overall Total Estimated Time**: 15,600 seconds (260 minutes or ~4.3 hours)

_Note_: Times are indicative and assume no anomalies or delays. Continuous monitoring tasks may extend or repeat if issues arise. Specific missions may require adjustments based on rocket design, crew involvement, or unforeseen issues.

## Qustion

### One-time task - what are they?

We use setTimeout func to run all the task, but in my view, our task should run when the previous one is done.

What **delay** time here we set to the task is what concern me so much.

> this is what we should schedule the timeline.

We need to schedule several one-time tasks.

-   we use setTimeout to do the schedule.

Q: Does the order matter? And how we order tasks?

> If we just run every task in scheduled time, they all will run asynchronously itself (We use setTimeout to run all tasks in runOneTimeTasks), here we do not consider the time that the task need, if everything goes with schedule, then what is the point of do the asynchronous ourselves?

So that means we have two type of task actually

-   One is Continuous Monitoring the space station conditions
-   Another one is one-time tasks.

### Continuous task

Here we have problems too. We have used `monitoringTaskId` to store the taskID, which means we **are not have only one tasks to monitor**.

Which is the **difference** between the Monitoring process to the one-time task.

**One-time task:** Use setTimeout() to run in delay time.
**Monitor process:** Use setInterval() to use continuously, keep monitoring but what it do is printing message.

In my opinion:

I have several one-time tasks that I list above and several monitoring processes (Inspect umbilicals, launch platform, and monitor weather).

But here is another problem:

### Summary

Looks creepy, but when you try to do the coding. Try from the easy, simply condition and situation, it will be much more clear.

like monitor, when to stop, I know by run the code, and see I should make synchronous here to make it stop monitoring at the last after all other work done.

### Mistake

```js
setTimeout(clearInterval(intervalID), 5000);
```

-   Immediate Invocation of clearInterval(intervalID)
    -   this is a function call that executes immediately when the line is parsed. It doesn't return a function to be executed later;
    -   In setTimeout(clearInterval(intervalID), 5000), this is passing the result of clearInterval(intervalID) as the first argument to setTimeout.
    -   As a result, the interval is cleared immediately.

```js
await startMonitoring();
await runOneTimeTasks();
await stopMonitoring();
```

-   This will not working as `setTimeout` callback will run later, but after `setTimeout` runs, the rest of code will run.
-   If a function does not return a Promise, using await with it will not work as expected, and async/await syntax won't be applicable.

#### Promise for multiple task

First I return One promise for whole setTimeout callbacks, but this never resolve.
Explain of the code:

> the Promise will never resolve, because there's no code to call resolve() after the tasks are done.

```js
// Task 3: Run One-Time Tasks Function
function runOneTimeTasks() {
    return new Promise((resolve) => {
        for (let i = 0; i < oneTimeTasks.length; i++) {
            const task = oneTimeTasks[i];
            setTimeout(task.func, task.delay);
        }
    });
}
```

**1st Solution**

Add `resolve()` to where the runOneTimeTasks should resolve.

```js
function runOneTimeTasks() {
    return new Promise((resolve) => {
        let completed = 0;
        if (oneTimeTasks.length === 0) {
            resolve();
            return;
        }
        for (let i = 0; i < oneTimeTasks.length; i++) {
            const task = oneTimeTasks[i];
            setTimeout(() => {
                task.func();
                completed++;
                if (completed === oneTimeTasks.length) {
                    resolve();
                }
            }, task.delay);
        }
    });
}
```

**2nd Solution**

-   Create an array of Promises for each task. This promises will include in a promise for return.
-   We should tell each promise in the promises array when to resolve(when callback by setTimeout after delayed time).
-   We need to tell return Promise when to resolve - when all tasks complete, and we make that by Promise.all() method.

```js
// Task 3: Run One-Time Tasks Function
function runOneTimeTasks() {
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
        //NOTE
        Promise.all(taskPromises).then(() => {
            console.log("All one-time tasks completed!");
            resolve();
        });
    });
}
```

-   **Outer Promise**: runOneTimeTasks returns new Promise((resolve) => {...}). This Promise is what await runOneTimeTasks() waits for.
-   **Inner Promises**: Each setTimeout is wrapped in a Promise that resolves after the task’s func runs.
-   **Promise.all(taskPromises)**: `This creates a Promise` that resolves when all inner Promises (from setTimeout) resolve, producing an array of their resolved values (in this case, undefined since resolve() is called without a value).
-   **.then(() => { ... resolve(); })**: When `Promise.all resolves, the .then() callback runs`, logging a message and calling resolve() to resolve the outer Promise.

> Here We know that Promise.all create a promise which will resolve when all task in the promises array resolve and this will only make in get into .then() to run the code there. When Outer Promise resolve still need us to define.

#### At last countdown return "Leftoff" so slowly on Chrome

It works perfectly when I debug using vscode Node.js, and I find it sometimes work good sometimes too slow. And mostly it is only when it comes to when countdown is zero, we need to clear the Interval and `console.log` info.

**Resolution**

-   In browsers like Chrome, setInterval is subject to throttling, especially when the tab is not active or when the browser is under heavy load. Chrome may delay timer execution to optimize performance, which can cause intervals to fire slightly later than specified.

    -   But I still confused why always perform bad at the last one? not other part of the code? There should be more accurate answer for that.

> I try to refresh my web and test it, it works perfectly just as how it looks in vscode debugging tools. This 100% make sense.

Let startCountdown reutrn a promise that we can wait it finished out of it.

```js
function startCountdown(duration) {
    return new Promise((resolve) => {
        let dur = duration;
        if (!dur) {
            console.log("Duration for countdown is given 0");
            resolve();
            return;
        }
        let countdownID = setInterval(() => {
            console.log("Check dur at the beginning: " + dur + "s!");

            if (dur <= 0) {
                console.log("Liftoff!");
                clearInterval(countdownID);
                resolve();
            } else {
                console.log("Remain time:" + dur + "s!");
                dur--;
            }
        }, countdownInterval);
    });
}
```

## Summarly

At the very last. I know that at the start of the project. I should not stick on the details of the problems. I should figure out the framework, the structure of the project. How can I simply run it. What need I to do. Try from the easiest example.
After you figuring out these, you can optimize the project more efficient and with more comprehensive. You can complete any ideas gradually and details.
It is not proper to think of all details and all plans form the beginning or many works you did would turn out to be a waste of time and your effort.

## After seeing the solution code given

I find there's nothing about Asynchronous, this exercise is only about setTimeout and setInterval. And addOneTimeTask is used for all one-time tasks include startCountdown and stopMonitoring. But as I use promise and async/await, I do not need to use it for that. I keep on my way because I add many oneTimeTasks.
I find out that the monitoring function is impressing so I absorb it in my code as my monitoring didn't give back enough information.

This is a good exercise and I think I am going to stop dealing with it as this is enough for me now.

## Hardest part

I do not know the structure of the project. What should I do and how to mock the rocket launch process.

As I went through, I am not sure about what tasks I need in this project. What I should continuously monitor here. But I think the result went well as I made a good simulation by using asynchronous programming we learn form the subunit.

And learn about how to monitor something, to print the condition of the information is really good for the programs performance.

## Talking point

1. I made runAllOneTasks return promise to make it asynchronous.
    1. After I finished these one-time task I let monitoring stop and begin countdown.
2. two monitoring but no worries here. Because we use setInterval and we can make them stop at anytime we want just by using clearInterval method.
3. Other important point which I have mistake with: when we give a callback to a function as parameters, we can not write as func[a] as it will put the return of the function but not the function itself which can cause a big issue.
4. Promise.all is something to talk about to. And resolve. For asynchronous of several task we need Promise.all(). And we should be aware that Promise must be able to resolve by including resolve() at where we want it to resolve.
