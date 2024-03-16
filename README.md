Developed using MERN stack

1. all apis works on Role Based Access Control (RBAC)
2. every api works on Bearer JWT token which holds token expiration date and user info
3. simplied app with standard properties for each mongo collection
4. handeld proper authencitation followed by authorization in every api & UI components
5. implemented singup & login, forgot password with mail notifaiction link to reset password

steps to run:

clone the repo & go to restaurants folder,
1. In .env replace the email & password if needed for notification, replace the mongo url (using localhost:27017/restaurants)

2. in one terminal
   ->cd backend
   ->npm install
   ->npm run dev

   output => started on localhost:4000, and mongo db connected

3. in another terminal
   ->cd frontend
   ->npm install
   ->npm run dev

   output => started, access on http://localhost:3000


Site will be accessible on http://localhost:3000
