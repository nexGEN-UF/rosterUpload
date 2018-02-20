
var submit = function() {
    var studentToSubmit = {};

    var elements = document.getElementById("student_form").elements;

    for(var i=0; i < elements.length; i++) {
        var element = elements[i];
        studentToSubmit[element.id] = {
            value: element.value,
            checked: element.checked
        }
    }

    console.log(studentToSubmit);
    
    $.ajax({
        url: '/submit',
        dataType: 'json',
        type: 'post',
        contentType: 'application/json',
        data: JSON.stringify(studentToSubmit),
        success: function( data, textStatus, jQxhr ){
            console.log(data)
            return data;
        },
        error: function( jqXhr, textStatus, errorThrown ){
            //console.log( errorThrown );
        }
    });
}