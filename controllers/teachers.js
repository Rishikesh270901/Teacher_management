const fs = require("fs");
const getAllTeachersDetailsCtrl = (req, res) => {
  fs.readFile("./db/teachers.js", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return res.status(500).send("Error reading file");
    }

    try {
      // Parse the data into an object (assuming it's JSON)
      const teachersData = JSON.parse(data);
      // console.log(teachersData);
      // Now you can render the EJS template with the parsed data
      res.render("home.ejs", { teachers: teachersData });
    } catch (error) {
      console.error("Error parsing JSON:", error);
      return res.status(500).send("Error parsing JSON");
    }
  });
};

const addDetailsCtrl = (req, res) => {
  console.log(req.body, "hi");
  fs.readFile("./db/teachers.js", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return;
    }

    // Parse the existing JSON data into an array
    const existingData = JSON.parse(data);

    const {
      fullname,
      age,
      date_of_birth,
      number_of_classes,
      subject,
      experience,
    } = req.body;
    const newTeacher = {
      id: existingData.length + 1,
      fullname,
      age,
      date_of_birth,
      number_of_classes,
      subject,
      experience,
    };
    // Add the new teacher to the existing data
    existingData.push(newTeacher);

    // Convert the modified data back to JSON string
    const newDataString = JSON.stringify(existingData, null, 2);

    // Write the modified data back to the file
    fs.writeFile("./db/teachers.js", newDataString, "utf8", (err) => {
      if (err) {
        console.error("Error writing file:", err);
        return;
      }
      console.log("New teacher added successfully.");
      console.log(existingData);
      // After writing to the file, render the home.ejs template
      res.render("home.ejs", { teachers: existingData }); // Pass teachers data to the template
    });
  });
};

const updateDetailsCtrl = (req, res) => {
  fs.readFile("./db/teachers.js", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      res.status(500).json({ error: "Error reading file" });
      return;
    }

    const teachersData = JSON.parse(data);
    const {
      fullname,
      age,
      date_of_birth,
      number_of_classes,
      subject,
      experience,
    } = req.body;
    const id = parseInt(req.params.id);

    let teacherToUpdate = teachersData.find((teacher) => teacher.id === id);
    if (!teacherToUpdate) {
      console.log("Teacher not found");
      res.status(404).json({ error: "Teacher not found" });
      return;
    }

    // Update teacher details
    teacherToUpdate.fullname = fullname;
    teacherToUpdate.age = age;
    teacherToUpdate.date_of_birth = date_of_birth;
    teacherToUpdate.number_of_classes = number_of_classes;
    teacherToUpdate.subject = subject;
    teacherToUpdate.experience = experience;

    // Write updated data back to the file
    fs.writeFile(
      "./db/teachers.js",
      JSON.stringify(teachersData, null, 2),
      (err) => {
        if (err) {
          console.error("Error updating file:", err);
          res.status(500).json({ error: "Error updating file" });
          return;
        }
        console.log("File updated successfully.");
        res.render("home.ejs", { teachers: teachersData });
      }
    );
  });
};

// const searchTeacherCtrl = (req, res) => {
//   fs.readFile("./db/teachers.js", "utf8", (err, data) => {
//     if (err) {
//       console.error("Error reading file:", err);
//       return res.status(500).json({ error: "Error reading file" });
//     }

//     const { name } = req.query;
//     console.log(name);
//     console.log(typeof name);
//     const teachersData = JSON.parse(data);
//     // console.log(teacher);
//     let teacherDataRetrieved = [];
//     for (let i = 0; i < teachersData.length; i++) {
//       if (teachersData[i].name === name) {
//         teacherDataRetrieved.push(JSON.stringify(teachersData[i], null, 2));
//       }
//     }
//     // console.log("Retrieved data is : " + teacherDataRetrieved);
//     // // Check if teacher is found
//     // if (!teacher.length) {
//     //   return res.status(404).json({ error: "Teacher not found" });
//     // }

