import { RegisterInput, LoginInput } from "../types/authentication";
import { UserDTO } from "../types/user";

export default interface IAuthentication {
    login(data: RegisterInput): Promise<UserDTO>;
    register(data: LoginInput): Promise<UserDTO>;
}
