const express =require('express');
const Notes = require('../models/Notes');
var fetchuser = require('../middleware/fetchuser');
const router=express.Router();
const { body, validationResult } = require('express-validator');



//ROUTE 1: get notes GET /api/notes/fetchallnotes .login required
router.get('/fetchallnotes',fetchuser,async (req,res)=>{
    try {
        const notes=await Notes.find({user:req.user.id});//finding notes of the corresponding user
        res.json(notes)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
    
})
//ROUTE 2: get notes GET /api/notes/addnotes .login required
// to save new notes in db
router.post('/addnotes',fetchuser,[
    body('title',"Enter a valid title").isLength({min:3}),
    body('description',"Enter a valid description").isLength({min:5})
], async (req,res)=>{
    try {
        // get notes from request body
        const {title,description,tag}=req.body;

        // if error exist send bad request 400 status
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        //add title,desc,tag in new Notes object
        const note=new Notes({
            title,description,tag,user:req.user.id
        })
        // save() function to save the notes
        const savedNote=await note.save()
        res.json(savedNote)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// Route 3: Update an existing note PUT :/api/notes/updatenote/:id note id to refer to which note to update  Login required{jwt token required}

router.put('/updatenotes/:id',fetchuser,async(req,res)=>{
    //destructure the request body 
    const{title,description,tag}=req.body;
    //create an empty new note object
    const newNote={};
    if(title){newNote.title=title};// if title is present in the req body
    if(description){newNote.description=description};
    if(tag){newNote.tag=tag};
    //req.params.id = note id in the url
    let note= await Notes.findById(req.params.id);
    if(!note){
        return res.status(404).send("Not Found")
    }
    // matching the existing user id with logged in user id
    if(note.user.toString()!=req.user.id){
        return res.status(401).send("Not Found")
    }
// find the note and update
note = await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
res.json({note});
})

// Route 4: Delete an existing note DELETE :/api/notes/deletenote/:id note id to refer to which note to update  Login required{jwt token required}

router.delete('/deletenotes/:id',fetchuser,async(req,res)=>{
    try {
        //req.params.id = note id in the url
    let note= await Notes.findById(req.params.id);
    if(!note){
        return res.status(404).send("Not Found")
    }
    // matching the existing user id with logged in user id
    if(note.user.toString()!=req.user.id){
        return res.status(401).send("Not Found")
    }
// find the note and update
note = await Notes.findOneAndDelete(req.params.id)
res.json({"Success":"Deleled Note",note:note});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }


})
module.exports=router