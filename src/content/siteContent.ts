/**
 * This is the only file you need to edit when replacing the demo story.
 *
 * Add real image files under /public/images and replace a placeholder path
 * such as "" with "/images/my-photo.jpg". Keep alt text descriptive.
 */

export type Theme = "ivory" | "blue" | "coral" | "ink";
export type CharacterStage = "small" | "growing" | "making" | "present";

export interface ImagePlaceholder {
  label: string;
  path: string;
  alt: string;
  aspectRatio: `${number}/${number}`;
}

export interface Chapter {
  id: string;
  navLabel: string;
  eyebrow: string;
  yearLabel: string;
  title: string;
  story: string;
  theme: Theme;
  characterStage: CharacterStage;
  image: ImagePlaceholder;
  highlights: string[];
}

export interface Project {
  id: string;
  number: string;
  title: string;
  summary: string;
  role: string;
  tools: string[];
  outcome: string;
  image: ImagePlaceholder;
}

export interface SiteContent {
  name: string;
  monogram: string;
  introduction: string;
  scrollPrompt: string;
  skipLabel: string;
  chapters: Chapter[];
  projects: Project[];
  contact: {
    eyebrow: string;
    title: string;
    note: string;
    emailLabel: string;
    socialLinks: string[];
  };
}

export const siteContent: SiteContent = {
  name: "Tinco Zhao",
  monogram: "TZ",
  introduction:
    "Hi! I'm currently a Senior at Arcadia High School in Arcadia, California. I'm love exploring new ideas and shareing projects with peers to make a difference in my community.",
  scrollPrompt: "SCROLL TO GROW",
  skipLabel: "SKIP TO PRESENT",
  chapters: [
    {
      id: "story",
      navLabel: "Story",
      eyebrow: "CHAPTER 01 / THE BEGINNING",
      yearLabel: "[YEAR]",
      title: "A STORY\nSTILL BEING\nWRITTEN",
      story:
        "I was born in Hangzhou, China, and spent most of my childhood traveling within Asia! Now, I'm exploring a career pathway in STEM in the US!",
      theme: "ivory",
      characterStage: "small",
      image: {
        label: "[CHILDHOOD PHOTO]",
        path: "",
        alt: "Replace with a description of your childhood photograph",
        aspectRatio: "4/5",
      },
      highlights: ["Artist", "Content Creator", "Student Leader"],
    },
    {
      id: "about",
      navLabel: "About",
      eyebrow: "CHAPTER 02 / LEARNING OUT LOUD",
      yearLabel: "2020-2024",
      title: "CURIOSITY\nBECAME A\nCOMPASS",
      story:
        "Transitioning out of the pandemic, I learned to explore my opportunities as a student and creator online. In the process, I discovered a love for online creation as well as WEB Development and design.",
      theme: "blue",
      characterStage: "growing",
      image: {
        label: "[LEARNING PHOTO]",
        path: "",
        alt: "Replace with a description of your learning",
        aspectRatio: "3/4",
      },
      highlights: ["Digital Art", "Dance", "HTML & CSS"],
    },
    {
      id: "work",
      navLabel: "Work",
      eyebrow: "CHAPTER 03 / MAKING THINGS",
      yearLabel: "2024 — NOW",
      title: "IDEAS INTO\nTHINGS YOU\nCAN FEEL",
      story:
        "Through my passion in content creation and web development, I branched out my interests in programming in an FTC robotics team, and led as a student leader in multiple Media non-profits.",
      theme: "coral",
      characterStage: "making",
      image: {
        label: "[WORKSPACE PHOTO]",
        path: "",
        alt: "Replace with a description of your workspace photograph",
        aspectRatio: "16/10",
      },
      highlights: ["Java", "Graphic Design", "Networking"],
    },
    {
      id: "present",
      navLabel: "Contact",
      eyebrow: "CHAPTER 04 / RIGHT NOW",
      yearLabel: "PRESENT DAY",
      title: "THE NEXT\nCHAPTER IS\nOPEN",
      story:
        "[WRITE A FEW LINES ABOUT WHO YOU ARE TODAY, WHAT MATTERS TO YOU, AND WHAT YOU HOPE TO BUILD NEXT.]",
      theme: "ink",
      characterStage: "present",
      image: {
        label: "[PRESENT-DAY PORTRAIT]",
        path: "",
        alt: "Replace with a description of your present-day portrait",
        aspectRatio: "4/5",
      },
      highlights: ["[CURRENT FOCUS]", "[CORE VALUE]", "[NEXT HORIZON]"],
    },
  ],
  projects: [
    {
      id: "project-one",
      number: "01",
      title: "2000s Style Study Tool",
      summary: "An academic tool in the style of Mac OS X that calculates AP Exam Scores & provides study resources.",
      role: "Developer",
      tools: ["AI Chatbot", "AP Score Predictor", "TO-DO List"],
      outcome: "Inspired from early 2000s designs, I created an online study tool to help high school students prepare for AP exams through a customizable task list, AI chatbot, and AP score predictor.",
      image: {
        label: "[PROJECT IMAGE 01]",
        path: "/gradecalculator.png",
        alt: "Replace with a description of project one",
        aspectRatio: "16/10",
      },
    },
    {
      id: "project-two",
      number: "02",
      title: "[PROJECT TITLE 02]",
      summary: "[A ONE-SENTENCE DESCRIPTION OF THIS PROJECT.]",
      role: "[YOUR ROLE AND RESPONSIBILITIES]",
      tools: ["[TOOL 01]", "[TOOL 02]", "[TOOL 03]"],
      outcome: "[DESCRIBE THE RESULT, IMPACT, OR WHAT YOU LEARNED.]",
      image: {
        label: "[PROJECT IMAGE 02]",
        path: "",
        alt: "Replace with a description of project two",
        aspectRatio: "16/10",
      },
    },
    {
      id: "project-three",
      number: "03",
      title: "[PROJECT TITLE 03]",
      summary: "[A ONE-SENTENCE DESCRIPTION OF THIS PROJECT.]",
      role: "[YOUR ROLE AND RESPONSIBILITIES]",
      tools: ["[TOOL 01]", "[TOOL 02]", "[TOOL 03]"],
      outcome: "[DESCRIBE THE RESULT, IMPACT, OR WHAT YOU LEARNED.]",
      image: {
        label: "[PROJECT IMAGE 03]",
        path: "",
        alt: "Replace with a description of project three",
        aspectRatio: "16/10",
      },
    },
  ],
  contact: {
    eyebrow: "LET’S WRITE WHAT COMES NEXT",
    title: "SAY\nHELLO.",
    note: "[ADD A SHORT INVITATION TO COLLABORATE OR CONNECT.]",
    emailLabel: "[YOUR EMAIL ADDRESS]",
    socialLinks: ["[LINKEDIN]", "[INSTAGRAM]", "[OTHER LINK]"],
  },
};
