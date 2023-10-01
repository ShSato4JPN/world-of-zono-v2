import BlogAssetLinkType from "@/types/contentful-types";

export const removeTagString = (str: string): string => {
  return str.replace(
    /<div[^>]*>|<\/div>|<a[^>]*>|<\/a>|<p[^>]*>|<\/p>|<span[^>]*>|<\/span>|<br\s*\/?>|<img[^>]*>|\n/gi,
    "",
  );
};

export const existsThumbnail = (thumbnail: BlogAssetLinkType): boolean =>
  0 < Object.keys(thumbnail).length;
