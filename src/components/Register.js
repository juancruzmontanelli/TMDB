import axios from "axios";
import useInput from "../hooks/useInput";
import { useNavigate } from "react-router-dom";

// este componente es para registrar un usuario
const Register = () => {
  const name = useInput();
  const email = useInput();
  const password = useInput();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/users/register", {
        name: name.value,
        email: email.value,
        password: password.value,
      })
      .then((res) => res.data)
      .then(() => navigate("/users/login"));
  };

  return (
    <div className="m-auto shadow-black shadow-2xl w-96 bg-neutral-700">
      <form className="py-4 px-8 h-1/3 flex flex-col" onSubmit={handleSubmit}>
        <h1 className="text-2xl font-bold my-2 text-center"> Register </h1>
        <h3 className="text-xl my-2"> Name</h3>

        <input
          type="text"
          value={name.value}
          onChange={name.onChange}
          className="border p-2"
        ></input>

        <h3 className="text-xl my-2">Email</h3>

        <input
          type="text"
          value={email.value}
          onChange={email.onChange}
          className="border p-2"
        ></input>
        <h3 className="text-xl my-2">Password</h3>
        <input
          type="password"
          value={password.value}
          onChange={password.onChange}
          className="border p-2"
        ></input>

        <button className="border border-black rounded-xl p-2 my-4 mx-auto w-2/3 bg-black font-bold">REGISTER</button>
      </form>
    </div>
  );
};

export default Register;
