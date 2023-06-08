import './DashboardCard.css'


const DashboardCard = ({id, children, className = ''}) =>
    <div id={id} className={`Dashboard_Card ${className}`}>
        {children}
    </div>

export default DashboardCard