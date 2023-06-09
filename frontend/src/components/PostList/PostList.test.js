import getData from "../../mock_data/data";
import {MOCK_TOKEN} from "../../../mock-backend";
import axios from "axios";
import PostList from "./PostList";
import MockContext from "../../test-utils/MockContext";
import {fireEvent, render} from "@testing-library/react";
import {Provider} from "react-redux";
import postsStore from "../../state/redux/postsStore";
import PostListItem from "./PostListItem";
import {act} from "react-dom/test-utils";

jest.mock('axios', () => ({
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn()
}))

const {postsList} = getData()


let comment
let [post] = postsList
const POSTLIST_GET_URL = `posts/courses/${post._id}`


const axiosMockGet =
    async (url, body, config) => {
        if (url.includes(POSTLIST_GET_URL)) {
            return {data: [post]}
        }
        if (url.includes('comments')) {
            return {data: [comment]}
        } else if (url.includes('auth/token')) {
            return {data: {token: MOCK_TOKEN.current}}
        }
        throw new Error()
    }
beforeEach(() => {
    post = {...postsList[0]}
    comment =
        {
            "post": post._id,
            "username": post.username,
            "content": "Culpa nisi delectus voluptate.",
            "timestamp": "2023-05-24T15:56:23.258Z",
            "_id": "646e33a759eab5cd39bbb8d3",
            "__v": 0
        }
})


axios.get.mockImplementation(axiosMockGet)
it('should render PostList', async () => {
    axios.get.mockImplementation(axiosMockGet)
    axios.post.mockImplementation(async (url, body) => ({data: ''}))
    const {
        getByText,
        getByLabelText,
        asFragment
    } = await act(() => render(
        <MockContext>
            <Provider store={postsStore}>

                <PostList
                    url={POSTLIST_GET_URL}
                    Post={PostListItem}
                    showPostContent={false}
                    showCollapse={false}
                    className={''}
                />
            </Provider>
        </MockContext>))

    expect(asFragment()).toMatchSnapshot()
})
it('should render PostDisplay after click', async () => {
    axios.get.mockImplementation(axiosMockGet)
    axios.post.mockImplementation(async (url, body) => ({data: ''}))
    const {
        getByText,
        getByLabelText,
        asFragment,
        getByTestId
    } = await act(() => render(
        <MockContext>
            <Provider store={postsStore}>

                <PostList
                    url={POSTLIST_GET_URL}
                    Post={PostListItem}
                    showPostContent={false}
                    showCollapse={false}
                    className={''}
                />
            </Provider>
        </MockContext>))


    await act(() => fireEvent.click(getByText(post.title)))
     getByTestId('PostDisplay-Heading')
    expect(asFragment()).toMatchSnapshot()
    fireEvent.click(getByTestId('PinButton'))
    expect(asFragment()).toMatchSnapshot()


    expect(getByText(post.content)).toBeInTheDocument()
})