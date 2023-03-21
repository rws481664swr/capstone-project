import express from "express";

const router = express.Router()
export default router
router.get('/',async (req,res)=>{})
router.get('/:id',async (req,res)=>{})
router.put('/:id',async (req,res)=>{})
router.post('/',async (req,res)=>{})
router.delete('/:id',async (req,res)=>{})

//enroll in course
router.post('/:id/users/:username',async (req,res)=>{})

//unenroll
router.delete('/:id/users/:username',async (req,res)=>{})