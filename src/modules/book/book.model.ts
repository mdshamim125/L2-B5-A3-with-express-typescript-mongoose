import { model, Schema } from "mongoose";

const bookSchema = new Schema<IBook>({
    title: {type: String, required: [true,"book title must be required."], trim: true},
    author: {type: String, required: [true,"author name must be required."], trim: true},
    genre: {type: String, enum:['FICTION' , 'NON_FICTION','SCIENCE' ,'HISTORY' , 'BIOGRAPHY' , 'FANTASY'], required: [true,"book genre must be required."]},
    isbn: {type: String, unique: true},
    description: {type: String},
    copies: {type: Number, min: 0},
    available: {type: Boolean, default: true}
})

const Book = model<IBook>("Book", bookSchema);
export default Book;