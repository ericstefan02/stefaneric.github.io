

  $(document).ready(function() {
    $('.flexslider').flexslider();
  });

var pages = ["index","treninzi.html", "register.html", "contact.html", "linkzadokumentaciju", "oautorulink"]
var pageLabels = ["Početna", "Trening", "Registracija", "Kontakt","Dokumentacija", "O autoru"]
var slidePictures = ["kardio_zona_cover.jpeg", "treninzi-cover.jpeg", "mix_zona_cover.jpeg"]
var slidePicturesAlt = ["cardio picture", "training picture", "mixed training picture"]
var types = ["Standard", "Student", "Dnevna"]
var time = ["00-24", "00-24 / do 26.god", "06-16h / Pon-Pet"]
var price = ["3290 rsd", "2790 rsd", "2490 rsd"]
var colors = ["primary", "warning", "danger"]
var menu = document.getElementById("navMenu");
for(var i = 0;i<pages.length;i++){
    var classA = "";
    var positionA = "";
    if(window.location.href.includes(pages[i])){
        classA = "active";
        positionA = 'aria-current="page"'; 
    }
    menu.innerHTML+=`<li class="nav-item">
                    <a class="nav-link ${classA}" ${positionA} href=${pages[i]}>${pageLabels[i]}</a>
                    </li>`
}
var sliderTxt = `<ul class="slides">`
for(var i = 0;i<slidePictures.length;i++)
{
    sliderTxt+=`<li>
            <img src="/assets/img/${slidePictures[i]}" alt="${slidePicturesAlt[i]}" />
            </li>`
}
sliderTxt+=`</ul>`
document.getElementById("slider").innerHTML+=sliderTxt;
console.log(window.location.href)
var position = window.location.href.lastIndexOf('/');
console.log(position)
var page = window.location.href.substring(position,window.location.href.length)
console.log(page);
var marker = document.getElementById("packets");
for(var i = 0;i<types.length;i++){
    marker.innerHTML += `<div class="my-4 card border-3 border-${colors[i]} rounded-3 mb-3">
                        <div class="card-header bg-${colors[i]}">
                        <h2 class="text-center text-light">${types[i]}</h2>
                        </div>
                        <div class="card-body text-dark text-center py-2">
                        <h3 class="card-title my-3">${time[i]}</h3>
                        <h1 class="fw-bold">${price[i]}</h1>
                        <h4 class="card-text mb-3 text-secondary">/mesečno</h4>
                        <p class="card-text fst-italic my-3">Bez dodatnih troškova sve je uključeno u cenu.</p>
                        <button type="button" class="btn btn-${colors[i]} my-3" data-bs-toggle="modal" data-bs-target="#loginModal">Treniraj odmah</button>
    </div>
</div>`
}

var links = ["Portfolio","CSS", "JS", "Sitemap"]
var linkValues = ["blabla","dsa", "truc", "bla"]
var footObjs = ["Linkovi", "Meni"]

var footer = document.getElementById("foot");
var ftCnt = document.getElementById("footCnt");

for(var i = 0;i<footObjs.length;i++){
    console.log("Usao u prvi")
    var divFt = document.createElement("div")
    divFt.classList.add("col-sm-3")
    divFt.classList.add("pt-5")
    var s = `<h4 class="border-3 border-bottom border-light pb-2 text-light">${footObjs[i]}</h4>`;
    if(i==0){
        s+=`<ul id="links" class="navbarMenu-ul navbar-nav container">`;
        for(var y = 0;y<links.length;y++){
        console.log("Usao u drugi")
        s+=`<li class="nav-item px-3"><a href="${linkValues[y]}" class="nav-link text-light">${links[y]}</a></li>`;
        }
    }
    else{
        s+=`<ul id="footer-meni-ul" class="navbarMenu-ul navbar-nav container d-inline">`;
        for(var y = 0;y<pages.length;y++){
        console.log("Usao u drugi")
        s+=`<li class="nav-item px-3"><a href="${pageLabels[y]}" class="nav-link text-light">${pageLabels[y]}</a></li>`;
        }
    }
    s+= `</ul>`;
    divFt.innerHTML+= s;
    ftCnt.appendChild(divFt);
}

var pageLink = `<div class="col-sm-3 col-10 pt-5 text-center">
                <h4 class="border-3 border-bottom border-light pb-2 text-light">Non Stop Fitness</h4>
                <a href="index.html"><img class="img-fluid pt-4 pb-4" src="assets/img/logo.png" alt="NONSTOP logo"/></a>
                </div>`
var rights = `<div class="col-12 border-top border-secondary pt-2">
                <p class="text-center text-light">© 2021 All rights reserved by Non Stop Fitness doo Beograd.</p>
                </div>`
footer.innerHTML+=pageLink;
footer.innerHTML+=rights;

