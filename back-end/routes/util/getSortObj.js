export default
function getSortObj(sort, direction) {
    let _direction
    switch (direction) {
        case 'asc':
            _direction = 1
            break;
        case 'desc':
            _direction = -1
            break;
        default:
            _direction = 1
            break;
    }
    switch (sort) {
        case 'name':
            return  {courseName: _direction}

        case 'course_number':
            return  {courseNumber: _direction}

        case 'date':
            return {startDate: _direction}
    }
    return {}
}