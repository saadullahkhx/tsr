const Order = require("../models/orderModel");
const Product = require("../models/productModel");

const ErrorHandler = require("../utils/errorHandler");
const asyncHandler = require("../middlewares/asyncHandler");

//POST     api/v1/order/new
//@Desc    Create new order
exports.newOrder = asyncHandler(async (req, res, next) => {
  const {
    orderItems,
    shippingInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const order = await Order.create({
    orderItems,
    shippingInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    user: req.user._id,
  });

  res.status(200).json({ success: true, order });
});

exports.unAuthenticatedOrder = asyncHandler(async (req, res, next) => {
  const {
    orderItems,
    shippingInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const order = await Order.create({
    orderItems,
    shippingInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  });

  res.status(200).json({ success: true, order });
});

//@GET   api/v1/order/:id
//@Desc  Get single order
exports.getSingleOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order)
    return next(
      new ErrorHandler(`No order found with this id: ${req.params.id}`, 404)
    );

  res.status(200).json({ success: true, order });
});

//@GET   api/v1/orders/me
//@Desc  Get logged in user orders
exports.myOrders = asyncHandler(async (req, res, next) => {
  const orders = await Order.find({ user: req.user.id });

  res.status(200).json({ success: true, orders });
});

//@GET   api/v1/admin/orders
//@Desc  Get all orders - ADMIN
exports.getAllOrders = asyncHandler(async (req, res, next) => {
  const orders = await Order.find();

  let totalAmount = 0;
  orders.forEach((order) => (totalAmount += order.totalPrice));

  res.status(200).json({ success: true, orders, totalAmount });
});

//@PUT   api/v1/admin/order/:id
//@Desc  update/process order
exports.updateOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (order.orderStatus === "Delivered")
    return next(new ErrorHandler("You have already delivered this order", 400));

  order.orderItems.forEach(async (item) => {
    await updateStock(item.product, item.quantity);
  });

  order.orderStatus = req.body.status;
  order.deliveredAt = Date.now();

  await order.save();

  res.status(200).json({ success: true });
});

//@DELTE   api/v1/admin/order/:id
//@Desc    delete order
exports.deleteOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) return next(new ErrorHandler("No order found with this id", 404));

  await order.remove();

  res.status(200).json({ success: true });
});

async function updateStock(id, quantity) {
  const product = await Product.findById(id);

  product.stock = product.stock - quantity;
  await product.save({ validateBeforeSave: false });
}
