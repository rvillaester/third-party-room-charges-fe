import { Props, ScriptProps } from "next/script";
import React from "react";
import classes from "./Layout.module.css";
import MainNavigation from "./MainNavigation";

const Layout: React.FC<ScriptProps> = (props) => {
  return (
    <div>
      <MainNavigation />
      <main className={classes.main}>{props.children}</main>
    </div>
  );
};

export default Layout;