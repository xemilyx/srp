var calendar = {
    days: [],
    
    displayDays: function() {
        if (this.days.length === 0) {
            console.log("Your calendar is empty!");
        }
        else {
            for (var i = 0; i < this.days.length; i++){
                console.log (this.days[i].date + ": you read today!");
            }
        }
    },
    
    addDay: function(date) {
        this.days.push({
            date: date,
            read: true
        })
    }
}

var handlers = {
    addDay: function() {
        var date = document.getElementById('addDayInput');
        calendar.addDay(date.value);
        date.value = '';
        views.displayDays();
    }
}

var views = {
    displayDays: function() {
        var dayUl = document.querySelector('ul');
        dayUl.innerHTML = '';
        for (var i = 0; i < calendar.days.length; i++) {
            var message = 'you read today!';
            var date = calendar.days[i].date;
            var dayLi = document.createElement('li');
            dayLi.textContent = date + ": " + message;
            dayUl.appendChild(dayLi);
        }
    }
}