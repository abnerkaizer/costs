import { useLocation } from "react-router-dom"
import Message from "../layout/Message"

function Projects() {
    const location = useLocation()
    let message = ''
    if (location.state) {
        message = location.state.message
    }
    return(
        <div>
            <h1>Meus Projetos</h1>
            {message && (<Message type="success"message={message} time={3000}/>)}
        </div>
    )
}

export default Projects