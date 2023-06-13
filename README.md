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
- The app designed mostly around the idea of courses. Once in the Course View, the user has access to all posts and teacher info. With a click the user has access to post info, comments, and for the post owner, the ability to edit their post.

## Implementation
- The project is built using ReactJS, NodeJS, ExpressJS, and MongoDB.
    - The back end is deployed on Heroku at https://edu-comm.herokuapp.com/, but most endpoints are secured using jwt tokens. 
    - The front end is deployed on Netlify and can be accessed at https://edu-comm.netlify.app/

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