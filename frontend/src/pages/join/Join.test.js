import {act, fireEvent, render} from "@testing-library/react";
import Join from "./Join";
import GlobalContext from "../../state/contexts/GlobalContext";
import axios from 'axios'
import {MemoryRouter, useNavigate, useParams} from "react-router-dom";
import {MOCK_TOKEN} from "../../../mock-backend";

const defaultValue = {
    username: 'test',
    token: MOCK_TOKEN,
    timestamp: new Date()
}
const mockNavigate = jest.fn(() => ({id: null}))
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(
        () => mockNavigate)
    , useParams: jest.fn()
}))
// const mockPost = jest.fn()
jest.mock('axios', () => ({
    ...jest.requireActual('axios'),
    post: jest.fn()
}))

const defaultId = '123'
const TestJoin = ({
                      value =
                          defaultValue,
                      id = defaultId,
                      error = ''
                  }) =>
    <MemoryRouter>
        <GlobalContext.Provider value={value}>
            <Join id={''} error={error}/>
        </GlobalContext.Provider>
    </MemoryRouter>

it('should render Join without params', () => {
    useParams.mockImplementationOnce(()=>({}))

    render(<TestJoin value={defaultValue}/>)
})
it('should render Join with params', () => {
    useParams.mockImplementationOnce(()=>({id: '123'}))

    render(<TestJoin value={defaultValue}/>)
})
it('should render Join snapshot without params', () => {
    // useParams.mockImplementationOnce(()=>({}))
    useParams.mockImplementationOnce(()=>({}))

    const {asFragment} = render(<TestJoin value={defaultValue}/>)
    expect(asFragment()).toMatchSnapshot()
})
it('should render Join snapshot with params', () => {
    // useParams.mockImplementationOnce(()=>({}))
    useParams.mockImplementationOnce(()=>({id: '123'}))

    const {asFragment} = render(<TestJoin value={defaultValue}/>)
    expect(asFragment()).toMatchSnapshot()
})
it('should join course via POST', async () => {
    useParams.mockImplementationOnce(()=>({id: '123'}))


    const navigateWasCalled = jest.fn()

    useNavigate.mockImplementation(() => (arg) => {
            navigateWasCalled(arg)
            return () => {
            }
        }
    )
    axios.post.mockImplementation((url) => {
        console.log(url)
        expect(url).toContain('courses/123/users/test')
        return Promise.resolve({data: {}})
    })
    // mockPost.mockResolvedValueOnce({data: {message:'error'}})

    // mockImplementation(() => Promise.resolve({data: {}}))

    const {getByLabelText, getByText} =
        await act(() => render(<TestJoin value={defaultValue}/>))
    const joinBox = getByLabelText(Join.LabelText)
    fireEvent.change(joinBox, {target: {value: '123'}})
    expect(joinBox.value).toBe('123')
    await act(() => fireEvent.click(getByText(Join.ButtonText)))
    expect(useNavigate).toHaveBeenCalled()
    expect(navigateWasCalled).toHaveBeenCalledWith('/courses/123')
})
it('should join course via POST form', async () => {
    useParams.mockImplementationOnce(()=>({id: '123'}))


    const navigateWasCalled = jest.fn()

    useNavigate.mockImplementation(() => (arg) => {
        navigateWasCalled(arg)
            return () => {
            }
        }
    )
    axios.post.mockImplementation((url) => {
        return Promise.resolve({data: {}})
    })

    // mockPost.mockImplementation(() => Promise.resolve({data: {}}))

    const {getByLabelText, getByText} =
        await act(() => render(<TestJoin value={defaultValue}/>))
    const joinBox = getByLabelText(Join.LabelText)
    fireEvent.change(joinBox, {target: {value: '123'}})
    expect(joinBox.value).toBe('123')
    await act(() => fireEvent.click(getByText(Join.ButtonText)))
    expect(useNavigate).toHaveBeenCalled()
    expect(navigateWasCalled).toHaveBeenCalledWith('/courses/123')
})
it('should load a course into params', async () => {
    useParams.mockImplementationOnce(() => ({id: '321'}))

    const {getByLabelText, getByText} =
        await act(() => render(<TestJoin value={defaultValue}/>))
    const joinBox = getByLabelText(Join.LabelText)
    expect(joinBox.value).toBe('321')


})

