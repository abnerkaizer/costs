import { useState } from 'react'
import Input from '../form/Input'
import SubmitButton from '../form/SubmitButton'
import styles from '../project/ProjectForm.module.css'

function ServiceForm({handleSubmit,textButton,projecData}) {
    const [service, setService] = useState({})

    function submit(e) {
        e.preventDefault()
        projecData.services.push(service)
        handleSubmit(projecData)//joga pro createService em Project
    }
    function handleChange(e) {
        setService({...service,[e.target.name]: e.target.value})//pega o atual com o spread e o nome.
    }
    return(

        <form onSubmit={submit} className={styles.form}>
            <Input 
                type="text"
                text="Nome do serviço"
                name="name"
                placeholder="Insira o nome do serviço"
                handledOnChange={handleChange}
            />       
            <Input 
                type="number"
                text="Custo do serviço"
                name="cost"
                placeholder="Insira o custo do serviço"
                handledOnChange={handleChange}
            /> 
            <Input 
                type="text"
                text="Descrição do serviço"
                name="description"
                placeholder="Insira a descrição do serviço"
                handledOnChange={handleChange}
            /> 
            <SubmitButton text={textButton}/>
        </form>
    )
}

export default ServiceForm