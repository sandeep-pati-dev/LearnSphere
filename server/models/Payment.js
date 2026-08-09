import mongoose from "mongoose";

const schema = new mongoose.Schema({
  razorpay_order_id: {
    type: String,
    required: true,
    unique: true,
  },
  razorpay_payment_id: {
    type: String,
    required: true,
    unique: true,
  },
  razorpay_signature: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,
    index: true,
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Courses",
    required: false,
    index: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Payment = mongoose.model("Payment", schema);
