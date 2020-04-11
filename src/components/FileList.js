import React, {useState, useEffect, useRef} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit,faTrash,faTimes } from '@fortawesome/free-solid-svg-icons'
import { faMarkdown } from '@fortawesome/free-brands-svg-icons'
import PropTypes from 'prop-types'
import useKeyPress from '../hooks/useKeyPress'
import useContextMenu from '../hooks/useContextMenu'
import {getParentNode} from '../utils/helper.js'

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
    const clickedItem = useContextMenu([{
        label: 'Open',
        click: ()=>{
            const parentElement = getParentNode(clickedItem.current,'file-item')
            if(parentElement){
                onFileClick(parentElement.dataset.id)
            }
        }
    },
    {
        label: 'Rename',
        click: ()=>{
            const parentElement = getParentNode(clickedItem.current, 'file-item')
            if (parentElement) {
                const { id, title } = parentElement.dataset
                setEditStatus(id)
                setValue(title)
            }
        }
    },
    {
        label: 'Delete',
        click: ()=>{
            const parentElement = getParentNode(clickedItem.current, 'file-item')
            if (parentElement) {
                onFileDelete(parentElement.dataset.id)
            }
        }
    }
    ],'.file-list',[files])
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
                        key={file.id}
                        data-id={file.id}
                        data-title={file.title}
                    >
                        { ((file.id!=editStatus) && !file.isNew) &&
                        <>
                            <span className="col-2">
                                <FontAwesomeIcon size="lg" icon={faMarkdown} />
                            </span>
                            <span 
                            className="col-6 c-link"
                            onClick={()=>{onFileClick(file.id)}}
                            >{file.title}</span>
                            {/* <button type="button" 
                            className='icon-button col-2'
                            onClick={()=>{setEditStatus(file.id);setValue(file.title);}}>
                                <FontAwesomeIcon size="lg" title="edit" icon={faEdit} />
                            </button> */}
                            {/* <button type="button" 
                            className='icon-button col-2'
                            onClick={()=>{onFileDelete(file.id)}}>
                                <FontAwesomeIcon size="lg" title="delete" icon={faTrash} />
                            </button> */}
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