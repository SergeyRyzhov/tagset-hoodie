export default function (hoodie) {
    return {
        sync() {
            return hoodie.store.sync();
        }
    };
}