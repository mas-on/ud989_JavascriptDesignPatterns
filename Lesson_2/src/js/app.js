$(function(){


    var model = {
        currentCat: null,
        showAdmin: false,
        updatedCat: null,
        init: function() {            
                sessionStorage.setItem("cats", JSON.stringify([ 
                    { id: 1, name: "Alice", img: "../img/meeeow.jpg", clicked: 0 },
                    { id: 2, name: "Barsik", img: "../img/meeeow2.jpg", clicked: 0 },
                    { id: 3, name: "Cutie&Cecile", img: "../img/meeeow3.jpg", clicked: 0 },
                    { id: 4, name: "Derek", img: "../img/meeeow4.jpg", clicked: 0 },
                    { id: 5, name: "Elliott", img: "../img/meeeow5.jpg", clicked: 0 },
                    { id: 6, name: "Fury", img: "../img/meeeow6.jpg", clicked: 0 },
                ]));
           
        },
        getAll: function() {
            return JSON.parse(sessionStorage.getItem("cats"));
        },
        getById: function(id) {
            var found = this.getAll().filter(function(item) { return item.id === id; })[0];
            return found;
        },
        update: function(cat) {
            var data = this.getAll();
            data.some(function(item) {
                if (item.id == cat.id)  {
                    item.name = cat.name;
                    item.img = cat.img;
                    item.clicked = cat.clicked;
                    return true;
                }                    
            });
            sessionStorage.setItem("cats", JSON.stringify(data));
        }
    }
        
    

    var octopus = {
        addClickToCurrentCat: function() {
            let cat = model.currentCat; 
            cat.clicked++;           
            model.update(cat);
            this.selectCat(cat.id);
        },

        getCats: function() {
            return model.getAll();
        },
        getSelectedCat: function() {
            return model.currentCat;
        },

        init: function() {
            model.init();
            catsListView.render();
            selectedCatView.init();
            adminView.init();
        },
        selectCat: function(catId) {
            const curCat = model.getById(catId);
            model.currentCat = curCat;
            selectedCatView.render();
            if (model.showAdmin)
                adminView.render();
        },
        cancelAdminChanges: function(){
            model.showAdmin = false;
            adminView.hidePanel();
        },
        adminClick: function(){
            if (model.currentCat != null) {
                model.showAdmin = true;
                adminView.render();
            }
        },
        saveCat: function(newcat){
            model.update(newcat);
            model.showAdmin = false;
            model.currentCat = newcat;
            catsListView.render();
            selectedCatView.render();            
            adminView.hidePanel();
        }
    };


    var catsListView = {               
        render: function(){    
            $(".cats").empty();        
            octopus.getCats().forEach(function(cat){
                    const catElt = $("<li>"+cat.name+"</li>"); 
                    catElt.click(function(e) {
                        octopus.selectCat(cat.id);
                        e.preventDefault();
                    });
                    $(".cats").append(catElt);                    
                });                            
        },
    };

    var selectedCatView = {
        init: function(){
            $(".sel-cat").hide();
            $(".cat-img").click(function(e){
                    octopus.addClickToCurrentCat();
                    e.preventDefault();
                });   
        },
        render: function() {
            const cat = octopus.getSelectedCat();
            $(".sel-cat").show();
            $(".cat-name").text(cat.name);
            $(".cat-clicked").text(cat.clicked);
            $(".cat-img").attr("src",cat.img);            
        }
    };

    var adminView = {
        init: function(){
            this.hidePanel();
            this.hideClicked();
            $("#btn-admin").click(function(e){
                octopus.adminClick();
                e.preventDefault();
            });
            $(".btn-cancel").click(function(e){
                octopus.cancelAdminChanges();
                e.preventDefault();
            });
            $(".btn-save").click(function(e){
                var newcat = octopus.getSelectedCat();
                newcat.name =  $("#admin-cat-name").val();
                newcat.img = $("#admin-cat-img").val();
                newcat.clicked = $("#admin-cat-clicked").val();
                octopus.saveCat(newcat);                
                e.preventDefault();
            });
        },
        render: function(){
            const cat = octopus.getSelectedCat();
            $(".admin-sel-cat").show();
            $("#admin-cat-name").val(cat.name);
            $("#admin-cat-img").val(cat.img);
            $("#admin-cat-clicked").val(cat.clicked);            
        },
        hideClicked: function(){            
            $(".admin-sel-cat-clicked").hide();
        },
        hidePanel: function(){
            $(".admin-sel-cat").hide();
        },
       
    };


    octopus.init();
});