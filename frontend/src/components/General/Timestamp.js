import dayjs from "dayjs";

const Timestamp = ({date,className=''}) => {
    const day = dayjs(new Date(date))
    const fmt = `${day.format('M/DD')}`

return <span className={className}> {
        ` at ${day.format(' h:mm A')} on ${fmt}`}
</span>
}
export default Timestamp