//Settings-icon & settings-box ...add... 1-calss spin on icon // 2-class open on settings-box

document.querySelector(".settings-icon .icon").onclick = function(){
    this.classList.toggle("fa-spin");
    document.querySelector(".settings-box").classList.toggle("open");
}

//########################################## function to handle active state

function handleActive(ev){
    //remove active class from all span
    ev.target.parentElement.querySelectorAll(".active").forEach(function(childElement){
        childElement.classList.remove("active");
    });
    //add active class on the same target or the same span
    ev.target.classList.add("active")
}

//################################################################# colorOptions

// // check if there is local storage liColorOption 
let liColorOptionInLs = localStorage.getItem("liColorOption");
//switch colors
const licolors = document.querySelectorAll(".colors-list li"); 

licolors.forEach(function(liColor) {
    liColor.addEventListener("click", function(ev) {

        let colorData = ev.target.dataset.color;  //fetch the custom-color of li

        document.querySelector(":root").style.setProperty('--main-color' , colorData);

        localStorage.setItem("liColorOption" , colorData);  //set color on local storge

        handleActive(ev);
    });
});
if(liColorOptionInLs !== null){

    document.querySelector(":root").style.setProperty('--main-color' , liColorOptionInLs);
    document.querySelectorAll(".colors-list li").forEach(function(liColor){

        //remove active class from all lis
        liColor.classList.remove("active");

        //add active class on li wich has (data-color === liColorOptionInLs)
        if(liColor.dataset.color === liColorOptionInLs){ 
            liColor.classList.add("active");
        };
    });
}

//####################################################################### Random Background

// check if there is local storage bgImgOption
let bgImgOptionInLs = localStorage.getItem("bgImgOption");
let bgnowInLs = localStorage.getItem("bgnow");

//random background option (yes or no)
let bgOption = true ;
//variable to control the setInteval
let bgInterval;
if(bgImgOptionInLs !== null){

    if(bgImgOptionInLs === 'true'){
        bgOption = true;
    }else{
        bgOption = false;
    }

    document.querySelector(".sec-1-landing").style.setProperty('background' , bgnowInLs);

    // toggle active class between Yes & No
    document.querySelectorAll(".random-backgrounds span").forEach(function(bgImageSpan){

        bgImageSpan.classList.remove("active");

        if(bgImgOptionInLs === 'true'){ 
            document.querySelector(".random-backgrounds .yes").classList.add("active");
        }else{
            document.querySelector(".random-backgrounds .no").classList.add("active");
        }
    });
}
//switch Random-Background option Yes or No (just active or no)
const randomBgElement  = document.querySelectorAll(".random-backgrounds span");
randomBgElement.forEach(function(bgImageSpan) {

    bgImageSpan.addEventListener("click", function(ev) {

        handleActive(ev);
        
        if(ev.target.dataset.bg === 'yes'){
            bgOption = true;
            ranbomizeImgs();
            localStorage.setItem("bgImgOption" , true);
        }
        else{
            bgOption = false;
            clearInterval(bgInterval);
            localStorage.setItem("bgImgOption" , false);
        }
    });
});

//slider of background landding page
let landing = document.querySelector(".sec-1-landing");
let imgsArray = ["bg1.jpg" , "bg2.jpg" , "bg3.jpg" , "bg4.jpg" , "bg5.jpg" , "bg6.jpg"];
function ranbomizeImgs() {
    if(bgOption === true) {
        bgInterval = setInterval(function(){
            let randomNumber = Math.floor(Math.random() * imgsArray.length);
            let landingBg = landing.style.backgroundImage = 'url("images/se1-1-img/'+ imgsArray[randomNumber] +'")';
            localStorage.setItem("bgnow" , landingBg);
            landing.style.transition="1s";
        },2000);
    }
}
ranbomizeImgs();

//########################################################### Slills

window.onscroll = function(){
    let ourSklills = document.querySelector(".sec-3-skills");

    let skillsOffsetHeight = ourSklills.offsetHeight;
    let windowScrollTop = this.scrollY;

    let allSkills = document.querySelectorAll(".sec-3-skills div.container .skill-box .skill-progress span");

    if(windowScrollTop > skillsOffsetHeight){
        allSkills.forEach(function(skill){
            skill.style.width = skill.dataset.progress; // this function will be excuted when scroll just get to span
        });
    }
    else{
        allSkills.forEach(function(skill){
            skill.style.width = 0;
        });
    };

};

