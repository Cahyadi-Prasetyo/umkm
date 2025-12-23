// utils/uploadFeatureFactory.js
import uploadFeature from "@adminjs/upload";
import path from "path";
import { renameImage } from "./renameImage.js";
import { LocalProvider } from "./localProvider.js";

export const makeUploadFeature = (modelName, UPLOADS_DIR, componentLoader) => {
  // Create custom provider instance to avoid EXDEV error in Docker
  const customProvider = new LocalProvider({ bucket: UPLOADS_DIR });
  
  return uploadFeature({
    componentLoader,
    provider: customProvider,

    properties: {
      key: "image",
      file: "uploadImage",
      mimeType: "mimeType",
    },

    uploadPath: (record, filename) => renameImage(modelName, record, filename),

    validation: {
      mimeTypes: [
        "image/jpeg",
        "image/png",
        "image/jpg",
        "image/gif",
        "image/webp",
      ],
    },
  });
};
