import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint("https://cloud.appwrite.io/v1") 
            .setProject("674ad019003c5d0ee89e"); 
        this.account = new Account(this.client);
    }

 
    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            console.log(userAccount , "=============")
            return { message: "Account created! Please verify your email before logging in." };
        } catch (error) {
            if (error.code === 409) {
                throw new Error("This email is already registered.");
            }
            throw error;
        }
    }

    async login({ email, password }) {
        
        console.log(email , password , "---------------")
        try {
            const session = await this.account.createEmailPasswordSession(email, password);
            console.log(session , "===========")
            return session;
        } catch (error) {
            console.log(error ,"=====++++")
            if (error.code === 401) {
                throw new Error("Invalid credentials. Please check your email and password.");
            } else if (error.code === 403) {
                throw new Error("Please verify your email before logging in.");
            }
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            if (error.code === 401) {
                return null;
            }
            throw error;
        }
    }

    
    async logout() {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.error("Logout Error:", error);
        }
    }
}

const authService = new AuthService();
export default authService;
