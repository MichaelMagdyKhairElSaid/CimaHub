let movieArray = [];
let valideNameFlag =false;
let valideEmailFlag =false;
let validePhoneFlag =false;
let valideAgeFlag =false;
let validePassFlag =false;
let valideRePassFlag =false;

let trendingURL= 'https://api.themoviedb.org/3/trending/all/day?api_key=eba8b9a7199efdcb0ca1f96879b83c44';
let latestURL ="https://api.themoviedb.org/3/movie/latest?api_key=eba8b9a7199efdcb0ca1f96879b83c44";
let popularURL ="https://api.themoviedb.org/3/movie/popular?api_key=eba8b9a7199efdcb0ca1f96879b83c44";
let topratedURL ="https://api.themoviedb.org/3/movie/top_rated?api_key=eba8b9a7199efdcb0ca1f96879b83c44";
let upcomingURL="https://api.themoviedb.org/3/movie/upcoming?api_key=eba8b9a7199efdcb0ca1f96879b83c44";
$('#movieCat .category').click(function (e) {
console.log($(e.target).attr("data-Category"));
let URL = $(e.target).attr("data-Category")
console.log(`URL`+URL);
switch (URL) {
   case "trendingURL":
   getMovies(trendingURL)
      break;
   case "latestURL":
   getMovies(latestURL)
      break;
   case "popularURL":
   getMovies(popularURL)
      break;
   case "topratedURL":
   getMovies(topratedURL)
      break;
   case "upcomingURL":
   getMovies(upcomingURL)
      break;
}
})
async function getMovies(URL) {
let response = await fetch(URL ? URL :'https://api.themoviedb.org/3/trending/all/day?api_key=eba8b9a7199efdcb0ca1f96879b83c44')
let finalResult = await response.json();
movieArray = finalResult.results
displayData(movieArray)
}
getMovies();


function displayData(Array){
let Box = ``
for (let i = 0; i < Array.length; i++) {
   Box +=`
   <div class="col-md-4">
          <div class="movie position-relative">
            <img src="${"https://image.tmdb.org/t/p/w500"+Array[i].poster_path ?"https://image.tmdb.org/t/p/w500"+Array[i].poster_path : "test images/qNBAXBIQlnOThrVvA6mA2B5ggV6.jpg" }" alt="" class="img-fluid">
            <div class="imageOverlay ">
              <div id="movieCaption">
                <h3>${Array[i].title ?Array[i].title : Array[i].name}</h3>
                <p>${Array[i].overview }</p>
                <p>rate ${Array[i].vote_average}</p>
                <p>${Array[i].release_date ?Array[i].release_date :Array[i].first_air_date}</p>
              </div>

            </div>
          </div>
        </div>
   `
   $("#movieDiv").html(Box)
}
}
$('#getMovies').on('input', function() {
   let word = $('#getMovies').val();
   let MovieByWord ="https://api.themoviedb.org/3/search/movie?query="+word+"&api_key=eba8b9a7199efdcb0ca1f96879b83c44&language=en-US&include_adult=false"
   getMovies(MovieByWord)
   })
$('#word').on('input', function() {
   let word = $('#word').val();
   let MovieByWord ="https://api.themoviedb.org/3/search/movie?query="+word+"&api_key=eba8b9a7199efdcb0ca1f96879b83c44&language=en-US&include_adult=false"
   getMovies(MovieByWord)
   })

// function searchByName(term , array) {
// let inputVal = $('allMovies').val()
// let foundedMovies = []
// for (let i = 0; i < array.length; i++) {
// if (array[i].title.toLowerCase().includes(term.toLowerCase())==true) {
// console.log(`founded`,i)
// foundedMovies.push(array[i])
// }
// }
// }


// regex section
$('#name').change(validateName)
function validateName() {
let regex=/^[A-Z][a-z]{1,}/s;
if(regex.test($('#name').val())){
   $('#namealert').addClass('d-none')
   valideNameFlag = true;
}else{
   $('#namealert').removeClass('d-none')
   valideNameFlag = false;
}
}

