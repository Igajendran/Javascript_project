"use strict";
$(document).ready(function() {
    var getMonthText = function(currentMonth) {
        if (currentMonth === 0) { return "January"; }
        else if (currentMonth === 1) { return "February"; }
        else if (currentMonth === 2) { return "March"; }
        else if (currentMonth === 3) { return "April"; }
        else if (currentMonth === 4) { return "May"; }
        else if (currentMonth === 5) { return "June"; }
        else if (currentMonth === 6) { return "July"; }
        else if (currentMonth === 7) { return "August"; }
        else if (currentMonth === 8) { return "September"; }
        else if (currentMonth === 9) { return "October"; }
        else if (currentMonth === 10) { return "November"; }
        else if (currentMonth === 11) { return "December"; }
    };

    var getLastDayofMonth = function(year, currentMonth) {
        let lastDay = new Date(year, currentMonth+1, 0).getDate();
        return lastDay;
    };

    var getFirstDayofMonth = function(year, currentMonth) {
        let firstDay = new Date(year, currentMonth, 1).getDay();
        return firstDay;
    };
    
    var currentDate = new Date();
    var currentYear = currentDate.getFullYear();
    var currentMonth = currentDate.getMonth();

    let month_year = getMonthText(currentMonth) + " " + currentYear;
    $("#month_year").html(month_year);

    console.log(getFirstDayofMonth(currentYear, currentMonth));

    //Start building a table 
    let weekDay = getFirstDayofMonth(currentYear, currentMonth);
    let lastDay = getLastDayofMonth(currentYear, currentMonth);
    let table = $("#calendar");
    var html = "<tr>";
    
    // Fill the empty dates before start of the month
    for (let i = 0; i < weekDay; i++) {
        html = html + "<td></td>"
    }

    for (let j = 1; j <= lastDay; j++) {
        if (weekDay == 6) {
            weekDay = 0;
            html = html + "<td>" + j + "</td>";
            html = html + "</tr><tr>"
        } else {
            html = html + "<td>" + j + "</td>";
            weekDay++
        }
        
        if (j == lastDay) {
            if (weekDay != 0) {
                // Fill the empty dates after end of the month 
                for (let i = weekDay; i < 7; i++) {
                    html = html + "<td></td>"
                    weekDay++;
                }
            }
            html = html + "</tr> "
        }
    }

    // Append to DOM
    table.append(html);

});