import dayjs from "dayjs";

const Timestamp = ({date, className = ''}) => {
    if (!date) return null
    const day = dayjs(new Date(date))
    const fmt = day.format('M/DD')
    const time = day.format(' h:mm A')
    const timestamp = ` at ${time} on ${fmt}`
    return (
        <span className={className}> {timestamp}</span>
    )
}
export default Timestamp