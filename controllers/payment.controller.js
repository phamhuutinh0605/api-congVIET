import Payment from "../models/payment.model.js";

export const createPayment = async (req, res, next) => {
  const newPayment = new Payment({
    userId: req.userId,
    username: req.body.username,
    cardNumber: req.body.cardNumber,
    bankName: req.body.bankName,
    expireDate: req.body.expireDate,
    cvvCode: req.body.cvvCode,
  });
  await newPayment.save();
  res.status(201).send(newPayment);
};
export const getPayment = async (req, res, next) => {
  const user = await Payment.findById(req.params.id);
  res.status(200).send(user);
};
export const getPayments = async (req, res, next) => {
  const users = await Payment.find();
  res.status(200).send(users);
};
