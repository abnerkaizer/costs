import { useEffect, useState } from 'react'
import styles from './Message.module.css'

function Message({type,message,time}) {
    const [visible,setVisible] = useState(false)
    useEffect(() =>{
        if (!message) {//Não exibe e retorna
            setVisible(false)
            return
        }
        setVisible(true)//começa o timer e finaliza
        const timer = setTimeout(()=>{
            setVisible(false)
        },time)
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