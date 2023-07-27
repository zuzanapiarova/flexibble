type Props = {
    type?: string, 
    title: string, 
    state: string, 
    placeholder: string, 
    isTextArea?: boolean, 
    setState: (value: string) => void
}

const FormField = ( {type, title, state, placeholder, isTextArea, setState } : Props) => {
  return (
    <div className="flexStart flex-col gap-4 w-full ">
        <label className="w-full text-gray-100 ">{title}</label>
        {isTextArea ? (
            <textarea placeholder={placeholder} value={state} className='form_field-input' onChange={(e) => setState(e.target.value)}></textarea>
        ) : (
            <input type={type || 'text'}placeholder={placeholder} value={state} className='form_field-input' onChange={(e) => setState(e.target.value)}></input>
        )}

    </div>
  )
}

export default FormField