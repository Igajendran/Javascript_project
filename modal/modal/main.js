// "use strict";
const displayTaskLists = tasks => {
    let taskString = "";
    if (tasks.length > 0) {

        tasks = tasks.map(task => [task[0], task[1], task[2]]);
        // tasks.sort((task1, task2, task3) => {
        tasks.sort((task1, task2) => {
            //ishwarya modified added AM and PM
            const date1 = new Date(2021, 08, 11, task1[1]);
            const date2 = new Date(2021, 08, 11, task2[1]);

            if (date1 < date2) {
                return -1;
            } else if (date1 > date2) {
                return 1;
            } else {
                return 0;
            }
        });
        //ishwarya modified added AM and PM
        taskString = tasks.map((curr) => {

            // return curr[2] + " , " + curr[1] + (curr[1] >= 12 ? 'PM' : 'AM') + " , " + curr[0];
            return curr[1] + (curr[1] >= 12 ? 'PM' : 'AM') + " , " + curr[0] + " , " + curr[2];
        }, "");
    }
    $("#eventList").val(taskString.join('\n'));
    $("#name").focus();
};


$(document).ready(function() {
    console.log("Sanjana");
    //ishwarya modified to remove local session storage
    localStorage.clear();
    $("#myBtn").click(() => {
        $("#myModal").animate({ top: "0%" }, "linear");
    });

    $(".close").click(() => {
        $("#myModal").animate({ top: "-100%" }, "linear");
    });

    $("#submit").click(() => {
        $("#myModal").animate({ top: "-100%" }, "linear");
    });

    const taskString = localStorage.tasks;
    // creating a task array
    //ishwarya Modified
    const tasks = (taskString) ? JSON.parse(taskString) : [];

    $("#add_task").click(() => {
        const name = $("#name").val();
        const rideTime = $("#rideTime").val();
        const routeselection = $("#routes").val();

        //const rideTime = $("#rideTime option:selected").text();


        // tasks[0] = [taskname, taskdate];
        // tasks[1] = [taskname, taskdate]

        // tasks[1][1] = taskdate of the second task

        if (name && (rideTime > 4 && rideTime < 18)) {
            const newEvent = [name, rideTime, routeselection];
            tasks.push(newEvent); // adding a task to the array
            localStorage.tasks = JSON.stringify(tasks);

            $("#name").val("");
            $("#rideTime").val("Select");
            $("#routes").val("Select");
            displayTaskLists(tasks); // to display the tasks we got
        } else {
            alert("Please enter a task and valid entry.");
            $("#name").select(); // replace this with the focus()
        }
    });

    $("#clear_tasks").click(() => {
        tasks.length = 0;
        localStorage.removeItem("tasks");
        $("#events").val("");
        $("#name").val("");
        $("#rideDate").val("");
        $("#routes").val("");
        $("#task").focus();
    });
    displayTaskLists(tasks);

});