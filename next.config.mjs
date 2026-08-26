import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { unoptimized: true },
  output: "export",
  distDir: process.env.NODE_ENV === "production" ? ".next-build" : ".next",
  outputFileTracingRoot: projectRoot
};

export default nextConfig;
