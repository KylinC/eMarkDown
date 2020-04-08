import React from 'react'
import { faPlus,faFileImport } from '@fortawesome/free-solid-svg-icons'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import FileSearch from './components/FileSearch'
import FileList from './components/FileList'
import defaultFiles from './utils/defaultFiles'
import ButtonBtn from './components/BottomBtn'
import TabList from './components/TabList'

function App() {
  return (
    <div className="App container-fluid px-0">
      <div className="row no-gutters">
        <div className="col-3 bg-light left-panel">
          <FileSearch 
            title="Doc Files"
            onFileSearch={(value)=>{console.log(value)}}
          />
          <FileList 
            files={defaultFiles}
            onFileClick={(id)=>{console.log(id)}}
            onFileDelete={(id)=>{console.log("delete",id)}}
            onSaveEdit={(id,newValue)=>{console.log(id,newValue)}}
          />
          <div className="row no-gutters">
            <div className="col">
              <ButtonBtn 
                text="New File"
                colorClass="btn-primary"
                icon={faPlus}
                // onBtnClick={}
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
          <TabList 
            files={defaultFiles}
            activeId="1"
            unsaveIds={["1","2"]}
            onTabClick={(id)=>{console.log(id)}}
            onCloseTab={(id)=>{console.log("close",id)}}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
