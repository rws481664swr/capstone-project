import {act, fireEvent, getByTestId, render, waitFor} from "@testing-library/react";
import Course from "./Course";
import axios from "axios";
import GlobalContext from "../../../state/contexts/GlobalContext";
import {MemoryRouter} from "react-router-dom";
import {extractKeysAsList as mockExtractKeysAsList, MOCK_TOKEN, spliceUrl} from "../../../../mock-backend";
import mockGetData from "../../../mock_data/data";
import getData from "../../../mock_data/data";
import postsStore from "../../../state/redux/postsStore";
const {coursesList: [COURSE], usersList: [USER] , courses} = getData()
const {
    _id,
    username,
    courses:uc,
    role
}=USER
const globalContextValue = {
    _id,
    username,
    token: MOCK_TOKEN,
    role,
    loggedIn: true
}

const userCourses = uc.map(course=>courses[course])
const axiosGetImplementation =
    (url) => {
        const {coursesList:[course]}=getData()

        if (url.includes('/posts')) {
            console.log(url, '/posts')
            return Promise.resolve({
                data: mockExtractKeysAsList(mockGetData().posts).filter(post => post.course === course._id)
            })
        }
        else if (url.includes(`/courses/${course._id}`)) {

            return Promise.resolve({
                data: {
                    ...course,
                    teachers: course.teachers.map(teacher => mockGetData().users[teacher]),
                    students: course.students.map(student => mockGetData().users[student])
                }
            })
        }

        else if (url.includes('auth')) {
            return Promise.resolve({data: {token: MOCK_TOKEN.current}})
        }
        else {
            console.log("FFAIL", url)
        }
    }
jest.mock('axios')



const {
    coursesList: [{_id: TEST_COURSE_ID}],
    postsList
} = getData()







jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams:()=>({id: '646e33a759eab5cd39bbb8a9 '})
}));






const TestProvider = ({children})=>
    <MemoryRouter>
        <GlobalContext.Provider value={globalContextValue}>
            {children}
        </GlobalContext.Provider>

    </MemoryRouter>










it('should render Courses', async () => {

    axios.get.mockImplementation(axiosGetImplementation)

    const {getByText} = await act(() => render(
        <TestProvider>
                <Course/>
         </TestProvider>
    ))
})
it('should render Courses snapshot', async () => {

    axios.get.mockImplementation(axiosGetImplementation)

    const {getByText} = await act(() => render(
        <TestProvider>
                <Course/>
         </TestProvider>
    ))
})
it('should click on add post and create a post', async () => {
    const {coursesList:[course]}=getData()
    axios.get.mockImplementation(axiosGetImplementation)
    axios.post.mockImplementation( (url,body)=> {

        expect(body).toEqual({
            user: '646e33a759eab5cd39bbb8a7',
            username: 'admin',
            title: 'TEST_TITLE',
            content: 'TEST_CONTENT',
            course: TEST_COURSE_ID
        } )

        return  Promise.resolve( { data :{...body,_id:'TEST_ID'}})
    } )

    const {getByText,
        getByLabelText,
        getByTestId
    }= await act(() => render(<TestProvider> <Course/> </TestProvider>))

    await waitFor(()=> {
        expect(getByTestId('fab')).toBeInTheDocument()
        expect(getByTestId('PostList')).toBeInTheDocument()
    })
   await act(()=>fireEvent.click(getByTestId('fab')))


    await waitFor(()=> { })

    expect(postsStore.getState()).toEqual(postsList.filter(p=>p.course===TEST_COURSE_ID) )


    const title= getByLabelText('Post Title')

    const content= getByLabelText('Post Content')
    const button= getByText('Post')
    fireEvent.change(title,{target: {value:'TEST_TITLE'}})

    expect(title.value).toBe('TEST_TITLE')
    fireEvent.change(content,{target: {value:'TEST_CONTENT'}})
    expect(content.value).toBe('TEST_CONTENT')

    await act(()=>fireEvent.click(button))
    await waitFor(()=> { })
    expect(postsStore.getState()).toEqual([{
        _id: 'TEST_ID',
        user: '646e33a759eab5cd39bbb8a7',
        username: 'admin',
        title: 'TEST_TITLE',
        content: 'TEST_CONTENT',
        course: TEST_COURSE_ID
    },...postsList.filter(p=>p.course===TEST_COURSE_ID) ])

})