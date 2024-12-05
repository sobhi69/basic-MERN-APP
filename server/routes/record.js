const express = require("express")
const recordRoutes = express.Router()

const {
    getAllrecords,
    getOneRecord,
    retrieveRecord,
    patchRecord,
    deleteRecord,
    createRecord
} = require('../controllers/record')

// create a record
recordRoutes.post('/',createRecord)

// get all records
recordRoutes.get('/', getAllrecords)

// some operations with the id paramater
recordRoutes.route('/:id')
    .get(getOneRecord, retrieveRecord)
    .post(getOneRecord, patchRecord)
    .delete(getOneRecord, deleteRecord)

module.exports = recordRoutes