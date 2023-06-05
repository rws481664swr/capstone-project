import getData from "../../mock_data/data";
import {MOCK_TOKEN} from "../../../mock-backend";
import axios from "axios";
import PostList from "./PostList";
import MockContext from "../../test-utils/MockContext";
import {render} from "@testing-library/react";
import {Provider} from "react-redux";
import postsStore from "../../state/redux/postsStore";
import PostListItem from "./PostListItem";
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
const axiosMockGet =
    async (url,body,config) => {
        if (url.includes(`posts/courses/${post._id}`)) {
            return {data: [post]}
        }
        if (url.includes('comments')) {
            return {data: [comment]}
        } else if (url.includes('posts')) {
            return {data: [post]}
        } else if (url.includes('auth/token')) {
            return {data: {token: MOCK_TOKEN.current}}
        }
        throw new Error()
    }

axios.get.mockImplementation(axiosMockGet)
it ('should render PostList' , async () => {
    axios.post.mockImplementation(async (url,body)=>({data:''}))
    const {
        getByText,
    getByLabelText
    } = render(
        <MockContext>
            <Provider store={postsStore }>

            <PostList
                      url={`posts/courses/${post._id}`}
                       Post={PostListItem}
                      showPostContent={false}
                      showCollapse={false}
                      className={''}
            />
            </Provider>
        </MockContext>)
    expect('').toBeInTheDocument()
})