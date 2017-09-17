var calendar = {
    days: [],
    
    feelings: {'happy':'FFE74C', 'scared':'828489', 'laughing':'20A39E', 'curious':'E0F2E9', 'angry':'FF5964','sad':'38618C','surprised':'35A7FF'},
    
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
    
    addBook: function(title, author, date, type) {
        
        //if item is not  abook, create object without API call and display shelf
        if (type !== 'book') {
            bookshelf.books.push ({
                type:type,
                title: title,
                author: author,
                dateAdded: date,
                finished: false,
                stars:null,
                review:'',
                genre:'',
                coverUrl:'http://via.placeholder.com/140x200'
                });
            views.displayBooks();
            }
            
        //if item is a book, make API call and use that data to create object, then display shelf
        else {
            var url = 'https://www.googleapis.com/books/v1/volumes?q=intitle:' + title + '+inauthor:' +author;
            $.get(url, function(data, success){
                
                //if API call returns at least one result, use first result data to create object
                if (data.totalItems > 0) {
                    bookshelf.books.push ({
                    type:type,
                    title: title,
                    author: author,
                    dateAdded: date,
                    finished: false,
                    stars:null,
                    review:'',
                    genre:'',
                    coverUrl:data.items[0].volumeInfo.imageLinks.thumbnail
                    });
                }
                
                //if API call does not return a result, create object with user data
                else {
                    bookshelf.books.push ({
                    type:type,
                    title: title,
                    author: author,
                    dateAdded: date,
                    finished: false,
                    stars:null,
                    review:'',
                    genre:'',
                    coverUrl:'http://via.placeholder.com/140x200'
                    });
                }
            views.displayBooks();
            });
        }
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
        var titleObj = document.getElementById('addDayTitle');
        var firstName = document.getElementById('firstName');
        var authorObj = document.getElementById('addDayAuthor');
        var feeling = document.getElementById('addDayFeeling');
        
        //capitalize first letters of author's last name and title
        var titleArray = titleObj.value.split(' ');
        var titleArrayCaps = [];
        for (var i = 0; i < titleArray.length; i++) {
            var nextWord = titleArray[i][0].toUpperCase() + titleArray[i].substring(1).toLowerCase();
            titleArrayCaps.push(nextWord);
        }
        var title = titleArrayCaps.join(" ");
        
        var author = authorObj.value;
        if (author.length > 0) {
            author = author[0].toUpperCase() + author.substring(1).toLowerCase();
        }
        
        //make sure date is valid
        if (date.value === '') {
            alert("please enter a valid date!");
        }
        else {
            if (bookshelf.checkShelf(title, author) === false) {
                this.addBook();                
            };
            calendar.addDay(date.value, type.value, title, author, feeling.value);
            date.value = '';
            type.value = 'book';
            titleObj.value = '';
            firstName.value = '';
            authorObj.value = '';
            feeling.value = 'happy';
            views.displayDays();
        }
        
    },
    
    addBook: function() {
        var dateAdded = document.getElementById('addDayDate');
        var titleObj = document.getElementById('addDayTitle');
        var authorObj = document.getElementById('addDayAuthor');
        var type = document.getElementById('addDayMaterialType');
        
        //capitalize first letters of author's last name and title
        var titleArray = titleObj.value.split(' ');
        var titleArrayCaps = [];
        for (var i = 0; i < titleArray.length; i++) {
            var nextWord = titleArray[i][0].toUpperCase() + titleArray[i].substring(1).toLowerCase();
            titleArrayCaps.push(nextWord);
        }
        var title = titleArrayCaps.join(" ");

        var author = authorObj.value;
        if (author.length > 0) {
            author = author[0].toUpperCase() + author.substring(1).toLowerCase();
        }
        
        bookshelf.addBook(title, author, dateAdded.value, type.value);

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
            var coverUrl = bookshelf.books[i].coverUrl;
            var bookLi = document.createElement('li');
            bookLi.innerHTML = author + "-- " + title + "<img src =" + coverUrl + ">";
            bookUl.appendChild(bookLi);
        }
    }
};