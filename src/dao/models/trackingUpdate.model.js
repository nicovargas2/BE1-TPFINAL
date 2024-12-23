import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import config from '../../config.js';
import moment from 'moment';

mongoose.pluralize(null);

const collection = config.TRACKING_UPDATES_COLLECTION;

const schema = new mongoose.Schema({
    shipmentId: { type: mongoose.Schema.Types.ObjectId, ref: config.SHIPMENTS_COLLECTION, required: true },
    timestamp: { type: Date, default: moment().toDate() },
    statusUpdate: { type: String, required: true }
});
schema.plugin(mongoosePaginate);

const model = mongoose.model(collection, schema);

export default model;
