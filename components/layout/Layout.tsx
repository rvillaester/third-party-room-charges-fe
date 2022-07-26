import React from "react";
import classes from "./Layout.module.css";
import MainNavigation from "./MainNavigation";

const Layout: React.FC<{}> = ({children}) => {
  return (
    <div>
      <MainNavigation />
      <main className={classes.main}>{children}</main>
    </div>
  );
};

export default Layout;