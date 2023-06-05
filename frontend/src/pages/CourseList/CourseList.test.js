import CourseList from "./index";
import {MemoryRouter} from "react-router-dom";
import {act, render} from "@testing-library/react";
import axios from 'axios'
import getData from "../../mock_data/data";
import {default as GlobalContext} from '../../state/contexts/GlobalContext'
import {extractKeysAsList, MOCK_TOKEN} from "../../../mock-backend";
import {BASE_URL} from "../../config";
import chalk from "chalk";
const mockCoursesList = extractKeysAsList(getData().courses)

jest.mock('axios'  ,()=>({
    ...jest.requireActual('axios'),
    get:jest.fn()
}))
const mockGet= (url, cfg) => {

    if(url.includes(`/courses`)){
        return   Promise.resolve({data:mockCoursesList})
    }else if (url.includes(`/auth/token`)){
        return  Promise.resolve({data: {token:MOCK_TOKEN.current}})
    }
    throw new Error( `MOCK GET: ${url} not implemented`)
}
it('should render CourseList', async () => {
    // axios.get.mockImplementation()
    axios.get.mockImplementation(mockGet)


    const fromCourse = ({subject, courseName, courseNumber}) =>
        `${subject}:#${courseNumber} - ${courseName}`
    const {getByText} = await act(() => render(
        <MemoryRouter>
            <GlobalContext.Provider value={{token:MOCK_TOKEN}}>
                <CourseList/>
            </GlobalContext.Provider>
        </MemoryRouter>))
    mockCoursesList.forEach(course => {
        const txt =
            getByText(fromCourse(course))
        expect(txt).toBeInTheDocument()
    })

})
 it('should render CourseList as Fragment', async () => {

     axios.get.mockImplementation(mockGet)



    const {getByText, asFragment} = await act(() => render(
        <MemoryRouter>
            <GlobalContext.Provider value={{token:MOCK_TOKEN}}>
                <CourseList/>
            </GlobalContext.Provider>
        </MemoryRouter>))
    expect(asFragment()).toMatchSnapshot()

})