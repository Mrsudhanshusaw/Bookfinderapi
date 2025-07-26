function findBook() {
  var name = document.getElementById("bookName").value;
  var outputDiv = document.getElementById("output");
  outputDiv.innerHTML = "Please wait...";

  // API URL with search query
  var url = "https://www.googleapis.com/books/v1/volumes?q=" + name;

  // Fetching data from API
  fetch(url)
    .then(function(res) {
      return res.json();
    })
    .then(function(data) {
      outputDiv.innerHTML = ""; // clear old results

      if (data.items) {
        for (var i = 0; i < data.items.length; i++) {
          var book = data.items[i].volumeInfo;
          var title = book.title;
          var authors = book.authors ? book.authors.join(", ") : "No author";
          var img = book.imageLinks ? book.imageLinks.thumbnail : "";

          // Show book info
          var bookHTML = "<div class='book-box'>";
          bookHTML += "<h3>" + title + "</h3>";
          bookHTML += "<p>By: " + authors + "</p>";
          if (img != "") {
            bookHTML += "<img src='" + img + "'>";
          }
          bookHTML += "</div>";

          outputDiv.innerHTML += bookHTML;
        }
      } else {
        outputDiv.innerHTML = "No books found.";
      }
    })
    .catch(function(err) {
      outputDiv.innerHTML = "Something went wrong.";
      console.log(err);
    });
}
