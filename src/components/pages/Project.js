import {v4 as uuidv4} from 'uuid'
import { useParams } from 'react-router-dom'
import styles from './Project.module.css'
import { useEffect, useState } from 'react'
import Loading from '../layout/Loading'
import Container from '../layout/Container'
import Message from '../layout/Message'
import ProjectForm from '../project/ProjectForm'
import ServiceForm from    '../service/ServiceForm'
import ServiceCard from '../service/ServiceCard'

function Project() {
    const {id} = useParams()
    const [project,setProject] = useState([])
    const [showProjectForm, setShowProjectForm] = useState()
    const [showServiceForm, setShowServiceForm] = useState()
    const [message,setMessage] = useState()
    const [type,setType] = useState()
    const [services, setServices] = useState([])

    useEffect(()=>{
        fetch(`http://localhost:5000/projects/${id}`,{//request à api
        method: 'GET',//metodo get
        headers: {
            'Content-Type': 'application/json'
        }
        })
        .then((resp)=> resp.json())//pegou a resposta transformou em json
        .then((data)=>{//pega os dados e armazena no hook
            setProject(data)
            setServices(data.services)
        })
        .catch((err)=>console.log(err))
    },[id])
    function createService(project) {
        setMessage('')
        //last service
        const lastService = project.services[project.services.length -1]
        lastService.id = uuidv4()//cria um id unico
        const lastServiceCost = lastService.cost
        const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost)
        //maximun value validation
        if (newCost > parseFloat(project.budget)) {
            setMessage('Orçamento ultrapassado, verifique o valor do serviço')
            setType('error')
            project.services.pop()
            return false
        }
        //add service cost to project
        project.cost = newCost

        //update project
        fetch(`http://localhost:5000/projects/${project.id}`,{//request à api
        method: 'PATCH',//metodo patch só muda o que for mandado.
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(project) 
        })
        .then((resp)=> resp.json())//pegou a resposta transformou em json
        .then((data)=>{//pega os dados e armazena no hook
            setProject(data)
            toggleServiceForm()
            setMessage('Projeto atualizado!')
            setType('success')
        })
        .catch((err)=>console.log(err))

    }
    function toggleProjectForm() {
        setShowProjectForm(!showProjectForm)
    }
    function toggleServiceForm() {
        setShowServiceForm(!showServiceForm)
    }
    function editPost(project) {
        setMessage('')
        //budget validation
        if (project.budget < project.cost) {
            setMessage('O orçamento não pode ser menor que o custo do projeto.')
            setType('error')
            return false
        }
        fetch(`http://localhost:5000/projects/${project.id}`,{//request à api
        method: 'PATCH',//metodo patch só muda o que for mandado.
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(project) 
        })
        .then((resp)=> resp.json())//pegou a resposta transformou em json
        .then((data)=>{//pega os dados e armazena no hook
            setProject(data)
            toggleProjectForm()
            setMessage('Projeto atualizado!')
            setType('success')
        })
        .catch((err)=>console.log(err))
    }
    function removeService() {
        
    }
    return(
        <>
            {project.name ?(
                <div className={styles.project_details}>
                    <Container customClass="column">
                        {message && <Message type={type} message={message}/>}
                        <div className={styles.details_container}>
                            <h1>Projeto: {project.name}</h1>
                            <button className={styles.button} onClick={toggleProjectForm}>
                                {!showProjectForm ? 'Editar' : 'Fechar'}
                            </button>
                            {!showProjectForm ? (
                                <div className={styles.project_info}>
                                    <p>
                                        <span>Categoria:</span> {project.category?.name}
                                    </p>
                                    <p>
                                        <span>Orçamento:</span> R$ {project.budget}
                                    </p>
                                    <p>
                                        <span>Gasto:</span> R$ {project.cost}
                                    </p>
                                </div>
                            ) : (
                                <div className={styles.project_info}>
                                    <ProjectForm handleSubmit={editPost} buttonText="Concluir edição" projectData={project}/>
                                </div>
                            )}
                        </div>
                        <div className={styles.service_form_container}>
                            <h2>Adicione um serviço:</h2>
                            <button className={styles.button} onClick={toggleServiceForm}>
                                {!showServiceForm ? 'Adicionar' : 'Fechar'}
                            </button>
                            <div className={styles.project_info} >
                                {showServiceForm && (
                                    <ServiceForm
                                        handleSubmit={createService}
                                        textButton="Adicionar serviço"
                                        projecData={project}
                                    />
                                )

                                }
                            </div>
                        </div>
                        <h2>Serviços</h2>
                        <Container customClass="start">
                            {services.length > 0 &&
                                services.map((service) =>(
                                    <ServiceCard
                                        id = {service.id}
                                        name = {service.name}
                                        cost = {service.cost}
                                        description = {service.description}
                                        key = {service.id}
                                        handleRemove = {removeService}
                                    />
                                ))
                            }
                            {services.length === 0 && <p>Não há serviços cadastrados.</p>}
                        </Container>
                    </Container>
                </div>
            ) : (
                <Loading/>
            )}
        </>
    )
}

export default Project