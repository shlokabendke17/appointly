import bcrypt from "bcrypt";
import db from "../config/db.js";
import jwt from "jsonwebtoken";

// ----------------- User Registration -----------------
export const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role)
    return res.status(400).json({ success: false, message: "All fields are required" });

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    db.query(
      "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
      [name, email, hashedPassword, role],
      (err, result) => {
        if (err) {
          if (err.code === "ER_DUP_ENTRY")
            return res.status(400).json({ success: false, message: "Email already exists" });
          return res.status(500).json({ success: false, message: "Database error" });
        }
        res.json({ success: true, message: "User registered successfully" });
      }
    );
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ----------------- Provider Registration -----------------
export const registerProvider = async (req, res) => {
  const { name, email, password, service_type, designation, location } = req.body;

  if (!name || !email || !password || !service_type || !location)
    return res.status(400).json({ success: false, message: "All required fields must be filled" });

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert into users table
    db.query(
      "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
      [name, email, hashedPassword, "provider"],
      (err, result) => {
        if (err) {
          if (err.code === "ER_DUP_ENTRY")
            return res.status(400).json({ success: false, message: "Email already exists" });
          console.error("User insert error:", err);
          return res.status(500).json({ success: false, message: "Error creating user" });
        }

        const userId = result.insertId;

        // Insert into providers table
        db.query(
          "INSERT INTO providers (user_id, service_type, designation, location) VALUES (?, ?, ?, ?)",
          [userId, service_type, designation || null, location],
          (err2) => {
            if (err2) {
              console.error("Provider insert error:", err2);
              return res.status(500).json({ success: false, message: "Error creating provider record" });
            }

            res.json({ success: true, message: "Provider registered successfully" });
          }
        );
      }
    );
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ----------------- GET SERVICES -----------------
export const getServices = (req, res) => {
  db.query("SELECT * FROM services", (err, results) => {
    if (err) return res.status(500).json({ success: false, message: "DB error fetching services" });
    res.json(results); // [{id:1, name:"Doctor"}, ...]
  });
};

// ----------------- Login -----------------
export const loginUser = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ success: false, message: "Email and password required" });

  db.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {
    if (err) return res.status(500).json({ success: false, message: "Database error" });
    if (results.length === 0)
      return res.status(400).json({ success: false, message: "User not found" });

    const user = results[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res.status(400).json({ success: false, message: "Incorrect password" });

    // const { password: pwd, ...userInfo } = user;
    // res.json({ success: true, message: "Login successful", user: userInfo });

     // Create JWT
    const token = jwt.sign(
      { id: user.id, role: user.role, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: "7d" } // token valid for 7 days
    );

    res.json({
      success: true,
      message: "Login successful",
      token,
      user: { id: user.id, name: user.name, role: user.role }
    });
  });
};

console.log("JWT_SECRET =", process.env.JWT_SECRET);

