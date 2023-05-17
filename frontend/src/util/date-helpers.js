export const formatDate = (date) => {
    const d = new Date(date)
    return `${d.getMonth()}/${d.getDate()}/${d.getFullYear()}`
}
export const formatDateAsTimeStamp = (date) => {
    const d = new Date(date)
    return d.getTime()
}