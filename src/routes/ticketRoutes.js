import { Router } from 'express';
import * as ticketController from '../controllers/ticket.js'
export const router = Router()

router.route("/ticketId")
    .get(ticketController.getOneTicket) // read
    .put(ticketController.insertNewTicket) // create
    .post(ticketController.updateTicket) // update
    .delete(ticketController.deleteTicket) // delete

router.get("/", ticketController.getAllTickets) // read all data