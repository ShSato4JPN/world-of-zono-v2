/**
 * Assets の型定義が方法がドキュメント見ても載っていなかったため強制的に型をキャストする
 * 実装方法が分かり次第修正する
 * 公式ドキュメント： https://github.com/contentful/contentful.js/blob/master/TYPESCRIPT.md#generating-type-definitions-for-content-types
 */
type BlogAssetLinkType = {
  fields: {
    title: string;
    description: string;
    file: {
      url: string;
      details: {
        size: number;
        image: {
          width: number;
          height: number;
        };
      };
      fileName: string;
      contentType: string;
    };
  };
};

export default BlogAssetLinkType;
