const recordModel = require('../modles/record')

const createRecord = async (req, res) => {
    const { recordName, position, level } = req.body
    if (!recordName, !position) {
        return res.status(400).json({ message: "please enter the name and position" })
    }

    const foundRecord = await recordModel.findOne({recordName : recordName})

    if (foundRecord) {
        return res.sendStatus(409)
    }

    const newRecord = new recordModel({
        recordName: recordName,
        position: position,
        level:level
    })

    try {
        await newRecord.save()
        res.status(201).json(newRecord)
    } catch (error) {
        return res.status(500).json({ message: error.message})
    }
}


const getAllrecords = async (req, res) => {
    try {
        const allRecords = await recordModel.find()
        res.json(allRecords)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const getOneRecord = async (req, res, next) => {
    const id = req.params.id
    let foundRecord
    try {
        foundRecord = await recordModel.findById(id)
        if (!foundRecord) {
            return res.status(404).json({ message: `record with id : ${id} doesn't exist in DB` })
         }
    } catch (error) {
    
        res.status(500).json({ message: error.message })
    }
    res.record = foundRecord
    next()
}

const retrieveRecord = (req, res) => {
    res.json(res.record)
}



const patchRecord = async (req, res) => {
    const foundRecord = res.record
    const {recordName,position,level} = req.body
    
    if (recordName && typeof recordName == "string") {
        foundRecord.recordName = recordName
    }

    if (position && typeof position == "string") {
        foundRecord.position = position
    }

    if (level) {
        foundRecord.level = level
    }

    if (!recordName && !position && !level) {
        return res.status(400).json({ message: "please enter valid data" })
    }

    try {
        await foundRecord.save()
        res.json({message:`record with id : ${foundRecord.id} updated seccessfully`})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}


const deleteRecord = async (req,res) => {
    const id = req.params.id

    try {
        await recordModel.deleteOne({_id:id})
        res.sendStatus(204)
    } catch (error) {
        res.status(500).json({message:error})
    }
} 

module.exports = {
    createRecord,
    patchRecord,
    getAllrecords,
    getOneRecord,
    deleteRecord,
    retrieveRecord
}