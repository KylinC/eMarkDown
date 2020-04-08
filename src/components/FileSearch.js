import React, {useState} from 'react'

const FileSearch = ({title, onFileSearch}) => {
    const [inputActive, setInputActive] = useState(false)
    const [value, setValue] = useState('')
    return (
        <div className="alert alert-primary">
            { !inputActive && 
              <div className="d-flex justify-content-between align-items-center">
                  <span>{title}</span>
                  <button type="button" 
                  className='btn btn-primary'
                  onClick={()=>{setInputActive(true)}}>
                      Search
                  </button>
              </div>
            }
            {
                inputActive &&
                <div className="row">
                    <input 
                      className="form-control col-8"
                      value={value}
                      onChange={(e) => {setValue(e.target.value)}}
                    />
                    <button type="button" 
                    className='btn btn-primary col-4'
                    onClick={()=>{setInputActive(false)}}>
                        close
                    </button>
                </div>
            }
        </div>
    )
}

export default FileSearch