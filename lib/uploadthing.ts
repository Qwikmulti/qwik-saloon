import createUploadthing from "uploadthing";
import { config } from "@/uploadthing.config";

const f = createUploadthing(config);

export const uploadFiles = {
  profileImages: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(() => ({ userId: "auth" }))
    .onUploadComplete(({ file }) => ({ url: file.url })),
  
  portfolioImages: f({ image: { maxFileSize: "8MB", maxFileCount: 10 } })
    .middleware(() => ({ userId: "auth" }))
    .onUploadComplete(({ file }) => ({ url: file.url })),
  
  serviceImages: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(() => ({}))
    .onUploadComplete(({ file }) => ({ url: file.url })),
};