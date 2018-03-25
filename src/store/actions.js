import hoodie from './hoodie.js'

export default {
    sync() {
        return hoodie.store.sync();
    }
}