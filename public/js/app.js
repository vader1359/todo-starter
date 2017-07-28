
const sortedContainers = sortable(".js-sortable-items", {
  forcePlaceholderSize: true,
  connectWith: ".connected"
});

const sortedListsContainers = sortable(".js-sortable-lists", {
});

// I need to send an Array of Id and an array of List name to back end

var listOrderAjaxSubmit = function(event) {
  console.log($("event.target"))
  // event.preventDefault();
  var listNames = [];
  $names = $.each($(".list-header"), function(index, value) {
    // Remember this, the data must be put as the format of an Array of JavaScript Objects, so it can be loaded
    listNames.push({
      name: "names[]",
      value: value.innerText
    })
  })
  console.log("LISTNAME", listNames)
  
  
  $.ajax({
    url: "/change_lists_order",
    method: "POST",
    data: listNames,
    
    success: function(data) {
      console.log("Submission was successful.")
    },
    error: function(data) {
      console.log("An error occurred.");
    } 
  })
  
  
  
}

var itemsAjaxSubmit = function(event) {
  event.preventDefault();
  // console.log("Two forms should be here");
  $currentForm = $(event.target);
  console.log(event.target);
  // console.log($currentForm);
  
  data = $currentForm.serializeArray();
  // console.log("ajax data", data);
  
  console.log(data)

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
    // Easy way first
    $.each($("form.update-all-items"), function(index, value) {
      $(value).submit();
      console.log(`"VALUE": ${value}`)
      
    })
    
    // HARDWAY, CHECK THE START PARENT, END PARENT TO HANDLE STUFFS
  });
});

sortedListsContainers.forEach(function(element) {
  element.addEventListener("sortupdate", function(e) {
    listOrderAjaxSubmit()
  })
})


$("form.update-all-items").on("submit", itemsAjaxSubmit);









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




