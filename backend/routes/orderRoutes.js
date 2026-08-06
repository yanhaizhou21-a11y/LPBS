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

// Get all orders (recent 100)
router.get('/', async (req, res) => {
  try {
    const db = getDB();
    const orders = await db
      .collection('orders')
      .find({})
      .sort({ createdAt: -1 })
      .limit(100)
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

// Analytics summary
router.get('/analytics/summary', async (req, res) => {
  try {
    const db = getDB();
    const orders = await db.collection('orders').find({}).toArray();

    const totalOrders = orders.length;
    let totalRevenue = 0;
    let pendingCount = 0;
    let paidCount = 0;
    let totalPackages = 0;

    orders.forEach((o) => {
      if (o.pricing && o.pricing.grandTotal) {
        totalRevenue += o.pricing.grandTotal;
      }
      if (o.cart && o.cart.totalQty) {
        totalPackages += o.cart.totalQty;
      }
      if (o.status === 'PAID' || o.status === 'COMPLETED') {
        paidCount++;
      } else {
        pendingCount++;
      }
    });

    return res.json({
      success: true,
      summary: {
        totalOrders,
        totalRevenue,
        totalPackages,
        pendingCount,
        paidCount,
      },
    });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch analytics',
      error: error.message,
    });
  }
});

// Get single order by order number
router.get('/:orderNumber', async (req, res) => {
  try {
    const db = getDB();
    const { orderNumber } = req.params;

    const order = await db.collection('orders').findOne({ orderNumber });

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

// Update status for order
router.patch('/:orderNumber/status', async (req, res) => {
  try {
    const db = getDB();
    const { orderNumber } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ success: false, message: 'Status is required' });
    }

    const result = await db.collection('orders').updateOne(
      { orderNumber },
      {
        $set: {
          status,
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
      message: `Order ${orderNumber} status updated to ${status}`,
    });
  } catch (error) {
    console.error('Error updating status:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to update order status',
      error: error.message,
    });
  }
});

export default router;
