import { FunctionComponent, useEffect, useState } from "react";
import Book from "../interfaces/Book";
import { getBooks } from "../services/booksService";

interface BooksTableProps {
  booksChanged: boolean;
}

const BooksTable: FunctionComponent<BooksTableProps> = ({ booksChanged }) => {
  let [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    getBooks()
      .then((res) => setBooks(res.data))
      .catch((err) => console.log(err));
  }, [booksChanged]);
  return (
    <>
      <h5 className="display-5">OUR BOOKS</h5>
      {books.length ? (
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Author</th>
              <th>Genre</th>
              <th>Price</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book: Book) => (
              <tr key={book.id}>
                <td>{book.id}</td>
                <td>{book.name}</td>
                <td>{book.author}</td>
                <td>{book.genre}</td>
                <td>{book.price}</td>
                <td>
                  <i className="fa-solid fa-pen text-success"></i>
                </td>
                <td>
                  <i className="fa-solid fa-trash-can text-danger"></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No books</p>
      )}
    </>
  );
};

export default BooksTable;
