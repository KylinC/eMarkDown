import React, {useState, useEffect, useRef} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch,faTimes } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types'

const FileSearch = ({title, onFileSearch}) => {
    const [inputActive, setInputActive] = useState(false)
    const [value, setValue] = useState('')
    let node = useRef(null)
    const closeSearch = (e)=>{
        e.preventDefault()
        setInputActive(false)
        setValue('')
    }
    useEffect(()=>{
        const handleInputEvent = (event) => {
            const {keyCode} = event
            if (keyCode == 13 && inputActive) {
                onFileSearch(value)
            } else if(keyCode == 27 && inputActive){
                closeSearch(event)
            }
        }
        document.addEventListener('keyup',handleInputEvent)
        return () => {
            document.removeEventListener('keyup', handleInputEvent)
        }
    })
    useEffect(()=>{
        if(inputActive){
            node.current.focus()
        }
    },[inputActive])
    return (
        <div className="alert alert-primary">
            { !inputActive && 
              <div className="d-flex justify-content-between align-items-center">
                  <span>{title}</span>
                  <button type="button" 
                  className='icon-button'
                  onClick={()=>{setInputActive(true)}}>
                      <FontAwesomeIcon size="lg" title="search" icon={faSearch} />
                  </button>
              </div>
            }
            {
                inputActive &&
                <div className="d-flex justify-content-between align-items-center">
                    <input 
                      className="form-control"
                      value={value}
                      ref = {node}
                      onChange={(e) => {setValue(e.target.value)}}
                    />
                    <button type="button" 
                    className='icon-button'
                    onClick={closeSearch}>
                        <FontAwesomeIcon size="lg" title="close" icon={faTimes} />
                    </button>
                </div>
            }
        </div>
    )
}

FileSearch.propTypes = {
    title: PropTypes.string,
    onFileSearch: PropTypes.func.isRequired,
}

FileSearch.defaultProps = {
    title: "default"
}

export default FileSearch