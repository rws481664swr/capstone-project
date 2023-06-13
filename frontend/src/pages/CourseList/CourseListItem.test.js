import {render} from "@testing-library/react";
import CourseListItem from "./CourseListItem";
import {MemoryRouter} from "react-router-dom";
import GlobalContext from "../../state/contexts/GlobalContext";
import {MOCK_TOKEN} from "../../test-utils/mock-backend";

it('should render CourseListItem', () => {
    const {getByText} = render(
        <MemoryRouter>
            < GlobalContext.Provider value={{token: MOCK_TOKEN}}>

                <CourseListItem
                    drop={jest.fn()}
                    course={
                        {
                            courseName: 'testName',
                            subject: 'testSubj',
                            _id: 'test',
                            courseNumber: 'test',
                            students: [],
                            teachers: []
                        }}/>
            </GlobalContext.Provider>
        </MemoryRouter>)
    expect(getByText('0 Students')).toBeInTheDocument()
    expect(getByText(`testSubj:#test - testName`)).toBeInTheDocument()
})
it('should render CourseListItem', () => {
    const {asFragment} = render(
        <MemoryRouter>
            < GlobalContext.Provider value={{token: MOCK_TOKEN}}>
                <CourseListItem
                    drop={jest.fn()}
                    course={
                        {
                            courseName: 'testName',
                            subject: 'testSubj',
                            _id: 'test',
                            courseNumber: 'test',
                            students: [],
                            teachers: []
                        }}/>
            </GlobalContext.Provider>
        </MemoryRouter>)
    expect(asFragment()).toMatchSnapshot()
})
