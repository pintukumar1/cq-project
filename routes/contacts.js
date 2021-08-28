const { check, validationResult } = require("express-validator");
const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const Contact = require("../model/Contact");

router.get("/", auth, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1
    });
    res.json(contacts);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

router.post(
  "/",
  [
    auth,
    [
      check("name", "Name is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, phone, type } = req.body;
    try {
      const newContact = new Contact({
        name,
        email,
        phone,
        type,
        user: req.user.id
      });

      const contact = await newContact.save();
      res.json(contact);
    } catch (error) {
      res.status(500).send("Something went wrong");
    }
  }
);

router.delete("/:id", auth, async (req, res) => {
  try {
    let contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ msg: "Contact not found" });

    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }
    await Contact.findByIdAndRemove(req.params.id);
    return res.status(200).json({ msg: "Success" });
  } catch (error) {
    res.status(500).send("Something went wrong");
  }
});

router.put("/:id", auth, async (req, res) => {
  const { name, email, phone, type } = req.body;
  const updatedContact = { name, email, phone, type };
  try {
    let contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ msg: "Contact not found" });
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }
    contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { $set: updatedContact },
      { new: true }
    );
    res.json(contact);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
