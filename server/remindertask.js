const cron = require("node-cron");
const sendReminderEmails = require("./sendReminderEmails"); // Function to send reminder emails
const axios = require("axios");

// Schedule task to run every day at 8 am
cron.schedule("0 8 * * *", async () => {
  try {
    // Fetch reminders from the database
    const response = await axios.get("http://localhost:4000/api/reminder");
    const reminders = response.data;

    // Execute the function to send reminder emails
    await sendReminderEmails(reminders);
    console.log("Reminder emails sent successfully.");
  } catch (error) {
    console.error("Error sending reminder emails:", error);
  }
});
