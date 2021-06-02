import React, { useContext } from "react";
import { ImFilesEmpty } from "react-icons/im";
import { BiLogOut } from "react-icons/bi";
import classnames from "classnames";
import style from "../css/Sidebar.module.css";
import { Context, ContextType } from "src/data/context";
import { useHistory } from "react-router-dom";

interface SidebarProps {}

const Sidebar: React.FC<SidebarProps> = () => {
  const { setLoggedIn, setUserData, setFiles, setFileNavbar, setSelectedFile } =
    useContext(Context) as ContextType;

  const history = useHistory();

  return (
    <div className={classnames(style.sidebar)}>
      <div className={classnames(style.sidebarItem, style.sidebarActive)}>
        <ImFilesEmpty color="#FFF" size={25} />
      </div>
      <div
        className={classnames(style.sidebarItem)}
        onClick={() => {
          setLoggedIn(false);
          setUserData(null);
          setFiles([]);
          setFileNavbar([]);
          setSelectedFile(null);
          localStorage.clear();
          history.push("/");
        }}
      >
        <BiLogOut color="#FFF" size={25} />
      </div>
    </div>
  );
};
export default Sidebar;
