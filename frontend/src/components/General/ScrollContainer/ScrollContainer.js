import './ScrollContainer.css'
const ScrollContainer = ({ className, children,vh=80  }) => {
    return (
        <div id='ScrollContainer'  style={{height: `${vh}vh`}} className={className||''}>
            {children}
        </div>
    )
}

export default ScrollContainer