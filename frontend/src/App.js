import React, { useState } from "react";
import FileUpload from "./components/FileUpload";

function App() {
  const [newUserInfo, setNewUserInfo] = useState({
    profileImages: []
  });

  const updateUploadedFiles = (files) =>
    setNewUserInfo({ ...newUserInfo, profileImages: files });

  return (
    <div>
        <FileUpload
          accept=".jpg,.png,.jpeg"
          label="Profile Image(s)"
          multiple
          updateFilesCb={updateUploadedFiles}
        />
    </div>
  );
}

export default App;