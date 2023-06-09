import { storage } from "../config/firebase";

export async function imageUploader(path: string, image: File) {
  const storageRef = storage.ref(path + image.name);
  await storageRef.put(image);
  return (await storageRef.getDownloadURL()) as string;
}
