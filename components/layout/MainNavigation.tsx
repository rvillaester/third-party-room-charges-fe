import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { isAuthenticated } from "../../common/appUtil";
import { getCookie, removeCookie, setCookie } from "../../common/cookieUtil";
import classes from "./MainNavigation.module.css";

const MainNavigation: React.FC<{}> = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  let isLoggedInKey = 'isLoggedIn';

  const router = useRouter()

  useEffect(() => {
    let isLoggedInCookie = getCookie(isLoggedInKey);
    if(isLoggedInCookie) {
      setIsLoggedIn(true);
    }
  }, [isLoggedIn]);

  const onLoginHandler = () => {
    router.push('/auth')
  };

  const onLogoutHandler = () => {
    localStorage.setItem('status', 'not-authenticated');
    router.push('/auth');
  };

  return (
    <header className={classes.header}>
      <div className={classes.logo}>Associates</div>
      <nav>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          {!isAuthenticated() && (
            <li>
              <a onClick={onLoginHandler}>Login</a>
            </li>
          )}
          {isAuthenticated() && (
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
