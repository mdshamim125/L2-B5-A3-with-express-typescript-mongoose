import { Router } from "express";
import { createBook, deleteBook, getAllBooks, getBookById, updateBook,  } from "./book.controller";

const bookRoute = Router();

bookRoute.post('/', createBook);
bookRoute.get('/:id', getBookById);
bookRoute.put('/:id', updateBook);
bookRoute.delete('/:id', deleteBook);
bookRoute.get('/', getAllBooks);


export default bookRoute