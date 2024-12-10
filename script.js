const myLibrary = [];

    // Constructor for Book objects
    function Book(title, author, pages, isRead) {
      this.title = title;
      this.author = author;
      this.pages = pages;
      this.isRead = isRead === "true";
    }

    // Prototype method to toggle the read status of a book
    Book.prototype.toggleRead = function () {
      this.isRead = !this.isRead;
    };

    // Function to add a new book to the library
    function addBookToLibrary(title, author, pages, isRead) {
      const newBook = new Book(title, author, pages, isRead);
      myLibrary.push(newBook);
      displayLibrary();
    }

    // Function to remove a book from the library
    function removeBook(index) {
      myLibrary.splice(index, 1);
      displayLibrary();
    }

    // Function to display all books in the library
    function displayLibrary() {
      const libraryContainer = document.getElementById('library');
      libraryContainer.innerHTML = ''; // Clear existing content

      myLibrary.forEach((book, index) => {
        // Create a card for each book
        const bookCard = document.createElement('div');
        bookCard.className = 'book-card';

        const titleElem = document.createElement('div');
        titleElem.className = 'book-title';
        titleElem.textContent = book.title;

        const authorElem = document.createElement('div');
        authorElem.className = 'book-author';
        authorElem.textContent = `By: ${book.author}`;

        const pagesElem = document.createElement('div');
        pagesElem.className = 'book-pages';
        pagesElem.textContent = `Pages: ${book.pages}`;

        const statusElem = document.createElement('div');
        statusElem.className = 'book-status';
        statusElem.textContent = book.isRead ? 'Status: Read' : 'Status: Not read';

        // Create action buttons
        const actionsElem = document.createElement('div');
        actionsElem.className = 'book-actions';

        // Remove Button
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.onclick = () => removeBook(index);

        // Toggle Read Button
        const toggleReadButton = document.createElement('button');
        toggleReadButton.textContent = 'Toggle Read';
        toggleReadButton.onclick = () => {
          book.toggleRead();
          displayLibrary(); // Refresh library display
        };

        actionsElem.appendChild(toggleReadButton);
        actionsElem.appendChild(removeButton);

        // Append elements to the card
        bookCard.appendChild(titleElem);
        bookCard.appendChild(authorElem);
        bookCard.appendChild(pagesElem);
        bookCard.appendChild(statusElem);
        bookCard.appendChild(actionsElem);

        // Append the card to the container
        libraryContainer.appendChild(bookCard);
      });
    }

    // Form handlers
    function showForm() {
      const dialog = document.getElementById('bookFormDialog');
      dialog.showModal();
    }

    function closeForm() {
      const dialog = document.getElementById('bookFormDialog');
      dialog.close();
    }

    document.getElementById('bookForm').addEventListener('submit', function (event) {
      event.preventDefault(); // Prevent form from submitting to server

      const title = document.getElementById('title').value;
      const author = document.getElementById('author').value;
      const pages = document.getElementById('pages').value;
      const isRead = document.getElementById('isRead').value;

      addBookToLibrary(title, author, pages, isRead);

      this.reset(); // Reset the form
      closeForm(); // Close the dialog
    });

    // Example books to populate the library
    addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, "false");
    addBookToLibrary("1984", "George Orwell", 328, "true");
    addBookToLibrary("To Kill a Mockingbird", "Harper Lee", 281, "true");
   