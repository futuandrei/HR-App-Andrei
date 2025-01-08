import { useEffect, useState } from "react";
import EmployeeCard from "../EmployeeCard/EmployeeCard";
import "./EmployeeList.css";

const EmployeeList = () => {
  // const [posts, setPosts] = useState([]); // Added on Wednesday 27.11
  const [isLoading, setIsLoading] = useState(true); // Added on Wednesday 27.11
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/employees")
      .then((response) => response.json())
      .then((data) => {
        setEmployees(data);
        setIsLoading(false);
      });
  }, []);

  // Function to update an employee's information
  const updateEmployee = (id, updatedData) => {
    setEmployees((prevEmployees) =>
      prevEmployees.map((emp) =>
        emp.id === id ? { ...emp, ...updatedData } : emp
      )
    );
  };

  // Function to delete employee
  const deleteEmployee = async (id) => {
    // Send DELETE request to the server
    await fetch(`http://localhost:3001/employees/${id}`, {
      method: "DELETE",
    });

    // Update state to remove employee from list
    setEmployees((prevEmployees) =>
      prevEmployees.filter((employee) => employee.id !== id)
    );
  };

  // console.log(posts);
  return (
    <div className="cards-list">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        employees.map((employee) => (
          <EmployeeCard
            key={employee.id} // Assuming each employee has a unique "id"
            name={employee.name}
            department={employee.department}
            {...employee}
            onDelete={deleteEmployee} // Pass delete function as a prop
            onSave={updateEmployee} // Pass the update function to EmployeeCard
          />
        ))
      )}
    </div>
  );
};

export default EmployeeList;
