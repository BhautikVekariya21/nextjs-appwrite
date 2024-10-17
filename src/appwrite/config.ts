import conf from "@/conf/config";
import { Client,Account,ID } from "appwrite";

type CreateUserAccount = {
    name: string;
    email: string;
    password: string;
};

type LoginUserAccount = {
    email: string;
    password: string;
};

const appwriteClient = new Client();

appwriteClient.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteprojectid);


export const account = new Account(appwriteClient);
export class AppwriteService{
    async createUserAccount({email,password,name}:CreateUserAccount){
        try {
            const userAccount = await account.create(ID.unique(),email,password,name);
            if(userAccount){
                return this.login({email,password})
            }
            else{
                return userAccount;
            }
        } catch (error) {
            throw error
        }
    }
    async login({email,password}:LoginUserAccount){
        try {
           return await account.createEmailPasswordSession(email,password)
        } catch (error) {
            throw error;
        }
    }
    async isLoggedIn(): Promise<boolean> {
        try {
            const data = await this.getCurrentUser();
            return Boolean(data);
        } catch (error) {
            console.error("isLoggedIn error: " + error);
        }
        return false;
    }
    
    async getCurrentUser(){
        try {
            return account.get();
        } catch (error) {
            console.log("getCurrentUser error: " + error);
        }
        return null;
    }

    async logout(){
        try{
            return await account.deleteSession("current");
        }catch(error){
            console.log("logout error: " + error);
        }
    }
}

const appwriteService = new AppwriteService();

export default appwriteService; 
