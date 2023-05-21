import './Button.css'
const Button= ({className,...props})=>
    <button className={`${className} Button`} {...props} />

export default Button