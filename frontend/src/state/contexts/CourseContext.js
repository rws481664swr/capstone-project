import {createContext, useContext} from "react";


const CourseContext = createContext(null);


export const CourseContextProvider = ({children, course}) =>
    <CourseContext.Provider value={course}>
        {children}
    </CourseContext.Provider>


export const useCourseContext = () => useContext(CourseContext)