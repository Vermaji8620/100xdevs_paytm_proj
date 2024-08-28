import { Link } from "react-router-dom";
const Signin = () => {
  return (
    <div>
      <h1>SignIn</h1>
      <h2>Enter credentials</h2>
      <form>
        <div>
          <label htmlFor="">Email</label>
          <input type="email" name="" id="" />
        </div>
        <div>
          <label htmlFor="">Password</label>
          <input type="password" name="" id="" />
        </div>
        <div>
          <button>Signin</button>
        </div>
        <div>
          Dont Have an account ? <Link to={"/signup"}>Signup</Link>
        </div>
      </form>
    </div>
  );
};

export default Signin;
