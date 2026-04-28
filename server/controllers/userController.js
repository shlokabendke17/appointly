// import db from "../config/db.js";

// export const getUserAppointments = async (req, res) => {
//   try {
//     const userId = req.user.id; // comes from verifyToken middleware
//     const [rows] = await db.query(
//       `SELECT a.*, p.name AS provider_name, s.name AS service_name
//        FROM appointments a
//        JOIN providers p ON a.provider_id = p.id
//        JOIN services s ON a.service_id = s.id
//        WHERE a.user_id = ? 
//        ORDER BY a.appointment_date DESC`,
//       [userId]
//     );
//     res.json(rows);
//   } catch (error) {
//     console.error("Error fetching appointments:", error);
//     res.status(500).json({ message: "Something went wrong" });
//   }
// };
