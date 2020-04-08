import React,{useState} from 'react'
import { faPlus,faFileImport } from '@fortawesome/free-solid-svg-icons'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import uuidv4 from 'uuid/v4'
import {flattenArr,objToArr} from './utils/helper'

import FileSearch from './components/FileSearch'
import FileList from './components/FileList'
import defaultFiles from './utils/defaultFiles'
import ButtonBtn from './components/BottomBtn'
import TabList from './components/TabList'

function App() {
  const [files,setFiles]=useState(flattenArr(defaultFiles))
  const [activeFileID,setActiveFileID]=useState('')
  const [openedFileIDs,setOpenedFileIDs]=useState([])
  const [unsavedFileIDs,setUnsavedFileIDs]=useState([])
  const [searchedFiles,setSearchedFiles]=useState([])
  const openedFiles = openedFileIDs.map(openID=>{
    return files[openID]
  })
  const filesArr = objToArr(files)
  // console.log(filesArr)
  const activeFile = files[activeFileID]
  const fileListArr = (searchedFiles.length>0)?searchedFiles:filesArr
  const fileClick = (fileID) =>{
    setActiveFileID(fileID)
    if(!openedFileIDs.includes(fileID)){
      setOpenedFileIDs([ ...openedFileIDs,fileID])
    }
  }
  const tabClick = (fileID)=>{
    setActiveFileID(fileID)
  }
  const tabClose = (id)=>{
    const tabsWithout = openedFileIDs.filter(fileID=>fileID!=id)
    setOpenedFileIDs(tabsWithout)
    if (tabsWithout.length>0){
      setActiveFileID(tabsWithout[0])
    }else{
      setActiveFileID('')
    }
  }
  const fileChange = (id,value)=>{
    if (value !== files[id].body) {
      const newFile = { ...files[id], body: value }
      setFiles({ ...files, [id]: newFile })
      // update unsavedIDs
      if (!unsavedFileIDs.includes(id)) {
        setUnsavedFileIDs([ ...unsavedFileIDs, id])
      }
    }
  }
  const deleteFile = (id)=>{
    delete files[id]
    setFiles(files)
    tabClose(id)
  }
  const updateFileName = (id,title) => {
    const modifiedFile = { ...files[id], title, isNew: false }
    const newFiles = { ...files, [id]: modifiedFile }
    setFiles(newFiles)
  }
  const fileSearch = (keyword)=>{
    const newFiles = filesArr.filter(file=>file.title.includes(keyword))
    setSearchedFiles(newFiles)
  }
  const createNewFile = () =>{
    const newID =uuidv4()
    const newFile = 
      {
        id: newID,
        title: '',
        body: '## Title',
        createAt: new Date().getTime(),
        isNew: true,
      }
    setFiles({ ...files, [newID]: newFile })
  }
  return (
    <div className="App container-fluid px-0">
      <div className="row no-gutters">
        <div className="col-3 bg-light left-panel">
          <FileSearch 
            title="Doc Files"
            onFileSearch={fileSearch}
          />
          <FileList 
            files={fileListArr}
            onFileClick={fileClick}
            onFileDelete={deleteFile}
            onSaveEdit={updateFileName}
          />
          <div className="row no-gutters button-group">
            <div className="col">
              <ButtonBtn 
                text="New File"
                colorClass="btn-primary"
                icon={faPlus}
                onBtnClick={createNewFile}
              />
            </div>
            <div className="col">
              <ButtonBtn 
                  text="Import"
                  colorClass="btn-success"
                  icon={faFileImport}
                  // onBtnClick={}
                />
            </div>
            
          </div>
        </div>
        <div className="col-9 right-panel">
          {!activeFile &&
            <div className="start-page">
              Create New Markdown
            </div>
          }
          {activeFile &&
          <>
            <TabList 
              files={openedFiles}
              activeId={activeFileID}
              unsaveIds={unsavedFileIDs}
              onTabClick={tabClick}
              onCloseTab={tabClose}
            />
            <SimpleMDE 
              key={activeFile && activeFile.id}
              value={activeFile && activeFile.body}
              onChange={(value)=>{fileChange(activeFile.id,value)}}
              options={{
                minHeight: '515px'
              }}
            />
          </>
          }
        </div>
      </div>
    </div>
  );
}

export default App;
