
 /*
* Top Navigation Bar
*/
function topnavBurger() {
    var x = document.getElementById("topnav");
    if (x.className === "main-nav") {
        x.className += " responsive";
    } else {
        x.className = "main-nav";
    }
}

/*
* Side Navigation Bar
*/
// To check that event gets added only one time for Dropdown buttons or otherwise conflict will occur
var dropdownbutton = false;
function openNav() {
    document.getElementById("mySidenav").style.width = "20vw";
    document.getElementById("topnav-bar").style.marginLeft="20vw";
    document.getElementById("topnav-bar").style.transition= "margin-left 0.5s";
    document.getElementById("main").style.marginLeft = "20vw";
    document.getElementById("user-menu").style.display="none";
    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
    /*
* Dropdown in Side Navigation Bar
*/
/* Loop through all dropdown buttons to toggle between hiding and showing its dropdown content.
 - This allows the user to have multiple dropdowns without any conflict */
 var dropdown = document.getElementsByClassName("dropdown-btn");
 var i;
 if(dropdownbutton===false){
    for (i = 0; i < dropdown.length; i++) {
        dropdown[i].addEventListener("click", function() {
            this.classList.toggle("active");
            var dropdownContent = this.nextElementSibling;
            if (dropdownContent.style.display === "block") {
            dropdownContent.style.display = "none";
            } else {
            dropdownContent.style.display = "block";
            }
        });
    }
    dropdownbutton=true;
}
}

//close side Navigation
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("topnav-bar").style.marginLeft="0vw";
    document.getElementById("topnav-bar").style.transition= "margin-left 0.5s";
    document.getElementById("user-menu").style.display="inline";
    document.getElementById("main").style.marginLeft= "0";
    document.body.style.backgroundColor = "white";
}
