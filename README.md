# Talk-App
App for chat with users via text messages and audio calls written in Java and Spring (backend), React Native with Typescript (frontend) and PostgreSQL (database).

Users can make an account and add another users to contact list to communicate with them. 
During audio call users can see the location of each other.
They can create servers for group messages. 
A push notification is send to user when someone adds him to the contact list and when someone new joins the server where user is a member.
## Run
### Database
Database image with test data is available on [dockerhub](https://hub.docker.com/repository/docker/anarak/talk-app).

Download image from dockerhub typing: ```docker pull anarak/talk-app:v1.0.5``` in console.

Run using: ```docker run -p 5432:5432 --rm [IMAGE_ID]```
### Backend
Open server folder with IntelliJ.

Add firebase-service-account.json in resources directory and run.
### Frontend
In terminal go to client directory and download dependencies using: ```npm i```

Add Api key in AndroidManifest.xml and google-services.json in android app folder.

Start project using: ```npm start```
