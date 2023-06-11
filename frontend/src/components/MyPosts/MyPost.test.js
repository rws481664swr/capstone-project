import MyPost from "./MyPost";
import { render, screen } from "@testing-library/react";

describe("MyPost", () => {
    it('should render', function () {
        const {getByText}=render(<MyPost
            onClick={jest.fn()}
            post={
            {
                "title": "My Post",
                "course": "5f9d5c6b2f1c1e1b1c1f1d1e",
                "user": "5f9d5c6b2f1c1e1b1c1f1d1e",
                "content": "This is my post",
                "pinned": false,
                "postDate": "2020-10-30T18:25:23.000Z",
                "_id": "5f9d5c6b2f1c1e1b1c1f1d1e"
            }
        }/>);
        expect(getByText('My Post')).toBeInTheDocument();
        // expect(getByText( "This is my post")).toBeInTheDocument();
    });
    it('should render', function () {
        const {asFragment}=render(
            <MyPost
                onClick={jest.fn()} post={
            {
                "title": "My Post",
                "course": "5f9d5c6b2f1c1e1b1c1f1d1e",
                "user": "5f9d5c6b2f1c1e1b1c1f1d1e",
                "content": "This is my post",
                "pinned": false,
                "postDate": "2020-10-30T18:25:23.000Z",
                "_id": "5f9d5c6b2f1c1e1b1c1f1d1e"
            }
        }/>
        );
        expect(asFragment()).toMatchSnapshot()

    });
})
