import { Router } from "express";
import { createBook, getAllBooks } from "./book.controller";

const bookRoute = Router();

bookRoute.post('/', createBook);
bookRoute.get('/', getAllBooks);

export default bookRoute