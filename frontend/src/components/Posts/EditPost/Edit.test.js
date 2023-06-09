import {fireEvent, render} from "@testing-library/react";
import Edit from "./Edit";
import MockContext from "../../../test-utils/MockContext";
import {useDispatch} from "react-redux";
import {act} from "react-dom/test-utils";
import axios from "axios";

jest.mock('axios', () => ({
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn()
}))
const mockDispatch = jest.fn()
jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useSelector: jest.fn(),
    useDispatch: jest.fn(() => () => {
    })
}))
it('should render Edit', async () => {
    const editing = {isEditing: true}

    const setEditMode = jest.fn((mode) => {
        editing.isEditing = mode
    })
    const setPost = jest.fn((post) => {
        editing.post = post
    })
    const post = {
        _id: '123',
        title: 'test',
        content: 'test-content'
    }
    axios.put.mockImplementation(async (url, body) => {
        console.log(url)
        console.log(body)
        expect(body).toEqual({title: 'test', content: 'changed'})
        expect(url).toContain('123')
        console.log("AXIOSPUT")
        return {
            data: body
        }
    })
    // const reducer = (state,action)=>{
    //     if(action.type[0]==='@'){
    //         return state
    //     }
    //
    // }


    useDispatch.mockImplementation(() => (mockDispatch))

    // configureStore({reducer})
    const {getByLabelText, getByText} =
        render(<MockContext>
            <Edit post={post} setEditMode={setEditMode} setPost={setPost} editMode={editing.isEditing}/>)
        </MockContext>)
    const title = getByLabelText('Title')
    const content = getByLabelText('Content')
    expect(title).toBeInTheDocument()
    expect(content).toBeInTheDocument()
    fireEvent.change(title, {target: {value: 'test'}})
    fireEvent.change(content, {target: {value: 'changed'}})
    await act(() => fireEvent.click(getByText('Save')))
    expect(axios.put).toHaveBeenCalled()
    expect(setEditMode).toHaveBeenCalledWith(false)
    expect(editing.isEditing).toBe(false)
    expect(setPost).toHaveBeenCalledWith({...post, title: 'test', content: 'changed'})
    expect(editing.post).toEqual({...post, title: 'test', content: 'changed'})


})