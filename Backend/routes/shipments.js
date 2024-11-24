import express from 'express';
import Shipment from '../models/Shipment.js'; // Assuming Shipment model is correctly defined

const router = express.Router();

/**
 * GET /api/analytics
 * Route to get shipment analytics
 */
router.get('/analytics', async (req, res) => {
  const { sellerId } = req.query;

  try {
    const shipments = await Shipment.find({ sellerId });

    const analytics = shipments.reduce((acc, shipment) => {
      const createdAt = shipment.createdAt ? new Date(shipment.createdAt) : null;
      if (createdAt) {
        const month = createdAt.toLocaleString('en-US', { month: 'short' });
        const existing = acc.find((data) => data.month === month);
        if (existing) {
          existing.shipments += 1; // Increment shipment count for the month
        } else {
          acc.push({ month, shipments: 1 });
        }
      }
      return acc;
    }, []);

    res.status(200).json({ success: true, analytics });
  } catch (error) {
    console.error('Error fetching analytics:', error.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});


/**
 * GET /api/stats
 * Route to get shipment statistics (total, pending, completed)
 */
router.get('/stats', async (req, res) => {
  const { sellerId } = req.query;

  try {
    if (!sellerId) {
      return res.status(400).json({ success: false, message: 'Seller ID is required' });
    }

    const total = await Shipment.countDocuments({ sellerId });
    const pending = await Shipment.countDocuments({ sellerId, status: 'Pending' });
    const completed = await Shipment.countDocuments({ sellerId, status: 'Completed' });

    res.status(200).json({
      success: true,
      total,
      pending,
      completed,
    });
  } catch (error) {
    console.error('Error fetching stats:', error.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

/**
 * GET /api/alerts
 * Route to get shipment alerts
 */
router.get('/alerts', async (req, res) => {
  const { sellerId } = req.query;

  try {
    if (!sellerId) {
      return res.status(400).json({ success: false, message: 'Seller ID is required' });
    }

    const alerts = await Shipment.find({ sellerId, status: 'Pending' })
      .select('orderId status destination')
      .lean();

    const alertsData = alerts.map((alert) => ({
      id: alert._id,
      message: `Shipment #${alert.orderId} to ${alert.destination} is still pending.`,
      type: 'warning',
    }));

    res.status(200).json({ success: true, alerts: alertsData });
  } catch (error) {
    console.error('Error fetching alerts:', error.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

export default router;
