import { model, Schema } from "mongoose";
import { IBorrow } from "./borrow.interface";

const borrowSchema = new Schema<IBorrow>({
    book: {type: Schema.Types.ObjectId, required: [true,"book reference must be required."], ref: 'Book'},
    quantity: {type: Number,required: [true,"borrow quantity must be required."], min: 0},
    dueDate: Date
})

const Borrow = model<IBorrow>("Borrow", borrowSchema)