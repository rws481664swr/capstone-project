import './NewCourse.css'
import useForm from "../../../hooks/useForm";
import {useCallback} from "react";
import LabeledInput from "../../../components/General/LabeledInput/LabeledInput";
import useAxios from "../../../hooks/useAxios";



/**
 * NewCourse component for creating a new course.
 */
const NewCourse = () => {
    const [form, onChange, clear] = useForm({
        courseName: '',
        courseNumber:undefined ,
        courseDescription: '',
        startDate: Date.now(),
        endDate: Date.now(),
        teacherId: '',
        subject: '',
    })
    const {post}= useAxios()
    const submit = useCallback(async (e) => {
        e.preventDefault()
        console.log('submitting')
        console.log(form)
        try{
            const course = await post('courses', form)
            console.log(`Created Course ${course.courseName}`,course)
        clear()
        }catch (e) {
            console.error(e.message)

        }

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
                <button  id={'submit-course'} type={'submit'}>Submit</button>
            </form>
        </div>
    )
}
export default NewCourse