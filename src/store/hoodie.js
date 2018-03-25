import Hoodie from '@hoodie/client'
import PouchDB from 'pouchdb';
//import logger from '../core/logger.js'

const hoodie = new Hoodie({
    PouchDB,
    url: "http://localhost:8081"
})

export default hoodie