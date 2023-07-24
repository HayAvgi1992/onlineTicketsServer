// to run app with nodemon
npm run devStart

// to run app with node
npm run test

Requests:
GET
http://localhost:3001/tickets/ticketId?userEmail=test2@gmail.com

PUT
http://localhost:3001/tickets/ticketId
Body : 
{
    "title": "Yay34", "content" : "This is a test", "creationTime": 100, "userEmail": "test2@gmail.com", "labels": ["1", "2"]
}

POST
http://localhost:3001/tickets/ticketId
Body: 
{
    "userEmail": "test@gmail.com1",
    "content": "Here at Wix we strive to support you with!"
}

DELETE
http://localhost:3001/tickets/ticketId
Body: 
{
    "userEmail": "test2@gmail.com"
}