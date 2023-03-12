import { Register } from "../types/authentication";
import { UserDTO } from "../types/user";

export default interface IAuthentication {
    register(data: Register): Promise<UserDTO>;
}
