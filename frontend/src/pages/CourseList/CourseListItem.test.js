import {render} from "@testing-library/react";
import CourseListItem from "./CourseListItem";
import {MemoryRouter} from "react-router-dom";

it('should render CourseListItem', () => {
    const {getByText} = render(
       <MemoryRouter>
        <CourseListItem
            course={
            {courseName: 'testName',
                subject: 'testSubj',
                _id: 'test',
                courseNumber: 'test',
                students: [],
                teachers:[]
            }}/>
       </MemoryRouter>)
    expect(getByText('0 Students')).toBeInTheDocument()
    expect(getByText(`testSubj:#test - testName`)).toBeInTheDocument()
})
it('should render CourseListItem', () => {
    const {asFragment} = render(
       <MemoryRouter>
        <CourseListItem
            course={
            {courseName: 'testName',
                subject: 'testSubj',
                _id: 'test',
                courseNumber: 'test',
                students: [],
                teachers:[]
            }}/>
       </MemoryRouter>)
    expect(asFragment()).toMatchSnapshot()
})
