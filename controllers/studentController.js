const Student = require("../models/Student");
const { validationResult } = require("express-validator");

// GET /students — list all
exports.getAllStudents = async (req, res, next) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });
    res.render("index", { title: "All Students", students });
  } catch (err) {
    next(err);
  }
};

// GET /students/search
exports.searchStudents = async (req, res, next) => {
  try {
    const q = req.query.q || "";
    const students = await Student.find({
      $or: [
        { name:       { $regex: q, $options: "i" } },
        { email:      { $regex: q, $options: "i" } },
        { rollNumber: { $regex: q, $options: "i" } },
      ],
    });
    res.render("index", { title: `Search: "${q}"`, students });
  } catch (err) {
    next(err);
  }
};

// GET /students/create
exports.getCreateForm = (req, res) => {
  res.render("create", { title: "Add Student", errors: [], old: {} });
};

// POST /students
exports.createStudent = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render("create", {
      title: "Add Student",
      errors: errors.array(),
      old: req.body,
    });
  }
  try {
    await Student.create(req.body);
    res.redirect("/students");
  } catch (err) {
    // Handle duplicate key
    if (err.code === 11000) {
      const field = Object.keys(err.keyValue)[0];
      return res.status(400).render("create", {
        title: "Add Student",
        errors: [{ msg: `${field} already exists` }],
        old: req.body,
      });
    }
    next(err);
  }
};

// GET /students/:id
exports.getStudent = async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).render("error", { title: "Not Found", message: "Student not found", error: {} });
    res.render("show", { title: student.name, student });
  } catch (err) {
    next(err);
  }
};

// GET /students/:id/edit
exports.getEditForm = async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).render("error", { title: "Not Found", message: "Student not found", error: {} });
    res.render("edit", { title: "Edit Student", student, errors: [], old: student });
  } catch (err) {
    next(err);
  }
};

// PUT /students/:id
exports.updateStudent = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const student = await Student.findById(req.params.id);
    return res.status(400).render("edit", {
      title: "Edit Student",
      student,
      errors: errors.array(),
      old: req.body,
    });
  }
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!student) return res.status(404).render("error", { title: "Not Found", message: "Student not found", error: {} });
    res.redirect(`/students/${student._id}`);
  } catch (err) {
    if (err.code === 11000) {
      const field = Object.keys(err.keyValue)[0];
      const student = await Student.findById(req.params.id);
      return res.status(400).render("edit", {
        title: "Edit Student",
        student,
        errors: [{ msg: `${field} already exists` }],
        old: req.body,
      });
    }
    next(err);
  }
};

// DELETE /students/:id
exports.deleteStudent = async (req, res, next) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.redirect("/students");
  } catch (err) {
    next(err);
  }
};
