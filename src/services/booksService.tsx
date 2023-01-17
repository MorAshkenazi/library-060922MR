import axios from "axios";
import Book from "../interfaces/Book";

const api: string = process.env.REACT_APP_API + "/books" || "";

// get all books
export function getBooks() {
  return axios.get(api);
}

// get specific book by id
export function getBookById(id: number) {
  return axios.get(`${api}/${id}`);
}

// add new book
export function addBook(bookToAdd: Book) {
  return axios.post(api, bookToAdd);
}

// update book
export function updateBook(id: number, bookToUpdate: Book) {
  return axios.put(`${api}/${id}`, bookToUpdate);
}

// delete book
export function deleteBook(id: number) {
  return axios.delete(`${api}/${id}`);
}
