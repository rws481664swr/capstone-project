import {ADD, INIT, REMOVE, UPDATE} from "../../actions/actions";

export const addCourse = (course) => {
    return {
        type: ADD,
        payload: course
    }
}
//create removeCourse action creator
export const removeCourse = (id) => {
    return {
        type: REMOVE,
        payload: id
    }
}
//create updateCourse action creator
export const updateCourse = (course) => {
    return {
        type: UPDATE,
        payload: course
    }
}
//create initCourses action creator
export const initCourses = (courses) => {
    return {
        type: INIT,
        payload: courses
    }
}


