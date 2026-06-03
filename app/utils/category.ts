import { Post } from "../types";
import { Category } from "../types";

/**
 * Safely extracts all categories from a post, regardless of whether
 * it uses a single category string or an array of categories.
 */
export function getCategories(post: Post): Category[] {
  if (!post.category) return [];
  return Array.isArray(post.category) ? post.category : [post.category];
}
