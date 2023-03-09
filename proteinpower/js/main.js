//funckija koja radi sa json podacima koje dohvata ajaxom
function getData(fileName, operation) {
  $.ajax({
    url: "assets/data/" + fileName + ".json",
    method: "get",
    dataType: "json",
    success: function (data) {
      operation(data, fileName);
      localStorage.setItem(fileName, JSON.stringify(data));
    },
    error: function (xhr, status, error) {
      console.log(error);
    }
  });
}
//funckija koja ispisuje dinamicke elemente navigacionog menija
function showNavigation(navItems) {
  let cnt = `<ul class="navbar-nav text-uppercase ms-auto py-4 py-lg-0">`;
  navItems.forEach((element) => {
    cnt += `<li class="nav-item"><a class="nav-link" href="${element.href}">${element.text}</a></li>`;
  });
  cnt += `  <li class="nav-item d-flex ">
                        <a class="nav-link" data-bs-toggle="modal" href = "#cartModal"><i class="fa-solid fa-cart-shopping fa-xl"></i></a>
                        
                        <div class="d-flex justify-content-center align-items-center rounded-circle bg-warning" id="cart-num-items"><span>1</span></div>
                    </li>

                 </ul>
                 `;
  document.getElementById("navbarResponsive").innerHTML = cnt;
}
//funckija koja ispisuje proizvode u shop-u i njihove modale za kupovinu
function showProducts(products) {
  let shopItem = "";
  let modalOfShopItem = "";
  products.forEach((p, index) => {
    shopItem += `<div class="col-lg-4 col-sm-6 mb-4">

                        <div class="shop-item">
                        <a class="shop-link" data-bs-toggle="modal" href="#shopModal${
                          index + 1
                        }">
                            <div class="shop-hover">
                                <div class="shop-hover-content"><i class="fas fa-plus fa-3x"></i></div>
                                </div>
                                <img class="img-fluid" src="${
                                  p.img.src
                                }" alt="${p.img.alt}" />
                        </a>
                        <div class="shop-caption">
                        <div class="shop-caption-heading">${p.name}</div>
                        <div class="shop-caption-subheading text-muted d-flex justify-content-around"><p>${
                          p.price.newPrice
                        } RSD</p><s>${p.price.oldPrice} RSD</s></div>
                        ${isAvailable(p.available)}
            </div>
        </div>
    </div>`;
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
                                                    <h2 class="text-uppercase">${
                                                      p.name
                                                    }</h2>
                                                    <div class="d-flex justify-content-around">
                                                        <p class="item-intro text-muted fs-2">${
                                                          p.price.newPrice
                                                        } RSD</p>
                                                        <s class="item-intro text-muted fs-2">${
                                                          p.price.oldPrice
                                                        } RSD</s>
                                                    </div>
                                                    <img class="img-fluid d-block mx-auto" src="${
                                                      p.img.src
                                                    }" alt="${p.img.alt}" />
                                                    <p>${p.description}</p>
                                                    <ul class="list-inline">
                                                        <li>
                                                            ${writeFlavours(
                                                              p.flavours,
                                                              `flavour${
                                                                index + 1
                                                              }`
                                                            )}
                                                        </li>
                                                    </ul>
                                                    ${isAvailableButton(
                                                      p.available
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>`;
  });
  document.querySelector("#products").innerHTML = shopItem;
  document.querySelector("#modals").innerHTML = modalOfShopItem;
}
//funkcija koja ispisuje ukuse proizvoda
function writeFlavours(flavours, name) {
  if (flavours != null) {
    let cnt = `<select class="form-select"name="${name}" id="${name}">`;
    flavours.forEach((f) => {
      cnt += `<option value="${f}">${f}</option>`;
    });
    cnt += `</select>`;
    return cnt;
  }
}
//funkcija koja proverava da li je proizvod na stanju
function isAvailable(checker) {
  let cnt = "";
  if (checker) {
    cnt += `<div class="d-flex justify-content-center"><div class="rounded-circle bg-success state mx-1"></div><p>Product is available</p></div>`;
  } else {
    cnt += `<div class="d-flex justify-content-center"><div class="rounded-circle bg-danger state mx-1"></div><p>Product is not available</p></div>`;
  }
  return cnt;
}
//funckija koja ispisuje dugme u modalu u odnosu na to da li je proizvod na stanju ili ne
function isAvailableButton(checker) {
  let cnt = "";
  if (checker) {
    cnt += `<button class="btn btn-outline-light text-uppercase rounded-0 text-black border-dark my-1 cart-button-success">Add to cart <i class="fa-solid fa-bag-shopping fs-5 mx-1"></i></button>       `;
  } else {
    cnt += `<button class="btn btn-outline-light text-uppercase rounded-0 text-black border-dark my-1 cart-button-fail">Not available <i class="fa-solid fa-x fs-5 mx-1"></i></button>        `;
  }
  return cnt;
}
function writeFilterCbl(filters, name) {
  
  let cnt = `<h5 class="text-capitalize">${name}</h5>`;
  filters.forEach((f) => {
    cnt += `<div class="form-check">
                <input class="form-check-input ${name}" name="${name}" type="checkbox" value="${f.id}" id="${name}${f.id}">
                <label class="form-check-label filter-label" for="${name}${f.id}"> ${f.name} </label>
            </div>`;
  });
  cnt += `<hr>`;
  document.getElementById("filters").innerHTML += cnt;

}

getData("menu", showNavigation);
getData("products", showProducts);
getData("categories", writeFilterCbl);
getData("brends", writeFilterCbl);
getData("falvours", writeFilterCbl);

var allProducts = JSON.parse(localStorage.getItem("products"));

document.getElementById("search").addEventListener("keyup", filterByTxt);
function filterByTxt() {
  var writtenText = document.getElementById("search").value;
  var newProducts = JSON.parse(localStorage.getItem("products")).filter(
    (x) => x.name.indexOf(writtenText) != -1
  );
  showProducts(newProducts);
}
document.getElementById("sort").addEventListener("change", sortOrderChanged);
function sortProducts(items) {
  var sortValue = document.getElementById("sort").value;

  return items.sort(function (a, b) {
    if (sortValue == "0") {
      showProducts(items);
    } else if (sortValue == "1") {
      return a.price.newPrice - b.price.newPrice;
    } else if (sortValue == "2") {
      return b.price.newPrice - a.price.newPrice;
    } else if (sortValue == "3") {
      if (a.name > b.name) {
        return 1;
      }
    } else if (sortValue == "4") {
      if (b.name > a.name) {
        return 1;
      }
    }
  });
}
function sortOrderChanged() {
  sortProducts(allProducts);
  showProducts(allProducts);
}
document.getElementById("minPrice").addEventListener("keyup", filterByPrice);
document.getElementById("maxPrice").addEventListener("keyup", filterByPrice);

function filterByPrice(){
  var minPrice = document.getElementById("minPrice").value;
  var maxPrice = document.getElementById("maxPrice").value;
  if(minPrice==""&&maxPrice!=""){
    minPrice="0";
  }
  if(minPrice!=""&&maxPrice==""){
    maxPrice = "100000000";
  }
  allProducts.forEach(element => {
  });
  if(minPrice=="" && maxPrice==""){
    showProducts(allProducts);
  }
  else{
    var newProducts = allProducts.filter(p=>parseInt(p.price.newPrice)>parseInt(minPrice)&&parseInt(p.price.newPrice)<parseInt(maxPrice));
    showProducts(newProducts);
  }
}
function filterByAvailability(){
  var newProducts;
  var val = document.querySelector('input[name="availability"]:checked').value;
  if(val == "true"){
    newProducts = allProducts.filter(p=>p.available==true);
    showProducts(newProducts);
  }
  else if(val=="false"){
    newProducts = allProducts.filter(p=>p.available==false);
    showProducts(newProducts);
  }
  else if(val=="all"){
    showProducts(allProducts);
  }
}
var radioButtons = document.querySelectorAll('input[name="availability"]');
console.log(radioButtons)
for(var i = 0;i<radioButtons.length;i++){
  radioButtons[i].checked = false;
  radioButtons[i].addEventListener("change", filterByAvailability);
}