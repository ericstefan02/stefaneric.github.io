function getData(fileName, operation){
    $.ajax({
        url:"assets/data/"+fileName+".json",
        method:"get",
        dataType:"json",
        success: function(data){
                operation(data)
            },
        error: function(xhr, status, error){
                console.log(error);
            }
        }
    )
}
function showNavigation(navItems){
    let cnt=`<ul class="navbar-nav text-uppercase ms-auto py-4 py-lg-0">`;
    navItems.forEach(element => {
        cnt +=`<li class="nav-item"><a class="nav-link" href="${element.href}">${element.text}</a></li>`;
    });
    cnt+=`  <li class="nav-item d-flex ">
                        <a class="nav-link" href="cart.html"><i class="fa-solid fa-cart-shopping fa-xl"></i></a>
                        <div class="d-flex justify-content-center align-items-center rounded-circle bg-warning" id="cart-num-items"><span>1</span></div>
                    </li>

                 </ul>`
    document.getElementById("navbarResponsive").innerHTML=cnt;
    console.log(cnt)
    
}
if(window.location.href.includes("index")){
    getData("menu", showNavigation);
}