//################################################################### Gallery

//create popup with the img
let ourGallery = document.querySelectorAll(".sec-4-gallery img");

ourGallery.forEach(function(image){
    image.addEventListener('click', function(){

        //create overlay element
        let overlay = document.createElement("div");
        overlay.className = 'popup-overlay';
        document.body.appendChild(overlay);

        //create popup
        let popupBox = document.createElement("div");
        popupBox.className = 'popup-box'

        if(image.alt !== null){
            // create heading
            let imgHeading = document.createElement("h3");
            let imgText = document.createTextNode(image.alt);
            imgHeading.appendChild(imgText);
            popupBox.appendChild(imgHeading)
        }

        //create the image
        let popupImg = document.createElement("img");
        popupImg.src = image.src;
        popupBox.appendChild(popupImg);
        document.body.appendChild(popupBox);

        //creat close span
        let closeButton = document.createElement("span");
        let closeButtonText = document.createTextNode("X");
        closeButton.appendChild(closeButtonText);
        closeButton.className = 'close-button';
        popupBox.appendChild(closeButton);
    });
});
// close the current popup 
document.addEventListener("click", function(ev){
    if(ev.target.className == 'close-button'){

        document.querySelector(".popup-box").remove();
        document.querySelector(".popup-overlay").remove();
    }
});

//#######################################################  reset button
document.querySelector(".reset-options").onclick = function(){
    localStorage.removeItem("liColorOption" , "bgImgOption" , "bgnow");
    window.location.reload();
}
// ###################################################### form validation
let uname = document.getElementById("uname");
let emailNoVlue = document.getElementById("email");
let phone = document.getElementById("phone");
let password = document.getElementById("pass");
let text = document.getElementById("text");

// ************
function showSuccess(element) {
    element.style.display = "block";
    element.innerText = "success";
    element.style.color = "#008000";
}
function showError(element, message) {
    element.style.display = "block";
    element.innerText = message;
    element.style.color = "#ff0000";
}
// ***********

document.forms[0].addEventListener('submit', function (e) {

    // Validat Name
    let uname = document.getElementById("uname");
    let errorName = document.getElementById("errorName");
    if (uname.value.length > 3 && uname.value.trim() !== "") {
        showSuccess(errorName);
        uname.classList.add("borderSucsess");
    } else {
        showError(errorName, "UserName less than 3 letters");
        uname.classList.add("borderError");
        e.preventDefault();
    }

    // Validat Email
    let email = document.getElementById("email").value;
    let emailNoVlue = document.getElementById("email");
    let errorEmail = document.getElementById("errorEmail");
    if (email.trim().toLowerCase() !== "" && email.length > 8 && email.indexOf("@") > 2 && email.lastIndexOf("@") == email.indexOf("@") && (email.lastIndexOf(".") - email.lastIndexOf("@")) > 3 &&
        (email.length - email.lastIndexOf(".")) > 3) {
        showSuccess(errorEmail);
        emailNoVlue.classList.add("borderSucsess");
    } else {
        showError(errorEmail, "Email invalid");
        email.classList.add("borderError");
        e.preventDefault();
    }

    // Validat Phone
    let phone = document.getElementById("phone");
    patternPhone = /^01(0|1|2|5)[0-9]{8}$/;
    let errorPhone = document.getElementById("errorPhone");

    if (phone.value.match(patternPhone) && phone.value.trim() !== "") {
        showSuccess(errorPhone);
        phone.classList.add("borderSucsess");
    } else {
        showError(errorPhone, "Phone number invalid");
        phone.classList.add("borderError");
        e.preventDefault();
    }

    // Validat Password
    let password = document.getElementById("pass");
    let errorPass = document.getElementById("errorPass");

    if (password.value.length >= 6 && password.value.trim() !== "") {
        showSuccess(errorPass);
        password.classList.add("borderSucsess");
    } else {
        showError(errorPass, "password invalid");
        password.classList.add("borderError");
        e.preventDefault();
    }

    // Validat Texterea
    let text = document.getElementById("text");
    let errorText = document.getElementById("errorText");

    if (text.value.length >= 5 && text.value.trim() !== "") {
        showSuccess(errorText);
        text.classList.add("borderSucsess");
    } else {
        showError(errorText, "texterea invalid");
        text.classList.add("borderError");
        e.preventDefault();
    }
});
