import './Join.css'
import LabeledInput from "../../components/General/LabeledInput/LabeledInput";
import Button from "../../components/General/Button/GenericButton/Button";
import useFlash from "../../hooks/form/useFlash";
import {useState} from "react";
import useJoinCourse from "./useJoinCourse";
import {useParams} from "react-router-dom";

const JoinCourseLabelText = 'Course ID'
const JoinCourseButtonText = 'Join'


const Join = () => {
    const {id:param}= useParams()
    const [id, setID]=useState(param?param:'')

    const  joinCourse= useJoinCourse(id)

    const [toRender, , , {danger}] = useFlash()

    const submit =  async (e5) => {
        e5.preventDefault()
        await joinCourse(id, danger)

    }



    return (
        <div>
            <h1>Join Course</h1>
            {toRender}
            <form className={'sr-container'} onSubmit={submit}>
                <LabeledInput
                    name={'course_id'}
                    value={id}
                    onChange={e => setID(e.target.value)}
                    label={JoinCourseLabelText}
                    id={'Join_course_id'}
                />
                <Button type={'submit'}>{JoinCourseButtonText}</Button>
            </form>
        </div>
    )

}
Join.LabelText = JoinCourseLabelText
Join.ButtonText = JoinCourseButtonText

export default Join;