import React, { useContext, useState } from "react";
import { Resizable } from "re-resizable";
import { BsFileEarmarkPlus } from "react-icons/bs";
import style from "../css/FileExplorer.module.css";
import classnames from "classnames";
import { Context, ContextType, fileType } from "src/data/context";
import { CreateFileApi, GetFilesApi } from "src/utils/Apis";
import { useMutation, useQuery } from "react-query";
import { SocketContext, SocketContextType } from "src/data/socket";

interface FileExplorerProps {}

const FileExplorer: React.FC<FileExplorerProps> = () => {
  const {
    files,
    setFiles,
    setSelectedFile,
    selectedFile,
    fileNavbar,
    setFileNavbar,
    userData,
  } = useContext(Context) as ContextType;

  const { socket } = useContext(SocketContext) as SocketContextType;

  const [isAddFileModelOpen, setIsAddFileModelOpen] = useState(false);
  const [fileName, setFileName] = useState("");

  const mutation = useMutation(
    () => CreateFileApi(fileName, userData?.accessToken || ""),
    {
      onSuccess: (response) => {
        setIsAddFileModelOpen(false);
        response.data.file.id = Date.now();
        setFiles((old) => [...old, response.data.file]);
        setSelectedFile(response.data.file);
        setFileNavbar((old) => [...old, response.data.file]);
        setFileName("");
      },
      onError: () => {
        alert("something went wrong");
      },
    }
  );

  useQuery("files", () => GetFilesApi(userData?.accessToken || ""), {
    onSuccess: (response) => {
      setFiles([...response.data.files]);
    },
  });

  const handleFileChange = (id: number) => {
    if (!files) {
      return;
    }
    const file = files.find((item) => item.id === id);
    const isFileOpen = fileNavbar?.findIndex((item) => item.id === id);

    if ((isFileOpen === undefined || isFileOpen === -1) && file) {
      if (fileNavbar?.length) {
        setFileNavbar([...fileNavbar, file]);
      } else {
        setFileNavbar([file]);
      }
    }

    if (file) {
      handleFetchFileData(file);
    }
  };

  const handleCreateFile = () => {
    if (!fileName.trim().length) {
      return;
    }

    const isFound = files.find(
      (item) => item.fileName.toLowerCase() === fileName.toLowerCase()
    );
    if (isFound) {
      alert("filename already exist");
      setFileName("");
      return;
    }

    mutation.mutate();
  };

  const handleFetchFileData = (file: fileType) => {
    socket.emit("getData", file);
    socket.on("savedData", (data: fileType) => {
      const newFile = files.map((item) => {
        if (item.id === data.id) {
          item.content = data.content;
        }
        return item;
      });
      setSelectedFile(data);
      setFiles([...newFile]);
    });
  };

  return (
    <>
      <Resizable
        style={style}
        defaultSize={{
          width: "17%",
          height: "100%",
        }}
        minWidth="150px"
        enable={{
          right: true,
        }}
      >
        <div className={classnames(style.fileExplorerWrapper)}>
          <div className={classnames(style.label)}>
            <p>Files</p>
            <div className="is-clickable">
              <BsFileEarmarkPlus
                size={25}
                color="#FFF"
                onClick={() => setIsAddFileModelOpen(true)}
              />
            </div>
          </div>
          <div className={classnames(style.fileList)}>
            {files?.map((item) => {
              return (
                <div
                  key={item.id}
                  className={classnames(
                    style.fileItem,
                    item.id === selectedFile?.id && style.fileActive
                  )}
                  onClick={() => {
                    handleFileChange(item.id);
                  }}
                >
                  <p>{item.fileName}</p>
                </div>
              );
            })}
          </div>
        </div>
      </Resizable>
      <div
        className={classnames("modal", isAddFileModelOpen && "is-active")}
        style={{ zIndex: 100000 }}
      >
        <div className="modal-background"></div>
        <div
          className="modal-content"
          style={{ minHeight: "200px", background: "#fff" }}
        >
          <h1 className="title m-3">Add File</h1>
          <div className="columns p-5">
            <div className="column p-5">
              <div className="field">
                <label className="label">File Name</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    placeholder="index.html"
                    value={fileName}
                    onChange={(event) => setFileName(event.target.value)}
                  />
                </div>
              </div>

              <div className="control">
                <button
                  className="button is-primary"
                  onClick={handleCreateFile}
                >
                  Create File
                </button>
              </div>
            </div>
          </div>
        </div>
        <button
          className="modal-close is-large"
          aria-label="close"
          onClick={() => {
            setIsAddFileModelOpen(false);
          }}
        ></button>
      </div>
    </>
  );
};
export default FileExplorer;
