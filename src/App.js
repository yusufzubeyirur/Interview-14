import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  return (
    <div>
      <Pagination />
    </div>
  );
}

const Pagination = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    axios
      .get("https://randomuser.me/api?results=19&format=pretty")
      .then((response) => {
        const cleanedUsers = response.data.results.map((user) => ({
          name: `${user.name.first} ${user.name.last}`,
          age: user.dob.age,
          email: user.email,
        }));
        setUsers(cleanedUsers);
        setLoading(false);
      })
      .catch((error) => console.error("API Hatası: ", error));
  }, []);

  if (loading) {
    return <div>Yükleniyor...</div>;
  }
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = users.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <Pages
        content={currentItems}
        itemsPerPage={itemsPerPage}
        totalItems={users.length}
        paginate={paginate}
      />
    </div>
  );
};

const Pages = ({ content, itemsPerPage, totalItems, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <table
        border="1"
        cellPadding="10"
        style={{
          borderCollapse: "collapse",
          marginBottom: "20px",
          width: "100%",
        }}
      >
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {content.map((user, index) => (
            <tr key={index}>
              <td>{user.name}</td>
              <td>{user.age}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <nav>
        <ul style={{ display: "flex", listStyleType: "none", padding: 0 }}>
          {pageNumbers.map((number) => (
            <li key={number} style={{ margin: "0 5px" }}>
              <a href="#" onClick={() => paginate(number)}>
                {number}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default App;
