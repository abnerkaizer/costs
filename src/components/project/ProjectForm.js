import { useEffect, useState } from 'react'
import Input from '../form/Input'
import Select from '../form/Select'
import SubmitButton from '../form/SubmitButton'
import styles from './ProjectForm.module.css'

function ProjectForm({handleSubmit,buttonText,projectData}) {
    const [categories, setCategories] = useState([])
    const [project,setProject] = useState(projectData || {})

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
    const submit = (e) =>{
        e.preventDefault()
        handleSubmit(project)
    }
    function handleChange(e) {
        setProject({...project,[e.target.name]:e.target.value})
    }
    function handleSelect(e) {
        setProject({
            ...project,
            category: {
                id: e.target.value,
                name: e.target.options[e.target.selectedIndex].text,
            }
        })
    }
    return(
        <form onSubmit={submit} className={styles.form}>
            <Input 
                type="text" 
                text="Nome do projeto" 
                name="name" 
                placeholder="Insira o nome do projeto" 
                handledOnChange={handleChange}
                value={project.name ? project.name: ''}
            />
            <Input 
                type="number" 
                text="Orçamento do projeto" 
                name="budget" 
                placeholder="Insira o orçamento total do projeto"
                handledOnChange={handleChange}
                value={project.budget ? project.budget: ''}
            />
            <Select 
                name="category_id" 
                text="Selecione uma categoria" 
                options={categories}
                handledOnChange={handleSelect}
                value={project.category ? project.category.id:''}
            />
            <SubmitButton text={buttonText}/>
        </form>
    )
}

export default ProjectForm