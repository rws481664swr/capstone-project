import {act, fireEvent, render} from '@testing-library/react';
import Comments from "./index";
import getData from '../../mock_data/data'
import {MOCK_TOKEN} from "../../../mock-backend";
import axios from "axios";
import MockContext from "../../test-utils/MockContext";

let post, comment
beforeEach(() => {
    const {postsList} = getData()
    post = postsList[0]
    comment =
        {
            "post": post._id,
            "username": "user",
            "content": "Culpa nisi delectus voluptate.",
            "timestamp": "2023-05-24T15:56:23.258Z",
            "_id": "646e33a759eab5cd39bbb8d3",
            "__v": 0
        }
})
jest.mock('axios', () => ({
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn()
}))
const axiosMock =
    async (url,body,config) => {
        if (url.includes('comments')) {
            return {data: [comment]}
        } else if (url.includes('posts')) {
            return {data: [post]}
        } else if (url.includes('auth/token')) {
            return {data: {token: MOCK_TOKEN.current}}
        }
        throw new Error()
    }
it('should render Comments without crashing', () => {
    axios.get.mockImplementation(axiosMock)
    render(
        <MockContext>
        <Comments post={post}/>
        </MockContext>)
})


it('should render Comments Snapshot', () => {
    axios.get.mockImplementation(axiosMock)
    const {asFragment} = render(
        <MockContext>
        <Comments post={post}/>
        </MockContext>)
    expect(asFragment()).toMatchSnapshot()
} )
it('should add a comment', async () => {
    axios.get.mockImplementation(axiosMock)
    axios.post.mockResolvedValue({data: 'comment'})
    const {getByText
        ,getByLabelText , getByPlaceholderText} = render(
        <MockContext>
        <Comments post={post}/>
        </MockContext>)
    await act(async () => {
        fireEvent.click(getByText("Show Comments"))

    })

await act (()=>    fireEvent.change(getByLabelText("Comment"), {target: {value: 'new comment'}}))
    const submitButton = getByText("Add a Comment")

    await act (()=> fireEvent.click(submitButton))
    expect(axios.post).toHaveBeenCalled()
})

