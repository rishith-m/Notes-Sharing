const router = require("express").Router();
const multer = require("multer");
const Note = require("../models/Note");
const auth = require("../middleware/auth");

// File Upload
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req,file,cb)=>{
    cb(null, Date.now()+"-"+file.originalname);
  }
});

const upload = multer({storage});

// Upload Note
router.post("/", auth, upload.single("file"), async (req,res)=>{
  const note = new Note({
    title: req.body.title,
    subject: req.body.subject,
    file: req.file.filename,
    user: req.user.id
  });

  await note.save();
  res.json(note);
});

// Get Notes
router.get("/", async (req,res)=>{
  const notes = await Note.find().populate("user","name");
  res.json(notes);
});

module.exports = router;
