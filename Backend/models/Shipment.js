import mongoose from 'mongoose';

const ShipmentSchema = new mongoose.Schema({
  orderId: { type: String, required: true },
  productType: { type: String, required: true },
  weight: { type: Number, required: true },
  destination: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['Pending', 'Shipped', 'Delivered', 'Completed'], // Add 'Completed' to the allowed values
    required: true 
  },
  cost: { type: Number, required: true },
  sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Seller' },
});

const Shipment = mongoose.model('Shipment', ShipmentSchema);
export default Shipment;
