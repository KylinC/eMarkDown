import {useState, useEffect} from 'react'

const useKeyPress = (targetKeyCode) => {
    const [keyPressed,setKeyPressed] = useState(false)

    const keyDownHandler = ({keyCode}) => {
        if(keyCode==targetKeyCode)
        setKeyPressed(true)
    }
    const keyUpHandler = ({keyCode}) => {
        if(keyCode==targetKeyCode)
        setKeyPressed(false)
    }
    useEffect(()=>{
        document.addEventListener('keydown',keyDownHandler)
        document.addEventListener('keyup',keyUpHandler)
        return () => {
            document.removeEventListener('keydown',keyDownHandler)
            document.removeEventListener('keyup',keyUpHandler)
        }
    },[])
    return keyPressed
}

export default useKeyPress