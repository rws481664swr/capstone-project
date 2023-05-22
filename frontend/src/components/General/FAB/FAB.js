import './FAB.css'
 const {TOP_LEFT, TOP_RIGHT, BOTTOM_LEFT, BOTTOM_RIGHT} = {
    TOP_LEFT: 'top-left',
    TOP_RIGHT: 'top-right',
    BOTTOM_LEFT: 'bottom-left',
    BOTTOM_RIGHT: 'bottom-right'
}


const getPosition = (quadrant, offset='1rem') => {
    if (typeof quadrant === 'object' ) return quadrant
    const getOffsets = (offset) => ({
        top: offset,
        left: offset,
        bottom: offset,
        right: offset
    })
    const {top,left,bottom,right} = getOffsets(offset)

    switch (quadrant) {
        case TOP_LEFT:
            return {top,left};
        case TOP_RIGHT:
            return {top,right};
        case BOTTOM_LEFT:
            return {bottom,left};
        case BOTTOM_RIGHT:
            return {bottom,right};
        default:
            return {bottom,right}
    }
}
const FAB = ({id='',onClick,className='', children, quadrant=BOTTOM_RIGHT}) => {

    const position=getPosition(quadrant)
    return <>
        <div
            id={id}
             style={{...position }}
             className={`${className} FAB`}
             onClick={onClick}
        >
            {children}
        </div>
    </>
}
export default FAB