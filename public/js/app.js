// Configure the sortContainers
const sortedContainers = sortable(".js-sortable-items", {
  forcePlaceholderSize: true,
  connectWith: ".connected"
});

// Create Ajax Submit for forms

// Sending List Order


// Sending all items of a list 
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

// Use the Event to send the form via Ajax

// Sortable event for sending a list

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

$("form.update-all-items").on("submit", itemsAjaxSubmit);

// Sort event for sending list order

const sortedListsContainers = sortable(".js-sortable-lists", {
});



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

sortedListsContainers.forEach(function(element) {
  element.addEventListener("sortupdate", function(e) {
    listOrderAjaxSubmit()
  })
})




// Handling Add a new List

var addNewListAjaxSubmit = function(event) {
  event.preventDefault();
  $currentForm = event.target;
  var new_id = 1 + parseInt($($(".list").last().children().children()[0]).val())
  new_list_name = $($(".add-list")[0][1]).val()
  
 
  
  $(".showing-list").append(
    `
    <div class="list">
    <form class="update-all-items" action="/lists/update" method="post">
    <input type="hidden" name="id" value="<%= list.id %>">
    <input type="hidden" name="name" value="<%= list.name %>">
    <div class="list-header-container">
    
    <div class="list-header">${new_list_name}</div>
    <div class="header-cut">
    <div id="triangle-topleft"></div>
    </div>
    </div>
    <div class="items">
    <ul class="js-sortable-items">
    </ul>
    </div>
    </form>
    
    
    <form class="add-item" action="lists/<%= list.id %>/items/add" method="post">
    <input type="text" name="name" class="new-item" placeholder="Add an item..." required>
    </form>
    </div>
    `
  );
  $(".add-control-input").val("")
  
  
  $.ajax({
    url: $($currentForm).attr("action"),
    method: $($currentForm).attr("method"),
    data: [
      {
        name: "new_id", 
        value: new_id
      },
      
      {
        name: "new_list_name", 
        value: new_list_name
      }
    ],
    
    success: function(data) {
      console.log("Submission was successful.")
    },
    error: function(data) {
      console.log("An error occurred.");
    } 
  })
  
  
  
  
}

$(".add-list").on("submit", addNewListAjaxSubmit);


// Minor setups
var cleanFocusOut = function() {
  $("input").focusout(function(){$("input").val("")})
}

cleanFocusOut();



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




