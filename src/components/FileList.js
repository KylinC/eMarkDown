import React, {useState, useEffect, useRef} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit,faTrash,faTimes } from '@fortawesome/free-solid-svg-icons'
import { faMarkdown } from '@fortawesome/free-brands-svg-icons'
import PropTypes from 'prop-types'

const FileList = ({files,onFileClick,onSaveEdit,onFileDelete}) => {
    const [editStatus,setEditStatus]=useState(false)
    const [value,setValue]=useState('')
    const closeSearch = (e) => {
        e.preventDefault()
        setEditStatus(false)
        setValue('')
    }
    useEffect(()=>{
        const handleInputEvent = (event) => {
            const {keyCode} = event
            if (keyCode == 13 && editStatus) {
                const editItem = files.find(file => file.id==editStatus)
                onSaveEdit(editItem.id,value)
                setEditStatus(false)
                setValue('')
            } else if(keyCode == 27 && editStatus){
                closeSearch(event)
            }
        }
        document.addEventListener('keyup',handleInputEvent)
        return () => {
            document.removeEventListener('keyup', handleInputEvent)
        }
    })
    
    return (
        <ul className="list-group list-group-flush file-list">
            {    
                files.map(file => (
                    <li className="row list-group-item bg-light d-flex align-items-center file-item"
                    key={file.id}>
                        { (file.id!=editStatus) &&
                        <>
                            <span className="col-2">
                                <FontAwesomeIcon size="lg" icon={faMarkdown} />
                            </span>
                            <span 
                            className="col-8 c-link"
                            onClick={()=>{onFileClick(file.id)}}
                            >{file.title}</span>
                            <button type="button" 
                            className='icon-button col-1'
                            onClick={()=>{setEditStatus(file.id);setValue(file.title);}}>
                                <FontAwesomeIcon size="lg" title="edit" icon={faEdit} />
                            </button>
                            <button type="button" 
                            className='icon-button col-1'
                            onClick={()=>{onFileDelete(file.id)}}>
                                <FontAwesomeIcon size="lg" title="delete" icon={faTrash} />
                            </button>
                        </>
                        }
                        {  (file.id==editStatus) &&
                        <>
                            <span className="col-2">
                            <FontAwesomeIcon size="lg" icon={faMarkdown} />
                            </span>
                            <input 
                            className="form-control col-8"
                            value={value}
                            onChange={(e) => {setValue(e.target.value)}}
                            />
                            <button type="button" 
                            className='icon-button col-2'
                            onClick={closeSearch}>
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