//     res.render("search.ejs", { searchTeacher: teacherDataRetrieved });
//   });
// };
const searchTeacherCtrl = (req, res) => {
  fs.readFile("./db/teachers.js", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return res.status(500).json({ error: "Error reading file" });
    }

    const fullname = req.query;
    // console.log(fullname.fullname);
    const teachersData = JSON.parse(data);

    let teacherDataRetrieved = [];
    for (let i = 0; i < teachersData.length; i++) {
      if (teachersData[i].fullname === fullname.fullname) {
        teacherDataRetrieved.push(teachersData[i]);
      }
    }
    // console.log(teacherDataRetrieved);
    // if (matchedTeachers.length === 0) {
    //   // Handle case where no teachers are found
    //   return res.status(404).render("search.ejs", { searchTeacher: null });
    // }

    // Render the search results with the matched teachers
    res.render("search.ejs", { searchTeacher: teacherDataRetrieved });
  });
};

// const filterTeacherCtrl = (req, res) => {
//   fs.readFile("./db/teachers.js", "utf8", (err, data) => {
//     if (err) {
//       console.error("Error reading file:", err);
//       return res.status(500).json({ error: "Error reading file" });
//     }

//     const { age, number_of_classes } = req.query;
//     console.log(age, number_of_classes);
//     const teachersData = JSON.parse(data);
//     // console.log(teachersData);
//     let teacherDataRetrieved = [];
//     for (let i = 0; i < teachersData.length; i++) {
//       if (
//         teachersData[i].age === age &&
//         teachersData[i].number_of_classes === number_of_classes
//       ) {
//         // console.log(teachersData[i]);
//         teacherDataRetrieved.push(teachersData[i]);
//       }
//     }
//     console.log(teacherDataRetrieved);
//     // // if (matchedTeachers.length === 0) {
//     // //   // Handle case where no teachers are found
//     // //   return res.status(404).render("search.ejs", { searchTeacher: null });
//     // // }

//     // // Render the search results with the matched teachers
//     res.render("filter.ejs", { filterTeacher: teacherDataRetrieved });
//   });
// };
const filterTeacherCtrl = (req, res) => {
  fs.readFile("./db/teachers.js", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return res.status(500).json({ error: "Error reading file" });
    }

    const { age, number_of_classes } = req.query;
    const parsedAge = parseInt(age);
    const parsedClasses = parseInt(number_of_classes);

    const teachersData = JSON.parse(data);
    let teacherDataRetrieved = [];

    for (let i = 0; i < teachersData.length; i++) {
      if (
        teachersData[i].age === parsedAge &&
        teachersData[i].number_of_classes === parsedClasses
      ) {
        teacherDataRetrieved.push(teachersData[i]);
      }
    }
    // if (teacherDataRetrieved.length === 0) {
    //   // return res.render("no-results.ejs");
    // }

    // Render the search results with the matched teachers
    res.render("filter.ejs", { filterTeacher: teacherDataRetrieved });
  });
};

const getTeacherByIdCtrl = (req, res) => {
  const id = parseInt(req.params.id);
  console.log(id);
  fs.readFile("./db/teachers.js", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return res.status(500).json({ error: "Error reading file" });
    }

    const teachersData = JSON.parse(data);
    const dataFound = teachersData.find((teacher) => teacher.id === id);
    console.log(dataFound);
    // console.log(dataFound);
    if (!dataFound) res.json({ error: "Teacher not found" });
    res.render("update.ejs", { teachers: dataFound });
  });
};

const deleteTeacherCtrl = (req, res) => {
  fs.readFile("./db/teachers.js", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      res.status(500).json({ error: "Error reading file" });
      return;
    }
    const id = parseInt(req.params.id);
    console.log(id);
    const teachersData = JSON.parse(data);
    const teacher = teachersData.find((teacher) => teacher.id === id);
    const index = teachersData.indexOf(teacher);
    teachersData.splice(index, 1);
    console.log(teachersData);
    fs.writeFile(
      "./db/teachers.js",
      JSON.stringify(teachersData, null, 2),
      "utf8",
      (err) => {
        if (err) {
          console.log("Error writing file:", err);
          res.status(500);
        }
        // Successfully deleted the element
        console.log("successfully deleted element");
        // res.json({ teachersData });
        res.render("home.ejs", { teachers: teachersData });
      }
    );
  });
};

module.exports = {
  getAllTeachersDetailsCtrl,
  addDetailsCtrl,
  updateDetailsCtrl,
  searchTeacherCtrl,
  deleteTeacherCtrl,
  filterTeacherCtrl,
  getTeacherByIdCtrl,
};
