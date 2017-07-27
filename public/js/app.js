
const sortedContainers = sortable(".js-sortable-items", {
  forcePlaceholderSize: true,
  connectWith: ".connected"
});

const sortedListsContainers = sortable(".js-sortable-lists", {
  // forcePlaceholderSize: ,
});

// I need to send an Array of Id and an array of List name to back end

var listOrderAjaxSubmit = function(event) {
  event.preventDefault();
  var listNames = [];
  $listName = $.each($(".list-header"), function(index, value) {
    listNames.push(value.innerText)
  })
  console.log(listNames)
}

var itemsAjaxSubmit = function(event) {
  event.preventDefault();
  // console.log("Two forms should be here");
  $currentForm = $(event.target);
  console.log(event.target);
  // console.log($currentForm);
  
  data = $currentForm.serializeArray();
  console.log("ajax data", data);
  
  $.ajax({
    url: $currentForm.attr("action"),
    method: $currentForm.attr("method"),
    data: data,
    success: function(data) {
      // console.log("Submission was successful.", data)
    },
    error: function(data) {
      // console.log("An error occurred.", data);
    } 
  })
}




sortedContainers.forEach(function(element) {
  
  element.addEventListener("sortupdate", function(e) {
    
    $.each($("form.update-all"), function(index, value) {
      $(value).submit();
      
    })
  });
});


$("form.update-all").on("submit", itemsAjaxSubmit);







/*

This event is triggered when the user stopped sorting and the DOM position has changed.

e.detail.item contains the current dragged element.
e.detail.index contains the new index of the dragged element (considering only list items)
e.detail.oldindex contains the old index of the dragged element (considering only list items)
e.detail.elementIndex contains the new index of the dragged element (considering all items within sortable)
e.detail.oldElementIndex contains the old index of the dragged element (considering all items within sortable)
e.detail.startparent contains the element that the dragged item comes from
e.detail.endparent contains the element that the dragged item was added to (new parent)
e.detail.newEndList contains all elements in the list the dragged item was dragged to
e.detail.newStartList contains all elements in the list the dragged item was dragged from
e.detail.oldStartList contains all elements in the list the dragged item was dragged from BEFORE it was dragged from it
*/




