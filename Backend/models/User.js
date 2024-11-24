import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Seller' },
  shipments: [
    {
      shipmentId: String,
      status: String,
      destination: String,
    },
  ],
});

const User = mongoose.model('User', UserSchema);
export default User;
