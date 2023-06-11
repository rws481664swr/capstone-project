import useForm from "../../hooks/form/useForm";
import {useNavigate} from "react-router-dom";
import useAxios from "../../hooks/ajax/useAxios";
import {useCallback} from "react";
import useFlashes from "../../hooks/form/useFlashes";
import useFlash from "../../hooks/form/useFlash";

const useCreateCourse = () => {
const [error,errorFlash] = useFlash('text-danger')
    const [toRender, flash, setCss] = useFlashes({
        courseName: '',
        courseNumber: '',
        startDate: '',
        endDate: '',
        subject: '',
    }, 'text-danger')
    const [form, onChange] = useForm({
        courseName: '',
        courseNumber: 0,
        startDate: null,
        endDate: null,
        subject: '',

    })
    const navigate = useNavigate()
    const {post} = useAxios()
    const submit = useCallback(async (e) => {
        e.preventDefault()
        flash({})
        const flashes = {}
        if (form.courseName.length < 3) {
            flashes.courseName = 'Course Name must be at least 3 characters'
        }
        if (form.courseNumber < 1000) {
            flashes.courseNumber = 'Course Number must be at least 1000'
        }
        if (form.startDate < Date.now()) {
            flashes.startDate = 'Start Date must be in the future'

        }
        if (form.endDate < form.startDate) {
            flashes.endDate = 'End Date must be after Start Date'
        }
        if (form.subject.length < 3) {
            flashes.subject = 'Subject must be at least 3 characters'
        }
        if (Object.keys(flashes).length > 0) {
            return flash(flashes)
        }
        try {

            const course = await post('courses', form)
            console.log(`Created Course ${course.courseName}`, course)

            navigate(`/courses/${course._id}`)
        } catch (e) {
            errorFlash(e.message)
            console.error(e.message)
        }

    }, [form, post, flash, navigate,errorFlash])
    return [{form, onChange}, {toRender, setCss,error}, submit]

}

export default useCreateCourse