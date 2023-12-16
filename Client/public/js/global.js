
var homeButton = document.getElementById("Home");
var portfolioButton = document.getElementById("Portfolio");
var detailsButton= document.getElementById("Details");
var indexButton= document.getElementById("index");
var loginButton = document.getElementById("Submit");
/* these specifiers get the ID of the buttons we created in the HTML page
using ID's than designate them to a variable*/


function handleDetailsButtonClick() {
    window.location.replace("/detail");
}
function handleLoginButtonClick() {
    window.location.replace("/home");
}
function handleHomeButtonClick() {
    window.location.replace("/home");
}

function handlePortfolioButtonClick() {
    window.location.replace("/portfolio");
}


function handleIndexButtonClick() {
    window.location.replace("/login");
}

/*These four segments above redirect the user to a specific page depending upon which button they clicked.*/


homeButton.onclick = handleHomeButtonClick;
portfolioButton.onclick = handlePortfolioButtonClick;



/*Calls the onclick functions based off of the pressed button*/