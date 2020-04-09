import defaultFiles from "./defaultFiles"

const fs = window.require('fs').promises
const path = window.require('path')

const fileHelper = {
    readFile: (path)=>{
        return fs.readFile(path,{encoding:'utf8'})
    },
    writeFile: (path,content)=>{
        return fs.writeFile(path,content,{encoding:'utf8'})
    },
    renameFile: (path,newPath)=>{
        return fs.rename(path,newPath)
    },
    deleteFile: (path)=>{
        return fs.unlink(path)
    }
}

export default fileHelper