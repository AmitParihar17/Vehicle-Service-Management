const Contact = require("../../models/contact.model.js")

const contact = async (req,res) => {
    try{
        const {name,email,message} = req.body;

    const newContact =   new Contact({
        name,
        email,
        message,
    })

    await newContact.save()
    res.status(200).json({message : "Contact save successfuly"})

    } catch(error){
        console.log("Failed to save message",error.message);
        res.status(400).json({error : "Failed to save contact"})
        
    }
}

module.exports = {contact}