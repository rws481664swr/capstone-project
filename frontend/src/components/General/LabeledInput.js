import './LabeledInput.css'

const LabeledInput = ({
                          className = '',
                          labelClass = '',
                          inputClass = '',
                          label,
                          id,
                          name,
                          type = 'text',
                          value,
                          onChange,
                          ...inputProps
                      }) =>
    <div className={`LabeledInput-div ${className}`}>
        <label className={`LabeledInput-input-label ${labelClass}`}
               htmlFor={id}>{label}</label>
        <input className={`LabeledInput-input-text ${inputClass}`}
               id={id}
               name={name}
               type={type}
               value={value}
               onChange={onChange}
               {...inputProps} />
    </div>

export const LabeledTextBox = ({
                            label,
                            id,
                            name,
                            value,
                            onChange,
                            className = '',
                            labelClass = '',
                            inputClass = '',
                            ...textareaProps
                        }) =>
    <div className={`LabeledInput-div ${className}`}>
        <label className={`LabeledInput-label ${labelClass}`}
               htmlFor={id}>{label}</label>
        <textarea
            className={`LabeledInput-textarea ${inputClass}`}
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            {...textareaProps} />
    </div>


export default LabeledInput
