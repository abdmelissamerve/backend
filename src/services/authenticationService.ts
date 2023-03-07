import IAuthentication from "../interfaces/IAuthentication";
import { RegisterInput, LoginInput } from "../types/authentication";
import { CreateUserDTO, UserDTO } from "../types/user";
import firebaseAdmin from "../../firebase-service";
import UserService from "./userService";


export default class AuthenticationService implements IAuthentication {

    private userService = new UserService();
     
    constructor() {
    }

    public async login(data: LoginInput): Promise<UserDTO> {
        const user = await firebaseAdmin.auth().getUserByEmail(data.email);
        console.log(user);
        return {
            id: user?.uid,
            email: user.email,
            firstName: user?.displayName,
            lastName: user?.displayName,
            phoneNumber: user.phoneNumber,
        }   
    }
    
    public async register(data: RegisterInput): Promise<UserDTO> {
        const user = await this.userService.getByEmail(data.email);
        if (user) {
            throw new Error(`User with email ${data.email} already exists`);
        }
        const userInfo: CreateUserDTO = {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: data.password,
            phoneNumber: data.phoneNumber,
            role: "user",
            isActive: true,
        }
        try {
            const dbUser = await this.userService.create(userInfo);
            const fbUser = await firebaseAdmin.auth().createUser({
                email: data.email,
                password: data.password,
            });
            return {
                id: fbUser?.uid,
                email: fbUser.email,
                firstName: fbUser?.displayName,
                lastName: fbUser?.displayName,
                phoneNumber: fbUser.phoneNumber,
            }
        } catch (error: any) {
            console.log(error);
            throw new Error(error);
        }

    }
}
