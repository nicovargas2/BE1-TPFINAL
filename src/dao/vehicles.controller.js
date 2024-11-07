import vehicleModel from './models/vehicle.model.js';
import config from '../config.js';

class VehicleController {
    constructor() { }

    get = async () => {
        try {
            return await vehicleModel.find().lean();
        } catch (err) {
            return err.message;
        }
    }

    getPaginated = async (pg) => {
        try {
            return await vehicleModel.paginate({}, { limit: config.ITEMS_PER_PAGE, page: pg, lean: true });
        } catch (err) {
            return err.message;
        }
    }

    add = async (data) => {
        try {
            return await vehicleModel.create(data);
        } catch (err) {
            return err.message;
        }
    }

    update = async (filter, updated, options) => {
        try {
            return await vehicleModel.findOneAndUpdate(filter, updated, options);
        } catch (err) {
            return err.message;
        }
    }

    delete = async (filter, options) => {
        try {
            return await vehicleModel.findOneAndDelete(filter, options);
        } catch (err) {
            return err.message;
        }
    }
}

export default VehicleController;
