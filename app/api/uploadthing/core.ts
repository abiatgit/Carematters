import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "2MB" } })
    .onUploadComplete(async ({ file, metadata }) => {
      // Store file.url in DB later
      console.log("Upload complete", file.url,metadata);
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
