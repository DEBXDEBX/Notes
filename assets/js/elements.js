class Elements {
  constructor() {
    // select the lists
    this.categoryList = document.querySelector("#categoryList");
    this.noteList = document.querySelector("#noteList");
    // select headings
    this.categoryHeading = document.querySelector("#categoryHeading");
    this.noteHeading = document.querySelector("#noteHeading");
    // select add show forms + / icon
    this.categoryAddIcon = document.querySelector("#categoryAddIcon");
    this.noteAddIcon = document.querySelector("#noteAddIcon");
    // select forms
    this.categoryForm = document.querySelector("#categoryForm");
    this.noteForm = document.querySelector("#noteForm");
    // select btns
    this.categoryAddBtn = document.querySelector("#categoryAddBtn");
    this.categoryCancelBtn = document.querySelector("#categoryCancelBtn");
    this.noteAddBtn = document.querySelector("#noteAddBtn");
    this.noteCancelBtn = document.querySelector("#noteCancelBtn");
    // select Inputs
    this.categoryTextInput = document.querySelector("#categoryTextInput");
    this.noteTextInput = document.querySelector("#noteTextInput");
    // select message display
    this.messageDisplay = document.querySelector("#displayMessage");
    // select message border
    this.messageBorder = document.querySelector("#modalBorder");
    // delete mode btn
    this.deleteModeBtn = document.querySelector("#deleteMode");
    // body
    this.body = document.querySelector("body");
  }
}
