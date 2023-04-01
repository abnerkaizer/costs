import { useLocation } from "react-router-dom"
import Message from "../layout/Message"
import styles from './Projects.module.css'
import Container from "../layout/Container"
import LinkButton from "../layout/LinkButton"
import ProjectCard from "../project/ProjectCard"
import { useEffect, useState } from "react"

function Projects() {
    const [projects, setProjects] = useState([])

    const location = useLocation()
    let message = ''
    if (location.state) {
        message = location.state.message
    }

    useEffect(()=>{
        fetch("http://localhost:5000/projects",{//request à api
        method: "GET",//metodo get
        headers: {
            'Content-Type': 'application/json'
        }
        })
        .then((resp)=> resp.json())//pegou a resposta transformou em json
        .then((data)=>{//pega os dados e armazena no hook
            setProjects(data)
        })
        .catch((err)=>console.log(err))
    },[])

    return(
        <div className={styles.project_container}>
            <div className={styles.title_container}>
                <h1>Meus Projetos</h1>
                <LinkButton to="/newproject" text="Criar projeto"/>
            </div>
            {message && (<Message type="success"message={message} time={3000}/>)}
            <Container customClass="start">
                {projects.length > 0 && 
                    projects.map((project)=>(
                        <ProjectCard 
                            id = {project.id}
                            name={project.name}
                            budget={project.budget}
                            category={project?.category?.name}
                            key={project.id}
                        />
                    ))
                }
            </Container>
        </div>
    )
}

export default Projects