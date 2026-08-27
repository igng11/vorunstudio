import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));
const isNetlifyBuild = process.env.npm_lifecycle_event === "build:netlify";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { unoptimized: true },
  output: "export",
  distDir: isNetlifyBuild ? ".next-build" : ".next",
  outputFileTracingRoot: projectRoot
};

export default nextConfig;
