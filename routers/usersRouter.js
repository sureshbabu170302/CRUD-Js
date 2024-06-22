const express = require("express");
const router = express.Router();
const User = require("../models/user");

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - Name
 *         - Email
 *         - Password
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the user
 *         Name:
 *           type: string
 *           description: The name of the user
 *         Email:
 *           type: string
 *           description: The email of the user
 *         Password:
 *           type: string
 *           description: The password of the user
 *       example:
 *         id: d5fE_asz
 *         Name: John Doe
 *         Email: john.doe@example.com
 *         Password: password123
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieves all users
 *     tags: [User]
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Server error
 */
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users); // Use JSON response and set the status code to 200 (OK)
    console.log("Get Method");
  } catch (error) {
    res.status(500).json({ message: error.message }); // Send a 500 (Internal Server Error) response with the error message
    console.log("Error: ", error);
  }
});

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Adds a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: The user was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request
 */
router.post("/", async (req, res) => {
  console.log(req.body);
  const { Name, Email, Password } = req.body;

  const newUser = new User({
    Name,
    Email,
    Password,
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json({ message: "User added successfully", user: savedUser }); // Use JSON response and set the status code to 201 (Created)
    console.log("POST method");
  } catch (error) {
    res.status(400).json({ message: error.message }); // Send a 400 (Bad Request) response with the error message
    console.log("Error: ", error);
  }
});

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     responses:
 *       200:
 *         description: The user description by ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 */
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      res.status(200).json(user); // Use JSON response and set the status code to 200 (OK)
    } else {
      res.status(404).json({ message: "User not found" }); // Send a 404 (Not Found) response with the error message
    }
  } catch (error) {
    res.status(500).json({ message: error.message }); // Send a 500 (Internal Server Error) response with the error message
  }
});

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update a user by ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The user was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request
 *       404:
 *         description: User not found
 */
router.put("/:id", async (req, res) => {
  const { Name, Email, Password } = req.body;

  try {
    const user = await User.findById(req.params.id);
    if (user) {
      user.Name = Name || user.Name;
      user.Email = Email || user.Email;
      user.Password = Password || user.Password;

      const updatedUser = await user.save();
      res.status(200).json({ message: "User updated successfully", user: updatedUser }); // Use JSON response and set the status code to 200 (OK)
    } else {
      res.status(404).json({ message: "User not found" }); // Send a 404 (Not Found) response with the error message
    }
  } catch (error) {
    res.status(400).json({ message: error.message }); // Send a 400 (Bad Request) response with the error message
  }
});

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     responses:
 *       200:
 *         description: The user was successfully deleted
 *       404:
 *         description: User not found
 */
router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      await user.remove();
      res.status(200).json({ message: "User deleted successfully" }); // Use JSON response and set the status code to 200 (OK)
    } else {
      res.status(404).json({ message: "User not found" }); // Send a 404 (Not Found) response with the error message
    }
  } catch (error) {
    res.status(500).json({ message: error.message }); // Send a 500 (Internal Server Error) response with the error message
  }
});

module.exports = router;
