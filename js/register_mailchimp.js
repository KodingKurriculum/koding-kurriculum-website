$(function() {

    $("#contributeForm input").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {
            // additional error messages or events
        },
        submitSuccess: function($form, event) {
            // Prevent spam click and default submit behaviour
            $("#sign-up").attr("disabled", true);
            event.preventDefault();

            // get values from FORM
            var name = $("input#name").val().split(/\s+/);
            var email = $("input#email").val();
            var firstName = ''; // For Success/Failure Message
            var lastName = ''; // For Success/Failure Message

            // Check for white space in name for Success/Fail message
            if (name.indexOf(' ') >= 0) {
                firstName = name.slice(0, -1).join(' ');
                lastName = name.pop();
            } else {
                firstName = name;
            }
            $.ajax({
                url: "http://kodingkurriculum.us16.list-manage.com/subscribe/post-json?u=28661a979688cf6645769038e&amp;id=5ee3164873&c=?",
                type: "POST",
                dataType    : 'jsonp',
                contentType: "application/json; charset=utf-8",
                data: {
                    FNAME: firstName,
                    LNAME: lastName,
                    EMAIL: email
                },
                cache: false,
                success: function() {
                    // Enable button & show success message
                    $("#sign-up").attr("disabled", false);
                    $('#success').html("<div class='alert alert-success'>");
                    $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#success > .alert-success')
                        .append("<strong>Thank you for signing up with Koding Kurriculum! Almost finished... To verify your address, please click the link in the email we just sent you.</strong>");
                    $('#success > .alert-success')
                        .append('</div>');

                    //clear all fields
                    $('#contributeForm').trigger("reset");
                },
                error: function() {
                    // Fail message
                    $('#success').html("<div class='alert alert-danger'>");
                    $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#success > .alert-danger').append("<strong>Sorry " + firstName + " " + lastName + ", it seems that our registration is not responding. Please try again later!");
                    $('#success > .alert-danger').append('</div>');
                    //clear all fields
                    $('#contributeForm').trigger("reset");
                },
            });
        },
        filter: function() {
            return $(this).is(":visible");
        },
    });

    $("a[data-toggle=\"tab\"]").click(function(e) {
        e.preventDefault();
        $(this).tab("show");
    });
});

// When clicking on Full hide fail/success boxes
$('#name').focus(function() {
    $('#success').html('');
});
