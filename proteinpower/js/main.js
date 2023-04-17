//funckija koja radi sa json podacima koje dohvata ajaxom
function getData(fileName, operation) {
  $.ajax({
    url: "assets/data/" + fileName + ".json",
    method: "get",
    dataType: "json",
    success: function (data) {
      localStorage.setItem(fileName, JSON.stringify(data));
      operation(data, fileName);
    },
    error: function (xhr, status, error) {
      console.log(error);
    },
  });
}
//funckija koja ispisuje dinamicke elemente navigacionog menija
function showNavigation(navItems) {
  let cnt = `<ul class="navbar-nav text-uppercase ms-auto py-4 py-lg-0">`;
  navItems.forEach((element) => {
    if(!window.location.href.includes("shop")){
      cnt += `<li class="nav-item"><a class="nav-link" href="${element.href}">${element.text}</a></li>`;
    }
  });
  if(window.location.href.includes("shop")){
    cnt+=`<li class="nav-item"><a class="nav-link" href="index.html">Početna</a></li>
          <li class="nav-item"><a class="nav-link text-warning" href="#">Prodavnica</a></li>`
  }
  cnt += `  <li class="nav-item d-flex ">
                        <a class="nav-link" data-bs-toggle="modal" id="cartButton" href = "#cartModal"><i class="fa-solid fa-cart-shopping fa-xl"></i></a>
                        
                        <div class="d-flex justify-content-center align-items-center rounded-circle bg-warning" id="cart-num-items"><span id="numberOfItems">0</span></div>
                    </li>

                 </ul>
                 `;
  document.getElementById("navbarResponsive").innerHTML = cnt;
}
//funckija koja ispisuje proizvode u shop-u i njihove modale za kupovinu
function showProducts(products) {
  let shopItem = "";
  let modalOfShopItem = "";
  //ispis proizvoda u shop-u
  products.forEach((p, index) => {
    if(window.location.href.includes("shop")){
      shopItem += `<div class="col-lg-4 col-sm-6 mb-4">
  
                          <div class="shop-item">
                          <a class="shop-link" data-bs-toggle="modal" href="#shopModal${
                            index + 1
                          }">
                              <div class="shop-hover">
                                  <div class="shop-hover-content"><i class="fas fa-plus fa-3x"></i></div>
                                  </div>
                                  <div class="d-flex">
                                  <img class="img-fluid" src="${
                                    p.img.src
                                  }" alt="${p.img.alt}"/>
                                  ${p.price.newPrice!=p.price.oldPrice?`<div id="bombIco" class="fs-1">
                                  <i class="fa-solid fa-bomb"></i>
                                  </div>`:""}
                                  </div>
                          </a>
                          <div class="shop-caption">
                          <div class="shop-caption-heading fs-5 fw-semibold">${p.name}</div>
                          <div class="shop-caption-subheading d-flex justify-content-around fs-4"><p class="fw-bold">${
                            p.price.newPrice
                          } RSD</p>${p.price.oldPrice==p.price.newPrice ? ``: `<s>${p.price.oldPrice} RSD</s>`}</div>
                          ${isAvailable(p.available)}
              </div>
          </div>
      </div>`;
    }
    //ispis u modalu
    modalOfShopItem += `<div class="shop-modal modal fade" id="shopModal${
      index + 1
    }" tabindex="-1" role="dialog" aria-hidden="true">
                            <div class="modal-dialog modal-lg">
                                <div class="modal-content">
                                    <div class="close-modal position-absolute" data-bs-dismiss="modal"><i class="fa-solid fa-x"></i></div>
                                    <div class="container">
                                        <div class="row justify-content-center">
                                            <div class="col-lg-8">
                                                <div class="modal-body">
                                                    <h2 class="text-uppercase fw-semibold">${
                                                      p.name
                                                    }</h2>
                                                    <div class="d-flex justify-content-around">
                                                        <p class="item-intro fs-2 fw-bold">${
                                                          p.price.newPrice
                                                        } RSD</p>
                                                        ${p.price.oldPrice!=p.price.newPrice ? `<s class="item-intro fs-2">${p.price.oldPrice} RSD </s>`: ""}
                                                    </div>
                                                    <img class="img-fluid d-block mx-auto" src="${
                                                      p.img.src
                                                    }" alt="${p.img.alt}" />
                                                    <p>${p.description}</p>
                                                    <ul class="list-inline">
                                                        <li data-id="${p.id}" class="flavours">
                                                        </li>
                                                    </ul>
                                                    ${isAvailableButton(
                                                      p.available,
                                                      p.id
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>`;
  });
  if(window.location.href.includes("shop")){
    document.querySelector("#products").innerHTML = shopItem;
  }
  document.querySelector("#modals").innerHTML = modalOfShopItem;
}
//funkcija koja nalazi id proizvoda po njegovom imenu
function findIdByProductName(products, productName){
  var idOfProduct;
  products.forEach(p => {
    if(p.name == productName){
      idOfProduct = p.id;
    }
  });
  return idOfProduct;
}
//funkcija koja ispisuje proizvode u manjem formatu
function showSmallerProductsOnSales(products, location){
  var i = 0;
  var shopItem  = "";
  products.forEach((p, index) => {
    if(p.price.newPrice!=p.price.oldPrice&&p.available==true){
      i++;
      if(i<=5){
        shopItem += `<div class="col-lg-2 col-sm-6 mb-4">
    
                            <div class="shop-item">
                            <a class="shop-link" data-bs-toggle="modal" href="#shopModal${
                              index + 1
                            }">
                                <div class="shop-hover">
                                    <div class="shop-hover-content"><i class="fas fa-plus fa-3x"></i></div>
                                    </div>
                                    <div class="d-flex">
                                    <img class="img-fluid" src="${
                                      p.img.src
                                    }" alt="${p.img.alt}"/>
                                    </div>
                            </a>
                            <div class="shop-caption">
                            <div class="shop-caption-heading fs-6 fw-semibold">${p.name}</div>
                            <div class="shop-caption-subheading d-flex justify-content-around fs-6"><p class="fw-bold">${
                              p.price.newPrice
                            } RSD</p>${p.price.oldPrice==p.price.newPrice ? ``: `<s>${p.price.oldPrice} RSD</s>`}</div>
                            ${isAvailable(p.available)}
                </div>
            </div>
        </div>`;
      }
    }
  })
  document.querySelector(location).innerHTML = shopItem;
} 
//funkcija koja ispisuje manje sortirane proizvode
function showSmallerProducts(unsortedProducts, location, sortCondition){
  var products;
  if(typeof sortCondition === undefined){
    products = unsortedProducts
  }
  else if(sortCondition=="date"){
    products = unsortedProducts.sort((a, b)=>new Date(b[sortCondition]) - new Date(a[sortCondition]))
  }
  else{
    products = unsortedProducts.sort((a, b)=>b[sortCondition] - a[sortCondition])
  }
  var i = 0;
  var shopItem  = "";
  products.forEach((p, index) => {
    if(p.available==true){
      i++;
      if(i<=5){
        shopItem += `<div class="col-lg-2 col-sm-6 mb-4">
    
                            <div class="shop-item ${sortCondition=="sales"? "border border-2 border-warning":""}">
                            <a class="shop-link" data-bs-toggle="modal" href="#shopModal${
                              findIdByProductName(products, p.name)
                            }">
                                <div class="shop-hover">
                                    <div class="shop-hover-content"><i class="fas fa-plus fa-3x"></i></div>
                                    </div>
                                    <div class="d-flex">
                                    <img class="img-fluid" src="${
                                      p.img.src
                                    }" alt="${p.img.alt}"/>
                                    </div>
                            </a>
                            <div class="shop-caption">
                            <div class="shop-caption-heading fs-6 fw-semibold">${p.name}</div>
                            <div class="shop-caption-subheading d-flex justify-content-around fs-6"><p class="fw-bold">${
                              p.price.newPrice
                            } RSD</p>${p.price.oldPrice==p.price.newPrice ? ``: `<s>${p.price.oldPrice} RSD</s>`}</div>
                            ${isAvailable(p.available)}
                </div>
            </div>
        </div>`;
      }
    }
  })
  document.querySelector(location).innerHTML = shopItem;
} 
//funkcija koja ispisuje ukuse proizvoda
function writeFlavours() {
  var allProducts = JSON.parse(localStorage.getItem("products"))
  var allFlavours = JSON.parse(localStorage.getItem("ukusi"));
  var allFlavoursLists = document.getElementsByClassName("flavours");
  for(var i = 0; i<allFlavoursLists.length;i++){
    var cnt = "";
    var listId = allFlavoursLists[i].dataset.id;
    allProducts.forEach(p => {
      if(p.id==listId){
        if(p.flavoursIds.length!=0){
          cnt += `<select class = "form-select">`
          p.flavoursIds.forEach(flavourId => {
            allFlavours.forEach(flavourWithName => {
              if(flavourId == flavourWithName.id ){
                cnt+= `<option value="${flavourId}">${flavourWithName.name}</>`
              }
            });
          });
        }
      }
      allFlavoursLists[i].innerHTML = cnt;
    });
  }
}
//funkcija koja proverava da li je proizvod na stanju
function isAvailable(checker) {
  let cnt = "";
  if (checker) {
    cnt += `<div class="d-flex justify-content-center"><div class="rounded-circle bg-success state mx-1"></div><p>Proizvod je na stanju</p></div>`;
  } else {
    cnt += `<div class="d-flex justify-content-center"><div class="rounded-circle bg-danger state mx-1"></div><p>Proizvod trenutno nije na stanju</p></div>`;
  }
  return cnt;
}
//funckija koja ispisuje dugme u modalu u odnosu na to da li je proizvod na stanju ili ne
function isAvailableButton(checker, id) {
  let cnt = "";
  if (checker) {
    cnt += `<button class="btn btn-outline-light text-uppercase rounded-0 text-black border-dark my-1 cart-button-success buttonShop" data-id="${id}">Dodaj u korpu <i class="fa-solid fa-bag-shopping fs-5 mx-1"></i></button> 
    <div class="alert alert-success my-2 productMessage" role="alert" id="addedToCart${id}">
    Proizvod dodat u korpu!
    </div>`;
  } else {
    cnt += `<button class="btn btn-outline-light text-uppercase rounded-0 text-black border-dark my-1 cart-button-fail buttonShopFailed" data-id="${id}">Nije na stanju <i class="fa-solid fa-x fs-5 mx-1"></i></button>
    <div class="alert alert-danger my-2 productMessage" role="alert" id="cantAddToCart${id}">
    Žao nam je, proizvod nije na stanju!
    </div>`;
  }
  return cnt;
}
//funkcija koja ispisuje listu checkbox-ova za filtriranje
function writeFilterCbl(filters, name) {
  if(window.location.href.includes("shop")){
    let cnt = `<h5 class="text-capitalize fw-bold">${name}</h5>`;
    filters.forEach((f) => {
    cnt += `<div class="form-check">
                <input class="form-check-input ${name}" name="${name}" type="checkbox" value="${f.id}" id="${name}${f.id}">
                <label class="form-check-label filter-label" for="${name}${f.id}"> ${f.name} <span class="fw-bold">(${countItems(name, f.id)})</span> </label>
            </div>`;
  });
  cnt += `<hr>`;
  document.getElementById("filters").innerHTML += cnt;
  countItems();
  }
}
//funkcija koja prebrojava koliko proizvoda zadovoljava uslov za filtriranje
function countItems(condition, checkerId){
  var valueToCheck = ""
  var num = 0;
  var allItems = JSON.parse(localStorage.getItem("products"));
  if(condition!="ukusi"){
    if(condition == "kategorije"){
      valueToCheck = "categoryId"
    }
    else if(condition == "brendovi"){
      valueToCheck = "brandId"
    }
    for(var i = 0; i<allItems.length;i++){
      if(allItems[i][valueToCheck] == checkerId ){
        num++;
      }
    }
  }
  else{
    allItems.forEach(i => {
      i.flavoursIds.forEach(flavourId => {
        if(flavourId == checkerId){
          num++;
        } 
      });
    });
  }
  return num;
}
//funkcija koja proverava da li je korisnikov unos ispravan i vraca povratnu poruku ako nije
function checker(regex, id, messageId) {
  if (!regex.test(document.getElementById(id).value)) {
    document.getElementById(messageId).classList.add("d-block");
    return false;
  } else {
    document.getElementById(messageId).classList.remove("d-block");
  }
}
// funkcija koja  uklanja tekst iz zadatog polja
function removeText(id) {
  document.getElementById(id).value = "";
}
//promenljive koje koriste obe stranice za proveru formi
var emailReg = /^[\w\.]+@[a-zA-Z_]+?(\.[a-zA-Z]{2,3})+$/;
var nameAndLastNameReg = /^([A-ZČĆŠŽĐ][a-zčćšžđ]+)\s*([A-ZČĆŠŽĐ][a-zčćšžđ]+(\s)*)*$/;
var phoneReg = /^06[0-9]([0-9]{7,8})$/;
var adressReg = /^([A-ZČĆŠŽĐ][a-zčćšžđ]+)\s*([A-ZČĆŠŽĐa-zčćšžđ][a-zčćšžđ]+(\s)*)*[0-9]+([/][0-9])*$/;
var cityReg = /^([A-ZČĆŠŽĐ][a-zčćšžđ]+)\s*([A-ZČĆŠŽĐa-zčćšžđ][a-zčćšžđ]+(\s)*)*$/;
var postalReg = /^[1-4][0-9]{4}$/;
//dohvatanje json fajlova i ispis njihovog sadrzaja
getData("meni", showNavigation);
getData("products", showProducts);
getData("kategorije", writeFilterCbl);
getData("brendovi", writeFilterCbl);
getData("ukusi", writeFilterCbl);

