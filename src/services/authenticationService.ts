import IAuthentication from "../interfaces/IAuthentication";
import { RegisterInputParams } from "../types/authentication";
import { RegisterInputDTO, UserDTO } from "../types/user";
import firebaseAdmin from "../../firebase-service";
import { UserService } from "./userService";
import { UserRepository } from "../repositories/UserRepository";

export default class AuthenticationService implements IAuthentication {
    private userRepository = new UserRepository();
    private userService = new UserService(this.userRepository);

    constructor() {}

    public async register(data: RegisterInputParams): Promise<UserDTO> {
        const user = await this.userService.getUserByEmail(data.email);
        if (user) {
            throw new Error(`User with email ${data.email} already exists`);
        }
        const userInfo: RegisterInputDTO = {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phoneNumber: data.phoneNumber,
            role: "user",
            isActive: true,
        };
        try {
            const fbUser = await firebaseAdmin.auth().createUser({
                email: data.email,
                password: data.password,
            });
            const dbUser = await this.userService.createUser(userInfo);
            return {
                id: dbUser?.id,
                email: fbUser.email,
                firstName: dbUser?.firstName,
                lastName: dbUser?.lastName,
                phoneNumber: fbUser.phoneNumber,
            };
        } catch (error: any) {
            console.log(error);
            throw new Error(error);
        }
    }
}
