const nodemailer = require("nodemailer");
const axios = require("axios");

// Function to send reminder emails
async function sendReminderEmails() {
  try {
    // Fetch reminder data from API
    const response = await axios.get("http://localhost:4000/api/reminder");
    const remindersData = response.data;

    // Initialize nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "afrowjack99@gmail.com",
        pass: "vlxzrdziuobkkjnv",
      },
    });

    // Get current date
    const currentDate = new Date();

    // Loop through reminders and check if it's time to send reminder emails
    for (const reminder of remindersData) {
      const { title, description, dueDate, userEmail, userName } = reminder;

      // Convert dueDate string to Date object
      const parsedDueDate = new Date(dueDate);

      // Check if parsedDueDate is a valid Date object
      if (!isNaN(parsedDueDate.getTime())) {
        // Calculate reminder date three days before due date
        const threeDaysBeforeDueDate = new Date(parsedDueDate);
        threeDaysBeforeDueDate.setDate(threeDaysBeforeDueDate.getDate() - 3);

        // Check if it's time to send reminder emails
        if (
          currentDate >= threeDaysBeforeDueDate && // If current date is after three days before due date
          currentDate < parsedDueDate // And current date is before due date
        ) {
          // Compose email message with HTML content and CSS styling
          const mailOptions = {
            from: '"Reminder App"',
            to: userEmail,
            subject: "Reminder: " + title,
            html: `
            <div style="background-color: #f0f0f0; padding: 20px;">
            <h6 style="color: #333;">Hello ${userName},</h26>
            <p style="color: #333;">Your Reminder is due.</p>
            <div style="background-color: #ccc; padding: 10px; border-right: 25px solid #999;">
              <p style="color: #333; font-weight: bold; font-style: italic;">"${title}".</p>
              <p style="color: #333; font-style: italic;">${description}</p>
              <p style="color: #333; font-style: italic;">Due Date: ${parsedDueDate.toDateString()}</p>
            </div>
            <p style="color: #333; ">Regards,<br/>Reminder app</p>
          </div>
            `,
          };

          // Send email
          await transporter.sendMail(mailOptions);
        } else if (
          currentDate.getDate() === parsedDueDate.getDate() && // If it's the due date
          currentDate.getHours() === 8
        ) {
          // Compose email message for due date
          const mailOptions = {
            from: "Reminder App",
            to: userEmail,
            subject: "Reminder: " + title,
            html: `
              <div style="background-color: #f0f0f0; padding: 20px;">
                <h6 style="color: #333;">Hello ${userName},</h26>
                <p style="color: #333;">Your Reminder is due.</p>
                <div style="background-color: #ccc; padding: 10px; border-right: 25px solid #999;">
                  <p style="color: #333; font-weight: bold; font-style: italic;">"${title}".</p>
                  <p style="color: #333; font-style: italic;">${description}</p>
                  <p style="color: #333; font-style: italic;">Due Date: ${parsedDueDate.toDateString()}</p>
                </div>
                <p style="color: #333; ">Regards,<br/>Reminder app</p>
              </div>
            `,
          };

          // Send email
          await transporter.sendMail(mailOptions);
        }
      } else {
        console.error(
          "Error: Due date is not a valid Date object for a reminder:",
          reminder
        );
      }
    }

    console.log("Reminder emails sent successfully.");
  } catch (error) {
    console.error("Error sending reminder emails:", error);
  }
}

module.exports = sendReminderEmails;
