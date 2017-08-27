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
};


var bookshelf = {
    books: [],
    
    addBook: function(title, author, date) {
        this.books.push ({
            title: title,
            author: author,
            dateAdded: date,
            finished: false,
            stars:null,
            review:'',
            genre:''
        });
    },
    
    checkShelf: function(title, author) {
        var bookOnShelf = false;
        for (var i = 0; i < bookshelf.books.length; i++) {
            if (bookshelf.books[i].title === title && bookshelf.books[i].author === author) {
                bookOnShelf = true;
            }
        };
        return bookOnShelf;
    },
    
    displayBooks: function() {
        if (this.books.length === 0) {
            console.log("Your bookshelf is empty!");
        }
        else {
            this.books.sort(this.compareBooks);
            for (var i = 0; i < this.books.length; i++){
                console.log (this.books[i].author + '-- ' + this.books[i].title);
            }
        }        
    },
    
    compareBooks: function(a,b) {
        var comparison = 0;
        if (a.author > b.author) {
            comparison = 1;
        } else if (a.author < b.author) {
            comparison = -1;
        }
    return comparison;
    }
};

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
            if (bookshelf.checkShelf(title.value, author.value) === false) {
                this.addBook();                
            };
            calendar.addDay(date.value, type.value, title.value, author.value, feeling.value);
            date.value = '';
            type.value = '';
            title.value = '';
            author.value = '';
            feeling.value = '';
            views.displayDays();
        }
        
    },
    
    addBook: function() {
        var dateAdded = document.getElementById('addDayDate');
        var title = document.getElementById('addDayTitle');
        var author = document.getElementById('addDayAuthor');
        bookshelf.addBook(title.value, author.value, dateAdded.value);
        views.displayBooks();
    }
};


var views = {
    displayDays: function() {
        calendar.days.sort(calendar.compareDays);
        var dayUl = document.getElementById('calendarUl');
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
    },

    displayBooks: function() {
        bookshelf.books.sort(bookshelf.compareBooks);
        var bookUl = document.getElementById('bookshelfUl');
        bookUl.innerHTML = '';
        for (var i = 0; i < bookshelf.books.length; i++) {
            var author = bookshelf.books[i].author;
            var title = bookshelf.books[i].title;
            var bookLi = document.createElement('li');
            bookLi.textContent = author + "-- " + title;
            bookUl.appendChild(bookLi);
        }
    }
};