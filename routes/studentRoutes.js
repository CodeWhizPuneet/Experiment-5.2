const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/studentController");
const { validateStudent } = require("../middleware/validation");

// GET  /students
router.get("/", ctrl.getAllStudents);

// GET  /students/search
router.get("/search", ctrl.searchStudents);

// GET  /students/create
router.get("/create", ctrl.getCreateForm);

// POST /students
router.post("/", validateStudent, ctrl.createStudent);

// GET  /students/:id
router.get("/:id", ctrl.getStudent);

// GET  /students/:id/edit
router.get("/:id/edit", ctrl.getEditForm);

// PUT  /students/:id  (via ?_method=PUT)
router.put("/:id", validateStudent, ctrl.updateStudent);

// DELETE /students/:id (via ?_method=DELETE)
router.delete("/:id", ctrl.deleteStudent);

module.exports = router;
