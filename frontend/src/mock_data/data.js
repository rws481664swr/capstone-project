const keysToList = (obj)=>
    Object.keys(obj).map((key)=>obj[key]);

const getData=()=>{
    const raw={
        teachers: {
            "646e33a359eab5cd39bbb89f": {
                "_id": "646e33a359eab5cd39bbb89f",
                "username": "teacher_1",
                "first_name": "Hubert",
                "last_name": "Larson",
                "email": "Hubert.Larson46@gmail.com",
                "courses": [
                    "646e33a759eab5cd39bbb8a9",
                    "646e33a759eab5cd39bbb8ab"
                ],
                "role": "TEACHER",
                "__v": 0
            },
            "646e33a559eab5cd39bbb8a3": {
                "_id": "646e33a559eab5cd39bbb8a3",
                "username": "teacher_2",
                "first_name": "Andrew",
                "last_name": "Goldner",
                "email": "Andrew_Goldner22@yahoo.com",
                "courses": [
                    "646e33a759eab5cd39bbb8aa",
                    "646e33a759eab5cd39bbb8ab"
                ],
                "role": "TEACHER",
                "__v": 0
            }
        },
        students: {
            "646e339e59eab5cd39bbb893": {
                "_id": "646e339e59eab5cd39bbb893",
                "username": "user",
                "first_name": "Edwin",
                "last_name": "Jacobson",
                "email": "Edwin_Jacobson@hotmail.com",
                "courses": [
                    "646e33a759eab5cd39bbb8a9",
                    "646e33a759eab5cd39bbb8ab"
                ],
                "role": "STUDENT",
                "__v": 0
            },
            "646e33a059eab5cd39bbb897": {
                "_id": "646e33a059eab5cd39bbb897",
                "username": "student_2",
                "first_name": "Vesta",
                "last_name": "Rosenbaum",
                "email": "Vesta85@gmail.com",
                "courses": [
                    "646e33a759eab5cd39bbb8aa"
                ],
                "role": "STUDENT",
                "__v": 0
            },
            "646e33a159eab5cd39bbb89b": {
                "_id": "646e33a159eab5cd39bbb89b",
                "username": "student_3",
                "first_name": "Neil",
                "last_name": "Monahan",
                "email": "Neil.Monahan@gmail.com",
                "courses": [
                    "646e33a759eab5cd39bbb8ab"
                ],
                "role": "STUDENT",
                "__v": 0
            }
        },
        admin: {
            "_id": "646e33a759eab5cd39bbb8a7",
            "username": "admin",
            "first_name": "Brad",
            "last_name": "Heathcote",
            "email": "Brad_Heathcote37@gmail.com",
            "courses": [],
            "role": "ADMIN",
            "__v": 0
        },
        users: {
            "646e33a759eab5cd39bbb8a7": {
                "_id": "646e33a759eab5cd39bbb8a7",
                "username": "admin",
                "first_name": "Brad",
                "last_name": "Heathcote",
                "email": "Brad_Heathcote37@gmail.com",
                "courses": [],
                "role": "ADMIN",
                "__v": 0
            },
            "646e33a359eab5cd39bbb89f": {
                "_id": "646e33a359eab5cd39bbb89f",
                "username": "teacher_1",
                "first_name": "Hubert",
                "last_name": "Larson",
                "email": "Hubert.Larson46@gmail.com",
                "courses": [
                    "646e33a759eab5cd39bbb8a9",
                    "646e33a759eab5cd39bbb8ab"
                ],
                "role": "TEACHER",
                "__v": 0
            },
            "646e33a559eab5cd39bbb8a3": {
                "_id": "646e33a559eab5cd39bbb8a3",
                "username": "teacher_2",
                "first_name": "Andrew",
                "last_name": "Goldner",
                "email": "Andrew_Goldner22@yahoo.com",
                "courses": [
                    "646e33a759eab5cd39bbb8aa",
                    "646e33a759eab5cd39bbb8ab"
                ],
                "role": "TEACHER",
                "__v": 0
            },
            "646e339e59eab5cd39bbb893": {
                "_id": "646e339e59eab5cd39bbb893",
                "username": "user",
                "first_name": "Edwin",
                "last_name": "Jacobson",
                "email": "Edwin_Jacobson@hotmail.com",
                "courses": [
                    "646e33a759eab5cd39bbb8a9",
                    "646e33a759eab5cd39bbb8ab"
                ],
                "role": "STUDENT",
                "__v": 0
            },
            "646e33a059eab5cd39bbb897": {
                "_id": "646e33a059eab5cd39bbb897",
                "username": "student_2",
                "first_name": "Vesta",
                "last_name": "Rosenbaum",
                "email": "Vesta85@gmail.com",
                "courses": [
                    "646e33a759eab5cd39bbb8aa"
                ],
                "role": "STUDENT",
                "__v": 0
            },
            "646e33a159eab5cd39bbb89b": {
                "_id": "646e33a159eab5cd39bbb89b",
                "username": "student_3",
                "first_name": "Neil",
                "last_name": "Monahan",
                "email": "Neil.Monahan@gmail.com",
                "courses": [
                    "646e33a759eab5cd39bbb8ab"
                ],
                "role": "STUDENT",
                "__v": 0
            }
        },
        courses: {
            "646e33a759eab5cd39bbb8a9": {
                "courseNumber": 76351,
                "courseName": "c1",
                "subject": "subject1",
                "startDate": "2020-04-20T04:00:00.000Z",
                "endDate": "2022-04-25T04:00:00.000Z",
                "students": [],
                "teachers": [],
                "_id": "646e33a759eab5cd39bbb8a9",
                "__v": 0
            },
            "646e33a759eab5cd39bbb8aa": {
                "courseNumber": 24034,
                "courseName": "c2",
                "subject": "subject2",
                "startDate": "2020-04-20T04:00:00.000Z",
                "endDate": "2022-04-25T04:00:00.000Z",
                "students": [],
                "teachers": [],
                "_id": "646e33a759eab5cd39bbb8aa",
                "__v": 0
            },
            "646e33a759eab5cd39bbb8ab": {
                "courseNumber": 94630,
                "courseName": "c3",
                "subject": "subject3",
                "startDate": "2020-04-20T04:00:00.000Z",
                "endDate": "2022-04-25T04:00:00.000Z",
                "students": [],
                "teachers": [],
                "_id": "646e33a759eab5cd39bbb8ab",
                "__v": 0
            }
        },
        posts: {
            "646e33a759eab5cd39bbb8c5": {
                "course": "646e33a759eab5cd39bbb8a9",
                "username": "user",
                "user": "646e339e59eab5cd39bbb893",
                "title": "Nulla saepe et nemo molestiae ducimus provident.",
                "content": "Expedita velit ea nesciunt odio. Illum dolorem dignissimos eos earum dolor eius iusto corporis. Neque inventore numquam vel.",
                "pinned": false,
                "postDate": "2023-05-16T16:52:36.724Z",
                "comments": [],
                "_id": "646e33a759eab5cd39bbb8c5",
                "__v": 0
            },
            "646e33a759eab5cd39bbb8c7": {
                "course": "646e33a759eab5cd39bbb8a9",
                "username": "user",
                "user": "646e339e59eab5cd39bbb893",
                "title": "In voluptatem laboriosam occaecati voluptate labore recusandae.",
                "content": "Earum cupiditate aliquam illo. Dolorum vitae beatae totam excepturi animi illum. Perspiciatis optio corporis modi quidem minus expedita aliquam corporis non. Quam perspiciatis vero.",
                "pinned": false,
                "postDate": "2023-05-20T15:48:55.471Z",
                "comments": [],
                "_id": "646e33a759eab5cd39bbb8c7",
                "__v": 0
            },
            "646e33a759eab5cd39bbb8c9": {
                "course": "646e33a759eab5cd39bbb8a9",
                "username": "teacher_1",
                "user": "646e33a359eab5cd39bbb89f",
                "title": "Beatae labore consectetur illum reiciendis nihil odit non nemo.",
                "content": "Id aliquid laboriosam odit facilis voluptatem enim deleniti. Nemo dolorem placeat exercitationem animi repudiandae similique. Tempore natus veniam numquam quae corporis dolores quia. Tempora assumenda quasi sit maxime laudantium quos. Blanditiis enim accusamus fugit repellendus ipsa quae. Sapiente voluptate dolorem iste perspiciatis modi officiis sit magnam.",
                "pinned": false,
                "postDate": "2023-05-21T18:55:37.350Z",
                "comments": [],
                "_id": "646e33a759eab5cd39bbb8c9",
                "__v": 0
            },
            "646e33a759eab5cd39bbb8cb": {
                "course": "646e33a759eab5cd39bbb8aa",
                "username": "student_2",
                "user": "646e33a059eab5cd39bbb897",
                "title": "Repellat iste debitis non architecto veniam cumque.",
                "content": "Ex maiores dicta repellendus autem. At tenetur odio. Tempore mollitia magni excepturi. Provident quis corrupti vitae. Culpa id magnam minus nostrum ad magni.",
                "pinned": false,
                "postDate": "2023-05-21T14:13:09.715Z",
                "comments": [],
                "_id": "646e33a759eab5cd39bbb8cb",
                "__v": 0
            },
            "646e33a759eab5cd39bbb8cd": {
                "course": "646e33a759eab5cd39bbb8aa",
                "username": "teacher_2",
                "user": "646e33a559eab5cd39bbb8a3",
                "title": "Dolores impedit dolor nesciunt maiores architecto optio optio beatae beatae.",
                "content": "Quas facere voluptatem. Temporibus sequi voluptas doloribus distinctio ut consequuntur quibusdam voluptatem. Quod exercitationem sapiente harum officia. Accusantium nesciunt nobis nobis nulla est saepe quidem aliquam. Magnam assumenda corrupti tempore tempora facilis. Necessitatibus dolorum itaque enim.",
                "pinned": false,
                "postDate": "2023-05-19T15:55:29.704Z",
                "comments": [],
                "_id": "646e33a759eab5cd39bbb8cd",
                "__v": 0
            },
            "646e33a759eab5cd39bbb8cf": {
                "course": "646e33a759eab5cd39bbb8ab",
                "username": "user",
                "user": "646e339e59eab5cd39bbb893",
                "title": "Est culpa rerum sapiente illum perferendis nobis.",
                "content": "Aperiam ad tempora corporis ducimus. Totam modi autem culpa officiis corporis corrupti optio. Fugiat soluta quasi.",
                "pinned": false,
                "postDate": "2023-05-20T05:34:29.275Z",
                "comments": [],
                "_id": "646e33a759eab5cd39bbb8cf",
                "__v": 0
            },
            "646e33a759eab5cd39bbb8d1": {
                "course": "646e33a759eab5cd39bbb8ab",
                "username": "student_2",
                "user": "646e33a059eab5cd39bbb897",
                "title": "Aperiam vitae fuga vero voluptatibus asperiores modi minus blanditiis.",
                "content": "Impedit itaque debitis consectetur soluta voluptas consequuntur eaque molestias. Quibusdam quo non nihil ducimus placeat quis amet mollitia provident. Veniam deleniti fuga velit illo earum quas enim.",
                "pinned": false,
                "postDate": "2023-05-24T06:36:49.385Z",
                "comments": [],
                "_id": "646e33a759eab5cd39bbb8d1",
                "__v": 0
            }
        },
        comments: {
            "646e33a759eab5cd39bbb8d3": {
                "post": "646e33a759eab5cd39bbb8c5",
                "username": "user",
                "content": "Culpa nisi delectus voluptate.",
                "timestamp": "2023-05-24T15:56:23.258Z",
                "_id": "646e33a759eab5cd39bbb8d3",
                "__v": 0
            },
            "646e33a759eab5cd39bbb8d5": {
                "post": "646e33a759eab5cd39bbb8c7",
                "username": "teacher_1",
                "content": "Quia aliquid nesciunt reprehenderit iure consequatur at molestias debitis fugit.",
                "timestamp": "2023-05-24T15:56:23.259Z",
                "_id": "646e33a759eab5cd39bbb8d5",
                "__v": 0
            },
            "646e33a759eab5cd39bbb8d7": {
                "post": "646e33a759eab5cd39bbb8c7",
                "username": "user",
                "content": "Qui doloremque quisquam rerum laboriosam deleniti at sint magnam numquam.",
                "timestamp": "2023-05-24T15:56:23.259Z",
                "_id": "646e33a759eab5cd39bbb8d7",
                "__v": 0
            },
            "646e33a759eab5cd39bbb8d9": {
                "post": "646e33a759eab5cd39bbb8cb",
                "username": "student_2",
                "content": "Non ducimus ex exercitationem quam consequatur explicabo.",
                "timestamp": "2023-05-24T15:56:23.260Z",
                "_id": "646e33a759eab5cd39bbb8d9",
                "__v": 0
            },
            "646e33a759eab5cd39bbb8db": {
                "post": "646e33a759eab5cd39bbb8cb",
                "username": "teacher_2",
                "content": "Quisquam est placeat.",
                "timestamp": "2023-05-24T15:56:23.260Z",
                "_id": "646e33a759eab5cd39bbb8db",
                "__v": 0
            },
            "646e33a759eab5cd39bbb8dd": {
                "post": "646e33a759eab5cd39bbb8d1",
                "username": "student_3",
                "content": "Assumenda recusandae esse nemo fuga in.",
                "timestamp": "2023-05-24T15:56:23.262Z",
                "_id": "646e33a759eab5cd39bbb8dd",
                "__v": 0
            },
            "646e33a759eab5cd39bbb8df": {
                "post": "646e33a759eab5cd39bbb8cf",
                "username": "teacher_1",
                "content": "Aliquam vitae soluta labore unde sapiente.",
                "timestamp": "2023-05-24T15:56:23.263Z",
                "_id": "646e33a759eab5cd39bbb8df",
                "__v": 0
            },
            "646e33a759eab5cd39bbb8e1": {
                "post": "646e33a759eab5cd39bbb8cf",
                "username": "teacher_2",
                "content": "Blanditiis quisquam consequatur ut.",
                "timestamp": "2023-05-24T15:56:23.263Z",
                "_id": "646e33a759eab5cd39bbb8e1",
                "__v": 0
            }
        },
        user: {
            "_id": "646e339e59eab5cd39bbb893",
            "username": "user",
            "first_name": "Edwin",
            "last_name": "Jacobson",
            "email": "Edwin_Jacobson@hotmail.com",
            "courses": [
                "646e33a759eab5cd39bbb8a9",
                "646e33a759eab5cd39bbb8ab"
            ],
            "role": "STUDENT",
            "__v": 0
        },
        teacher: {
            "_id": "646e33a359eab5cd39bbb89f",
            "username": "teacher_1",
            "first_name": "Hubert",
            "last_name": "Larson",
            "email": "Hubert.Larson46@gmail.com",
            "courses": [
                "646e33a759eab5cd39bbb8a9",
                "646e33a759eab5cd39bbb8ab"
            ],
            "role": "TEACHER",
            "__v": 0
        }
    }
    const {users,
        teachers,
        students,
        courses,
        posts,
        comments
    } =raw
    const lists= {
        usersList : keysToList(users),
        teachersList : keysToList(teachers),
        postsList : keysToList(posts),
        studentsList : keysToList(students),
        coursesList : keysToList(courses),
        commentsList : keysToList(comments)
    }
    return {...raw,...lists}
}

export default getData