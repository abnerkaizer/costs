import { useEffect, useState } from 'react'
import Input from '../form/Input'
import Select from '../form/Select'
import SubmitButton from '../form/SubmitButton'
import styles from './ProjectForm.module.css'

function ProjectForm({buttonText}) {
    const [categories, setCategories] = useState([])
    useEffect(()=>{
        fetch("http://localhost:5000/categories",{//request à api
        method: "GET",//metodo get
        headers: {
            'Content-Type': 'application/json'
        }
        })
        .then((resp)=> resp.json())//pegou a resposta transformou em json
        .then((data)=>{//pega os dados e armazena no hook
            setCategories(data)
        })
        .catch((err)=>console.log(err))
    },[])

    return(
        <form className={styles.form}>
            <Input 
                type="text" 
                text="Nome do projeto" 
                name="name" 
                placeholder="Insira o nome do projeto" 
            />
            <Input 
                type="number" 
                text="Orçamento do projeto" 
                name="name" 
                placeholder="Insira o orçamento total do projeto"
            />
            <Select name="category_id" text="Selecione uma categoria" options={categories}/>
            <SubmitButton text={buttonText}/>
        </form>
    )
}

export default ProjectForm