// Imports
const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const cors = require("cors");
const mysql = require('mysql');

// Initialize express app
const app = express();
const port = 3000;

// Enable CORS for all requests
app.use(cors());

// Load environment variables
require('dotenv').config();

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
};

// Create a connection to the database
const db = mysql.createConnection(dbConfig);

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to database');
});

// Database operation to get all packages
function getAllPackages() {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM packages', (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
}

// Then use this function in your route
app.get("/packages", async (req, res) => {
  try {
    const packagesData = await getAllPackages();
    res.json(packagesData);
  } catch (error) {
    console.error("Error fetching packages:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

// Serve static files from the uploads directory
app.use("/uploads", express.static("uploads"));
app.use("/static", express.static(path.join(__dirname, "public")));

// Ensure the uploads directory exists
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

// Database file path
const dbFile = path.join(__dirname, "packages.json");

// Database operations
const readPackagesData = () => {
  try {
    if (fs.existsSync(dbFile)) {
      const data = fs.readFileSync(dbFile, "utf8");
      return JSON.parse(data);
    }
  } catch (error) {
    console.error("Error reading file:", error);
  }
  return [];
};

const writePackagesData = (data) => {
  try {
    fs.writeFileSync(dbFile, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Error writing file:", error);
  }
};

// Find a package by ID
function findPackageById(id) {
  console.log(`Finding package with ID: ${id}`); // Log the incoming ID
  const packagesData = getAllPackages();
  const packageItem = packagesData.find((pkg) => pkg.id === id);
  console.log(`Package found:`, packageItem); // Log the found package
  return packageItem;
}

// Get all packages
function getAllPackages() {
  if (fs.existsSync(dbFile)) {
    const data = fs.readFileSync(dbFile, "utf8");
    return JSON.parse(data);
  }
  return []; // Return an empty array if the file doesn't exist
}

// Upload endpoint
app.post("/upload", upload.single("image"), (req, res) => {
  console.log("Received upload request");
  try {
    // Create package object to store
    const packageData = {
      id: uuidv4(), // This will assign a unique ID
      imageUrl: req.file.filename, // Only save the filename
      packageName: req.body.packageName,
      category: req.body.packageCategory,
      packageLocation: req.body.packageLocation,
      packagePrice: req.body.packagePrice,
      packageDate: req.body.packageDate,
      packageDurationDate: req.body.packageDurationDate,
      packageDiscription: req.body.packageDiscription,
      animinitiesinhotlel: req.body.animinitiesinhotlel,
      agentName: req.body.agentName,
      agentNumber: req.body.agentNumber,
    };

    // Read the existing data from the "database"
    let data = [];
    if (fs.existsSync(dbFile)) {
      data = JSON.parse(fs.readFileSync(dbFile));
    }

    // Add the new package data
    data.push(packageData);

    // Write the updated data back to the "database"
    fs.writeFileSync(dbFile, JSON.stringify(data, null, 2));

    res
      .status(200)
      .send({ message: "File uploaded and data stored", packageData });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).send("Internal Server Error");
  }

  try {
    const data = readPackagesData();
    data.push(packageData);
    writePackagesData(data);

    res
      .status(200)
      .send({ message: "File uploaded and data stored", packageData });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Packages retrieval endpoint for all packages
app.get("/packages", (req, res) => {
  const packagesData = getAllPackages();
  if (packagesData.length > 0) {
    res.json(packagesData);
  } else {
    res.status(404).send({ error: "No packages found" });
  }
});

// Server-side route to fetch packages by category
app.get("/packages/:category", (req, res) => {
  console.log(`Category requested: ${req.params.category}`);
  const { category } = req.params;
  // Retrieve all packages
  const allPackages = getAllPackages();
  // Filter packages by the requested category
  const filteredPackages = allPackages.filter(
    (pkg) => pkg.category === category
  );
  // Respond with the filtered packages
  res.json(filteredPackages);
});

// Packages retrieval endpoint
app.get("/packages/id/:id", (req, res) => {
  const { id } = req.params;
  const packageData = findPackageById(id);
  if (packageData) {
    res.json(packageData);
  } else {
    res.status(404).send({ message: "Package not found" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
