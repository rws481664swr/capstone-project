import './CreateCourse.css'
import LabeledInput from "../../components/General/LabeledInput/LabeledInput";
import Button from "../../components/General/Button/GenericButton/Button";
import useCreateCourse from "./useCreateCourse";
import {useGlobalContext} from "../../state/contexts/GlobalContext";


const CreateCourse = () => {
    const {role} = useGlobalContext()
    const [{form, onChange}, {toRender, setCss, error}, submit] = useCreateCourse()
    const isAdmin = role === "ADMIN"
    const isTeacher = role === "TEACHER"
    if (!(isAdmin || isTeacher)) return (
        <div id={'unauthorized-courses-new'}
             className={'unauthorized sr-container'}>
            <h1>Unauthorized</h1>
        </div>
    )
    return (
        <div className={'sr-container'}>
            <h1>Create A New Course</h1>
            <form onSubmit={submit}>

                {error && <div className={'CourseFormFlash'}>{error}</div>}
                <LabeledInput
                    name={'courseName'}
                    value={form.courseName}
                    onChange={onChange}
                    label={'Course Name'}
                    id={'input-courseName'}
                    data-testid={'input-create-courseName'}
                    flash={toRender.courseName}
                />
                <LabeledInput
                    name={'courseNumber'}
                    value={form.courseNumber}
                    onChange={onChange}
                    label={'Course Number'}
                    id={'input-courseNumber'}
                    data-testid={'input-create-courseNumber'}
                    type={'number'}
                    flash={toRender.courseNumber}
                />
                <LabeledInput
                    name={'subject'}
                    value={form.subject}
                    onChange={onChange}
                    label={'Subject'}
                    id={'input-subject'}
                    data-testid={'input-create-subject'}
                    flash={toRender.subject}
                />
                <LabeledInput
                    name={'startDate'}
                    value={form.startDate}
                    onChange={onChange}
                    label={'Start Date'}
                    id={'input-startDate'}
                    data-testid={'input-create-startDate'}
                    type={'date'}
                    flash={toRender.startDate}
                />
                <LabeledInput
                    name={'endDate'}
                    value={form.endDate}
                    onChange={onChange}
                    label={'End Date'}
                    id={'input-endDate'}
                    data-testid={'input-create-endDate'}
                    type={'date'}
                    flash={toRender.endDate}
                />

                <Button id={'submit-course'} type={'submit'}>
                    Create Course
                </Button>
            </form>
        </div>
    )
}

export default CreateCourse