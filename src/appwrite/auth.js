import { Client, Account, ID } from "appwrite";
import conf from "../conf/conf";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(
                ID.unique(),
                email,
                password,
                name
            );
            if (userAccount) {
                //login
                return this.login(email, password);
            } else {
                return userAccount;
            }
        } catch (error) {
            throw Error;
        }
    }

    async login({ email, password }) {
        {
            const result = await this.account.createEmailSession(email, password);
            return result;
        }
    }
    async getCurrentUser() {
        try {
            // console.log(this.account);
            return await this.account.get();
        } catch (error) {
            console.log("getCurrentUser Error", error);
        }
        return null;
    }

    async logout() {
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            console.log("logout::Error", error);
        }
    }
}

const authService = new AuthService();
export default authService;
