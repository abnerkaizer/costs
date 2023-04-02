import { useParams } from 'react-router-dom'
import styles from './Project.module.css'
import { useEffect, useState } from 'react'
import Loading from '../layout/Loading'
import Container from '../layout/Container'

function Project() {
    const {id} = useParams()
    const [project,setProject] = useState([])
    const setRemoveLoading = useState(false)
    const [showProjectForm, setShowProjectForm] = useState()

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

    return(
        <>
            {project.name ?(
                <div className={styles.project_details}>
                    <Container customClass="column">
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
                                    <p>form</p>
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