import MonacoEditor from "@monaco-editor/react";
import classnames from "classnames";
import { Resizable } from "re-resizable";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Context, ContextType } from "src/data/context";
import { SocketContext, SocketContextType } from "src/data/socket";
import { XTerm } from "xterm-for-react";
import style from "../css/FileEditor.module.css";

interface FileEditorProps {}

const FileEditor: React.FC<FileEditorProps> = () => {
  const xtermRef = useRef(null);

  const [command, setCommand] = useState("");

  const { selectedFile, setSelectedFile, fileNavbar, setFileNavbar, userData } =
    useContext(Context) as ContextType;
  const { socket } = useContext(SocketContext) as SocketContextType;

  const handleOnCloseFileClick = (id: number) => {
    const updatedData = fileNavbar?.filter((item) => item.id !== id);

    if (updatedData) {
      setFileNavbar([...updatedData]);
      setSelectedFile(updatedData[updatedData.length - 1]);
    }
  };

  const handleOnFileChange = (e: string) => {
    if (e && selectedFile) {
      setSelectedFile({ ...selectedFile, content: e });
    }
  };

  useEffect(() => {
    if (userData && socket) {
      socket.emit("addMe", userData.user.email);
      socket.on("commandResult", (data: any) => {
        const arrData = data.stdOut.split("\n") as string[];

        arrData.forEach((item) => {
          //@ts-ignore
          xtermRef.current.terminal.writeln(item);
        });
        //@ts-ignore
        xtermRef.current.terminal.write(data.stdErr);
        //@ts-ignore
        xtermRef.current.terminal.write(data.err);
        //@ts-ignore
        xtermRef.current.terminal.write("$");
      });
    }
  }, [userData, socket]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (selectedFile && selectedFile.content.length) {
        socket.emit("data", selectedFile);
      }
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [selectedFile, socket]);

  useEffect(() => {
    if (xtermRef && xtermRef.current) {
      //@ts-ignore
      xtermRef.current.terminal.writeln("Hello, World!");
      // @ts-ignore
      xtermRef.current.terminal.write("$");
    }
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <Resizable
        defaultSize={{
          width: "100%",
          height: "60%",
        }}
        minWidth="750px"
        maxHeight="90%"
        enable={{
          right: true,
          bottom: true,
        }}
      >
        <div className={style.fileNavbar}>
          {fileNavbar?.map((item) => {
            return (
              <div
                key={item.id}
                className={classnames(
                  style.fileItem,
                  item.id === selectedFile?.id && style.fileOpen
                )}
              >
                <p>{item.fileName}</p>
                <div className={style.closeFile}>
                  <p
                    onClick={() => {
                      handleOnCloseFileClick(item.id);
                    }}
                  >
                    x
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        {selectedFile ? (
          <MonacoEditor
            height="100%"
            width="100%"
            defaultLanguage="html"
            defaultValue=""
            language={selectedFile.language}
            value={selectedFile.content}
            path={selectedFile.fileName}
            theme="vs-dark"
            onChange={(e) => {
              if (e) {
                handleOnFileChange(e);
              }
            }}
          />
        ) : (
          <div style={{ width: "100%", height: "100%", background: "#252525" }}>
            <h1 className="title has-text-white has-text-centered is-vcentered">
              Select File or Create New File
            </h1>
          </div>
        )}
      </Resizable>
      <div>
        <Resizable
          defaultSize={{
            width: "100%",
            height: "35%",
          }}
          minWidth="750px"
          maxHeight="90%"
          enable={{
            right: true,
            bottom: true,
          }}
        >
          <div style={{ width: "100%", height: "35%" }}>
            <XTerm
              ref={xtermRef}
              onKey={(event) => {
                // For Enter Key
                if (event.key === "\r") {
                  if (command.trim().length) {
                    socket.emit("runCommand", command);
                    // @ts-ignore
                    xtermRef.current.terminal.writeln("");
                  } else {
                    // @ts-ignore
                    xtermRef.current.terminal.writeln("$");
                  }
                  setCommand("");
                } else if (event.key === "\u007f") {
                  if (command.length) {
                    setCommand((old) => old.slice(0, -1));
                    // @ts-ignore
                    xtermRef.current.terminal.write("\b \b");
                  }
                } else if (/^[A-Za-z0-9"' ./&]+$/.test(event.key)) {
                  // @ts-ignore
                  xtermRef.current.terminal.write(event.key);
                  setCommand((old) => old + event.key);
                }
              }}
            />
          </div>
        </Resizable>
      </div>
    </div>
  );
};
export default FileEditor;
