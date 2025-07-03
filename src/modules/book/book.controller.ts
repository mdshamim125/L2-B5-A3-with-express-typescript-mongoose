import { Request, Response, NextFunction } from "express";
import Book from "./book.model";

export const createBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const bookData = req.body;
  try {
    const book = new Book(bookData);
    const savedBook = await book.save();
    res.status(201).json({
      success: true,
      message: "Book created successfully.",
      data: savedBook,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllBooks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { filter, sort = "asc", limit = "12" } = req.query;

    const query: any = {};
    if (filter) {
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
  } catch (error) {
    next(error);
  }
};

export const getBookById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const book = await Book.findById(id);

    // if (!book) {
    //   return res.status(404).json({
    //     success: false,
    //     message: "Book not found.",
    //   });
    // }

    res.status(200).json({
      success: true,
      message: "Book retrieved successfully.",
      data: book,
    });
  } catch (error) {
    next(error);
  }
};
export const updateBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const updatedBook = await Book.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    // if (!updatedBook) {
    //   return res.status(404).json({
    //     success: false,
    //     message: "Book not found.",
    //   });
    // }

    res.status(200).json({
      success: true,
      message: "Book updated successfully.",
      data: updatedBook,
    });
  } catch (error: any) {
    next(error);
  }
};

export const deleteBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  try {
    const deletedBook = await Book.findByIdAndDelete(id);

    // if (!deletedBook) {
    //   return res.status(404).json({
    //     success: false,
    //     message: "Book not found.",
    //   });
    // }

    res.status(200).json({
      success: true,
      message: "Book deleted successfully.",
      data: null,
    });
  } catch (error) {
    next(error);
  }
};
