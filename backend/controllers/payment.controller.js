import Razorpay from "razorpay";
import crypto from "crypto";
import Order from "../models/order.model.js"; // Your existing Order model

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export const createOrder = async (req, res) => {
  try {
    const { products } = req.body;

    let totalAmount = 0;
    products.forEach((product) => {
      totalAmount += product.price * product.quantity;
    });

    const options = {
      amount: totalAmount * 100, // Amount in paise
      currency: "INR",
      receipt: "order_rcptid_11",
    };

    const order = await razorpay.orders.create(options);
    res.status(200).json({ id: order.id, amount: totalAmount * 100 });
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    res.status(500).json({ message: "Error creating order", error: error.message });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const { orderId, paymentId, signature } = req.body;

    const hmac = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET);
    hmac.update(orderId + "|" + paymentId);
    const generatedSignature = hmac.digest("hex");

    if (generatedSignature === signature) {
      const order = new Order({
        user: req.user._id,
        razorpayOrderId: orderId,
        razorpayPaymentId: paymentId,
        totalAmount: req.body.totalAmount,
        products: req.body.products,
      });
      await order.save();
      res.status(200).json({ success: true });
    } else {
      res.status(400).json({ success: false, message: "Signature verification failed" });
    }
  } catch (error) {
    console.error("Payment verification error:", error);
    res.status(500).json({ message: "Error verifying payment", error: error.message });
  }
};
