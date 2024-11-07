import shipmentModel from './models/shipment.model.js';
import config from '../config.js';

class ShipmentController {
    constructor() { }

    get = async () => {
        try {
            return await shipmentModel.find().lean();
        } catch (err) {
            return err.message;
        }
    }

    getPaginated = async (pg) => {
        try {
            return await shipmentModel.paginate({}, { limit: config.ITEMS_PER_PAGE, page: pg, lean: true });
        } catch (err) {
            return err.message;
        }
    }

    add = async (data) => {
        try {
            return await shipmentModel.create(data);
        } catch (err) {
            return err.message;
        }
    }

    update = async (filter, updated, options) => {
        try {
            return await shipmentModel.findOneAndUpdate(filter, updated, options);
        } catch (err) {
            return err.message;
        }
    }

    // No existe un delete porque los envios no se borran, 
    // si se cancela a lo sumo se hace un update y un status 'canceled'.
}

export default ShipmentController;
