import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
  projectId: "vjffgnh8",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: true,
});

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}

/* Simple typed fetch helpers */
export async function fetchSiteConfig() {
  return client.fetch(`*[_type == "siteConfig"][0]`);
}

export async function fetchStats() {
  return client.fetch(`*[_type == "stat"] | order(order asc)`);
}

export async function fetchUniversities() {
  return client.fetch(`*[_type == "university"] | order(rank asc)`);
}

export async function fetchBasicPackage() {
  return client.fetch(`*[_type == "basicPackage"][0]`);
}

export async function fetchAdditionalPackage() {
  return client.fetch(`*[_type == "additionalPackage"][0]`);
}

export async function fetchFaqs() {
  return client.fetch(`*[_type == "faq"] | order(order asc)`);
}

export async function fetchRegistration() {
  return client.fetch(`*[_type == "registration"][0]`);
}
