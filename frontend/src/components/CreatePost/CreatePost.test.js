import CreatePost from "./index";
import {fireEvent, getByTestId, render, waitFor} from "@testing-library/react";
import {Provider} from "react-redux";
import getData from "../../mock_data/data";
import GlobalContext from "../../state/contexts/GlobalContext";
import postsStore from "../../state/redux/postsStore";
import {MOCK_TOKEN} from "../../../mock-backend";
import axios from "axios";
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect'
import '../../hooks/useAxios'
jest.mock('axios')
const {
    coursesList: [{_id: TEST_COURSE_ID}],
    usersList: [{_id, username}]
} = getData()
const hide = jest.fn()
const token = MOCK_TOKEN
it('should render', () => {
axios.get.mockImplementation(()=>Promise.resolve(
    {data: {token: MOCK_TOKEN}}
))

    render(
        <GlobalContext.Provider value={{_id, username,token}}>
            <Provider store={postsStore}>
                <CreatePost course={{_id: TEST_COURSE_ID}}
                            hide={hide}/>
            </Provider>
        </GlobalContext.Provider>
    )
})
it('should match snapshot', () => {
axios.get.mockImplementation(()=>Promise.resolve(
    {data: {token: MOCK_TOKEN}}
))
    const {asFragment}= render(
        <GlobalContext.Provider value={{_id, username,token}}>
            <Provider store={postsStore}>
                <CreatePost course={{_id: TEST_COURSE_ID}}
                            hide={hide}/>
            </Provider>
        </GlobalContext.Provider>
    )
    expect(asFragment()).toMatchSnapshot()
})
it('should fill out the form', async () => {
  axios.get.mockImplementation(()=>Promise.resolve(
      {data: {token: MOCK_TOKEN}}
  ))
    axios.post.mockImplementation ((url,body)=> {
        // console.log(url,body)
        console.log("MOCK POST", url, body)
       expect(body).toEqual({
           user: '646e33a759eab5cd39bbb8a7',
           username: 'admin',
           title: 'TEST_TITLE',
           content: 'TEST_CONTENT',
           course: TEST_COURSE_ID
       } )

        return  Promise.resolve( { data :{...body,_id:'TEST_ID'}})
    } )
   const {getByText,getByLabelText}= render(
        <GlobalContext.Provider value={{_id, username,token}}>
            <Provider store={postsStore}>
                <CreatePost course={{_id: TEST_COURSE_ID}}
                            hide={()=>{}}/>
            </Provider>
        </GlobalContext.Provider>
    )
    expect(postsStore.getState()).toEqual([])
    const title= getByLabelText('Post Title')

    const content= getByLabelText('Post Content')
    const button= getByText('Post')
    fireEvent.change(title,{target: {value:'TEST_TITLE'}})
    expect(title.value).toBe('TEST_TITLE')
    fireEvent.change(content,{target: {value:'TEST_CONTENT'}})
    expect(content.value).toBe('TEST_CONTENT')

    fireEvent.click(button)
    await waitFor(()=>{
         expect(axios.post).toHaveBeenCalledTimes(1)
        expect(title.value).toBe('')
        expect(content.value).toBe('')
        expect(postsStore.getState()).toEqual([{
            _id: 'TEST_ID',
            user: '646e33a759eab5cd39bbb8a7',
            username: 'admin',
            title: 'TEST_TITLE',
            content: 'TEST_CONTENT',
            course: TEST_COURSE_ID
        }])

    })
})