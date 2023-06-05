import {render,fireEvent} from '@testing-library/react'
import PostDisplay from "./PostDisplay";
import MockContext from "../../../test-utils/MockContext";
import {Provider} from "react-redux";
import postsStore from "../../../state/redux/postsStore";
import {act} from "react-dom/test-utils";
import axios from "axios";
import getData from "../../../mock_data/data";
import {MOCK_TOKEN} from "../../../../mock-backend";

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
it('should render PostDisplay', function () {
axios.get.mockImplementation(axiosMock)
    const val = {post:null }
    const {asFragment} = render(
        <MockContext>
            <Provider store={postsStore}>
            <PostDisplay post={val.post} setPost={(v)=>val.post=v} />
            </Provider>
        </MockContext>)
    expect(asFragment()).toMatchSnapshot()
});it('should render PostDisplay with post', function () {
axios.get.mockImplementation(axiosMock)
    const val = {post}
    const {asFragment} = render(
        <MockContext>
            <Provider store={postsStore}>
            <PostDisplay post={val.post} setPost={(v)=>val.post=v} />
            </Provider>
        </MockContext>)
    expect(asFragment()).toMatchSnapshot()
});