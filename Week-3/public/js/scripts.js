document.getElementById("contactForm").addEventListener("submit", function (event) {
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var message = document.getElementById("message").value;
    console.log("Name: " + name);
    console.log("Email: " + email);
    console.log("Message: " + message);
    alert("Thanks for submitting your message. We will get back to you soon!");
});