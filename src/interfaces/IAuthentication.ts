import { RegisterInputParams } from "../types/authentication";
import { UserDTO } from "../types/user";

export default interface IAuthentication {
    register(data: RegisterInputParams): Promise<UserDTO>;
}
