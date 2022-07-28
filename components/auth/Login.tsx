import { Card } from "antd";
import { useRouter } from "next/router";
import React, { useRef } from "react";
import { constructAPIUrl } from "../../common/appUtil";
import { setCookie } from "../../common/cookieUtil";
import classes from "./Login.module.css"

const Login: React.FC<{}> = () => {

    const userNameInputRef = useRef<HTMLInputElement>(null);
    const passwordInputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        let url = constructAPIUrl('auth/login');
        let username = userNameInputRef?.current?.value;
        let response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json'
              },
            method: 'POST',
            body: JSON.stringify({
                username: username,
                password: passwordInputRef?.current?.value,
            })
        })

        let status = response.status;
        console.log(status);
        if(status != 200) {
            alert('Invalid username or password');
        } else {
            let data = await response.json();
            const {status, role, hotelId, partnerId, hotelName, partnerName} = data
            if(status == 'fail'){
                alert('Invalid username or password');
                return
            }
            if (typeof window !== "undefined") {
                localStorage.setItem("status", "authenticated")
                localStorage.setItem('role', role);
                localStorage.setItem('hotelId', hotelId);
                localStorage.setItem('partnerId', partnerId);
                localStorage.setItem('hotelName', hotelName);
                localStorage.setItem('partnerName', partnerName);

            }
            if(role == 'partner'){
                router.push('/third-party')
            } else {
                router.push('/');
            }
        }
    };

    const onCancelHandler = () => {
    };

    return (
        <React.Fragment>
            <div className={classes.container}>
                <main className={classes.main}>
                <h1 className={classes.title}>
                    Login
                </h1>
            <Card>
                <form className={classes.form} onSubmit={submitHandler}>
                    <div className={classes.control}>
                    <label htmlFor='username'>Username</label>
                    <input type='text' required id='username' ref={userNameInputRef} />
                    </div>
                    <div className={classes.control}>
                    <label htmlFor='password'>Password</label>
                    <input type="password" required id='password' ref={passwordInputRef} />
                    </div>
                    <div className={classes.actionGroup}>
                    <div className={classes.actions}>
                        <button type="submit">Login</button>
                    </div>
                    <div className={classes.actions}>
                        <button onClick={onCancelHandler}>
                            Cancel
                        </button>
                    </div>
                    </div>
                </form>
            </Card>
            </main>
            </div>
        </React.Fragment>
    );
  };
  
  export default Login;