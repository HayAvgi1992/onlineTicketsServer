import { logger } from '../index.js'
import Ticket from '../model/ticketsModel.js'
import tryCatch from '../utils/tryCatch.js'

export const getAllTickets = tryCatch(async (req, res) => {
    const tickets = await Ticket.find()

    if (tickets == null || tickets.length == 0) {
        logger.error("Failed to load all tickets")
        return res.status(400).json({ success: false, message: "Could not get any tickets from DB" })
    }
    logger.info("Read all tickets data ...")
    return res.status(200).json({ success: true, result: { tickets } })
})

export const getOneTicket = tryCatch(async (req, res) => {
    const { userEmail } = req.query // query params
    const ticket = await Ticket.findOne({ userEmail })
    if (!ticket) {
        logger.error("Could not found any ticket")
        return res.status(404).json({ success: false, message: "Did not found any ticket for this email" })
    }
    logger.info(`Get ${userEmail} email ticket`)
    return res.status(200).json({ success: true, result: { ticket } })

})

export const insertNewTicket = tryCatch((req, res) => {
    const {
        title,
        content,
        creationTime,
        userEmail,
        labels
    } = req.body

    if (title && content && creationTime && userEmail && labels && labels.length > 0) {
        Ticket.create({
            title,
            content,
            creationTime,
            userEmail,
            labels
        }).then(() => {
            logger.info("Insert new ticket successfully")
            res.status(200).json({ success: true, message: `${userEmail} Ticket Created!` })
        })
    } else {
        logger.error("Failed to insert a ticket")
        return res.status(404).json({ success: false, message: "Didn't get all mandatory fields" })
    }
})

export const updateTicket = tryCatch((req, res) => {
    let updateTicketField
    const {
        title,
        content,
        userEmail
    } = req.body

    if (title) updateTicketField = { title }
    if (content) updateTicketField = { content }

    if (updateTicketField) {
        logger.info("Update ticket successfully")
        Ticket.findOneAndUpdate({ userEmail }, updateTicketField).then((ticket) => {
            if (ticket) res.status(200).json({ success: true, message: `Ticket Updated!` })
            else res.status(404).json({ success: false, message: "Didnt find matching ticket" })
        }).catch(e => {
            logger.error('error occure while trying to update ticket. Error: '+ e.message)
            res.status(500).json({ success: false, message: "error occure while trying to update ticket" })
        })
    } else {
        logger.error("Failed to update Ticket")
        return res.status(404).json({ success: false, message: "Please supply Title or Content to update" })
    }
})

export const deleteTicket = tryCatch((req, res) => {
    const {
        userEmail
    } = req.body

    if (userEmail) {
        Ticket.deleteOne({
            userEmail
        }).then(() => {
            logger.info("Delete ticket successfully")
            res.status(200).json({ success: true, message: `${userEmail} Ticket Deleted!` })
        })
    } else {
        logger.error("Failed to delete ticket")
        return res.status(404).json({ success: false, message: "Didn't get user email" })
    }
})