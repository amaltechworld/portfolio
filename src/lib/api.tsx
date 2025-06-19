import { databases } from "./appwrite";
import { ID } from "appwrite";
import { Project } from "@/types/project";

const DATABASE_ID = process.env.NEXT_PUBLIC_DATABASE_ID!;
const COLLECTION_ID = process.env.NEXT_PUBLIC_COLLECTION_ID!;

export async function getAllProjects(): Promise<Project[]> {
  try {
    const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID);
    console.log("Raw response:", response); // Debug log

    return response.documents.map((doc) => ({
      $id: doc.$id,
      title: doc.title,
      image: doc.image,
      date: doc.date,
      link: doc.link,
      year: Number(doc.year),
      month: Number(doc.month),
      week: Number(doc.week),
    }));
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}

export async function createProject(
  data: Omit<Project, "$id">
): Promise<Project> {
  const response = await databases.createDocument(
    DATABASE_ID,
    COLLECTION_ID,
    ID.unique(),
    data
  );

  return {
    $id: response.$id,
    title: response.title,
    image: response.image,
    date: response.date,
    link: response.link,
    year: Number(response.year),
    month: Number(response.month),
    week: Number(response.week),
  };
}

export async function updateProject(
  projectId: string,
  data: Partial<Project>
): Promise<Project> {
  const response = await databases.updateDocument(
    DATABASE_ID,
    COLLECTION_ID,
    projectId,
    data
  );

  return {
    $id: response.$id,
    title: response.title,
    image: response.image,
    date: response.date,
    link: response.link,
    year: Number(response.year),
    month: Number(response.month),
    week: Number(response.week),
  };
}

export async function deleteProject(projectId: string): Promise<void> {
  await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, projectId);
}
