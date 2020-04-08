import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'

import FileSearch from './components/FileSearch'
import FileList from './components/FileList'
import defaultFiles from './utils/defaultFiles'

function App() {
  return (
    <div className="App container-fluid">
      <div className="row">
        <div className="col-6 bg-light left-panel">
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
        </div>
        <div className="col-6 bg-primary right-panel">
          <h1>this is the right</h1>
        </div>
      </div>
    </div>
  );
}

export default App;