$('#email').change(validateEmail)
function validateEmail() {
let regex=/[@](gmail\.com)$/s;

if(regex.test($('#email').val())){
   $('#emailalert').addClass('d-none')
   valideEmailFlag = true;
}else{
   $('#emailalert').removeClass('d-none')
   valideEmailFlag = false;
}
}

$('#phone').change(validatePhone)
function validatePhone() {
let regex=/^(012|015|010|011)[0-9]{8}$/s;
if(regex.test($('#phone').val())){
   $('#phonealert').addClass('d-none')
   validePhoneFlag = true;
}else{
   $('#phonealert').removeClass('d-none')
   validePhoneFlag = false;
}
}

$('#age').change(validateAge)
function validateAge() {
let regex=/^([2-8][0-9]|[1][8-9])$/s;
if(regex.test($('#age').val())){
   $('#agealert').addClass('d-none')
   valideAgeFlag = true;
   console.log(`ok`);
}else{
   $('#agealert').removeClass('d-none')
   valideAgeFlag = false;
   console.log(`not ok`);
}
}

$('#password').change(validatePassword)
function validatePassword() {
let regex=/(?=^.{8,15}$)(?=.*[A-Za-z])(?=.*\d)/sg;
if(regex.test($('#password').val())){
   $('#passwordalert').addClass('d-none')
   validePassFlag = true
}else{
   $('#passwordalert').removeClass('d-none')
   validePassFlag = false;
}
}

$('#rePassword').change(validateRePasswprd)
function validateRePasswprd(){
   console.log($('#password').val() == $('#rePassword').val());
if($('#password').val() == $('#rePassword').val()){
   $('#repasswordalert').addClass('d-none')
   valideRePassFlag = true
}else{
   $('#repasswordalert').removeClass('d-none')
   valideRePassFlag =false
}

if (valideAgeFlag && valideEmailFlag &&  valideNameFlag && validePassFlag && valideRePassFlag && validePhoneFlag) {
   $('#submitBtn').removeAttr('disabled')
}else{
   $('#submitBtn').attr('disabled')
}
}

$('#submitBtn').click(function () {
   console.log(valideAgeFlag);
   console.log(valideEmailFlag);
   console.log(valideNameFlag);
   console.log(validePassFlag);
   console.log(valideRePassFlag);
   if (valideAgeFlag && valideEmailFlag &&  valideNameFlag && validePassFlag && valideRePassFlag) {
      $('#submitBtn').removeAttr('disabled')
   }else{
      $('#submitBtn').attr('disabled')
   }
})

// $("#showSideBarBtn").click(function () {
//    $('#sideBar').hide(4000);
//    // $('#sideBar').toggle(4000);
//    // $('#sideBar').(4000);
// })

//============ callback===========
$("#showSideBarBtn").click(function() {
   $("#close").toggleClass("d-none")
   $("#open").toggleClass("d-none")
   $("#movieCat").animate({top:'200px',opacity:'0'},500)
   // $("#showSideBarBtn").slideUp(1500,function() {
      //    $('#sideBar').slideUp(1000);
      // })
      // ======== chain =========
      // $('#showSideBarBtn').slideUp(1000).fadeIn(1000).hide(1000)
      // ======== animation =========
      let sidebarLeftPos = $('#sideBarContent').outerWidth(true);
      console.log(sidebarLeftPos);
      if ($("#sideBar").css("left") == "0px") {
         // on closing
      $('#sideBar').animate({left: -sidebarLeftPos},500,function() {
         $("#movieCat").animate({top:'200px',opacity:'0'},500)
      })
      
   }else{
      $('#sideBar').animate({left: "0px"},500,function() {
         $("#movieCat").animate({top:'0',opacity:'1'},1000)
        
      })
      
      }
})
// // image overlay animation 
//    $(".movie").mouseenter(function() {
//     $(".imageOverlay").css({top : "0px"})     
// })