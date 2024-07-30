const clickMe = () => {
    alert("Thanks for clicking me. Hope you have a nice day!")
}
$(document).ready(function () {
    // $('.materialboxed').materialbox();
    $('#clickMeButton').click(() => {
        // clickMe();
        $.ajax({
            url: "addTwoNumber?n1=9&n2=8", success: function (result) {
                alert(result.data);
            }
        });
    })
});