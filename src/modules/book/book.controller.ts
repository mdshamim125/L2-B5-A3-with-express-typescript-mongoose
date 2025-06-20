import { Request, Response } from "express";
import Book from "./book.model";

export const createBook = async (req: Request, res: Response) => {
  const bookData = req.body;
  try {
    const book = new Book(bookData);
    const savedBook = await book.save();
    res.status(201).json({
      success: true,
      message: "Book created successfully.",
      data: savedBook,
    });
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
      success: false,
      error,
    });
  }
};

export const getAllBooks = async (req: Request, res: Response) => {
  try {
    const { filter, sort = "asc", limit = "5" } = req.query;

    const query: any = {};
    if(filter){
        query.genre = filter;
    }

    const books = await Book.find(query)
      .sort({
        createdAt: sort === "asc" ? 1 : -1,
      })
      .limit(Number(limit));
    res.status(200).json({
      success: true,
      message: "Books retrieved successfully.",
      data: books,
    });
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
      success: false,
      error,
    });
  }
};
