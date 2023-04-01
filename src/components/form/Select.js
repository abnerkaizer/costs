import styles from './Select.module.css'

function Select({text,name,options,handledOnChange,value}) {
    return(
        <div className={styles.form_control}>
            <label htmlFor={name}>{text}:</label>
            <select
                name={name} 
                id={name}
                onChange={handledOnChange}
                value={value}
            >
                <option disabled selected>Selecione uma opção</option>
                {options.map((option)=>(
                    <option value={option.id} key={option.id}>{option.name}</option>
                ))}
            </select> 
        </div>
    )
}

export default Select