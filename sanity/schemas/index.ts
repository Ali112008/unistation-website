// sanity/schemas/index.ts — combine all schemas
import siteConfig from "./siteConfig";
import stat from "./stat";
import university from "./university";
import basicPackage from "./basicPackage";
import additionalPackage from "./additionalPackage";
import faq from "./faq";
import registration from "./registration";

export const schemaTypes = [
  siteConfig,
  stat,
  university,
  basicPackage,
  additionalPackage,
  faq,
  registration,
];
