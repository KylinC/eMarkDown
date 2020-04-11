import React, {useState, useEffect, useRef} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit,faTrash,faTimes } from '@fortawesome/free-solid-svg-icons'
import { faMarkdown } from '@fortawesome/free-brands-svg-icons'
import PropTypes from 'prop-types'
import useKeyPress from '../hooks/useKeyPress'

const {remote} = window.require('electron')
const {Menu, MenuItem} = remote

const FileList = ({files,onFileClick,onSaveEdit,onFileDelete}) => {
    const [editStatus,setEditStatus]=useState(false)
    const [value,setValue]=useState('')
    let node = useRef(null)
    const enterPressed = useKeyPress(13)
    const escPressed = useKeyPress(27)
    const closeSearch = (editItem) => {
        setEditStatus(false)
        setValue('')
        if (editItem.isNew){
            onFileDelete(editItem.id)
        }
    }
    useEffect(()=>{
        const menu = new Menu()
        menu.append(new MenuItem({
            label: 'Open',
            click: ()=>{
                console.log('clicking1')
            }
        }))
        menu.append(new MenuItem({
            label: 'Rename',
            click: ()=>{
                console.log('clicking2')
            }
        }))
        menu.append(new MenuItem({
            label: 'Delete',
            click: ()=>{
                console.log('clicking3')
            }
        }))
        const handleContextMenu = (e) => {
            menu.popup({window: remote.getCurrentWindow()})
        }
        window.addEventListener('contextmenu',handleContextMenu)
        return () =>{
            window.removeEventListener('contextmenu',handleContextMenu)
        }
    })
    useEffect(()=>{
        const newFile = files.find(file=>file.isNew)
        if(newFile){
            setEditStatus(newFile.id)
            setValue(newFile.title)
        }
    },[files])
    useEffect(() => {
        if (editStatus) {
          node.current.focus()
        }
      }, [editStatus])
    useEffect(()=>{
        const editItem = files.find(file => file.id === editStatus)
        if (enterPressed && editStatus && value.trim() !== '') {
        onSaveEdit(editItem.id, value, editItem.isNew)
        setEditStatus(false)
        setValue('')
        }
        if(escPressed && editStatus) {
        closeSearch(editItem)
        }
    })
    
    return (
        <ul className="list-group list-group-flush file-list">
            {    
                files.map(file => (
                    <li className="row list-group-item bg-light d-flex align-items-center file-item mx-0"
                    key={file.id}>
                        { ((file.id!=editStatus) && !file.isNew) &&
                        <>
                            <span className="col-2">
                                <FontAwesomeIcon size="lg" icon={faMarkdown} />
                            </span>
                            <span 
                            className="col-6 c-link"
                            onClick={()=>{onFileClick(file.id)}}
                            >{file.title}</span>
                            <button type="button" 
                            className='icon-button col-2'
                            onClick={()=>{setEditStatus(file.id);setValue(file.title);}}>
                                <FontAwesomeIcon size="lg" title="edit" icon={faEdit} />
                            </button>
                            <button type="button" 
                            className='icon-button col-2'
                            onClick={()=>{onFileDelete(file.id)}}>
                                <FontAwesomeIcon size="lg" title="delete" icon={faTrash} />
                            </button>
                        </>
                        }
                        {  ((file.id==editStatus) || file.isNew) &&
                        <>
                            <span className="col-2">
                            <FontAwesomeIcon size="lg" icon={faMarkdown} />
                            </span>
                            <input 
                            className="form-control col-8"
                            value={value}
                            ref={node}
                            placeholder="untitled"
                            onChange={(e) => {setValue(e.target.value)}}
                            />
                            <button type="button" 
                            className='icon-button col-2'
                            onClick={()=>{closeSearch(file)}}>
                                <FontAwesomeIcon size="lg" title="close" icon={faTimes} />
                            </button>
                        </>
                        }
                    </li>
                ))
            }
        </ul>
    )
}

FileList.propTypes={
    files: PropTypes.array,
    onFileClick: PropTypes.func,
    onFileDelete: PropTypes.func,
    onSaveEdit: PropTypes.func
}

export default FileList