import Input from '../form/Input'
import Select from '../form/Select'
import SubmitButton from '../form/SubmitButton'
import styles from './ProjectForm.module.css'

function ProjectForm({buttonText}) {
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
           <Select name="category_id" text="Selecione uma categoria" />
            <SubmitButton text={buttonText}/>
        </form>
    )
}

export default ProjectForm