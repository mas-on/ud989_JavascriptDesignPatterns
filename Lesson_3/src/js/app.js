const initialCats = [{
        clickCount: 0,
        name: 'Alice',
        imgSrc: '../img/meeeow.jpg',
        nicknames:[
            { name: 'Ally' },
            { name: 'A-a-a' },
            { name: 'Liz' }
        ]    
    },
    {
        clickCount: 0,
        name: 'Barsik',
        imgSrc: '../img/meeeow2.jpg',
        nicknames:[
            { name: 'Bar' }
        ]    
    },
    {
        clickCount: 0,
        name: 'Cutie&Cecile',
        imgSrc: '../img/meeeow3.jpg',
        nicknames:[
            { name: 'C' }
        ]    
    },
    {
        clickCount: 0,
        name: 'Derek',
        imgSrc: '../img/meeeow4.jpg',
        nicknames:[
            { name: 'Kis-kis' }
        ]    
    },
    {
        clickCount: 0,
        name: 'Elliott',
        imgSrc: '../img/meeeow5.jpg',
        nicknames:[
            { name: 'Elly' }
        ]    
    },
    {
        clickCount: 0,
        name: 'Fury',
        imgSrc: '../img/meeeow6.jpg',
        nicknames:[
            { name: 'Fyrrr' }
        ]    
    }
];


const Cat = function(data) {
    this.clickCount = ko.observable(data.clickCount);
    this.name = ko.observable(data.name);
    this.imgSrc = ko.observable(data.imgSrc);

    const titles = {
        0 : 'Newborn', 
        10 : 'Infant', 
        23 : 'Toddler',
        30 : 'Teen'
    };
    const sortedKeys = Object.keys(titles).map(Number);
    sortedKeys.sort();
    
    this.title = ko.computed(function() {
        let index = binarySearch(sortedKeys, this.clickCount(), (a,b) => a - b );
        if (index < 0)
            index = Math.abs(index)-2;
        return titles[sortedKeys[index]];
    }, this);

    this.nicknames = ko.observableArray(data.nicknames);
}

const ViewModel = function() {
    const self = this;

    self.catList = ko.observableArray([]);
    initialCats.forEach(element => {
        self.catList().push(new Cat(element));
    });
    self.currentCat = ko.observable(self.catList()[0]);    

    self.incrementCounter = function() {
        self.currentCat().clickCount(self.currentCat().clickCount() + 1);
    };

    self.selectCat = function(sender) {
        self.currentCat(sender);
    }
}

ko.applyBindings(new ViewModel());