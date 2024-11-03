import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import config from '../../config.js';

mongoose.pluralize(null);

const collection = config.USERS_COLLECTION;

const schema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'transporter', 'customer'], default: 'customer' },
    phone: { type: String, required: true },
    address: { type: String, required: true }
});
schema.plugin(mongoosePaginate);

const model = mongoose.model(collection, schema);

export default model;