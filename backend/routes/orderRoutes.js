import { Router } from 'express';
import { getDB } from '../config/db.js';

const router = Router();

// Create new order
router.post('/', async (req, res) => {
  try {
    const db = getDB();
    const ordersCollection = db.collection('orders');

    const {
      orderNumber,
      buyer,
      cart,
      shippingService,
      paymentMethod,
      pricing,
    } = req.body;

    if (!orderNumber || !buyer || !cart || !pricing) {
      return res.status(400).json({
        success: false,
        message: 'Missing required order details.',
      });
    }

    const orderDoc = {
      orderNumber,
      buyer,
      cart,
      shippingService,
      paymentMethod,
      pricing,
      status: 'PENDING_PAYMENT',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await ordersCollection.insertOne(orderDoc);

    return res.status(201).json({
      success: true,
      message: 'Order created successfully',
      orderId: result.insertedId,
      orderNumber,
    });
  } catch (error) {
    console.error('Error creating order:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to create order',
      error: error.message,
    });
  }
});

// Get all orders (recent 50)
router.get('/', async (req, res) => {
  try {
    const db = getDB();
    const orders = await db
      .collection('orders')
      .find({})
      .sort({ createdAt: -1 })
      .limit(50)
      .toArray();

    return res.json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch orders',
      error: error.message,
    });
  }
});

// Get single order by order number
router.get('/:orderNumber', async (req, res) => {
  try {
    const db = getDB();
    const { orderNumber } = req.params;

    const order = await db
      .collection('orders')
      .findOne({ orderNumber });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

    return res.json({
      success: true,
      order,
    });
  } catch (error) {
    console.error('Error fetching order:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch order',
      error: error.message,
    });
  }
});

// Confirm payment status for order
router.patch('/:orderNumber/confirm', async (req, res) => {
  try {
    const db = getDB();
    const { orderNumber } = req.params;

    const result = await db.collection('orders').updateOne(
      { orderNumber },
      {
        $set: {
          status: 'PAID',
          paidAt: new Date(),
          updatedAt: new Date(),
        },
      }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

    return res.json({
      success: true,
      message: 'Payment confirmed for order ' + orderNumber,
    });
  } catch (error) {
    console.error('Error confirming payment:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to confirm payment',
      error: error.message,
    });
  }
});

export default router;
