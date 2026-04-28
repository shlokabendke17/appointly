import { useEffect, useState } from "react";
import axios from "axios";
import React from 'react'

function ProviderDashboard() {
  const [appointments, setAppointments] = useState([]);

  // useEffect(() => {
  //   const token = localStorage.getItem("token");

  //   axios.get("http://localhost:5000/api/dashboard/provider", {
  //     headers: { Authorization: `Bearer ${token}` }
  //   })
  //   .then(res => setAppointments(res.data.data))
  //   .catch(err => console.error(err));
  // }, []);

  useEffect(() => {
  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000//api/appointments/user/${user.id}", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAppointments(res.data);
    } catch (err) {
      console.error("Failed to fetch appointments:", err);
    }
  };
  fetchAppointments();
}, []);


  return (
    <div>
      <h2>User Dashboard</h2>
      {appointments.length === 0 ? <p>No appointments yet.</p> :
        appointments.map(a => <div key={a.id}>{a.date} - {a.service}</div>)
      }
    </div>
  );
  
}

export default ProviderDashboard