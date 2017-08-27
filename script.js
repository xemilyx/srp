var calendar = {
    days: [],
    
    feelings: {'happy':'lightyellow', 'scared':'gray', 'laughing':'purple'},
    
    displayDays: function() {
        if (this.days.length === 0) {
            console.log("Your calendar is empty!");
        }
        else {
            this.days.sort(this.compareDays);
            for (var i = 0; i < this.days.length; i++){
                console.log (this.days[i].date + ": you read the " +this.days[i].type + ' ' +this.days[i].title + "  today!");
            }
        }
    },
    
    addDay: function(date, type, title, author, feeling) {
        this.days.push({
            date: date,
            read: true,
            type: type,
            title: title,
            author: author,
            feeling: feeling
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
        var date = document.getElementById('addDayDate');
        var type = document.getElementById('addDayMaterialType');
        var title = document.getElementById('addDayTitle');
        var author = document.getElementById('addDayAuthor');
        var feeling = document.getElementById('addDayFeeling');
        if (date.value === '') {
            alert("please enter a valid date!");
        }
        else {
            calendar.addDay(date.value, type.value, title.value, author.value, feeling.value);
            date.value = '';
            type.value = '';
            title.value = '';
            author.value = '';
            feeling.value = '';
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
            var message = "you read the " +calendar.days[i].type + ' ' +calendar.days[i].title + " today!";
            var date = calendar.days[i].date;
            var feeling = calendar.days[i].feeling;
            var dayLi = document.createElement('li');
            dayLi.textContent = date + ": " + message;
            dayLi.style.backgroundColor = calendar.feelings[feeling];
            dayUl.appendChild(dayLi);
        }
    }
}