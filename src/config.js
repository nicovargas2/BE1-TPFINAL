import * as url from 'url';

const config = {
    PORT: 5050,
    DIRNAME: url.fileURLToPath(new URL('.', import.meta.url)),
    get UPLOAD_DIR() { return `${this.DIRNAME}/public/uploads` },
    MONGODB_URI: 'mongodb+srv://nicolas:coder1234@cluster66561.bnw3y.mongodb.net/LogisticaDB',
    USERS_COLLECTION: 'users',
    SHIPMENTS_COLLECTION: 'shipments',
    VEHICLES_COLLECTION: 'vechiles',
    TRACKING_UPDATES_COLLECTION: 'trackingupdates',
    ITEMS_PER_PAGE: 10
};

export default config;
