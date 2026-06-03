import { createClient } from "next-sanity";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "your-project-id",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  useCdn: true,
});

export async function getPosts({ locale, limit }: { locale?: string; limit?: number } = {}) {
  let query = `*[_type == "post"`;
  if (locale) query += ` && language == $locale`;
  query += `] | order(publishedAt desc)`;
  if (limit) query += ` [0...${limit}]`;
  query += ` { title, slug, excerpt, publishedAt, language, "image": image.asset->url }`;

  return client.fetch(query, locale ? { locale } : {});
}

export async function getPost(slug: string, locale?: string) {
  let query = `*[_type == "post" && slug.current == $slug`;
  if (locale) query += ` && language == $locale`;
  query += `][0] { title, slug, excerpt, publishedAt, language, body, "image": image.asset->url }`;

  return client.fetch(query, { slug, locale });
}

export async function getPostsByLanguage(locale: string) {
  return getPosts({ locale });
}
