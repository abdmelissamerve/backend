import { Register, Login } from "../types/authentication";
import { UserDTO } from "../types/user";

export default interface IAuthentication {
    login(data: Login): Promise<UserDTO>;
    register(data: Register): Promise<UserDTO>;
}
