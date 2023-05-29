import CourseList from "./index";
import {MemoryRouter} from "react-router-dom";
import {act, render} from "@testing-library/react";
import axios from 'axios'
import getData from "../../mock_data/data";
import {default as GlobalContext} from '../../state/contexts/GlobalContext'
import {extractKeysAsList, MOCK_TOKEN} from "../../../mock-backend";
import {BASE_URL} from "../../config";

jest.mock('axios')
const coursesList = extractKeysAsList(getData().courses)


it('should render CourseList', async () => {

    axios.get.mockResolvedValueOnce({data:coursesList})
    axios.get.mockResolvedValueOnce({data:coursesList})

    const fromCourse = ({subject, courseName, courseNumber}) =>
        `${subject}:#${courseNumber} - ${courseName}`
    const {getByText} = await act(() => render(
        <MemoryRouter>
            <GlobalContext.Provider value={{token:MOCK_TOKEN}}>
                <CourseList/>
            </GlobalContext.Provider>
        </MemoryRouter>))
    coursesList.forEach(course => {
        const txt =
            getByText(fromCourse(course))
        expect(txt).toBeInTheDocument()
    })

})

it('should render CourseList', async () => {

    axios.get.mockResolvedValue({data: coursesList})

    const {getByText, asFragment} = await act(() => render(
        <MemoryRouter>
            <GlobalContext.Provider value={{token:MOCK_TOKEN}}>
                <CourseList/>
            </GlobalContext.Provider>
        </MemoryRouter>))
    expect(asFragment()).toMatchSnapshot()

})