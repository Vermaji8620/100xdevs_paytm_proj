import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Users = () => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/v1/user/bulk?filter=${search}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => setUsers(response.data.filteredusers));
  }, [search]);
  return (
    <div style={{ padding: "10px", width: "98%" }}>
      <h2>Users</h2>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search users"
        style={{ padding: "10px", width: "98%", borderColor: "gray" }}
      />
      <div
        style={{
          marginTop: "10px",
          display: "flex",
          flexDirection: "column",
          gap: "13px",
        }}
      >
        <div>
          {users.map((user, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                justifyContent: "space-between",
                margin: "10px",
              }}
            >
              {user.firstName} {user.lastName}
              <button>
                <Link
                  to={`/send/${user._id}/${user.firstName}+${user.lastName}`}
                >
                  Send Money
                </Link>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Users;
