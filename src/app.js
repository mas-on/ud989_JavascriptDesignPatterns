//let count = 0;

document.addEventListener("DOMContentLoaded", function() {
    const cats = [ 
        { name: "Alice", img: "../img/meeeow.jpg" },
        { name: "Barsik", img: "../img/meeeow2.jpg" },
        { name: "Cutie&Cecile", img: "../img/meeeow3.jpg" },
        { name: "Derek", img: "../img/meeeow4.jpg" },
        { name: "Elliott", img: "../img/meeeow5.jpg" },
        { name: "Fury", img: "../img/meeeow6.jpg" },
    ]
    const catsList = document.getElementsByClassName('cats')[0];

    cats.forEach(cat => {        
        const catElt = document.createElement("li"); 
        catElt.textContent = cat.name;
        catElt.addEventListener('click', function() {
            const selCatDiv = document.getElementsByClassName('sel-cat')[0];
            selCatDiv.innerHTML = '';
            addCat(selCatDiv, cat);
        }, false);
        catsList.insertBefore(catElt, null);

    });

function updateCount(elt, cnt){
    if (cnt == undefined)
        cnt = 0;        
    elt.textContent = "Clicked: " +  cnt + " times!";
}

  function addCat(container, cat){
    const catDiv = document.createElement("div");
    
    const nameElt = document.createElement("span");
    nameElt.textContent = cat.name;
    
    const clickedElt = document.createElement("div");
    clickedElt.className = "big";
    updateCount(clickedElt, cat.clicked);
    
    const imgElt = new Image(300);
    imgElt.src = cat.img;
    imgElt.alt = "Click me";    
    imgElt.addEventListener('click', function(){
        if (cat.clicked == undefined)
            cat.clicked = 0;
        cat.clicked++;
        updateCount(clickedElt, cat.clicked);
    }, false);
    
    catDiv.appendChild(nameElt);
    catDiv.appendChild(clickedElt);
    catDiv.appendChild(imgElt);

    container.appendChild(catDiv);
  }
});
