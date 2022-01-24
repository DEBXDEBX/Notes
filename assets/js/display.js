class Display {
  constructor(elements, $) {
    this.elements = elements;
    //JQuery
    this.$ = $;
    this.tabColorIndex = 0;
    this.tabColors = [
      "#2de11d",
      "#4848e8",
      "#e84d4d",
      "Orange",
      "Violet",
      "#820ee8",
      "#8e7fc7",
      "#ff008b",
      "#4dc6e8",
      "#17abf5",
      "#4c69bd",
      "#e251dc",
      "#bbb70e",
    ];
  } // End constructor

  //Method
  displayNone(element) {
    this.$(element).slideUp("slow");
  } // End displayNone(element)

  //Method
  displayBlock(element) {
    this.$(element).slideDown("slow");
  } // End displayBlock(element)

  //Method
  clearCategoryDisplay() {
    this.elements.categoryList.innerHTML = "";
  } // End clearFileCabDisplay()

  //Method
  clearNoteDisplay() {
    this.elements.noteList.innerHTML = "";
  } // End clearPrimaryDisplay()
  //Method
  showCategoryForm() {
    this.displayNone(this.elements.noteHeading);
    this.displayNone(this.elements.noteForm);
    this.displayBlock(this.elements.categoryForm);
  }
  hideCategoryForm() {
    this.displayNone(this.elements.categoryForm);
  }
  //Method
  showNoteForm() {
    this.displayBlock(this.elements.noteForm);
  }
  paintCategorys(mappedArray, deleteMode) {
    // this.displayBlock(this.elements.catHeading);
    this.displayBlock(this.elements.categoryHeading);
    // this.displayNone(catList);
    this.displayNone(this.elements.categoryList);
    // this.displayNone(bookmarkList);
    this.displayNone(this.elements.noteList);
    // this.clearCategoryDisplay();
    this.clearCategoryDisplay();
    // this.clearBookmarkDisplay();
    this.clearNoteDisplay();
    // this.displayNone(this.elements.catHeading);
    this.displayNone(this.elements.categoryHeading);
    // this.displayNone(this.elements.bookmarkHeading);
    this.displayNone(this.elements.noteHeading);
    // this.displayBlock(this.elements.catHeading);
    this.displayBlock(this.elements.categoryHeading);

    // make a variable to hold html
    let html = "";
    if (deleteMode) {
      mappedArray.forEach((element, index) => {
        html += `<li data-index="${index}" class="category">${element}<i
        title="Delete Category"
        class="deleteCategory trash fas fa-trash-alt"
      ></i
    ></li>`;
      });
    } else {
      mappedArray.forEach((element, index) => {
        html += `<li data-index="${index}" class="category">${element}</li>`;
      });
    }

    this.elements.categoryList.innerHTML = html;

    this.displayBlock(this.elements.categoryList);
    // color tabs
    const tabList = document.getElementsByClassName("category");
    this.colorSetOfTabs(tabList);
  }

  paintNotes(notesArray) {
    this.clearNoteDisplay();
    this.displayNone(this.elements.noteHeading);
    this.displayBlock(this.elements.noteHeading);
    this.displayNone(this.elements.noteList);
    this.displayNone(this.elements.noteForm);
    this.displayNone(this.elements.categoryForm);
    // ***********************************************
    // make variable for html
    let html = "";
    if (deleteMode) {
      notesArray.forEach((note, index) => {
        html += `<li data-index="${index}"  ${
          note.isChecked ? ' class="note inCart"' : ' class="note"'
        }><h4><input type="checkbox" class="checkBox" ${
          note.isChecked ? "checked" : " "
        }>${
          note.name
        }</h4><span title='Delete'><i class="fas fa-trash-alt deleteNote"></i></span></li>`;
      });
    } else {
      notesArray.forEach((note, index) => {
        html += `<li data-index="${index}" ${
          note.isChecked ? ' class="note inCart"' : ' class="note"'
        }><h4><input type="checkbox" class="checkBox" ${
          note.isChecked ? "checked" : " "
        }>${note.name}</h4></li>`;
      });
    }
    // ***********************************************
    // this.elements.noteList.innerHTML = "<h1>note</h1>";
    this.elements.noteList.innerHTML = html;
    this.displayBlock(this.elements.noteList);
  }
  paintNotesOnly(notesArray, deleteMode) {
    // took out heading effect to keep list steady
    this.clearNoteDisplay();
    this.displayBlock(this.elements.noteHeading);
    this.displayNone(this.elements.notekList);
    this.displayNone(this.elements.noteForm);
    this.displayNone(this.elements.categoryForm);
    // ***********************************************
    // make variable for html
    let html = "";
    if (deleteMode) {
      notesArray.forEach((note, index) => {
        html += `<li data-index="${index}"  ${
          note.isChecked ? ' class="note inCart"' : ' class="note"'
        }><h4><input type="checkbox" class="checkBox" ${
          note.isChecked ? "checked" : " "
        }>${
          note.name
        }</h4><span title='Delete'><i class="fas fa-trash-alt deleteNote"></i></span></li>`;
      });
    } else {
      notesArray.forEach((note, index) => {
        html += `<li data-index="${index}" ${
          note.isChecked ? ' class="note inCart"' : ' class="note"'
        }><h4><input type="checkbox" class="checkBox" ${
          note.isChecked ? "checked" : " "
        }>${note.name}</h4></li>`;
      });
    }
    // ***********************************************
    // this.elements.noteList.innerHTML = "<h1>note</h1>";
    this.elements.noteList.innerHTML = html;
    this.displayBlock(this.elements.noteList);
  }

  //Method
  colorSetOfTabs(htmlCollection) {
    for (const note of htmlCollection) {
      note.style.backgroundColor = this.tabColors[this.tabColorIndex];
      if (this.tabColorIndex === this.tabColors.length - 1) {
        this.tabColorIndex = 0;
      } else {
        this.tabColorIndex++;
      }
    }
  } // End colorSetOfTabs(htmlCollection)

  // Method
  showAlert(message, className, displayTime = 4000) {
    if (className === "success") {
      // remove error
      this.elements.messageDisplay.classList.remove("error");
      // add success
      this.elements.messageDisplay.classList.add("success");
      // remove red border
      this.elements.messageBorder.classList.remove("redBorder");
      // add green border
      this.elements.messageBorder.classList.add("greenBorder");
    } else {
      // remove success
      this.elements.messageDisplay.classList.remove("success");
      // add error
      this.elements.messageDisplay.classList.add("error");
      // remove green border
      this.elements.messageBorder.classList.remove("greenBorder");
      // add red border
      this.elements.messageBorder.classList.add("redBorder");
    }
    this.elements.messageDisplay.textContent = message;
    $("#myMessageModal").modal("hide");
    $("#myMessageModal").modal("show");
    setTimeout(() => {
      $("#myMessageModal").modal("hide");
    }, displayTime);
  } // End showAlert()
} // End class
