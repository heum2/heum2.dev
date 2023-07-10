type SubSection = {
  slug: string;
  text: string;
};

type Section = SubSection & {
  subSections: SubSection[];
};
