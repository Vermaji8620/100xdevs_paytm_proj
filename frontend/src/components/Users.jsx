const Users = () => {
  return (
    <div style={{ padding: "10px", width: "98%" }}>
      <h2>Users</h2>
      <input
        type="text"
        placeholder="Search users"
        style={{ padding: "10px", width: "98%", borderColor: "gray" }}
      />
      <div style={{ marginTop: "10px" , display: "flex", flexDirection: "column", gap: "13px" }}>
        <div style={{ display: "flex",justifyContent: "space-between" }}>
          <p>other user</p>
          <button style={{ cursor: "pointer" }}>Send Money</button>
        </div>
        <div style={{ display: "flex",justifyContent: "space-between" }}>
          <p>other user</p>
          <button style={{ cursor: "pointer" }}>Send Money</button>
        </div>
        <div style={{ display: "flex",justifyContent: "space-between" }}>
          <p>other user</p>
          <button style={{ cursor: "pointer" }}>Send Money</button>
        </div>
      </div>
    </div>
  );
};

export default Users;
