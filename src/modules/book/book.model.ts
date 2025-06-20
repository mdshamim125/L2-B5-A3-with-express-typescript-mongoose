import { model, Schema } from "mongoose";

const bookSchema = new Schema<IBook>(
  {
    title: {
      type: String,
      required: [true, "book title is required."],
      trim: true,
    },
    author: {
      type: String,
      required: [true, "author name is required."],
      trim: true,
    },
    genre: {
      type: String,
      required: [true, "genre is required."],
      enum: {
        values: [
          "FICTION",
          "NON_FICTION",
          "SCIENCE",
          "HISTORY",
          "BIOGRAPHY",
          "FANTASY",
        ],
        message:
          "Invalid genre '{VALUE}'.",
      },
    },
    isbn: { type: String, required: true, unique: true, trim: true },
    description: { type: String, trim: true },
    copies: {
      type: Number,
      required: true,
      min: [0, "copies must be a non-negative number."],
    },
    available: { type: Boolean, default: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Book = model<IBook>("Book", bookSchema);
export default Book;
