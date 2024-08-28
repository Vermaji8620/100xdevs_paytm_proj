import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  console.log(firstName);
  console.log(lastName);
  console.log(password);
  console.log(userName);
  return (
    <div>
      <h1>SignUp</h1>
      <h2>Enter information to signup</h2>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await axios.post("http://localhost:3000/api/v1/user/signup", {
            firstName,
            lastName,
            userName,
            password,
          });
        }}
      >
        <div>
          <label htmlFor="">First Name</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            name=""
            id="firstname"
          />
        </div>
        <div>
          <label htmlFor="">Last Name</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            name=""
            id="lastName"
          />
        </div>
        <div>
          <label htmlFor="">Email</label>
          <input
            type="email"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            name=""
            id="email"
          />
        </div>
        <div>
          <label htmlFor="">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name=""
            id="password"
          />
        </div>
        <div>
          <button>Signup</button>
        </div>
      </form>
      <div>
        Have an account ? <Link to={"/signin"}>Signin</Link>
      </div>
    </div>
  );
};

export default Signup;
