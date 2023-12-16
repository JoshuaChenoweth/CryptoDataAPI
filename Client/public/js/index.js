window.addEventListener("keydown", checkKeyPressed, false);

function checkKeyPressed(evt) {
    if (evt.keyCode == "32") {
        window.location.replace("/home");
    }
}
/*CHecks to see if the keydown event of key number 32 (spacebar) is pressed.
if it is the user is redirected to the home page.*/