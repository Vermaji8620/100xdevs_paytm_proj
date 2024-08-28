import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";

const SendMoney = () => {
  const [amount, setAmount] = useState("");
  const params = useParams();
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        await axios
          .post(
            `http://localhost:3000/api/v1/account/transfer`,
            {
              amount: parseInt(amount),
              to: params.toId,
            },
            {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            }
          )
          .then((response) => console.log(response))
          .catch((err) => console.log(err));
      }}
      style={{ display: "flex", flexDirection: "column" }}
    >
      <h1>Send Money</h1>
      {/* params.name is same as the app.jsx file destination address */}
      <h2>{params.toname.split("+")[0]}</h2>
      <h4>Amount in (Rs) </h4>
      <input
        type="number"
        style={{ padding: "10px" }}
        name=""
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        id=""
        placeholder="Enter amount"
      />
      <button style={{ marginTop: "10px", padding: "15px" }}>
        Initiate transfer
      </button>
    </form>
  );
};

export default SendMoney;
