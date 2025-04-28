import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: [true, "Amount is required"],
    },
    date: {
      type: Date,
      required: [true, "Date is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
  },
  { timestamps: true }
);

// Avoid "Cannot overwrite model" error during hot reloads
export default mongoose.models.Transaction ||
  mongoose.model("Transaction", TransactionSchema);
