import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import config from '../../config.js';
import moment from 'moment';

mongoose.pluralize(null);

const collection = config.SHIPMENTS_COLLECTION;

const schema = new mongoose.Schema({
    shipmentId: { type: String, required: true, unique: true },
    originAddress: { type: String, required: true },
    destinationAddress: { type: String, required: true },
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: config.USERS_COLLECTION, required: true },
    driverId: { type: mongoose.Schema.Types.ObjectId, ref: config.USERS_COLLECTION },
    status: { type: String, enum: ['pending', 'in transit', 'delivered', 'canceled'], default: 'pending' },
    //le agrego 72 horas al tiempo estimado de entrega
    estimatedDelivery: { type: Date, default: () => moment().add(72, 'hours').toDate() },
    createdAt: { type: Date, default: moment().toDate() }
});
schema.plugin(mongoosePaginate);

const model = mongoose.model(collection, schema);

export default model;
