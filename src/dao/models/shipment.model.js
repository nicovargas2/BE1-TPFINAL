import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import config from '../../config.js';

mongoose.pluralize(null);

const collection = config.SHIPMENTS_COLLECTION;

const schema = new mongoose.Schema({
    shipmentId: { type: String, required: true, unique: true },
    originAddress: { type: String, required: true },
    destinationAddress: { type: String, required: true },
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: config.USERS_COLLECTION, required: true },
    driverId: { type: mongoose.Schema.Types.ObjectId, ref: config.USERS_COLLECTION },
    status: { type: String, enum: ['pending', 'in transit', 'delivered'], default: 'pending' },
    estimatedDelivery: { type: Date },
    createdAt: { type: Date, default: Date.now }
});
schema.plugin(mongoosePaginate);

const model = mongoose.model(collection, schema);

export default model;
