import { databases } from "./appwrite";
import { ID } from "appwrite";
import { Project } from "@/types/project";

const DATABASE_ID = process.env.NEXT_PUBLIC_DATABASE_ID!;
const COLLECTION_ID = process.env.NEXT_PUBLIC_COLLECTION_ID!;

// This function fetches a project by its ID for user
export async function getAllProjects(): Promise<Project[]> {
  try {
    const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID);

    return response.documents.map((doc) => ({
      $id: doc.$id,
      title: doc.title,
      image: doc.image,
      date: doc.date,
      link: doc.link,
      year: Number(doc.year),
      month: Number(doc.month),
      week: Number(doc.week),
      performance: doc.performance, // Add this
      seo: doc.seo, // Add this
      accessibility: doc.accessibility, // Add this
      bestPractices: doc.best_practices,
    }));
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}

// This function creates a project by its ID for admin
export async function createProject(
  data: Omit<Project, "$id">
): Promise<Project> {
  const response = await databases.createDocument(
    DATABASE_ID,
    COLLECTION_ID,
    ID.unique(),
    {
      title: data.title,
      image: data.image,
      date: data.date,
      link: data.link,
      year: data.year,
      month: data.month,
      week: data.week,
      performance: data.performance || 0,
      seo: data.seo || 0,
      accessibility: data.accessibility || 0,
      best_practices: data.bestPractices || 0,
    }
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
    performance: response.performance || 0,
    seo: response.seo || 0,
    accessibility: response.accessibility || 0,
    bestPractices: response.best_practices || 0,
  };
}

// This function edits a project by its ID for admin
export async function updateProject(
  projectId: string,
  data: Partial<Project>
): Promise<Project> {
  const updateData = {
    ...data,
    ...(data.bestPractices !== undefined && {
      best_practices: data.bestPractices,
    }),
  };

  // Remove the original bestPractices field to avoid conflicts
  delete updateData.bestPractices;

  const response = await databases.updateDocument(
    DATABASE_ID,
    COLLECTION_ID,
    projectId,
    updateData
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
    performance: response.performance || 0,
    seo: response.seo || 0,
    accessibility: response.accessibility || 0,
    bestPractices: response.best_practices || 0,
  };
}

// This function deletes a project by its ID for admin
export async function deleteProject(projectId: string): Promise<void> {
  await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, projectId);
}

// This function fetches a single project by its ID for admin
export async function getProject(projectId: string): Promise<Project> {
  try {
    const response = await databases.getDocument(
      DATABASE_ID,
      COLLECTION_ID,
      projectId
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
      performance: response.performance,
      seo: response.seo,
      accessibility: response.accessibility,
      bestPractices: response.best_practices,
    };
  } catch (error) {
    console.error("Error fetching project:", error);
    throw error;
  }
}
