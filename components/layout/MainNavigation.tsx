import Link from "next/link";
import React, { useEffect, useState } from "react";
import { getCookie, removeCookie, setCookie } from "../../common/cookieUtil";
import classes from "./MainNavigation.module.css";

const MainNavigation: React.FC<{}> = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  let isLoggedInKey = 'isLoggedIn';

  useEffect(() => {
    let isLoggedInCookie = getCookie(isLoggedInKey);
    if(isLoggedInCookie) {
      setIsLoggedIn(true);
    }
  }, [isLoggedIn]);

  const onLoginHandler = () => {
    setCookie('isLoggedIn', 'true', 1000);
    setIsLoggedIn(true);
    window.location.reload();
  };

  const onLogoutHandler = () => {
    removeCookie('isLoggedIn');
    setIsLoggedIn(false);
    window.location.reload();
  };

  return (
    <header className={classes.header}>
      <div className={classes.logo}>Welcome to Next.js Demo!</div>
      <nav>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          {!isLoggedIn && (
            <li>
              <a onClick={onLoginHandler}>Login</a>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <a onClick={onLogoutHandler}>Logout</a>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
