var login = function() {
    var payload = {
        p_firstname: $('#p_firstname').val(),
        p_lastname: $('#p_lastname').val(),
        email: $('#email').val(),
        password: $('#password').val()
    };
    $.ajax({
        url: '/player/save',
        type: 'GET',
        contentType: "json",
        data: payload,
        complete: function(data) {
            $('#message').html(data.responseJSON.message);
            $('#message').show();
        }
    })
}

$(document).ready(function() {
    $('#submit').click(function (e) {
        console.log('Submit clicked');
        e.preventDefault();
        login();
    });
});