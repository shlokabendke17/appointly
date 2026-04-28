import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import AppointmentCard from "../components/AppointmentCard";

function UserDashboard() {
  const [appointments, setAppointments] = useState([]);

  // useEffect(() => {
  //   const token = localStorage.getItem("token");

  //   axios.get("http://localhost:5000/api/dashboard/user", {
  //     headers: { Authorization: `Bearer ${token}` }
  //   })
  //   .then(res => setAppointments(res.data.data))
  //   .catch(err => console.error(err));
  // }, []);

  const token = localStorage.getItem("token");
  console.log("Token:", token);


  useEffect(() => {
  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000//api/appointments/user/${user.id}r", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAppointments(res.data);
    } catch (err) {
      console.error("Failed to fetch appointments:", err);
    }
  };
  fetchAppointments();
}, []);

  const userName = localStorage.getItem("name"); // Retrieve user name from localStorage

  // Split upcoming and past
  const upcoming = appointments.filter(a => new Date(a.date) >= new Date());
  const past = appointments.filter(a => new Date(a.date) < new Date());

  return (
    <div className="d-flex">
    <Sidebar />
    <div className="flex-grow-1 p-4">
      <h1>Welcome, {userName}!</h1> {/* Display name */}
      <h2>Upcoming Appointments</h2>
      {upcoming.length > 0 ? upcoming.map((a) => (
        <AppointmentCard key={a.id} appointment={a} />
      )) : <p>No upcoming appointments.</p>}

      <h2 className="mt-5">Past Appointments</h2>
      {past.length > 0 ? past.map((a) => (
        <AppointmentCard key={a.id} appointment={a} />
      )) : <p>No past appointments.</p>}
    </div>
  </div>
  );
}

export default UserDashboard;
