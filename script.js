var calendar = {
    days: [],
    
    displayDays: function() {
        if (this.days.length === 0) {
            console.log("Your calendar is empty!");
        }
        else {
            this.days.sort(this.compareDays);
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
    }, 
    
    compareDays: function(a,b) {
        var comparison = 0;
        if (a.date > b.date) {
            comparison = 1;
        } else if (a.date < b.date) {
            comparison = -1;
        }
    return comparison;
    }
}

var handlers = {
    addDay: function() {
        var date = document.getElementById('addDayInput');
        if (date.value === '') {
            alert("please enter a valid date!");
        }
        else {
            calendar.addDay(date.value);
            date.value = '';
            views.displayDays();
        }
        
    }
}

var views = {
    displayDays: function() {
        calendar.days.sort(calendar.compareDays);
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