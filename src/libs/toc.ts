export const parseToc = (raw: string) => {
  return raw
    .split("\n")
    .filter(line => line.match(/(^#{1,3})\s/))
    .reduce<Section[]>((acc, cur) => {
      const nac = [...acc];
      const removeMdx = cur
        .replace(/^##*\s/, "")
        .replace(/[\*,\~]{2,}/g, "")
        .replace(/(?<=\])\((.*?)\)/g, "")
        .replace(/(?<!\S)((http)(s?):\/\/|www\.).+?(?=\s)/g, "");

      const section = {
        slug: removeMdx
          .trim()
          .toLowerCase()
          .replace(/[^a-z0-9ㄱ-ㅎ|ㅏ-ㅣ|가-힣 -]/g, "")
          .replace(/\s/g, "-"),
        text: removeMdx,
      };

      const isSubTitle = cur.split("#").length - 1 === 3;

      if (acc.length && isSubTitle) {
        nac.at(-1)?.subSections.push(section);
      } else {
        nac.push({ ...section, subSections: [] });
      }

      return nac;
    }, []);
};
