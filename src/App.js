import "./App.css";
import axios from "axios";
import { useState } from "react";

function App() {
  const [newFile, setNewFile] = useState("");
  const [newFolder, setNewFolder] = useState("");
  const [fileToDelete, setFileToDelete] = useState("");
  const [fodlerTodelete, setFolderToDelete] = useState("");
  const [oldPath, setOldPath] = useState("");
  const [newPath, setNewPath] = useState("");
  const [cmd, setCmd] = useState("");
  const [files, setFiles] = useState([]);

  var listFolder = () => {
    axios.get("http://localhost:3001/folder").then((rsp) => setFiles(rsp.data));
  };

  var createFolder = () => {
    axios
      .post("http://localhost:3001/folder", { name: newFolder })
      .then((rsp) => listFolder());
  };

  var deleteFolder = () => {
    axios
      .delete(`http://localhost:3001/folder/${fodlerTodelete}`)
      .then((rsp) => listFolder());
  };

  var moveFile = () => {
    axios
      .post("http://localhost:3001/file/move", {
        oldFile: oldPath,
        newFile: newPath,
      })
      .then((rsp) => listFolder());
  };

  var createFile = () => {
    axios
      .post("http://localhost:3001/file", { name: newFile })
      .then((rsp) => listFolder());
  };

  var deleteFile = () => {
    axios
      .delete(`http://localhost:3001/file/${fileToDelete}`)
      .then((rsp) => listFolder());
  };

  var exec = () => {
    axios
      .post("http://localhost:3001/shell", { cmd: cmd })
      .then((rsp) => {if(rsp.status == 200) console.log("done")});
  };

  return (
    <div className="App">
      <div>
        <input
          type="text"
          value={newFile}
          onInput={(e) => setNewFile(e.target.value)}
        ></input>
        <button onClick={() => createFile()}>Ajouter un fichier</button>
      </div>
      <div>
        <input
          type="text"
          value={newFolder}
          onInput={(e) => setNewFolder(e.target.value)}
        ></input>
        <button onClick={() => createFolder()}>Ajouter un dossier</button>
      </div>
      <div>
        <input
          type="text"
          value={fodlerTodelete}
          onInput={(e) => setFolderToDelete(e.target.value)}
        ></input>
        <button onClick={() => deleteFolder()}>Supprimer un dossier</button>
      </div>
      <div>
        <input
          type="text"
          value={fileToDelete}
          onInput={(e) => setFileToDelete(e.target.value)}
        ></input>
        <button onClick={() => deleteFile()}>Supprimer un fichier</button>
      </div>
      <div>
        <input
          type="text"
          value={oldPath}
          onInput={(e) => setOldPath(e.target.value)}
        ></input>
        <span> vers </span>
        <input
          type="text"
          value={newPath}
          onInput={(e) => setNewPath(e.target.value)}
        ></input>
        <button onClick={() => moveFile()}>Déplacer un fichier</button>
      </div>
      <div>
        <div>
          <button onClick={() => listFolder()}>Lister</button>
          <ul>
            {files.map((file, index) => {
              return <li key={index}>{file}</li>;
            })}
          </ul>
        </div>
      </div>
      <div>
        <input
          type="text"
          value={cmd}
          onInput={(e) => setCmd(e.target.value)}
        ></input>
        <button onClick={() => exec()}>Executer la commande</button>
      </div>
    </div>
  );
}

export default App;
