$(".list-item").click(function(e) { console.log("you clicked me", e) })
$("input.add-item").on("click", function(e) { 
    console.log("you're typing in...", e.target)
})

var addItemFn = function(event) {
    console.log("submitting the form", event.target);
    event.preventDefault();
    // use $variable style to hint that this is a jQuery element
    $currentForm = $(event.target); // wrap jQuery around the form element
    console.log($currentForm);
    
    
    data = $currentForm.serializeArray(); // convert values from <input> to an array of hash
    console.log("ajax with data", data);
    // submit manually
    $.ajax({
        url: $currentForm.attr("action"), // get "action" attribute from the form element
        method: $currentForm.attr("method"), // get "method" attribute from the form element
        data: data // submitting the array of input name/value hash
    });
};


var addAll = function(event) {
    console.log("Submitting all forms", event.target);
    $.each($("form.new-item"), function(index, value) {
        value.submit();
    })
}


$(".save-all").click(addAll);

$("form.new-item").on("submit", addItemFn)   





// $("input.add-item").on("keyup", function(e) {
    //   console.log("input: ", $(this).val())
    // })
    
    
    
    