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
            // console.log(userAccount);
            if (userAccount) {
                // console.log(userAccount);
                //login
                return this.login({ email, password });
            } else {
                return userAccount;
            }
        } catch (error) {
            console.log("logout::Error", error);
        }
    }

    async login({ email, password }) {
        try {
            console.log(email, password);
            // console.log(this.account);
            const result = await this.account.createEmailPasswordSession(email, password);
            return result;
        } catch (error) {
            console.log(error.message);
        }

    }
    async getCurrentUser() {
        try {
            // console.log(await this.account.get());
            return await this.account.get();
        } catch (error) {
            // console.log("getCurrentUser Error", error);
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
