const express = require("express");
const {
  getAllTeachersDetailsCtrl,
  filterTeacherCtrl,
  updateDetailsCtrl,
  searchTeacherCtrl,
  deleteTeacherCtrl,
  getTeacherByIdCtrl
} = require("./controllers/teachers");
const { addDetailsCtrl } = require("./controllers/teachers");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.get("/", getAllTeachersDetailsCtrl);
app.get("/add-teacher", (req, res) => {
  res.render("form.ejs");
});
app.post("/add-teacher", addDetailsCtrl);
app.post("/update-teacher/:id", updateDetailsCtrl);
app.get("/update-teacher/:id", getTeacherByIdCtrl);
app.get("/search", searchTeacherCtrl);
app.get("/filter", filterTeacherCtrl);
app.get('/delete/:id', deleteTeacherCtrl);
app.listen(5000, () => console.log("server is listening on port 5000"));
