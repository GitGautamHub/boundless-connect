import mongoose from 'mongoose';
const SellerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  storeName: { type: String, required: true },
  category: { type: String, required: true },
  dashboardStats: { type: Array, default: [] }, // To store stats
  dashboardAlerts: { type: Array, default: [] }, // To store alerts
  shipmentAnalytics: { type: Array, default: [] }, // To store analytics data
});

const Seller = mongoose.model('Seller', SellerSchema);
export default Seller;
