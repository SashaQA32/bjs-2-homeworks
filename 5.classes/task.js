"use strict"

class PrintEditionItem {
    constructor(name, releaseDate, pagesCount) {
        this.name = name;
        this.releaseDate = releaseDate;
        this.pagesCount = pagesCount;
        this.state = 100;
        this.type = null;
    }

    fix() {
        this.state = this.state * 1.5;
    }

    set state(numeric) {
        if (numeric < 0) {
            this._state = 0;
        } else if (numeric > 100) {
            this._state = 100;
        } else {
            this._state = numeric;
        };
    };

    get state() {
        return this._state;
    };
};

class Magazine extends PrintEditionItem {
    type = "magazine";
};

class Book extends PrintEditionItem {
    constructor(author, name, releaseDate, pagesCount) {
        super(name, releaseDate, pagesCount);
        this.author = author;
    }
    type = "book";
};

class NovelBook extends Book {
    type = "novel";
};

class FantasticBook extends Book {
    type = "fantastic";
};

class DetectiveBook extends Book {
    type = "detective";
};

class Library {
    constructor(name) {
        this.name = name;
        this.books = [];
    }

    addBook(book) {
        if (book.state > 30) {
            this.books.push(book);
        }
    }

    findBookBy(type, value) {
        let book = null;
        for (const item of this.books) {
            if (item[type] === value) {
                book = item;
            }
        }
        return book;
    }

    giveBookByName(bookName) {
        let book = null;
        for (let i = 0; i < this.books.length; i++) {
            if (this.books[i].name === bookName) {
                book = this.books.splice(i, 1);
                return book[i];
            }
        }
        return book;
    }
};


class Student {
    constructor(name) {
        this.name = name;
        this.journal = {};
    }

    setSubject(subjectName) {
        if (this.journal.hasOwnProperty(subjectName) === true) {
            return console.log("Предмет уже существует");
        } else {
            this.journal[subjectName] = [];
        }
    }

    addMark(mark, subjectName) {
        if (this.journal.hasOwnProperty(subjectName) !== true) {
            this.journal[subjectName] = [];
            console.log("Несуществующий предмет. Предмет создан");
        }
        if ((typeof mark === "number") && (mark >= 1) && (mark <= 5)) {
            this.journal[subjectName].push(mark);
        } else {
            return console.log("Ошибка, оценка должна быть числом от 1 до 5");
        }
    }

    getAverageBySubject(subjectName) {
        if (this.journal.hasOwnProperty(subjectName) === true) {
            let sum = 0;
            let marks = this.journal[subjectName];
            marks.forEach((item, index, marks) => sum += item);
            let averageBySubject = sum / marks.length;
            return averageBySubject;
        } else {
            return console.log("Несуществующий предмет");
        }
    }

    getAverage() {
        let sum = 0;
        let marks = Object.values(this.journal);
        let resultMarks = [];
        marks.forEach((item, index, marks) => resultMarks = [].concat(resultMarks, item));
        resultMarks.forEach((item, index, resultMarks) => sum += item);
        let average = sum / resultMarks.length;
        return average;
    }

    exclude(reason) {
        delete this.journal;
        this.excluded = reason;
    }
}