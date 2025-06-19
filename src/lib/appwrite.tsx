import { Client, Databases, Account } from "appwrite";

const client = new Client();
client
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

const databases = new Databases(client);
const account = new Account(client);

export { client, databases, account };


// Fetch all projects
// export async function getAllProjects() {
//   try {
//     const res = await databases.listDocuments(DATABASE_ID, COLLECTION_ID);
//     return res.documents.map((doc: any) => ({
//       $id: doc.$id,
//       title: doc.title,
//       image: doc.image,
//       date: doc.date,
//       link: doc.link,
//       year: doc.year,
//       month: doc.month,
//       week: doc.week,
//     }));
//   } catch (error) {
//     console.error("Failed to fetch projects:", error);
//     return { documents: [] }; // or handle as you wish
//   }
// }