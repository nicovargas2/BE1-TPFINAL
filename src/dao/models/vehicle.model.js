import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import config from '../../config.js';

mongoose.pluralize(null);

const collection = config.VEHICLES_COLLECTION;

const schema = new mongoose.Schema({
    vehicleId: { type: String, required: true, unique: true },
    type: { type: String, required: true },
    licensePlate: { type: String, required: true, unique: true },
    driverId: { type: mongoose.Schema.Types.ObjectId, ref: config.USERS_COLLECTION, required: true },
    lastMaintenance: { type: Date, default: Date.now },
    capacity: { type: Number, required: true } //en kilos
});

schema.plugin(mongoosePaginate);

const model = mongoose.model(collection, schema);

export default model;
