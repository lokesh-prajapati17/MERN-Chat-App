const messageModel = require('../Modal/MessageModal')
module.exports.addMessages = async (req, res, next) =>{
try {
    const {from, to, message} = req.body
    const data = await messageModel.create({
        message:{
            text:message
        },
        users:[from, to],
        sender:from
    })

    await data.save()
    res.status(200).json(data)
} catch (error) {
    next(error)
}
}
module.exports.getAllMessages = async (req, res, next) =>{
    try {
        const {from, to} = req.body;
        const message = await messageModel.find({
            users:{
                $all:[from , to],
            }
        }).sort({updatedAt:1})

        const projectMessage = message.map((msg)=>{
            return {
                fromSelf: msg.sender.toString() === from,
                message: msg.message.text,
                time: msg.updatedAt 

            }
        })

        res.status(200).json(projectMessage)
        } catch (error) {
        next(error)
    }
}


module.exports.getMessages = async (req, res, next) =>{
    try {
        const message = await messageModel.find({
            users:{
                $all:[from , to],
            }
        }).sort({updatedAt:1})
        const projectMessage = message.map((msg)=>{
            return {
                fromSelf: msg.sender.toString() === from,
                message: msg.message.text,
                time: msg.updatedAt 

            }
        })
        res.status(200).json(projectMessage)
    } catch (error) {
        console.log("error to get messages", error);
        res.status(500).json({message:error.message})
        next(error)
    }
}