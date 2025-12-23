// utils/localProvider.js
// Custom local provider that uses copy+delete instead of rename
// to work around EXDEV error in Docker containers

import fs from "fs";
import path from "path";
import { BaseProvider } from "@adminjs/upload";

export class LocalProvider extends BaseProvider {
  constructor(options) {
    super(options.bucket);
    this.bucket = options.bucket;
  }

  async upload(file, key, context) {
    const destPath = path.join(this.bucket, key);
    const destDir = path.dirname(destPath);

    // Ensure directory exists
    await fs.promises.mkdir(destDir, { recursive: true });

    // Use copyFile + unlink instead of rename to avoid EXDEV error
    await fs.promises.copyFile(file.path, destPath);
    await fs.promises.unlink(file.path);

    return key;
  }

  async delete(key, bucket, context) {
    const filePath = path.join(this.bucket, key);
    try {
      await fs.promises.unlink(filePath);
    } catch (error) {
      if (error.code !== "ENOENT") {
        throw error;
      }
    }
  }

  path(key, bucket, context) {
    // Return path that matches static file serving route
    return `/uploads/${key}`;
  }
}

