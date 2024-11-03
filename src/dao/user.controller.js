import userModel from './models/user.model.js';
import config from '../config.js';

class UserController {
    constructor() { }

    get = async () => {
        try {
            return await userModel.find().lean();
        } catch (err) {
            return err.message;
        }
    }

    getPaginated = async (pg) => {
        try {
            return await userModel.paginate({}, { limit: config.ITEMS_PER_PAGE, page: pg, lean: true });
        } catch (err) {
            return err.message;
        }
    }

    add = async (data) => {
        try {
            return await userModel.create(data);
        } catch (err) {
            return err.message;
        }
    }

    update = async (filter, updated, options) => {
        try {
            return await userModel.findOneAndUpdate(filter, updated, options);
        } catch (err) {
            return err.message;
        }
    }

    delete = async (filter, options) => {
        try {
            return await userModel.findOneAndDelete(filter, options);
        } catch (err) {
            return err.message;
        }
    }
}

export default UserController;
