import { environment } from "src/environments/environment.development";

const MAIN_URL = environment.ROOT_URL + environment.API_URL;

export const Constants = {

    REGISTER_URL: MAIN_URL + "/register",
    LOGIN_URL: MAIN_URL + "/login"
}
