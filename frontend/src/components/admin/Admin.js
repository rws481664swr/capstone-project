import {Route, Routes} from "react-router-dom";
import useForm from "../../hooks/useForm";
import LabeledInput from "../General/LabeledInput";
import {useCallback, useEffect, useState} from "react";
import useAxios from "../../api";

/**
 * Admin component for administration of users, courses, and posts.
 */
const Admin = () => {
    return (
        <div>
            <h1>Admin</h1>
            <Routes>
                <Route path={'courses/new'} element={<NewCourse/>}/>
                <Route path={'courses'} element={<AdminCourses/>}/>
                <Route path={'users'} element={<AdminUsers/>}/>

            </Routes>
        </div>
    )

}
export default Admin

/**
 * AdminCourses component for administration of courses. It displays a list of all courses.
 */
const AdminCourses = () => {
    const {get} = useAxios()
    const [courses ,setCourses  ]= useState(null)
    useEffect(()=>{(async ()=>{
        if(!courses){
            return
        }
        try{
            const response = await get('courses')
            setCourses(response)
        }catch (e) {
            console.error(e)
        }
    })()},[])
    return <>  </>
}
/**
 * AdminUsers component for administration of users. It displays a list of all users.
 */
const AdminUsers = () => {
    const {get} = useAxios()
    const [users ,setUsers  ]= useState(null)
    useEffect(()=>{(async ()=>{
        if(users){
            return
        }
        try{
            const response = await get('users')
        setUsers(response)
        }catch (e) {
            console.error(e)
        }
    })()},[])
    return <>  </>
}
/**
 * NewCourse component for creating a new course.
 */
const NewCourse = () => {
    const [form, onChange, clear] = useForm({
        courseName: '',
        courseNumber: -1,
        courseDescription: '',
        startDate: null,
        endDate: null,
        teacherId: null,
        subject: null,
    })
    const submit = useCallback((e) => {
        e.preventDefault()
        console.log(form)
        clear()
        throw new Error('Not implemented')
    }, [form, clear])

    return (
        <div>
            <h1>New Course</h1>
            <form onSubmit={submit}>
                <LabeledInput
                    name={'courseName'}
                    value={form.courseName}
                    onChange={onChange}
                    label={'Course Name'}
                    id={'input-courseName'}
                />
                <LabeledInput
                    name={'courseNumber'}
                    value={form.courseNumber}
                    onChange={onChange}
                    label={'Course Number'}
                    id={'input-courseNumber'}

                />
                <LabeledInput name={'courseDescription'}
                              value={form.courseDescription}
                              onChange={onChange}
                              label={'Course Description'}
                              id={'input-courseDescription'}

                />
                <LabeledInput name={'startDate'}
                              value={form.startDate}
                              onChange={onChange}
                              label={'Start Date'}
                              id={'input-startDate'}
                              type={'date'}
                />
                <LabeledInput name={'endDate'}
                              value={form.endDate}
                              onChange={onChange}
                              label={'End Date'}
                              id={'input-endDate'}
                              type={'date'}
                />
                <LabeledInput name={'teacherId'}
                              value={form.teacherId}
                              onChange={onChange}
                              label={'Teacher Id'}
                              id={'input-teacherId'}
                />
                <LabeledInput name={'subject'}
                              value={form.subject}
                              onChange={onChange}
                              label={'Subject'}
                              id={'input-subject'}
                />
                <button id={'submit-course'} type={'submit'}>Submit</button>
            </form>
        </div>
    )
}
