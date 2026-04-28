import db from "../config/db.js";

// ✅ Fetch all appointments for a specific user
export const getUserAppointments = async (req, res) => {
  const userId = req.params.userId;

  try {
    const [rows] = await db.query(
      `
      SELECT 
        a.id,
        a.appointment_date,
        a.status,
        s.name AS service_name,
        u2.name AS provider_name
      FROM appointments a
      JOIN services s ON a.service_id = s.id
      JOIN providers p ON a.provider_id = p.id
      JOIN users u2 ON p.user_id = u2.id
      WHERE a.user_id = ?
      ORDER BY a.appointment_date DESC
      `,
      [userId]
    );

    res.json(rows);
  } catch (error) {
    console.error("Error fetching user appointments:", error);
    res.status(500).json({ message: "Error fetching appointments" });
  }
};

// ✅ Fetch all appointments for a specific provider
export const getProviderAppointments = async (req, res) => {
  const providerId = req.params.providerId;

  try {
    const [rows] = await db.query(
      `
      SELECT
        a.id,
        a.appointment_date,
        a.status,
        s.name AS service_name,
        u.name AS user_name
      FROM appointments a
      JOIN services s ON a.service_id = s.id
      JOIN users u ON a.user_id = u.id
      WHERE a.provider_id = ?
      ORDER BY a.appointment_date DESC
      `,
      [providerId]
    );

    res.json(rows);
  } catch (error) {
    console.error("Error fetching provider appointments:", error);
    res.status(500).json({ message: "Error fetching appointments" });
  }
};
