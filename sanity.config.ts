import { defineConfig } from "next-sanity";
import { structureTool } from "sanity/structure";

export default defineConfig({
  projectId: "vjffgnh8",
  dataset: "production",
  plugins: [structureTool()],
  title: "UniStation Studio",
});
