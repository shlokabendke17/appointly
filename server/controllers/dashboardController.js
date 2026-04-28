import db from "../config/db.js";

// Returns appointments or data for **specific logged-in user**
export const getUserDashboard = (req, res) => {
  const userId = req.user.id; // from JWT
  db.query(
    "SELECT * FROM appointments WHERE user_id = ?",
    [userId],
    (err, results) => {
      if (err) return res.status(500).json({ success: false, message: "DB error" });
      res.json({ success: true, data: results });
    }
  );
};

export const getProviderDashboard = (req, res) => {
  const providerId = req.user.id;
  db.query(
    "SELECT * FROM appointments WHERE provider_id = ?",
    [providerId],
    (err, results) => {
      if (err) return res.status(500).json({ success: false, message: "DB error" });
      res.json({ success: true, data: results });
    }
  );
};
