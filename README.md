# Education Communication and Collaboration Site

- This is a project for the UMass Global Software Engineering Bootcamp.
- The project is a web application that is designed to
  - facilitate communication and collaboration among students and instructors in an educational setting.
  - serve as a centralized hub for asking and answering questions, sharing resources, and engaging in discussions related to course materials.

- There are three types of users in the system: students, teachers, and administrators.
- The app provides the following features: 
- - Students can: 
  - - join courses, read posts in their courses, post in courses, and comment on posts they've read.
  - - Teachers can: 
  - create courses, mark posts as pinned, as well as do everything students can do.
  - Administrators have control over most functions in the app with the idea that the api might be used by a CMS or LMS to extend or complete functionality.

 The app designed mostly around the idea of courses. Once in the Course View, the user has access to all posts and teacher info. With a click the user has access to post info, comments, and for the post owner, the ability to edit their post. The idea is to keep the ability to communicate, whether through posts or comments, very close together and easy to access. 
 Courses are more visually divided to intentionally break up users into little "communities" surrounding coureses.

## Implementation

- The implementation is Course-Orientedd 
	-  In a course there are 
	-  users:students and teachers 
	-  users can make posts
	-  all users in a course can see posts
	-  both students and teachers can comment on posts
	-  Teachers can mark posts as pinned.
-  In addition to courses and posts, there are profiles where users can share there contact info for direct communication and collabaoration
-  Each user has their courses and a profile and can navigate between them
- The project is built using ReactJS, NodeJS, ExpressJS, and MongoDB. 
	- Some essential libraries used in this project include `redux` and `react-router` on the front end and  `express` and `mongoose` on the back end.
    - The back end is deployed on Heroku at https://edu-comm.herokuapp.com/, but most endpoints are secured using jwt tokens. The database is on MongoDb Atlas.
    - The front end is deployed on Netlify and can be accessed at https://edu-comm.netlify.app/

## API
I created my own API for storing

* users (with 3 unique roles and varied permissions)
* courses
* posts
* comments
* user credentials 
The API uses jwt tokens to verify who the user is and what they can request. As said above, it is build on Node/Mongo/Express. I tested it with mocha, chai and c8 for coverage. My tests are in a test directory and can be run bby `npm install ; npm test`	

## Demo

  - For testing and demonstration, the following users have been created:
    - Student
      - username: user
      - password: password
    - Teacher
      - username: teacher_1
      - password: password
    - Admin
      - username: admin
      - password: password
  
###### A note about testing users: The users are enrolled in courses already and teachers are set up to teach them as example data. There are routes in the API that handle this, and joining a course is possible given the course id, but it is mainly intended to be done with the API in conjunction with a learning management system. 

## Deployment Instructions
 - To deploy locally, clone the repository and run npm install in both the frontend and backend project folders.
 - An instance of mongodb must be running locally. `NODE_ENV` must be set to `development`
 - To run, use npm start in both the frontend and backend project folders.