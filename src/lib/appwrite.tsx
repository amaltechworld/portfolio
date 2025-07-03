import { Client, Databases, Account, Storage } from "appwrite";

const client = new Client();

// Only initialize if environment variables are available
if (process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT && process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID) {
  client
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);
}

const databases = new Databases(client);
const account = new Account(client);
const storage = new Storage(client);

export { client, databases, account, storage };
 