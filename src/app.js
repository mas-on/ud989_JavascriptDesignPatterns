let count = 0;

document.addEventListener("DOMContentLoaded", function() {
    const cats = [ 
        { name: "Alice", img: "../img/meeeow.jpg" },
        { name: "Barsik", img: "../img/meeeow2.jpg" },
    ]
    const container = document.getElementsByClassName('cats')[0];

    cats.forEach(cat => {
        addCat(container, cat.name, cat.img);
    });

    const catImgs = document.getElementsByClassName('imgCat');
    [].forEach.call(catImgs, function(img) {
        img.addEventListener('click', function(){
            const clicked = document.getElementsByClassName('clickedCount');
            count++;
            [].forEach.call(clicked, function(clCount) {
                clCount.innerHTML = "Clicked: " + count + " times!";
                });
            }, false);
        })
  });

  function addCat(container, name, img){
    var catDiv = document.createElement("div");
    catDiv.className = "col-left";
    catDiv.innerHTML = '<span>' + name + '</span><div class="big clickedCount"></div><img class="imgCat" src="' + img +'" alt="Click me">';
    container.insertBefore(catDiv, null);
  }
