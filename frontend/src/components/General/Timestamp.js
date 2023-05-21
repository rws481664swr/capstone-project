import dayjs from "dayjs";

const Timestamp = ({date}) => {
    const day = dayjs(new Date(date))
    const fmt = `${day.format('M/DD')}`

return <> {
        ` at ${day.format(' h:mm A')} on ${fmt}`}
</>
}
export default Timestamp