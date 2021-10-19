const sgMail = require("@sendgrid/mail");
const dotenv = require("dotenv");
dotenv.config({ path: "server/config/config.env" });
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendMail = async (options) => {
  const message = {
    to: options.email,
    from: "saadullahkhx@gmail.com",
    subject: options.subject,
    text: options.message,
    html: `<h4>${options.message}</h4>`,
  };

  await sgMail.send(message);
};

module.exports = sendMail;
