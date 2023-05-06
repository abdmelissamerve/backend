import { UserService } from "./userService";
import { UserRepository } from "../repositories/UserRepository";
import bcrypt from "bcryptjs";
import twilio from "twilio";
import config from "../../config";

export default class PhoneVerificationService {
    private userRepository = new UserRepository();
    private userService = new UserService(this.userRepository);

    constructor() {}

    async generateAndSaveCode(userId: number): Promise<number> {
        try {
            const code = Math.floor(100000 + Math.random() * 900000);
            let expirationDate = new Date();
            expirationDate.setMinutes(expirationDate.getMinutes() + 5);

            const encryptedCode = await bcrypt.hash(code.toString(), 10);

            await this.userService.updateUser(userId, {
                verificationCode: encryptedCode,
                codeExpirationDate: expirationDate,
            });
            return code;
        } catch (error: any) {
            console.log(error);
            throw new Error(error);
        }
    }

    async sendCode(userId: number, phoneNumber: string) {
        const accountSid = config.twilioAccountSid;
        const authToken = config.twilioAuthToken;
        const client = twilio(accountSid, authToken);

        try {
            const code = await this.generateAndSaveCode(userId);
            const msg = await client.messages.create({
                body: `Your verification code is ${code}`,
                from: "+12765974794",
                to: `+40${phoneNumber}`,
            });
            return msg;
        } catch (error) {
            console.log(error);
        }
    }

    async verifyCode(userId: number, inputCode: string): Promise<boolean> {
        try {
            const user = await this.userService.getUserById(userId);
            if (!user) {
                throw new Error("Users not found");
            }
            if (user.codeExpirationDate < new Date()) {
                throw new Error("Code expired");
            }
            const isCodeValid = await bcrypt.compare(inputCode, user.verificationCode);
            if (isCodeValid) {
                await this.userService.updateUser(userId, {
                    isPhoneVerified: true,
                });
                return true;
            }
            return false;
        } catch (error: any) {
            console.log(error);
            throw new Error(error);
        }
    }
}
