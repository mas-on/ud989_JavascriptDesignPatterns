$(function(){


    var model = {
        init: function() {
            //if (!sessionStorage.cats) {
                sessionStorage.setItem("cats", JSON.stringify([ 
                    { name: "Alice", img: "../img/meeeow.jpg", clicked: 0 },
                    { name: "Barsik", img: "../img/meeeow2.jpg", clicked: 0 },
                    { name: "Cutie&Cecile", img: "../img/meeeow3.jpg", clicked: 0 },
                    { name: "Derek", img: "../img/meeeow4.jpg", clicked: 0 },
                    { name: "Elliott", img: "../img/meeeow5.jpg", clicked: 0 },
                    { name: "Fury", img: "../img/meeeow6.jpg", clicked: 0 },
                ]));
           // }
        },
        getAll: function() {
            return JSON.parse(sessionStorage.getItem("cats"));
        },
        getByName: function(name) {
            var found = this.getAll().filter(function(item) { return item.name === name; })[0];
            return found;
        },
        update: function(cat) {
            var data = this.getAll();
            data.some(function(item) {
                if (item.name === cat.name)  {
                    item.clicked = cat.clicked;
                    return true;
                }                    
            });
            sessionStorage.setItem("cats", JSON.stringify(data));
        }
    }
        
    

    var octopus = {
        addClick: function(catName) {
            let cat = model.getByName(catName); 
            cat.clicked++;           
            model.update(cat);
            this.selectCat(cat.name);
        },

        getCats: function() {
            return model.getAll();
        },

        init: function() {
            model.init();
            catsListView.init();
            selectedCatView.init();
        },
        selectCat: function(catName) {
            selectedCatView.render(model.getByName(catName));
        }
    };


    var catsListView = {       
        init: function(){            
            octopus.getCats().forEach(function(cat){
                    const catElt = $("<li>"+cat.name+"</li>"); 
                    catElt.click(function(e) {
                        octopus.selectCat(cat.name);
                        e.preventDefault();
                    });
                    $(".cats").append(catElt);                    
                });            
        }
    };

    var selectedCatView = {
        init: function(){
            $(".sel-cat").hide();
        },
        render: function(cat) {
            $(".sel-cat").show();
            $(".cat-name").text(cat.name);
            $(".cat-clicked").text(cat.clicked);
            $(".cat-img").attr("src",cat.img).unbind()
                .click(function(e){
                    octopus.addClick(cat.name);
                    e.preventDefault();
                });            
        }
    };


    octopus.init();
});