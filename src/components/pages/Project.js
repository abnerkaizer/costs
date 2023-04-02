import { useParams } from 'react-router-dom'
import styles from './Project.module.css'
import { useEffect, useState } from 'react'


function Project() {
    const {id} = useParams()
    const [project,setProject] = useState([])

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
        })
        .catch((err)=>console.log(err))
    },[id])

    return(
        <p>{project.name}</p>
    )
}

export default Project