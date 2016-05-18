var submit = function() {
    var payload = {
        email: $('#email').val(),
        password: $('#password').val()
    };
    $.ajax({
        url: '/authenticate',
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
    $('#go').click(function (e) {
        console.log('Go button clicked');
        e.preventDefault();
        submit();
    });
});