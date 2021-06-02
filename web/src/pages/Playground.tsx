import React, { useContext } from "react";
import style from "../css/Playground.module.css";
import Sidebar from "../components/Sidebar";
import FileExplorer from "../components/FileExplorer";
import FileEditor from "../components/FileEditor";
import { Context, ContextType } from "src/data/context";
import { Redirect } from "react-router-dom";

interface PlaygroundProps {}

const Playground: React.FC<PlaygroundProps> = () => {
  const { loggedIn } = useContext(Context) as ContextType;

  if (!loggedIn) {
    return <Redirect to="/login" />;
  }

  return (
    <>
      <div className={style.editorWrapper}>
        <Sidebar />
        <FileExplorer />
        <FileEditor />
      </div>
    </>
  );
};
export default Playground;
