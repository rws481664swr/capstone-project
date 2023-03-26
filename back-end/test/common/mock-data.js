import {faker} from "@faker-js/faker";

export const $c1 = () =>
    ({
        subject: 'subject1',
        startDate: new Date(2020, 3, 20),
        endDate: new Date(2022, 3, 25),
        courseName: 'c1',
        courseNumber: faker.datatype.number()
    })


export const $c2 = () =>
    ({
        subject: 'subject2,',
        startDate: new Date(2020, 3, 22),
        endDate: new Date(2020, 5, 28),
        courseName: 'c2',
        courseNumber: faker.datatype.number()
    })
export const $p1 = (course, user, username) =>
    ({
        course,
        user,
        username,
        content: faker.lorem.paragraph(),
        pinned: false,
        postDate: faker.date.recent(10),
    })
export const $p2 = (course, user, username) =>
    ({
        course,
        user,
        username,
        content: faker.lorem.paragraph(),
        pinned: false,
        postDate: faker.date.recent(10),
    })
export const $p3 = (course, user, username) =>
    ({
        course,
        user,
        username,
        content: faker.lorem.paragraph(),
        pinned: false,
        postDate: faker.date.recent(10),
    })

export const $u1 = () =>
    ({
        username: 'u1',
        password: 'password',
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        email: faker.internet.email(),
        role: "STUDENT"
    })
export const $u2 = () =>
    ({
        username: 'u2',
        password: 'password',
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        email: faker.internet.email(),
        role: "TEACHER"
    })
