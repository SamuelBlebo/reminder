const Reminder = require("../models/reminderModel");

const mongoose = require("mongoose");

//get all Reminders

const getReminders = async (req, res) => {
  const reminders = await Reminder.find({}).sort({ date: -1 });

  res.status(200).json(reminders);
};

// get a single Reminder
const getReminder = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such Reminder" });
  }

  const reminder = await Reminder.findById(id);

  if (!reminder) {
    return res.status(404).json({ error: "No such Reminder" });
  }

  res.status(200).json(reminder);
};

// create a new Reminder
const createReminder = async (req, res) => {
  const { title, description, date } = req.body;

  try {
    const reminder = await Reminder.create({
      title,
      description,
      date,
    });
    res.status(200).json(reminder);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete an Reminder

const deleteReminder = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such Reminder" });
  }

  const reminder = await Reminder.findOneAndDelete({ _id: id });

  if (!reminder) {
    return res.status(400).json({ error: "No Such Reminder" });
  }

  res.status(200).json("Deleted Successfully");
};

// Updating a reminder

const updateReminder = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such Reminder" });
  }

  const reminder = await Reminder.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!reminder) {
    return res.status(400).json({ error: "No such Reminder" });
  }

  res.status(200).json("Updated Successfully");
};

module.exports = {
  getReminders,
  getReminder,
  createReminder,
  deleteReminder,
  updateReminder,
};
