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
    },
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
                        
                        <div class="d-flex justify-content-center align-items-center rounded-circle bg-warning" id="cart-num-items"><span>0</span></div>
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
                                                              p.flavoursIds,
                                                              `flavour${
                                                                index + 1
                                                              }`
                                                            )}
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
  document.querySelector("#products").innerHTML = shopItem;
  document.querySelector("#modals").innerHTML = modalOfShopItem;
}
//funkcija koja ispisuje ukuse proizvoda
function writeFlavours(flavours, name) {
  var allFlavours = JSON.parse(localStorage.getItem("flavours"));
  if (flavours != null) {
    let cnt = `<select class="form-select"name="${name}" id="${name}">`;
    flavours.forEach((f) => {
      allFlavours.forEach((af) => {
        if (f == af.id) {
          cnt += `<option value="${f}">${af.name}</option>`;
        }
      });
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
function isAvailableButton(checker, id) {
  let cnt = "";
  if (checker) {
    cnt += `<button class="btn btn-outline-light text-uppercase rounded-0 text-black border-dark my-1 cart-button-success buttonShop" data-id="${id}">Add to cart <i class="fa-solid fa-bag-shopping fs-5 mx-1"></i></button>       `;
  } else {
    cnt += `<button class="btn btn-outline-light text-uppercase rounded-0 text-black border-dark my-1 cart-button-fail buttonShopFailed">Not available <i class="fa-solid fa-x fs-5 mx-1"></i></button>        `;
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
getData("brands", writeFilterCbl);
getData("flavours", writeFilterCbl);

var allProducts = JSON.parse(localStorage.getItem("products"));

window.addEventListener("load", (event) => {
  document.getElementById("search").addEventListener("keyup", filterChanged);
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
  document.getElementById("sort").addEventListener("change", filterChanged);
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
  function sortOrderChanged() {
    var itemsToSort = JSON.parse(localStorage.getItem("newProducts"));
    sortProducts(itemsToSort);
    localStorage.setItem("newProducts", JSON.stringify(itemsToSort));
  }
  document.getElementById("minPrice").addEventListener("keyup", filterChanged);
  document.getElementById("maxPrice").addEventListener("keyup", filterChanged);

  function filterByPrice() {
    var minPrice = document.getElementById("minPrice").value;
    var maxPrice = document.getElementById("maxPrice").value;
    if (minPrice == "" && maxPrice != "") {
      minPrice = "0";
    }
    if (minPrice != "" && maxPrice == "") {
      maxPrice = "100000000";
    }
    allProducts.forEach((element) => {});
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
  var radioButtons = document.querySelectorAll('input[name="availability"]');
  for (var i = 0; i < radioButtons.length; i++) {
    radioButtons[i].checked = false;
    radioButtons[i].addEventListener("change", filterChanged);
  }
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
  function filterByCategory() {
    filterByCondition("categories", "categoryId");
  }
  function filterByBrand() {
    filterByCondition("brands", "brandId");
  }
  function filterByFlavour() {
    var chosenFlavours = [];
    $.each($("input[name='flavours']:checked"), function () {
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
  var categories = document.querySelectorAll(".categories");
  for (var i = 0; i < categories.length; i++) {
    categories[i].addEventListener("change", filterChanged);
  }
  var brands = document.querySelectorAll(".brands");
  for (var i = 0; i < brands.length; i++) {
    brands[i].addEventListener("change", filterChanged);
  }
  var flavours = document.querySelectorAll(".flavours");
  for (var i = 0; i < flavours.length; i++) {
    flavours[i].addEventListener("change", filterChanged);
  }
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
  }
  var buttons = document.querySelectorAll(".buttonShop");
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", shopping);
  }
  var buttonsFail = document.querySelectorAll(".buttonShopFailed");
  for (var i = 0; i < buttonsFail.length; i++) {
    buttonsFail[i].addEventListener("click", cantShop);
  }
  localStorage.setItem("productsInCart", JSON.stringify([]));
  function shopping() {
    alert("Product added to cart")
    var id = $(this).data('id');
    var productsInCart = JSON.parse(localStorage.getItem("productsInCart"));
    productsInCart.push(allProducts.filter(p=>p.id==id));
    localStorage.setItem("productsInCart", JSON.stringify(productsInCart));
    console.log(productsInCart);
  }
  function cantShop(){
    alert("We will get product ASAP");
  }
});
