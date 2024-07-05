$(document).ready(function() {
    $('#loginForm').on('submit', function(e) {
        e.preventDefault();
        
        var username = $('#username').val();
        var password = $('#password').val();

        $('#loader').removeClass('hidden');

        $.ajax({
            url: 'login.php',
            type: 'POST',
            data: {
                username: username,
                password: password
            },
            dataType: 'json',
            success: function(response) {
                if (response.success) {
                    window.location.href = 'interface.html';
                } else {
                    alert('Login failed: ' + response.message);
                }
            },
            error: function() {
                alert('An error occurred. Please try again.');
            },
            complete: function() {
                $('#loader').addClass('hidden');
            }
        });
    });
});