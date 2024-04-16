const Leave = require('../models/leaveModel')
const mongoose = require('mongoose')

//GET all details
const getLeaves = async (req, res) =>{
    const leaves = await Leave.find({}).sort({createdAt: -1})

    res.status(200).json(leaves)
}

//Get a single details
const getLeave = async(req, res) => {
    const{ id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {

        return res.status(404).json({error: 'no such leave'})
    }

    const leave = await Leave.findById(id)

    if(!leave){
        return res.status(404).json({error: 'no such leave'})
    }

    res.status(200).json(leave)
}


//create a single details
const createLeave = async(req , res) => {
    const {employeeid,email, leaveType,startDate,endDate,reason} =req.body

    try{
        const leave = await Leave.create({employeeid,email, leaveType,startDate,endDate,reason})
        res.status(200).json(leave)
    }catch(error){
        res.status(400).json({error: error.message})
    }
}


//delete a single details

const deleteLeave = async (req, res) =>{
    const{ id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {

        return res.status(404).json({error: 'no such leave'})
    }

    const leave = await Leave.findOneAndDelete({_id: id})

    if(!leave){
        return res.status(400).json({error: 'no such leave'})
    }
    res.status(200).json(leave)
}


//update a single details

const updateLeave = async (req, res) =>{
    const{ id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {

        return res.status(404).json({error: 'no such leave'})
    }

    const leave = await Leave.findOneAndUpdate({_id: id}, {
        ...req.body
    })
    if(!leave){
        return res.status(400).json({error: 'no such leave'})
    }

    res.status(200).json(leave)
}


module.exports = {
    getLeaves,
    getLeave,
    createLeave,
    deleteLeave,
    updateLeave
}