//tajmer za kraj akcije
if(!window.location.href.includes("shop")){
  var countDownDate = new Date("May 5, 2023 00:00:00").getTime();
  var x = setInterval(function() {
    var now = new Date().getTime();
    var timeLeft = countDownDate - now;

    var days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    var hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    document.getElementById("timeLeft").innerHTML = days + "d " + hours + "s "
    + minutes + "m " + seconds + "s ";

    if (timeLeft < 0) {
      clearInterval(x);
      document.getElementById("timeLeft").innerHTML = "EXPIRED";
    }
}, 1000);

}

//sakrivanje skrola dok se sve ne ucita
document.body.classList.add("hide-scroll")

//funkcija koja simulira spiner i ucitavanje
setTimeout(function(){
  function removeSpinner() {
    const spinner = document.querySelector('.spinner-container');
    setTimeout(() => {
      spinner.remove();
      document.body.classList.remove("hide-scroll")
    }, 1000);
  }
  removeSpinner();
  writeFlavours();
  var allProducts = JSON.parse(localStorage.getItem("products"));
  cartOperations();
  //funckije za stranicu index
  if(!window.location.href.includes("shop")){
    showSmallerProductsOnSales(JSON.parse(localStorage.getItem("products")), "#actionProducts")
    showSmallerProducts(JSON.parse(localStorage.getItem("products")), "#productsWithMostSales", "sales")
    showSmallerProducts(JSON.parse(localStorage.getItem("products")), "#newestProducts", "date")
    //funkcija koja proverava formu za kontakt
    function checkContactForm(e) {
      e.preventDefault();
      var err = 0;
      if (checker(nameAndLastNameReg, "name", "invalidName") == false) {
        err++;
      }
      if (checker(emailReg, "email", "invalidEmail") == false) {
        err++;
      }
      if (checker(phoneReg, "phone", "invalidPhone") == false) {
        err++;
      }
      if (document.getElementById("message").value.length == 0) {
        document.getElementById("invalidMessage").classList.add("d-block");
        err++;
      } else {
        document.getElementById("invalidMessage").classList.remove("d-block");
      }
      if (err == 0) {
        removeText("name");
        removeText("email");
        removeText("message");
        removeText("phone");
        $("#messageSent").show("slow");
        setTimeout(() => {
          $("#messageSent").hide("slow");
        }, 3000);
      }
    }
    document.getElementById("submitButton").addEventListener("click", checkContactForm);
  
  }
  // funkcije za stranicu shop, za ispisivanje i filtriranje proizvoda
  if(window.location.href.includes("shop")){
  //funkcija za navodjenje korisnika na vrh strane
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('#scrollToTop').fadeIn();
    } else {
      $('#scrollToTop').fadeOut();
    }
  });
  $('#scrollToTop').click(function() {
    $('html, body').animate({scrollTop : 0},800);
    return false;
  });
  //ciscenje proizvoda koji su filtrirani pri ucitavanju strane
  localStorage.removeItem("newProducts")
  //funckija koja racuna koliko proizvoda se prikazuje
  function showNumberOfProducts(){
    var numberOfAllProducts = JSON.parse(localStorage.getItem("products")).length;
    var numberOfProductsShowing;
    if(JSON.parse(localStorage.getItem("newProducts"))){
      numberOfProductsShowing = JSON.parse(localStorage.getItem("newProducts")).length;
    }
    else{
      numberOfProductsShowing = numberOfAllProducts;
    }
    document.querySelector("#numberOfProducts").innerHTML=`Prikazuje se: ${numberOfProductsShowing} od ${numberOfAllProducts} proizvoda`
  }
  showNumberOfProducts();
  //funckija koja cisti sve filtere
  function removeFilters(e){
    e.preventDefault();
    removeText("minPrice");
    removeText("maxPrice");
    removeText("search");
    $("#sort").val("0");
    var allCheckBoxes = document.querySelectorAll('input[type="checkbox"]');
    for(var i = 0;i<allCheckBoxes.length;i++){
      allCheckBoxes[i].checked = false;
    }
    var allRadios = document.querySelectorAll('input[type="radio"]');
    for(var i = 0;i<allRadios.length;i++){
      allRadios[i].checked = false;
    }
    window.scrollTo(0,0)
    filterChanged();
  }
  //dodavanje funkcije za ciscenje filtera dugmetu
  $("#clearFiltersButton").click(removeFilters);
  //funkcija koja filtrira proizvode po trazenom tekstu
    function filterByTxt() {
      var writtenText = document
        .getElementById("search")
        .value.toLowerCase()
        .trim();
      var newProducts = JSON.parse(localStorage.getItem("newProducts")).filter(
        (x) => x.name.toLowerCase().trim().indexOf(writtenText) != -1
      );
      localStorage.setItem("newProducts", JSON.stringify(newProducts));
    }
    //funkcija koja sortira proizvode po zadatom kriterijumu
    function sortProducts(items) {
      var sortValue = document.getElementById("sort").value;
  
      return items.sort(function (a, b) {
        if (sortValue == "0") {
          showProducts(JSON.parse(localStorage.getItem("newProducts")));
        } else if (sortValue == "1") {
          return a.price.newPrice - b.price.newPrice;
        } else if (sortValue == "2") {
          return b.price.newPrice - a.price.newPrice;
        } else if (sortValue == "3") {
          if (a.name > b.name) {
            return -1;
          } else if (a.name == b.name) {
            return 0;
          } else if (a.name < b.name) {
            return 1;
          }
        } else if (sortValue == "4") {
          if (b.name > a.name) {
            return -1;
          } else if (a.name == b.name) {
            return 0;
          } else if (b.name < a.name) {
            return 1;
          }
        }
      });
    }
    //funkcija koja se izvrsava pri promeni vrste sortiranja
    function sortOrderChanged() {
      var itemsToSort = JSON.parse(localStorage.getItem("newProducts"));
      sortProducts(itemsToSort);
      localStorage.setItem("newProducts", JSON.stringify(itemsToSort));
    }
  //funkcija kojja filtira proizvode po cenovnom rangu, radi i za min i max cenu
    function filterByPrice() {
      var minPrice = document.getElementById("minPrice").value;
      var maxPrice = document.getElementById("maxPrice").value;
      if (minPrice == "" && maxPrice != "") {
        minPrice = "0";
      }
      if (minPrice != "" && maxPrice == "") {
        maxPrice = "100000000";
      }
      if (minPrice == "" && maxPrice == "") {
        showProducts(JSON.parse(localStorage.getItem("newProducts")));
      } else {
        var newProducts = JSON.parse(localStorage.getItem("newProducts")).filter(
          (p) =>
            parseInt(p.price.newPrice) > parseInt(minPrice) &&
            parseInt(p.price.newPrice) < parseInt(maxPrice)
        );
        localStorage.setItem("newProducts", JSON.stringify(newProducts));
      }
    }
    //funkcija koja filtrira proizvode po tome da li su na stanju ili ne
    function filterByAvailability() {
      var newProducts;
      var val;
      try {
        val = document.querySelector('input[name="availability"]:checked').value;
      } catch {
        val = "all";
      }
      if (val == "true") {
        newProducts = JSON.parse(localStorage.getItem("newProducts")).filter(
          (p) => p.available == true
        );
        localStorage.setItem("newProducts", JSON.stringify(newProducts));
      } else if (val == "false") {
        newProducts = JSON.parse(localStorage.getItem("newProducts")).filter(
          (p) => p.available == false
        );
        localStorage.setItem("newProducts", JSON.stringify(newProducts));
      } else if (val == "all") {
        showProducts(JSON.parse(localStorage.getItem("newProducts")));
      }
    }
    //funkcija koja filtrira proizvode na osnovu toga da li je neki od checkboxova promenjen
    function filterByCondition(filterBy, filterValue) {
      var checkedCategories = document.querySelectorAll(
        `input[name="${filterBy}"]:checked`
      );
      var checkedCategoriesValues = [];
      for (var i = 0; i < checkedCategories.length; i++) {
        checkedCategoriesValues.push(checkedCategories[i].value);
      }
      if (checkedCategories.length == 0) {
        showProducts(JSON.parse(localStorage.getItem("newProducts")));
      } else {
        var newProductsArray = [];
        for (var i = 0; i < checkedCategoriesValues.length; i++) {
          newProductsArray.push(
            JSON.parse(localStorage.getItem("newProducts")).filter(
              (p) => p[filterValue] == checkedCategoriesValues[i]
            )
          );
        }
        var newProducts = [];
        newProductsArray.forEach((element) => {
          for (var i = 0; i < element.length; i++) {
            newProducts.push(element[i]);
          }
        });
        localStorage.setItem("newProducts", JSON.stringify(newProducts));
      }
    }
    // funckija koja filtrira po cb od kategorija
    function filterByCategory() {
      filterByCondition("kategorije", "categoryId");
    }
    // funckija koja filtrira po cb od brendova
    function filterByBrand() {
      filterByCondition("brendovi", "brandId");
    }
    // funckija koja filtrira po cb od ukusa
    function filterByFlavour() {
      var chosenFlavours = [];
      $.each($("input[name='ukusi']:checked"), function () {
        chosenFlavours.push($(this).val());
      });
      if (chosenFlavours.length == 0) {
        showProducts(JSON.parse(localStorage.getItem("newProducts")));
      } else {
        var newProducts = JSON.parse(localStorage.getItem("newProducts")).filter(
          function (p) {
            for (let flavourId of p.flavoursIds) {
              for (let id of chosenFlavours) {
                if (flavourId == id) {
                  return true;
                }
              }
            }
          }
        );
        localStorage.setItem("newProducts", JSON.stringify(newProducts));
      }
    }
    //funkcija koja sadrzi sve proveru svih filtera i bice dodeljena svakoj promeni
    function filterChanged() {
      localStorage.setItem("newProducts", JSON.stringify(allProducts));
      filterByTxt();
      sortOrderChanged();
      filterByPrice();
      filterByAvailability();
      filterByCategory();
      filterByBrand();
      filterByFlavour();
      showProducts(JSON.parse(localStorage.getItem("newProducts")));
      giveButtonsShoppingAbility();
      writeFlavours();
      showNumberOfProducts();
    }

    //dodela eventova

    document.getElementById("search").addEventListener("keyup",filterChanged);
    document.getElementById("sort").addEventListener("change", filterChanged);
    document.getElementById("minPrice").addEventListener("keyup", filterChanged);
    document.getElementById("maxPrice").addEventListener("keyup", filterChanged);
    var radioButtons = document.querySelectorAll('input[name="availability"]');
        for (var i = 0; i < radioButtons.length; i++) {
          radioButtons[i].checked = false;
          radioButtons[i].addEventListener("change", filterChanged);
        }
    var categories = document.querySelectorAll(".kategorije");
        for (var i = 0; i < categories.length; i++) {
          categories[i].addEventListener("change", filterChanged);
        }
    var brendovi = document.querySelectorAll(".brendovi");
        for (var i = 0; i < brendovi.length; i++) {
          brendovi[i].addEventListener("change", filterChanged);
        }
    var flavours = document.querySelectorAll(".ukusi");
        for (var i = 0; i < flavours.length; i++) {
          flavours[i].addEventListener("change", filterChanged);
        }
}
// funkcije za korpu, zajednicke za sve strane

  //funkcija koja proverava formu za kupovinu
  function checkCustomerForm(e) {
    e.preventDefault();
    err = 0;
    if (
      checker(nameAndLastNameReg, "customerName", "invalidCustomerName") ==
      false
    ) {
      err++;
    }
    if (checker(emailReg, "customerEmail", "invalidCustomerEmail") == false) {
      err++;
    }
    if (checker(phoneReg, "customerPhone", "invalidCustomerPhone") == false) {
      err++;
    }
    if (
      checker(adressReg, "customerAdress", "invalidCustomerAdress") == false
    ) {
      err++;
    }
    if (checker(cityReg, "customerCity", "invalidCustomerCity") == false) {
      err++;
    }
    if (
      checker(postalReg, "customerPostalCode", "invalidCustomerPostalCode") ==
      false
    ) {
      err++;
    }
    if(JSON.parse(localStorage.getItem("productsInCart"))){
      if(JSON.parse(localStorage.getItem("productsInCart")).length==0){
        err++;
        document.getElementById("invalidProductNumber").classList.add("d-block");
      }
      else{
        document.getElementById("invalidProductNumber").classList.remove("d-block");
      }
    }
    else{
      err++;
      document.getElementById("invalidProductNumber").classList.add("d-block");
    }
    if (err == 0) {
      $('#cartModal').modal('hide')
      removeText("customerName");
      removeText("customerEmail");
      removeText("customerPhone");
      removeText("customerAdress");
      removeText("customerCity");
      removeText("customerPostalCode");
      localStorage.removeItem("productsInCart");
      cartOperations();
      $("#shopingGood").removeClass("d-none");
      setTimeout(() => {
        $("#shopingGood").addClass("d-none");
      }, 5000);
    }
  }
  $("#submitCustomer").click(checkCustomerForm);
  
  giveButtonsShoppingAbility();
  //funkcija koja proverava da li proizvod vec postoji u korpi
  function checkIfElementAlreadyExists(arrayOfProducts, id) {
    var bool = false;
    arrayOfProducts.forEach((item) => {
      if (item.id == id) {
        bool = true;
      }
    });
    return bool;
  }
  //funkcija koja racuna ukupnu cenu
  function calculatePrice(){
    var price = 0;
    if(JSON.parse(localStorage.getItem("productsInCart"))){
      if(JSON.parse(localStorage.getItem("productsInCart")).length!=0){
        var productInCart = JSON.parse(localStorage.getItem("productsInCart"));
        productInCart.forEach(productInCart => {
          allProducts.forEach(element => {
            if(productInCart.id == element.id){
              price += element.price.newPrice * productInCart.quantity;
            }
          });
        });
      }
    }
    document.getElementById("priceSum").textContent = price + " RSD";
  }
  //funkcija koja ispisuje proizvode u korpi
  function writeCart(){
    var productsInCart = JSON.parse(localStorage.getItem("productsInCart"));
    var cnt = "";
    if(JSON.parse(localStorage.getItem("productsInCart")))
    {
      if(JSON.parse(localStorage.getItem("productsInCart")).length!=0){
        productsInCart.forEach((productInCart) => {
          allProducts.forEach((product) => {
            if (product.id == productInCart.id) {
              cnt += `<div class="container-xl cart-item rounded-3 py-2 mb-1">
                <div class="row align-items-center">
                  <div class="col-3 col-lg-3">
                    <img
                    src="${product.img.src}"
                    class="w-100 rounded-3"
                    alt="${product.img.alt}"
                  />
                </div>
                <div class="col-9 col-lg-4">
                  <p class="lh-1">
                    ${product.name}
                  </p>
                </div>
                <div
                  class="
                    col-12 col-lg-5
                    align-items-center
                    d-flex
                    justify-content-end
                  "
                >
                  <input
                    value = "${productInCart.quantity}"
                    min = "1"
                    type="number"
                    class="form-control mx-4 mx-lg-0 quantity"
                    id="quantity${product.id}"
                    name="quantity${product.id}"
                    data-id="${product.id}"
                  />
                  <p class="mx-2">${product.price.newPrice} RSD</p>
                  <a href="#" class="text-dark removeItemFromCart" data-id="${product.id}"><i class="fa-solid fa-circle-xmark"></i></a>
                </div>
              </div>
            </div>`;
            }
          });
        });
      }
      else{
        cnt = `<div class="alert alert-danger" role="alert">
        Prazna korpa!
        </div>`
      }
    }
    else{
      cnt = `<div class="alert alert-danger" role="alert">
      Prazna korpa!
      </div>`
    }
    document.getElementById("itemsInCart").innerHTML = cnt;
    var upNDowns = document.getElementsByClassName("quantity");
    for(var i = 0; i<upNDowns.length;i++){
      upNDowns[i].addEventListener("change", quantityChangedByInput);
    }
  }
  //funkcija koja uklanja stavku iz korpe
  function removeItemsFromCart(e){
    e.preventDefault();
    var idOfProductToRemove = $(this).data("id");
    var productsInCart = JSON.parse(localStorage.getItem("productsInCart"))
    var productToRemove = productsInCart.find(p=> p.id == idOfProductToRemove);
    var index = productsInCart.indexOf(productToRemove);
    productsInCart.splice(index, 1);
    localStorage.setItem("productsInCart", JSON.stringify(productsInCart));
    cartOperations();
  }
  //funckija koja dodeljuje funkciju za uklanjanje stavki iz korpe dugmicima za brisanje
  function giveDeleteFunction(){
    var deleteButtons = document.getElementsByClassName("removeItemFromCart");
    for(var i = 0;i<deleteButtons.length;i++){
      deleteButtons[i].addEventListener("click", removeItemsFromCart);
    }
  }
  // funkcija koja racuna koliko je elemenata u korpi
  function calculateItemsInCart(){    
    var numberOfItemsInCart = 0;
    if(JSON.parse(localStorage.getItem("productsInCart"))){
      var productsInCart = JSON.parse(localStorage.getItem("productsInCart"))
      productsInCart.forEach(p => {
        numberOfItemsInCart += parseInt(p.quantity);
      });
    }
    document.getElementById("cart-num-items").textContent = numberOfItemsInCart;
  }
  //funkcija koja radi za rucno menjanje broja artikla u korpi
  function quantityChangedByInput(){
    var idToChange = $(this).data("id");
    var newQuantity = document.getElementById(`quantity${idToChange}`).value;
    var productInCart = JSON.parse(localStorage.getItem("productsInCart"));
    productInCart.forEach(p => {
      if(p.id==idToChange){
        p.quantity = newQuantity;
      }
    });
    localStorage.setItem("productsInCart", JSON.stringify(productInCart));
    cartOperations();

  }
  //funkcija koja posle ispisa daje funkcionalnost dugmicima za kupovinu
  function giveButtonsShoppingAbility(){
    var buttons = document.querySelectorAll(".buttonShop");
    for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", shopping);
    }
    var buttonsFail = document.querySelectorAll(".buttonShopFailed");
    for (var i = 0; i < buttonsFail.length; i++) {
    buttonsFail[i].addEventListener("click", cantShop);
  }
  }
  //funckija koja proverava da li je korpa prazna

  function isCartEmpty(){
    if(JSON.parse(localStorage.getItem("productsInCart"))){
      if(JSON.parse(localStorage.getItem("productsInCart")).length==0){
        document.getElementById("itemsInCart").innerHTML = `<div class="alert alert-danger" role="alert">
        Prazna korpa!
        </div>`
        $("#cartForm").addClass("d-none")
      }
      else{
        $("#cartForm").removeClass("d-none")

      }
    }
    else{
      document.getElementById("itemsInCart").innerHTML = `<div class="alert alert-danger" role="alert">
      Prazna korpa!
      </div>`
      $("#cartForm").addClass("d-none")
    }
  }
  
  //funkcija za kupovinu, koja se poziva na dugme za dodavanje artikla u korpu
  function shopping() {

    var idProduct = $(this).data("id");
    $(`#addedToCart${idProduct}`).show("slow");
    setTimeout(() => {
      $(`#addedToCart${idProduct}`).hide("slow");
    }, 3000);
    if (!JSON.parse(localStorage.getItem("productsInCart"))) {
      let products = [];
      products[0] = {
        id: idProduct,
        quantity: 1,
      };
      localStorage.setItem("productsInCart", JSON.stringify(products));
    } else {
      if (
        checkIfElementAlreadyExists(
          JSON.parse(localStorage.getItem("productsInCart")),
          idProduct
        )
      ) {
        var products = JSON.parse(localStorage.getItem("productsInCart"));
        products.forEach((p) => {
          if(p.id==idProduct){
            p.quantity++;
          }
        });
        localStorage.setItem("productsInCart", JSON.stringify(products));
      } else {
        var products = JSON.parse(localStorage.getItem("productsInCart"));
        products.push({
          id: idProduct,
          quantity: 1,
        });
        localStorage.setItem("productsInCart", JSON.stringify(products));
      }
    }
    cartOperations();
  }
  //funkcija koja grupise i obavlja sve funkcije vezane za funkcionalnost korpe
  function cartOperations(){
    writeCart();
    calculatePrice();
    calculateItemsInCart();
    giveDeleteFunction();
    isCartEmpty();
  }
  //funkcija koja ne dozvoljava kupovinu artikla koji nije na stanju
  function cantShop() {
    var id = $(this).data("id");
    $(`#cantAddToCart${id}`).show("slow");
    setTimeout(() => {
      $(`#cantAddToCart${id}`).hide("slow");
    }, 3000);
  }
}, 1000)
