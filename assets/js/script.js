"use strict";
//Global variable's
let arrayOfCategorys;
let categoryIndex = -243;
let noteIndex = -243;
let deleteMode = false;
const NOTE_STORAGE_KEY = "note01232022DEBX";
// create elements object
const el = new Elements();
// Pass elements to display
const display = new Display(el, $);
// create storage
const categoryListStorage = new ArrayStorageLS(NOTE_STORAGE_KEY);
//Select audio files
const addNoteAudio = document.querySelector("#addNoteAudio");
const addCategoryAudio = document.querySelector("#addCategoryAudio");
const btnAudio = document.querySelector("#btnAudio");
const cancelAudio = document.querySelector("#cancelAudio");
const clickAudio = document.querySelector("#clickAudio");
const deleteAudio = document.querySelector("#deleteAudio");
const tabAudio = document.querySelector("#tabAudio");
const warning1Audio = document.querySelector("#warning1Audio");
const warning2Audio = document.querySelector("#warning2Audio");
//The start of program exicution.
window.onload = function () {
  categoryListStartUp();
  // check for grocery list category. if so shows notes for grocery list.
  groceryList();
};

const groceryList = () => {
  // grab all the category's
  let tabList = document.getElementsByClassName("category");
  // create an array from an array like object
  let newArray = Array.from(tabList);
  // Check for Home
  let index = -243;
  newArray.forEach((item) => {
    if (item.textContent === "Grocery List") {
      // get index form Html
      index = parseInt(item.dataset.index);
    }
  });
  //  if you found Home display it's bookmarks and and active class
  if (index >= 0) {
    newArray[index].classList.add("active");
    categoryIndex = index;
    renderNotes();
  }
};

function categoryListStartUp() {
  arrayOfCategorys = categoryListStorage.getArrayFromLS();
  if (arrayOfCategorys.length === 0) {
    const groceryList = new Category("Grocery List");
    const noteOne = new Note("Milk");
    const noteTwo = new Note("Egg's");
    const noteThree = new Note("Bread");
    noteThree.isChecked = true;
    groceryList.arrayOfNotes.push(noteOne, noteTwo, noteThree);
    arrayOfCategorys.push(groceryList);
  }

  renderCategorys();
}
function renderCategorys() {
  display.paintCategorys(mapNamesOut(arrayOfCategorys), deleteMode);
}
function renderNotes() {
  display.paintNotes(arrayOfCategorys[categoryIndex].arrayOfNotes, deleteMode);
}
function saveNotesList() {
  categoryListStorage.saveArrayToLS(arrayOfCategorys);
}
// create a new array with only the Notes name
function mapNamesOut(array) {
  let mapedArray = array.map((note) => {
    return note.name;
  });
  return mapedArray;
} // End mapNamesOut(array)

// Sort an array by it's name
function sortArrayByName(array) {
  array.sort(function (a, b) {
    const nameA = a.name.toUpperCase(); // ignore upper and lowercase
    const nameB = b.name.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  }); //End sort function
} // End sortArrayByName(array)

el.categoryList.addEventListener("click", (e) => {
  if (e.target.classList.contains("deleteCategory")) {
    // get the index from the html

    let index = e.target.parentElement.dataset.index;
    index = parseInt(index);
    if (isNaN(index)) {
      return;
    }
    // categoryIndex = index;
    categoryIndex = index;
    if (arrayOfCategorys[categoryIndex].arrayOfNotes.length > 0) {
      warning1Audio.play();
      display.showAlert(
        "Please delete all your note's in this category before you delete this category.",
        "error"
      );
      return;
    }
    arrayOfCategorys.splice(categoryIndex, 1);
    deleteAudio.play();
    display.showAlert("A category was deleted", "success", 1500);
    // save
    saveNotesList();
    if (arrayOfCategorys.length === 0) {
      categoryListStartUp();
      return;
    }

    renderCategorys();
    return;
  }

  // event delegation
  if (e.target.classList.contains("category")) {
    const element = document.querySelector(".category.active");
    if (element) {
      element.classList.remove("active");
    }
    // add active class
    e.target.classList.add("active");

    // get the index from the html
    let index = e.target.dataset.index;
    index = parseInt(index);
    if (isNaN(index)) {
      return;
    }
    categoryIndex = index;
    tabAudio.play();
    renderNotes();
  }
});

el.categoryAddIcon.addEventListener("click", (e) => {
  clickAudio.play();
  display.showCategoryForm();
  display.displayNone(el.noteList);
  el.categoryTextInput.focus();
});

