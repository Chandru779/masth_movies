import React,{useState,useEffect} from 'react'
import fire from '../fire'
import spider from '../images/spiderMan.png'

 const Login = () => {

    const[user,setUser] = useState("");
    const[userName,setUserName] = useState("")
    const[email,setEmail] = useState("");
    const[password,setPassword] = useState("");
    const[emailError,setEmailError] = useState("");
    const[passwordError,setPasswordError] = useState("");
    const[hasAccount,setHasAccount] = useState(false);

    const clearInputs = ()=>{
        setEmail("");
        setPassword("");
    }

    const clearErrors = ()=>{
        setEmailError("");
        setPasswordError("");
    }

    const handleLogin = () =>{
        clearErrors();
        fire
         .auth()
         .signInWithEmailAndPassword(email,password)
         .catch(err =>{
             switch(err.code){
                 case "auth/invalid-email":
                 case "auth/user-disabled":
                 case "auth/user-not-found":   
                   setEmailError(err.message);
                   break
                 case "auth/wrong-password":
                   setPasswordError(err.message);
                   break;     
                }
         });
    }

    const handleSignup = () =>{
        clearErrors();
        fire
         .auth()
         .createUserWithEmailAndPassword(email,password)
         .catch(err =>{
             switch(err.code){
                 case "auth/email-already-in-use":
                 case "auth/invalid-email":                  
                   setEmailError(err.message);
                   break;
                 case "auth/weak-password":
                   setPasswordError(err.message);
                   break;     
                }
         });
    }
    
  

    const authListener =() =>{
        fire.auth().onAuthStateChanged(user =>{
            if(user){
                clearInputs();
                setUser(user);
            }
            else{
                setUser("");
            }    
        });
    };

    useEffect(()=>{
        authListener();
    },[])
   
    useEffect(()=>{
      if(user) window.location.replace("/");
  },[user])

    return (
      <section className="login_container">
       <img className="spider_img" src={spider} width="400px" height="430px"/>
              <div className="form_container">
              
                <div>
                  <h1 className="form_header">Welcome</h1>
                  {hasAccount ? (
                     <>

                     {/* login form */}
                  <h2 className="login">Login</h2>
                  <label className="usermail">UserMail</label>
                  <input type="text" 
                       value={email}
                       onChange={(e) =>setEmail(e.target.value)}
                       className="input"
                  />
                  <p className="mail_error">{emailError}</p>

                  <label className="password">Password:</label>
                  <input type="password" 
                       value={password}
                       onChange={(e) =>setPassword(e.target.value)}
                       className="input"
                  />
                  <p className="password_error">{passwordError}</p>

                  <button onClick={handleLogin} className="btn">Sign in</button>
                  <p className="toggle-msg">Don't have an account ?
                        <span onClick={() => setHasAccount(!hasAccount)} className="toggle"> Sign up</span></p>
                  </>
                     ):
                     (

                  <>
                      {/* signup form */}
                     <h2 className="signup">Signup</h2>

                     <label className="userName">UserName</label>
                     <input type="text" 
                       value={userName}
                       onChange={(e) =>setUserName(e.target.value)}
                       className="input"
                     />

                     <label className="usermail">UserMail:</label>
                     <input type="text" 
                       value={email}
                       onChange={(e) =>setEmail(e.target.value)}
                       className="input"
                     />
                     <p  className="mail_error">{emailError}</p>

                    <label className="password">Password:</label>
                    <input type="password" 
                       value={password}
                       onChange={(e) =>setPassword(e.target.value)}
                       className="input"
                    />
                    <p className="password_error">{passwordError}</p>
                    <button onClick={handleSignup} className="btn">Sign up</button>

                    <p className="toggle-msg">Have an account ? <span className="toggle" onClick={() => setHasAccount(!hasAccount)}>Sign in</span></p>
                    </>
                  )}
                </div>
              </div>
            </section>
    )
}

export default Login
