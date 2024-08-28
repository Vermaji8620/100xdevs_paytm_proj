import { CgProfile } from "react-icons/cg";


const Appbar = () => {
  return (
    <div>
      <div style={{ color: "red", display: "flex", justifyContent: "space-between", padding: "10px" , borderStyle: "outset"}}>
        <p>PAYTM APP</p>
        <div style={{display: "flex", alignItems: "center",  gap : "10px"}}>
            <p style={{fontSize : "25px"}} >Hello</p>
            <div style={{fontSize : "20px"}}><CgProfile /></div>
        </div>
      </div>
    </div>
  );
};

export default Appbar;