el.categoryAddBtn.addEventListener("click", (e) => {
  e.preventDefault();
  // grab the text
  let categoryName = el.categoryTextInput.value.trim();
  // check if text is empty
  if (!categoryName) {
    warning1Audio.play();
    display.showAlert("Please enter a name for the Category!", "error");
    return;
  }
  // create a category
  let newCategory = new Category(categoryName);

  // check if the name already exists if it does alert and return and set current main folder to -243
  // make a variable to return
  let isTaken = false;
  arrayOfCategorys.forEach((element) => {
    if (categoryName === element.name) {
      isTaken = true;
    }
  });
  // check for taken name
  if (isTaken) {
    warning2Audio.play();
    display.showAlert("That name is taken", "error");
    categoryIndex = -243;
  } else {
    // push newCategory into the array
    arrayOfCategorys.push(newCategory);
    addCategoryAudio.play();
    // sort array by name
    sortArrayByName(arrayOfCategorys);
    // save
    saveNotesList();
    display.showAlert("A new category was added", "success", 1500);
    // hide form
    display.hideCategoryForm();
    // reset form
    el.categoryForm.reset();
    // send array to display
    renderCategorys();
  } // End else statement
});

el.categoryCancelBtn.addEventListener("click", (e) => {
  cancelAudio.play();
  // reset form
  el.categoryForm.reset();
  // hide form
  display.displayNone(el.categoryForm);
  // get rid of active class
  let activeTabList = document.getElementsByClassName("category active");
  if (activeTabList) {
    let newArray = Array.from(activeTabList);
    for (let note of newArray) {
      note.classList.remove("active");
    }
  }
});

el.noteList.addEventListener("click", (e) => {
  if (e.target.classList.contains("deleteNote")) {
    // get the index from the html
    let deleteIndex = e.target.parentElement.parentElement.dataset.index;
    deleteIndex = parseInt(deleteIndex);
    arrayOfCategorys[categoryIndex].arrayOfNotes.splice(deleteIndex, 1);
    deleteAudio.play();
    // save
    saveNotesList();
    display.showAlert("Note deleted", "success", 1000);
    // renderNotes();
    display.paintNotesOnly(
      arrayOfCategorys[categoryIndex].arrayOfNotes,
      deleteMode
    );
    return;
  }

  if (e.target.classList.contains("checkBox")) {
    // get the index from the html
    let index = e.target.parentElement.parentElement.dataset.index;
    index = parseInt(index);

    const currentValue =
      arrayOfCategorys[categoryIndex].arrayOfNotes[index].isChecked;
    arrayOfCategorys[categoryIndex].arrayOfNotes[index].isChecked =
      !currentValue;
    tabAudio.play();

    display.paintNotesOnly(
      arrayOfCategorys[categoryIndex].arrayOfNotes,
      deleteMode
    );
    saveNotesList();
    return;
  }
});

el.noteAddIcon.addEventListener("click", (e) => {
  clickAudio.play();
  display.showNoteForm();
  el.noteTextInput.focus();
});

el.noteAddBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let noteText = el.noteTextInput.value.trim();
  if (!noteText) {
    warning1Audio.play();
    display.showAlert("Please enter a name for the note", "error", 1000);
    return;
  }

  let newNote = new Note(noteText);
  arrayOfCategorys[categoryIndex].arrayOfNotes.push(newNote);
  addNoteAudio.play();

  // save
  saveNotesList();
  el.noteForm.reset();
  display.displayNone(el.noteForm);
  display.showAlert("A new note was added", "success", 1500);
  renderNotes();
});

el.noteCancelBtn.addEventListener("click", (e) => {
  cancelAudio.play();
  el.noteForm.reset();
  // hide form
  display.displayNone(el.noteForm);
});

el.deleteModeBtn.addEventListener("click", (e) => {
  clickAudio.play();
  deleteMode = !deleteMode;

  if (deleteMode) {
    el.body.style.background = "linear-gradient(to right, #180808, #ff0000)";
  } else {
    el.body.style.background = "white";
  }
  let activeCategory = document.querySelector(".category.active");
  if (!activeCategory) {
    renderCategorys();
  } else {
    let categoryText = activeCategory.textContent;
    renderCategorys();
    // loop through the main array and set the one with mactching text to active
    const htmlCollection = document.querySelectorAll(".category");
    for (let i = 0; i < htmlCollection.length; i++) {
      if (htmlCollection[i].textContent === categoryText) {
        htmlCollection[i].classList.add("active");
        break;
      }
    }
    renderNotes();
  }
});
