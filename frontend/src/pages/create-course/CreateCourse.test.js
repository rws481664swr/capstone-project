import {act, fireEvent, render} from "@testing-library/react";
import MockContext from "../../test-utils/MockContext";


import CreateCourse from "./CreateCourse";
import axios from "axios";
import reactRouterDom from "react-router-dom";

jest.mock('axios')
const mockNavigate = jest.fn(() => ({id: null}))
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(
        () => mockNavigate)
}))
describe('CreateCourse', () => {
    it('should render CreateCourse', () => {
        const {getByTestId, getByLabelText, getByText} = render(
            <MockContext role={"TEACHER"}>
                <CreateCourse/>
            </MockContext>)
        expect(getByLabelText('Course Name')).toBeInTheDocument()
        expect(getByLabelText('Subject')).toBeInTheDocument()
        expect(getByLabelText('Start Date')).toBeInTheDocument()
        expect(getByLabelText('End Date')).toBeInTheDocument()

    })
    it('should match snapshot', () => {
        const {asFragment} = render(
            <MockContext role={"TEACHER"}>
                <CreateCourse/>
            </MockContext>)
        expect(asFragment()).toMatchSnapshot()
    })
    it('should render error message if not a teacher or admin', () => {
        const {getByText} = render(
            <MockContext role={"STUDENT"}>
                <CreateCourse/>
            </MockContext>)
        expect(getByText('Unauthorized')).toBeInTheDocument()
    })
    it('should create a course', async () => {
        const {getByTestId, getByLabelText, getByText} = render(
            <MockContext role={"TEACHER"}>
                <CreateCourse/>
            </MockContext>)
        const nav = jest.fn()
        const mockNav=() => nav
        reactRouterDom.useNavigate.mockImplementationOnce(mockNav)
        axios.post.mockImplementationOnce(async (url,body,config) => {
            expect(url).toInclude('courses')
            expect(body).toHaveProperty('courseName')
            expect(body).toHaveProperty('subject')
            expect(body).toHaveProperty('startDate')
            expect(body).toHaveProperty('endDate')

            return {data: {message: 'Course Created'}}
        }   )
        fireEvent.change(getByLabelText('Course Name'), {target: {value: 'test'}})
        fireEvent.change(getByLabelText('Subject'), {target: {value: 'test'}})
        fireEvent.change(getByLabelText('Start Date'), {target: {value: '2021-01-01'}})
        fireEvent.change(getByLabelText('End Date'), {target: {value: '2021-01-01'}})
        fireEvent.click(getByText('Create Course'))
        await act(() => fireEvent.click(getByText('Create Course')))
    })

})