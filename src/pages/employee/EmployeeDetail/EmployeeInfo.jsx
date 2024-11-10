/* eslint-disable react/prop-types */

import dayjs from "dayjs";

export default function EmployeeInfo({ employeeData }) {
  const Status = employeeData?.Status;
  const formattedDob = dayjs(employeeData?.DoB).format("DD/MM/YYYY");

  return (
    <div style={{ display: "flex", gap: 50 }}>
      <div>
        <p>Name: {employeeData?.Name}</p>
        <p>Email: {employeeData?.Email}</p>
        <p>Phone number: {employeeData?.Phone}</p>
        <p>Dob: {formattedDob}</p>
        <p>Gender: {employeeData?.Gender == 0 ? "Male" : "Female"}</p>
      </div>
      <div>
        <p>
          Status:{" "}
          {Status === 0
            ? "Active"
            : Status === 1
            ? "Inactive"
            : Status === 2
            ? "Unassign"
            : Status === 3
            ? "Deleted"
            : "NaN"}
        </p>
        <p>Manage by: {employeeData?.Name}</p>
        <p>Counter: {employeeData?.CounterId}</p>
      </div>
    </div>
  );
}
