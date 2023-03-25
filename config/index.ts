import dotenv from "dotenv";

dotenv.config();

export default {
    port: process.env.PORT,

    twilioAccountSid: process.env.TWILIO_ACCOUNT_SID,
    twilioAuthToken: process.env.TWILIO_AUTH_TOKEN,
};
