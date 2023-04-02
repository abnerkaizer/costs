import { useEffect, useState } from 'react'
import styles from './Message.module.css'

function Message({type,message}) {
    const [visible,setVisible] = useState(false)
    useEffect(() =>{
        if (!message) {//Não exibe e retorna
            setVisible(false)
            return
        }
        setVisible(true)//começa o timer e finaliza
        const timer = setTimeout(()=>{
            setVisible(false)
        },3000)
        return ()=> clearTimeout(timer)
    },[message])
    return(
        <>
            {visible &&
               <div className={`${styles.message} ${styles[type]}`}>
                    <p>{message}</p>
                </div>
            }
        </>
    )
}

export default Message