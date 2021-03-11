"use strict"
var selectDrop = document.getElementById("bookGenreSelect");
var selectCirle = document.getElementById("circleOptions");

//create functionality
document.getElementById("addBooks").addEventListener('submit', function (event) {
    event.preventDefault();

    const data = {
      title: this.title.value,
      author: this.author.value,
      genre: selectDrop.options[selectDrop.selectedIndex].value,
      yearReleased: this.yearReleased.value,
      status: document.querySelector('input[name="bookshelfOption"]:checked').value
    };
  
    axios.post("http://localhost:8080/createBook", data)
        .then(() => {
            this.reset();
            this.title.focus();
            
    }).catch(err => console.error(err));
});