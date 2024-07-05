$(document).ready(function() {
    fetchTopics();

    $('#messageForm').on('submit', function(e) {
        e.preventDefault();
        
        var formData = {
            topic: $('#topic').val(),
            title: $('#title').val(),
            body: $('#body').val(),
            sound: $('#sound').val(),
            clickAction: $('#clickAction').val(),
            dataPayload: $('#dataPayload').val(),
            priority: $('#priority').val(),
            ttl: $('#ttl').val(),
            imageUrl: $('#imageUrl').val()
        };

        $('#loader').removeClass('hidden');

        $.ajax({
            url: 'php/send_message.php',
            type: 'POST',
            data: formData,
            dataType: 'json',
            success: function(response) {
                if (response.success) {
                    alert('Message sent successfully!');
                    $('#messageForm')[0].reset();
                } else {
                    alert('Failed to send message: ' + response.message);
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

function fetchTopics() {
    $('#loader').removeClass('hidden');

    $.ajax({
        url: 'php/get_topics.php',
        type: 'GET',
        dataType: 'json',
        success: function(response) {
            if (response.success) {
                var topicSelect = $('#topic');
                topicSelect.empty().append('<option value="">Select a topic</option>');
                $.each(response.topics, function(i, topic) {
                    topicSelect.append($('<option></option>').val(topic).text(topic));
                });
            } else {
                alert('Failed to fetch topics: ' + response.message);
            }
        },
        error: function() {
            alert('An error occurred while fetching topics. Please refresh the page.');
        },
        complete: function() {
            $('#loader').addClass('hidden');
        }
    });
}