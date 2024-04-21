import { useState, useEffect } from "react";
import { Trash2, Loader2, NotebookPen, X } from "lucide-react";
import { instance2 } from "../../services/AxiosOrder";
// import { Image } from "cloudinary-react";
import toast, { Toaster } from "react-hot-toast";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import ReactDatePicker from "react-datepicker";
import DatePicker from "@/components/ui/datepicker";

export default function ManageBooks() {

  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [allBooks, setAllBooks] = useState([]);

  const [newBook, setNewBook] = useState({
    bookName: "",
    bookAuthor: "",
    publisher: "",
    isbn: "",
    addedOn: null,
    quantity: 0,
  });
  // show all the books in a array list
  useEffect(() => {
    instance2
      .get("/books/getAll")
      .then((response) => {
        if (Array.isArray(response.data)) {
          setAllBooks(response.data);
        } else {
          console.log(
            "Data is not available in array: ",
            typeof response.data
          );
        }
      })
      .catch((error) => {
        console.error("Error loading Books: ", error);
      });
  }, []);


  //save new book 
  const handleSaveNewBook = async () => {
    try {
      const response = await instance2.post("/books/add", {
        bookName: newBook.bookName,
        bookAuthor: newBook.bookAuthor,
        publisher: newBook.publisher,
        isbn: newBook.isbn,
        addedOn: new Date().toISOString().substring(0, 10),
        quantity: newBook.quantity
      });

      //success message
      console.log("New book added:", response.data);
      toast.success("New book added successfully");
      setNewBook({
        bookName: "",
        bookAuthor: "",
        publisher: "",
        isbn: "",
        addedOn: null,
        quantity: 0,
      });
      updatedBookList();
    }
    catch (error) {
      if (error.response) {
        // Request was made and server responded with a status code
        // that falls out of the range of 2xx
        console.error("Server responded with error status:", error.response.status);
        console.error("Error data:", error.response.data);
        toast.error("Server responded with an error. Please try again later.");
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received from the server.");
        toast.error("No response received from the server. Please try again later.");
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error setting up the request:", error.message);
        toast.error("An unexpected error occurred. Please try again later.");
      }
    }
  };





  // delete a book
  const handleDeleteBook = async (bookId) => {

    try {
      await instance2.delete(`/books/delete/${bookId}`);
      console.log("Book deleted:", bookId);
      toast.success("Book deleted successfully");
      // Optionally, update the list of books after deleting
      updatedBookList();
    } catch (error) {
      console.error("Error deleting book: ", error);
      toast.error("Error deleting book");
    }
  };


  //Showing add book page
  const handleAddBook = () => {
    setShowAddDialog(true);
  };

  //Show edit book page
  // const handleEditBook = (bookId) => {
  //   setSelectedBook(bookId);
  //   setShowEditDialog(true);
  // };

  const handleEditBook = (book) => {
    setSelectedBook(book); // Set the entire book object here
    setShowEditDialog(true);
  };


  // update existing book
  // update existing book
const handleUpdateBook = async () => {
  try {
    const response = await instance2.put(`/books/update/${selectedBook.bookId}`, selectedBook);
    console.log("Book updated:", response.data);
    toast.success("Book updated successfully");
    // Update the list of books after updating
    updatedBookList();
  } catch (error) {
    console.error("Error updating book: ", error);
    toast.error("Error updating book");
  }
};


  // function to fetch updated list of books
  const updatedBookList = async () => {
    try {
      const response = await instance2.get("/books/getAll");
      setAllBooks(response.data);
    } catch (error) {
      console.error("Error updating book list: ", error);
    }
  };

  return (
    <>
      <Toaster />
      <div className="flex justify-end mb-5">
        <Button
          className="m-0 w-[150px] h-[50px] mr-[10px] text-lg"
          type="button"
          onClick={handleAddBook}
        >
          Add New Book
        </Button>
      </div>
      <Table>
        <TableCaption>Manage Book Store</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Book ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Publisher</TableHead>
            <TableHead>ISBN</TableHead>
            <TableHead>Added On</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allBooks.map((book) => (
            <TableRow key={book.bookId}>
              <TableCell>{book.bookId}</TableCell>
              <TableCell>{book.bookName}</TableCell>
              <TableCell>{book.bookAuthor}</TableCell>
              <TableCell>{book.publisher}</TableCell>
              <TableCell>{book.isbn}</TableCell>
              <TableCell>{book.addedOn}</TableCell>
              <TableCell>{book.quantity}</TableCell>
              <TableCell>
                <>
                  <Button
                    onClick={() => handleDeleteBook(book.bookId)}
                    variant="destructive"
                    size="icon">
                    <Trash2 size={20} />
                  </Button>
                  {"  "}
                  <Button
                    onClick={() => handleEditBook(book)}
                    variant="secondary"
                    size="icon">
                    <NotebookPen size={20} />
                  </Button>
                </>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {showAddDialog && (
        <Dialog open>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Book</DialogTitle>
              <Button
                onClick={() => setShowAddDialog(false)}
                aria-label="Close"
                className="absolute top-0 right-0 mt-2 mr-2 w-8 h-8"
                style={{ lineHeight: "1", padding: "0" }}
              >
                <X size={24} />
              </Button>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="book_name">Book Name</Label>
                <Input
                  id="book_name"
                  value={newBook.bookName}
                  onChange={(e) =>
                    setNewBook({ ...newBook, bookName: e.target.value })
                  }
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="author">Author</Label>
                <Input
                  id="author"
                  value={newBook.bookAuthor}
                  onChange={(e) =>
                    setNewBook({ ...newBook, bookAuthor: e.target.value })
                  }
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="publisher">Publisher</Label>
                <Input
                  id="publisher"
                  value={newBook.publisher}
                  onChange={(e) =>
                    setNewBook({ ...newBook, publisher: e.target.value })
                  }
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="isbn">ISBN</Label>
                <Input
                  id="isbn"
                  value={newBook.isbn}
                  onChange={(e) =>
                    setNewBook({ ...newBook, isbn: e.target.value })
                  }
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  id="quantity"
                  value={newBook.quantity}
                  onChange={(e) =>
                    setNewBook({ ...newBook, quantity: e.target.value })
                  }
                  className="col-span-3"
                  required
                />
              </div>
              {/* <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="addedOn">Added On</Label>

                <DatePicker id="addedOn"
                  value={newBook.addedOn}
                  onSelect={(e) =>
                    setNewBook({ ...newBook, addedOn: e.target.value })}
                />
              </div> */}
            </div>
            <DialogFooter>
              <Button
                type="button"
                onClick={handleSaveNewBook}
              >
                Save Book
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {showEditDialog && (
        <Dialog open>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit Book Details</DialogTitle>
              <DialogDescription>
                Make the necessary changes related to books here. And click "save" when you're done.
              </DialogDescription>
              <Button
                onClick={() => {
                  setShowEditDialog(false);
                }}
                aria-label="Close"
                className="absolute top-0 right-0 mt-2 mr-2 w-8 h-8"
                style={{ lineHeight: "1", padding: "0" }}
              >
                <X size={24} />
              </Button>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="book_name">Book Name</Label>
                <Input
                  id="book_name"
                  value={selectedBook?.bookName || ''}
                  onChange={(e) => setSelectedBook({ ...selectedBook, bookName: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="author">Author</Label>
                <Input
                  id="author"
                  value={selectedBook?.bookAuthor || ''}
                  onChange={(e) => setSelectedBook({ ...selectedBook, bookAuthor: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="publisher">Publisher</Label>
                <Input
                  id="publisher"
                  value={selectedBook?.publisher || ''}
                  onChange={(e) => setSelectedBook({ ...selectedBook, publisher: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="isbn">ISBN</Label>
                <Input
                  id="isbn"
                  value={selectedBook?.isbn || ''}
                  onChange={(e) => setSelectedBook({ ...selectedBook, isbn: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  id="quantity"
                  value={selectedBook?.quantity || ''}
                  onChange={(e) => setSelectedBook({ ...selectedBook, quantity: e.target.value })}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" onClick={handleUpdateBook}>
                Save changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

    </>
  );
}
