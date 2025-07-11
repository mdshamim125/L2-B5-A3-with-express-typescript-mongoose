import { NextFunction, Request, Response } from "express";
import Borrow from "./borrow.model";

export const borrowBook = async (req: Request,
  res: Response,
  next: NextFunction) => {
  try {
    const borrowedBook = await Borrow.borrowBook(req.body);

    res.status(201).json({
      success: true,
      message: "Book borrowed successfully",
      data: borrowedBook,
    });
  } catch (error) {
    next(error);
  }
};

export const getBorrowedBooksSummary = async (req: Request,
  res: Response,
  next: NextFunction) => {
  try {
    const summary = await Borrow.aggregate([
      {
        $group: {
          _id: "$book",
          totalQuantity: {
            $sum: "$quantity",
          },
        },
      },
      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "_id",
          as: "data",
        },
      },
      {
        $unwind: "$data",
      },
      {
        $project: {
            _id: 0,
          book: {
            title: "$data.title",
            isbn: "$data.isbn",
          },
          totalQuantity: 1,
        },
      },
    ]);
    res.json({
      success: true,
      message: "Borrowed books summary retrieved successfully",
      data: summary,
    });
  } catch (error) {
    next(error);
  }
};
