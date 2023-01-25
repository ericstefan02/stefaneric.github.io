var pages = ["index.html","treninzi.html", "contact.html", "register.html", "Dokumentacija.pdf", "author.html"];
var pageLabels = ["Početna", "Trening", "Kontakt", "Registracija","Dokumentacija", "O autoru"];
var menu = document.getElementById("navMenu");
var links = ["Portfolio","CSS", "JS", "Sitemap"];
var linkValues = ["https://ericstefan02.github.io/stefaneric.github.io/portfolio/","assets/css/style.css", "assets/js/main.js", "sitemap.xml"];
var footObjs = ["Linkovi", "Meni"];
var footer = document.getElementById("foot");
var ftCnt = document.getElementById("footCnt");
function ispisiHeader(){
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

}
function ispisiFooter(){
    for(var i = 0;i<footObjs.length;i++){
        var divFt = document.createElement("div")
        divFt.classList.add("col-sm-3")
        divFt.classList.add("pt-5")
        var s = `<h4 class="border-3 border-bottom border-light pb-2 text-light">${footObjs[i]}</h4>`;
        if(i==0){
            s+=`<ul id="links" class="navbarMenu-ul navbar-nav container">`;
            for(var y = 0;y<links.length;y++){
            s+=`<li class="nav-item px-3"><a href="${linkValues[y]}" class="nav-link text-light">${links[y]}</a></li>`;
            }
        }
        else{
            s+=`<ul id="footer-meni-ul" class="navbarMenu-ul navbar-nav container d-inline">`;
            for(var y = 0;y<pages.length;y++){
            s+=`<li class="nav-item px-3"><a href="${pages[y]}" class="nav-link text-light">${pageLabels[y]}</a></li>`;
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
}
if((window.location.pathname).includes("index")||!((window.location.pathname).includes(".html"))){
    var slidePictures = ["kardio_zona_cover.jpeg", "treninzi-cover.jpeg", "mix_zona_cover.jpeg"];
    var slidePicturesAlt = ["cardio picture", "training picture", "mixed training picture"];
    var types = ["Standard", "Student", "Dnevna"];
    var time = ["00-24", "00-24 / do 26.god", "06-;16h / Pon-Pet"];
    var price = ["3290 rsd", "2790 rsd", "2490 rsd"];
    var colors = ["primary", "warning", "danger"];
    ispisiHeader();
  $(document).ready(function() {
    $('.flexslider').flexslider();
  });
var sliderTxt = `<ul class="slides">`
for(var i = 0;i<slidePictures.length;i++)
{
    sliderTxt+=`<li>
            <img src="assets/img/${slidePictures[i]}" alt="${slidePicturesAlt[i]}" />
            </li>`
}
sliderTxt+=`</ul>`
document.getElementById("slider").innerHTML+=sliderTxt;
var position = window.location.href.lastIndexOf('/');
var page = window.location.href.substring(position,window.location.href.length)
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
ispisiFooter();
}
if((window.location.pathname).includes("treninzi")){
    ispisiHeader();
    var treningIds = ["badass", "yoga", "zm", "core", "spinning", "ns"]
    var treningImgSrcs = ["assets/img/BadAss.jpg", "assets/img/Yoga.jpg", "assets/img/ZM.jpg", "assets/img/Core.jpg","assets/img/Spinning.jpg", "assets/img/NSF-Power-Boxing.jpg"];
    var treningImgAltsAndHeaders = ["BadAss", "Yoga", "Z&M", "Core", "Spinning", "NSF Power Boxing"];
    var treningTxt = ["Ovaj trening je namenjen upravo onim ženama koje žele da razviju lepu i snažnu zadnjicu.", "Trening podrazueva usredsređivanje pažnje na dešavanja u svom telu, usporavanje i produbljivanje disanja, sklad disanja i pokreta.", "Trening podrazueva deo sa vežbama zagrevanja, aerobni deo sa umerenim kardio vežbama, kao i vežbe snage.", "Ovim treningom sprečićeš prevelike rotacije trupa, prevenirati povrede i ublažiti bolove u lubalnom delu kičme.", "Ako želiš da se dobro preznojiš za 45 min i izgubiš čak 500 kalorija, isprobaj naš spinning trening koji spada u najpopularnije kardio treninge.", "NSF Power Boxing je intenzivan kardio trening sa elementima borilačkih veština, od kojih su dominantne Boks i Kik-Boks."];
    var treningLabels = ["Snaga", "Kardio", "Fleksibilnost"];
    var treningValues = [[80, 20, 60], [20, 0, 100], [80, 100, 60], [60, 20, 40], [60, 100, 20], [80, 80, 60]];
    var treningLength = [50, 45, 30, 40, 45, 60];
    var treningColors = ["danger", "success", "warning", "success", "warning", "danger"];
    var headers = ["Satnica", "Ponedeljak", "Utorak", "Sreda", "Četvrtak", "Petak"];
    var tableValues = [["10-11h","--", "--", "Core", "--", "Spinning"],["11-12h","--", "Z&M", "NSF Power Boxing", "BadAss", "--"],["12-13h","BadAss", "Yoga", "--", "Z&M", "Spinning"],["13-14h","Spinning", "--", "Core", "NSF Power Boxing", "Yoga"], ["14-15h","Yoga", "NSF Power Boxing", "--", "Z&M", "Core"] ];
    var txt = "";
    for(var i = 0;i<treningIds.length;i++){
         txt += `<div id="${treningIds[i]}" class="card col-lg-3 col-sm-5 col-8 my-4 mx-1">
                    <img src="${treningImgSrcs[i]}" class="card-img-top img-fluid" alt="${treningImgAltsAndHeaders[i]}"/>
                    <div class="card-body">
                        <h3 class="card-title">${treningImgAltsAndHeaders[i]}</h3>
                        <p class="card-text">${treningTxt[i]}</p>
                        <hr>
                    `;
                    for(var k = 0;k<treningLabels.length;k++){
                        txt+=`<label>${treningLabels[k]}</label>
                            <div class="progress mb-2">
                                <div class="progress-bar bg-${treningColors[i]}" role="progressbar" style="width: ${treningValues[i][k]}%;" aria-valuenow="${treningValues[i][k]}" aria-valuemin="0" aria-valuemax="100">${treningValues[i][k]}%</div>
                            </div>`
                    };
        txt +=`</div>`;
        txt+=`<div class="card-footer text-muted">
                <i class="fa fa-clock"></i><p class="d-inline mx-1"/>${treningLength[i]} min</p>
            </div> 
                </div>`

    }
    document.getElementById("treninzi").innerHTML+=txt;
    var headerTxt = "<tr>";
    for(var i = 0;i<headers.length;i++){
        headerTxt +=`<th scope="col">${headers[i]}</th>`;
    }
    headerTxt+="</tr>"
    var bodyTxt = "";
    for(var i = 0;i<headers.length-1;i++){
        bodyTxt+="<tr>";
        for(var k = 0;k<headers.length;k++){
            bodyTxt+=`<td class="tableCnt text-dark">${tableValues[i][k]}</td>`
        }
    }
    bodyTxt+="</tr>";
    document.getElementById("tableHeader").innerHTML += headerTxt;
    document.getElementById("tableBody").innerHTML += bodyTxt;
    var tableContent = document.getElementsByClassName("tableCnt");
    for(var i = 0;i<tableContent.length;i++){
        if((tableContent[i].textContent == ("NSF Power Boxing"))||(tableContent[i].textContent == ("BadAss"))){
            tableContent[i].classList.add("table-danger")
        }
        if((tableContent[i].textContent == ("Yoga"))||(tableContent[i].textContent == ("Core"))){
            tableContent[i].classList.add("table-success")
        }
        if((tableContent[i].textContent == ("Spinning"))||(tableContent[i].textContent == ("Z&M"))){
            tableContent[i].classList.add("table-warning")
        }
    }

    ispisiFooter();
}
if((window.location.pathname).includes("register")){

    var selectValues = [0, 1, 2];
    var selectText = ["Izaberi...", "Srbija", "Crna Gora"];

    var selectCnt = "";
    for(var i = 0;i<selectValues.length;i++){
        selectCnt+=`<option value="${selectValues[i]}">${selectText[i]}</option>`;
    }
    document.getElementById("inputState").innerHTML = selectCnt;
    function fromWorseToBetter(ID)
    {
        document.getElementById(ID).classList.remove("alert-danger");
        document.getElementById(ID).classList.add("alert-success");
    }
    function fromBetterToWorse(ID)
    {
        document.getElementById(ID).classList.remove("alert-success");
        document.getElementById(ID).classList.add("alert-danger");
    }
    function removeClassAndCnt(ID){
        document.getElementById(ID).classList.remove("alert-success");
        document.getElementById(ID).classList.remove("alert-danger");
        if(ID=="inputState"){
            document.getElementById(ID).value=0;
        }
        else{
            document.getElementById(ID).value = "";
        }
    }
    function removeRegisterInfo(){
        $("#formMessage").hide("slow");
    }
    function provera(){
        var brGresaka = 0;
        if(!nameAndLastNameReg.test(document.getElementById("firstName").value)){
            fromBetterToWorse("firstName")
            brGresaka++;
        }
        else{
            fromWorseToBetter("firstName");
        }
        if(!nameAndLastNameReg.test(document.getElementById("inputLastName").value)){
            fromBetterToWorse("inputLastName")
            brGresaka++;
        }
        else{
            fromWorseToBetter("inputLastName");
        }
        if(!emailReg.test(document.getElementById("inputEmail4").value)){
            fromBetterToWorse("inputEmail4")
            brGresaka++;
        }
        else{
            fromWorseToBetter("inputEmail4");
        }
        if(!passwordReg.test(document.getElementById("inputPassword4").value)){
            fromBetterToWorse("inputPassword4")
            brGresaka++;
        }
        else{
            fromWorseToBetter("inputPassword4");
        }
        if(!adressReg.test(document.getElementById("inputAddress").value)){
            fromBetterToWorse("inputAddress")
            brGresaka++;
        }
        else{
            fromWorseToBetter("inputAddress");
        }
        if(!cityReg.test(document.getElementById("inputCity").value)){
            fromBetterToWorse("inputCity")
            brGresaka++;
        }
        else{
            fromWorseToBetter("inputCity");
        }
        if(document.getElementById("inputState").value == 0){
            fromBetterToWorse("inputState")
            brGresaka++;
        }
        else{
            fromWorseToBetter("inputState");
        }

        if(brGresaka==0){
            removeClassAndCnt("firstName");
            removeClassAndCnt("inputLastName");
            removeClassAndCnt("inputEmail4");
            removeClassAndCnt("inputPassword4");
            removeClassAndCnt("inputAddress");
            removeClassAndCnt("inputCity");
            removeClassAndCnt("inputState");
            $("#formMessage").show("slow");
            if(document.getElementById("gridCheck").checked==true)
            {
                document.getElementById("formMessage").innerHTML ="";
                document.getElementById("formMessage").innerHTML +=`<p>Uspešna registracija! Obaveštenja ćemo Vam slati na mejl</p>`;
            }
            else{

                document.getElementById("formMessage").innerHTML ="";
                document.getElementById("formMessage").innerHTML +=`<p>Uspešna registracija! Obaveštenja vam neće stizati na mejl</p>`;
            }
            setTimeout(removeRegisterInfo, 3500);
        }
    }
    function removeModalMessage(){
        $("#modalMessage").hide("fast");
    }
    function prepareModal()
    {
        $("#exampleInputEmail1").val("")
        $("#exampleInputPassword1").val("") 
        $("#modalMessage").hide();
    }
    function modalCheck(){

        var exampleEmail = "user@gmail.com";
        var examplePassword = "password123#";
        //ovde dve promenljive su dodate samo za simulaciju korisnika koji postoji u bazi
        if($("#exampleInputEmail1").val()!=exampleEmail||$("#exampleInputPassword1").val()!=examplePassword){
            $("#modalMessage").html(`<p>Ne postoji ovakav registrovani korisnik!</p>`);
            $("#modalMessage").show("fast");
        }
        else{
            $("#exampleInputEmail1").val("");
            $("#exampleInputPassword1").val("");
            $("#modalMessage").html(`<p>Uspešno logovanje!</p>`);
            $("#modalMessage").show("fast");
            setTimeout(removeModalMessage, 3500);
        }
        
    }
    var passwordReg = /^(?=.*[A-ZČĆŠŽĐa-zzzčćšžđ])(?=.*\d)(?=.*[@$!%*#?&])[A-ZČĆŠŽĐa-zčćšžđ\d@$!%*#?&]{8,}$/;
    var emailReg = /^[\w\.]+@[a-zA-Z_]+?(\.[a-zA-Z]{2,3})+$/;
    var nameAndLastNameReg = /^([A-ZČĆŠŽĐ][a-zčćšžđ]+)\s*([A-ZČĆŠŽĐ][a-zčćšžđ]+(\s)*)*$/;
    var adressReg = /^([A-ZČĆŠŽĐ][a-zčćšžđ]+)\s*([A-ZČĆŠŽĐa-zčćšžđ][a-zčćšžđ]+(\s)*)*[0-9]+([/][0-9])*$/;
    var cityReg = /^([A-ZČĆŠŽĐ][a-zčćšžđ]+)\s*([A-ZČĆŠŽĐa-zčćšžđ][a-zčćšžđ]+(\s)*)*$/;

    document.getElementById("formButton").addEventListener("click", provera);
    document.getElementById("modalButton").addEventListener("click", modalCheck);
    document.getElementById("loginButton").addEventListener("click", prepareModal);

    ispisiHeader();
    ispisiFooter();

}
if((window.location.pathname).includes("contact")){

    window.onload = document.getElementById("message").value="";

    ispisiHeader();
    ispisiFooter();
    var emailReg = /^[\w\.]+@[a-zA-Z_]+?(\.[a-zA-Z]{2,3})+$/;
    var nameAndLastNameReg = /^([A-ZČĆŠŽĐ][a-zčćšžđ]+)\s+([A-ZČĆŠŽĐ][a-zčćšžđ]+(\s)*)+$/;
    var classes = ["fas fa-location-arrow", "mr-4 fas fa-map-marked-alt", " mr-4 far fa-clock", " fas fa-phone mr-3", " fas fa-envelope mr-3"];
    var cnt = ["Rudnička 1, Beograd","Milana Rakića 77, Beograd", "06:00 do 23:00", '<a class=" text-dark" href="tel:+38114095284">+381 11 40 95 284</a>', '<a href="mailto:info@nonstopfitness.rs">info@nonstopfitness.rs</a>'];
    var txt = '<ul class="p-0">';
    for(var i = 0;i<classes.length;i++){
        txt+=`<li class="py-3 cntLi">
                <span class="${classes[i]}"></span>&nbsp;&nbsp;${cnt[i]}
                </li>`
    }
    txt += '</ul>'
    document.getElementById("contactInfo").innerHTML+=txt;
    $('.cntLi:even').addClass("zebra");
    var max = 300;
    $('#message').keydown(function(e) {
        if(e.which==8){
            if(!this.value.length==0)
            $('#textareaHelp').text(`Mozete uneti jos ${max-this.value.length+1} karaktera, polje ne sme biti prazno`);
        }
        else{
            $('#textareaHelp').text(`Mozete uneti jos ${max-this.value.length-1} karaktera, polje ne sme biti prazno`);
            if (this.value.length == max) {
            $('#textareaHelp').text(`Mozete uneti jos ${max-this.value.length} karaktera, polje ne sme biti prazno`);
            e.preventDefault();
            } 
            else if (this.value.length >= max) {
            this.value = this.value.substring(0, max);
            }
        }
    });

    function removeInfo(){
        $("#sendingMessage").hide("slow");
    }

    function proveraPoruke(){
        var greske = 0;
        if(!emailReg.test(document.getElementById("email").value)){
            greske++;
            document.getElementById("email").classList.remove("alert-success");
            document.getElementById("email").classList.add("alert-danger");
        }
        else{
            document.getElementById("email").classList.remove("alert-danger");
            document.getElementById("email").classList.add("alert-success");
        }
        if(!nameAndLastNameReg.test(document.getElementById("fullName").value)){
            greske++;
            document.getElementById("fullName").classList.remove("alert-success");
            document.getElementById("fullName").classList.add("alert-danger");
        }
        else{
            document.getElementById("fullName").classList.remove("alert-danger");
            document.getElementById("fullName").classList.add("alert-success");
        }
        if(document.getElementById("message").value.length==0){
            greske++;
            document.getElementById("message").classList.remove("alert-success");
            document.getElementById("message").classList.add("alert-danger");
        }
        else{
            document.getElementById("message").classList.remove("alert-danger");
            document.getElementById("message").classList.add("alert-success");
        }

        if(greske==0){
            document.getElementById("email").classList.remove("alert-success");
            document.getElementById("fullName").classList.remove("alert-success");
            document.getElementById("message").classList.remove("alert-success");
            document.getElementById("email").classList.remove("alert-danger");
            document.getElementById("fullName").classList.remove("alert-danger");
            document.getElementById("message").classList.remove("alert-danger");
            document.getElementById("email").value = "";
            document.getElementById("fullName").value = "";
            document.getElementById("message").value = "";
            $('#textareaHelp').text(`Mozete uneti jos 300 karaktera, polje ne sme biti prazno`);
            $('#sendingMessage').html(`<p>Vaša poruka je uspešno poslata</p>`);
            $("#sendingMessage").show("slow");
            setTimeout(removeInfo, 3500);

        }
    }

    document.getElementById("emailButton").addEventListener("click", proveraPoruke);
}
if((window.location.pathname).includes("author")){
    var classes = ["fa fa-graduation-cap", "mr-4 fa fa-book", "fa fa-id-card", "fa fa-code", "fa fa-gamepad",  " fas fa-phone mr-3", " fas fa-envelope mr-3"];
    var cnt = ['Završio Elektrotehničku školu "Nikola Tesla" u Beogradu, 2021. godine',"Trenutno studiram na Visokoj ICT", "Broj indeksa - 4/21","Imam ljubav prema programiranju, posebno prema C# jeziku", "Od hobija volim igranje igrica, teretanu kao i učestvovanje u pub kvizovima znanja",  '<a class=" text-dark" href="tel:+381637621700">+381 63 76 21 700</a>', '<a href="mailto:stefan.eric.4.21@gmail.ict.edu.rs">stefan.eric.4.21@gmail.ict.edu.rs</a>'];
    var txt = '<ul class="p-0" id="authorList">';
    for(var i = 0;i<classes.length;i++){
        txt+=`<li class="py-3 cntLi">
                <span class="${classes[i]}"></span>&nbsp;&nbsp;${cnt[i]}
                </li>`
    }
    txt += '</ul>'
    txt += '<a class="btn btn-primary mt-2" target="_blank" href="https://ericstefan02.github.io/stefaneric.github.io/portfolio/" role="button">Moj portfolio za više informacija</a>'
    document.getElementById("authorInfo").innerHTML+=txt;
    document.getElementById("authorList").style.listStyleType = "none";
    $('.cntLi:even').addClass("zebra");
    ispisiHeader();
    ispisiFooter();
    
}


