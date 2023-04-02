import { useNavigate } from 'react-router-dom'
import ProjectForm from '../project/ProjectForm'
import styles from './NewProject.module.css'


function NewProject() {
    const navigate = useNavigate()//redirecionar para outra pagina
    function createPost(project) {
        //iniciar cost e services
        project.cost = 0;
        project.services = []

        fetch("http://localhost:5000/projects",{//request à api
            method: "POST",//metodo post
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project)
            })
            .then((resp)=> resp.json())//pegou a resposta transformou em json
            .then((data)=>{//pega os dados e armazena no hook
                console.log(data)
                //redirect
                navigate('projects',{message: 'Projeto criado com sucesso'})
            })
            .catch((err)=>console.log(err)
        )
    }
    return(
        <div className={styles.newproject_container}>
            <h1>Criar Projeto</h1>
            <p>Crie seu projeto para depois adicionar os serviços</p>
            <ProjectForm handleSubmit={createPost} buttonText="Criar projeto"/>
        </div>
    )
}

export default NewProject