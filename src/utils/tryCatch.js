import { logger } from "../index.js"
// import Ticket from "../model/ticketsModel.js"

const tryCatch = (controller) => {
    return async (req, res) => {
        try {
            await controller(req, res)
        } catch (e) {
            logger.error("Error happened " + e)
            return res.status(500).json({
                success: false, message: "Error occur"
            })
        }
    }
}

// const getDbMethod = (name) => {
//     switch (name) {
//         case 'update':
//             return Ticket.findOneAndUpdate
//             break;
    
//         default:
//             break;
//     }
// }

// export const validateFields = (methodName, fields, req, res) => {
//     let updateTicketField
//     let dbApi = getDbMethod(methodName)

//     fields.forEach(key => {
//         updateTicketField[key] = req.body[key]
//     });

//     if (updateTicketField) {
//         logger.info(`${methodName} ticket successfully`)
//         Ticket.findOneAndUpdate({ userEmail }, updateTicketField).then(() => {
//             res.status(200).json({ success: true, message: `Ticket Updated!` })
//         })
//     } else {
//         logger.error("Failed to update Ticket")
//         return res.status(404).json({ success: false, message: "Please supply Title or Content to update" })
//     }
    
// }

export default tryCatch