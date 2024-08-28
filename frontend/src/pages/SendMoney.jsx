const SendMoney = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <h1>Send Money</h1>
      <h2>Friends name</h2>
      <h4>Amount in (Rs) </h4>
      <input
        type="number"
        style={{ padding: "10px" }}
        name=""
        id=""
        placeholder="Enter amount"
      />
      <div style={{ marginTop: "10px" }}>
        <button>Initiate transfer</button>
      </div>
    </div>
  );
};

export default SendMoney;
