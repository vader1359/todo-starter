var hideTrash = function() {
  $(".trash").hide()
  $(".trash-line").hide()
  $(".new-item").show()
}

var showTrash = function() {
  $(".trash").show()
  $(".trash-line").show()
  $(".new-item").hide()
}

var hideSearch = function() {
  $(".search-control").hide();
}

var showSearch = function() {
  $(".search-control").show();
}

var showBottomBar = function() {
  $(".bottom-bar").show();
}

var hideBottomBar = function() {
  $(".bottom-bar").hide();
}

hideTrash();
// hideBottomBar();

// Configure the sortContainers
const sortedContainers = sortable(".js-sortable-items", {
  forcePlaceholderSize: true,
  connectWith: ".connected"
});


// Create Ajax Submit for forms

// Sending List Order
$(".item").mousedown(function(){
  showTrash();
})

$(".item").mouseup(function(){
  hideTrash();
})

// Sending all items of a list 
var itemsAjaxSubmit = function(event) {
  event.preventDefault();
  
  
  
  // $($($(".items")[1]).children().children()[2]).remove()
  $currentForm = $(event.target);
  console.log($currentForm);
  
  data = $currentForm.serializeArray();
  // console.log("ajax data", data);
  
  // console.log(data)
  
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
    // console.log("NEW_INDEX", e.detail.elementIndex);
    // console.log("NEW_PARENTS", $($(e.detail.endparent).parent()).parent()); // This is the form
    // console.log("NEW_PARENTS", e.detail.endparent.children); // This is the array of items in end drag and drop
    // Easy way first
    // $.each($("form.update-all-items"), function(index, value) {
      
      //   $(value).submit();
      //   // console.log(`"VALUE": ${value}`)
      
      if (e.detail.startparent == e.detail.endparent) {
        var near_last_index_in_list = $(e.detail.endparent.children).length - 2;
        var dropped_item_index = e.detail.elementIndex
        if (dropped_item_index == near_last_index_in_list) {
          $($(e.detail.endparent.children)[dropped_item_index]).remove()
        }
        $($(e.detail.endparent).parent()).parent().submit();
        hideTrash();
        
      }
      
      if (e.detail.startparent != e.detail.endparent) {
        var near_last_index_in_list = $(e.detail.endparent.children).length - 2;
        var dropped_item_index = e.detail.elementIndex
        if (dropped_item_index == near_last_index_in_list) {
          $($(e.detail.endparent.children)[dropped_item_index]).remove()
        }
        $($(e.detail.startparent).parent()).parent().submit();
        $($(e.detail.endparent).parent()).parent().submit();
        hideTrash();
      }
      
      //   hideTrash();
    })
    
  });
  
  $("form.update-all-items").on("submit", itemsAjaxSubmit);
  
  
  
  
  // Sort event for sending list
  
  const sortedListsContainers = sortable(".js-sortable-lists", {
  });
  
  // var listsAjaxSubmit = function(event) {
    //   var listNames = [];
    //   $names = $.each
    // }
    
    
    
    var listOrderAjaxSubmit = function(event) {
      // console.log("EVENT TARGET", $("event.target"))
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
    
    
    $(".big-trash").click(function(e){
      console.log(e.target)
      e.preventDefault();
      var target = $(e.target);
      console.log(target.parent().parent().parent().parent().remove()); // The clicked form
      var id_to_delete = (target.parent().parent().siblings()[0]).value; // The list id for delete
      console.log(id_to_delete)
      
      $.ajax({
        url: "/delete_list",
        method: "POST",
        data: [{
          name: "id_to_delete",
          value: id_to_delete
        }],
        
        success: function(data) {
          console.log("Submission was successful.")
        },
        error: function(data) {
          console.log("An error occurred.");
        } 
      })
      
      
    })
    