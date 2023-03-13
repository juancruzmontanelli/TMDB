import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import useInput from "../hooks/useInput";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

// este componente es el login del usuario
const Login = () => {

  const navigate = useNavigate()
  const email = useInput();
  const password = useInput();

  const {user, toggleUser} = useContext(UserContext)

  const handleRegister = () => {
    navigate('/users/register')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
   axios
    .post('/users/login', {email: email.value, password: password.value})
    .then((res) => {
      toggleUser(res.data)
    })
    .then(() => navigate('/'))
  }
console.log(user)
 
  return (
    <div className="m-auto  shadow-black shadow-2xl bg-neutral-700">
    <form className="py-4 px-8 h-1/3 flex flex-col" onSubmit={handleSubmit}>
      <h1 className='text-2xl font-bold my-2 text-center'> Login </h1>
      <h3 className='text-xl my-2'>
        Email
      </h3>
      <input type="text" value={email.value} onChange={email.onChange} className="border p-2" ></input>
      <br></br>
      <h3 className='text-xl my-2'>
      Password
      </h3>
      <input type="password" value={password.value} onChange={password.onChange} className="border p-2" ></input>
    <div className='flex justify-between my-4'>
      <button className="border border-black rounded-lg py-2 px-6 bg-black  font-bold">LOGIN</button>
 
        <a onClick={handleRegister} className="p-2 underline cursor-pointer">Are you register?</a>
    </div>
    </form>
    </div>
  );
};

export default Login;
