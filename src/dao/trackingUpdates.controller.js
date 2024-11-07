import trackingUpdateModel from './models/trackingUpdate.model.js';
import config from '../config.js';

class TrackingUpdateController {
    constructor() { }

    get = async () => {
        try {
            return await trackingUpdateModel.find().lean();
        } catch (err) {
            return err.message;
        }
    }

    getPaginated = async (pg) => {
        try {
            return await trackingUpdateModel.paginate({}, { limit: config.ITEMS_PER_PAGE, page: pg, lean: true });
        } catch (err) {
            return err.message;
        }
    }

    add = async (data) => {
        try {
            return await trackingUpdateModel.create(data);
        } catch (err) {
            return err.message;
        }
    }

    update = async (filter, updated, options) => {
        try {
            return await trackingUpdateModel.findOneAndUpdate(filter, updated, options);
        } catch (err) {
            return err.message;
        }
    }

    // No existe un delete porque no quiero que se pueda 
    // borrar los comentarios en los tracking updates.
}

export default TrackingUpdateController;
