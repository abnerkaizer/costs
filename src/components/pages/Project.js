import { useParams } from 'react-router-dom'
import styles from './Project.module.css'
import { useEffect, useState } from 'react'
import Loading from '../layout/Loading'
import Container from '../layout/Container'
import Message from '../layout/Message'
import ProjectForm from '../project/ProjectForm'

function Project() {
    const {id} = useParams()
    const [project,setProject] = useState([])
    const [removeLoading,setRemoveLoading] = useState(false)
    const [showProjectForm, setShowProjectForm] = useState()
    const [message,setMessage] = useState()
    const [type,setType] = useState()

    console.log(removeLoading);
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
            setRemoveLoading(true)
        })
        .catch((err)=>console.log(err))
    },[id])

    function toggleProjectForm() {
        setShowProjectForm(!showProjectForm)
    }
    function editPost(project) {
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
            setRemoveLoading(true)
        })
        .catch((err)=>console.log(err))
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
                    </Container>
                </div>
            ) : (
                <Loading/>
            )}
        </>
    )
}

export default Project