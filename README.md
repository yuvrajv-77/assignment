
# Backend system for an assignment submission portal




## Tech Stack


**Server:** Node, Express, Mongodb(local), JWT


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`JWT_SECRET=secret23a4`

`PORT = 3001`


## Install & run

Install dependencies with npm

```bash
  npm install
  npm start
```
    
## Endpoints


**User Endpoints**

`POST /register` - Register a new user.

`POST /login` - User login.

`POST /upload` - Upload an assignment.

`GET /admins`- fetch all admins

**Admin Endpoints**

`POST /register` - Register a new admin.

`POST /login` - Admin login.

`GET /assignments` - View assignments tagged to the admin.

`POST /assignments/:id/accept` - Accept an assignment.

`POST /assignments/:id/reject` - Reject an assignment.
## Assignment Upload Body

```
{
    "userId": "6739d2583470c0b904d6f2c2",
    "task":"headline is here",
    "adminId": "6739d42b13c5986d9e4f1c36"
}
```
