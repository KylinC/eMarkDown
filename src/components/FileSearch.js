import React, {useState, useEffect, useRef} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch,faTimes } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types'
import useKeyPress from '../hooks/useKeyPress'
import useIpcRenderer from '../hooks/useIpcRenderer'

const FileSearch = ({title, onFileSearch}) => {
    const [inputActive, setInputActive] = useState(false)
    const [value, setValue] = useState('')
    const enterPressed = useKeyPress(13)
    const escPressed = useKeyPress(27)
    let node = useRef(null)
    const startSearch = () => {
        setInputActive(true)
    }
    const closeSearch = ()=>{
        setInputActive(false)
        setValue('')
        onFileSearch('')
    }
    useIpcRenderer({
        'search-file': startSearch
    })
    useEffect(()=>{
        if(enterPressed && inputActive){
            onFileSearch(value)
        }
        if(escPressed && inputActive){
            closeSearch()
        }
    })
    useEffect(()=>{
        if(inputActive){
            node.current.focus()
        }
    },[inputActive])
    return (
        <div className="alert alert-primary mb-0">
            { !inputActive && 
              <div className="d-flex justify-content-between align-items-center mb-0">
                  <span>{title}</span>
                  <button type="button" 
                  className='icon-button'
                  onClick={startSearch}>
                      <FontAwesomeIcon size="lg" title="search" icon={faSearch} />
                  </button>
              </div>
            }
            {
                inputActive &&
                <div className="d-flex justify-content-between align-items-center mb-0">
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