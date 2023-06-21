import mongoose from "mongoose";
const { Schema } = mongoose;

const paymentSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
    },
    cardNumber: {
      type: String,
      required: true,
    },
    bankName: {
      type: String,
      required: true,
    },
    expireDate: {
      type: String,
      required: true,
    },
    cvvCode: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Payment", paymentSchema);
