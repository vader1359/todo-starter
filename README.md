**Required User Stories:**

### Check what's already done in your starting app:

- [x] User can see the list of Todo items on the home page
- [x] The Todo list and items should look similar to Trello Lists and Cards (free free to customize any color)
- [x] User can click a Done button next to an undone item to complete it
- [x] User can click an Undo button next to a done item to undo it

### Check new features

- [x] User can create a new List so that she can maintain more than one list horizontally
    - [x] Display add list correctly (background + input + button)
    - [x] Handling the button image it not work
    <!-- Cannot click on the buttono with image tag inside and cannot set css background for the image, too  -->
    - [x] Click on the button or enter -> Create a blank list with an Add an item input using Append
    <!-- Is there a way to reuse the _list.erb inside app.js? Dont have enough time to play with this  -->
    - [ ] Modify the Add an item and display it correctly
    - [x] Use append to display the list
    - [x] Use Ajax to send Add an item to backend and save it to file
- [x] User can cancel the list form after clicking on the "Add a list" text
- [x] User can add a new item by clicking on "Add an item..." and can click Cancel if desired
- [x] User can drag to re-order items in a list and the list saves automatically
- [x] User can drag an item from one list to another and --- both lists save automatically
    - [ ] Need to check and only submit the form changed

**Optional User Stories:**

- [ ] User can rename a list. For example “Today” to “Inbox”
- [ ] User can delete an item
- [ ] User can delete a list

**Additional User Stories:**

- [x] Improve the UI/UX
    - [x] Add new font
    - [x] Add background and Guassian Blur effect and transparent list
    - [x] Create Diagonal Header and rotated List name 
    - [ ] User can choose color  for list header's background
- [ ] Implement a Search function which will search all the list at the same time
- [ ] Add selected mod for the list
    - [ ] Option will be shown at the bottom to Change list name, change color and delete the list
- [x] Add sortable function to the lists 
<!-- Still not get it will fix the file order later. Too tired for now.  -->
<!-- Add class sortablle-js to the div around the lists  -->
    - [x] Sortable in the UI
    - [ ] Save all of them to backend'
    - [ ] Add animation to sortable
- [x] Make the item tilded while drag and drop
- [ ] Drag to delete item and list
- [ ] Animation implementation
- [ ] Display ... if text is too long
- [ ] Auto expand HTML input
Feel free to add any more enhancements that you made here.