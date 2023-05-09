const asyncHandler = require("express-async-handler")
const Contact= require("../models/contactModel")

//@desc Get all contacts- GET
//@route GET/api/contacts
//@access private

const getContacts = asyncHandler(async (req, res) => {
    const contact = await Contact.find({user_id: req.user.id});
  res.status(201).json(contact);
});

//@desc create contact-POST
//@route GET/api/contacts
//@access private

const createContact = asyncHandler (async (req, res) => {
    const {name, email, phone}= req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const contact= await Contact.create({
        name,
        email,
        phone,
        user_id:req.user.id
    })
    res.status(201).json(contact);
});

//@desc get contact- GET
//@route GET/api/contacts/:id
//@access private

const getContact = asyncHandler (async (req, res) => {
    const contact= await Contact.findById(req.params.id)
    if(!contact){
        res.status(404);
        throw new Error("Contact not found")
    }
    res.status(201).json(contact);
});

//@desc update contacts- PUT
//@route GET/api/contacts/:id
//@access private

const updateContact = asyncHandler (async (req, res) => {
    const contact= await Contact.findById(req.params.id)
    if(!contact){
        res.status(404);
        throw new Error("Contact not found")
    }

    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("User don't have permission to update other user contacts")
    }

    const updatedContact= await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new : true}
    )

    res.json(updatedContact);
});
 

//@desc delete contacts
//@route GET/api/contacts/:id
//@access private

const deleteContact = asyncHandler (async (req, res) => {
    const contact= await Contact.findById(req.params.id)
    if(!contact){
        res.status(404);
        throw new Error("Contact not found")
    }

    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("User don't have permission to update other user contacts")
    }

    await Contact.deleteOne({_id: req.params.id});
    res.json(contact);
});
 
 

module.exports = { getContacts, createContact, getContact, updateContact, deleteContact };
