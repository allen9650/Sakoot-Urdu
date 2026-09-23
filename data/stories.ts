export interface StoryItem {
  id: string;
  title: string;
  titleUrdu: string;
  category: string;
  excerpt: string;
  readTime: string;
  date: string;
  status: "Draft" | "Contemplation" | "Upcoming";
}

export const STORIES_DATA: StoryItem[] = [
  {
    id: "story-1",
    title: "A Thought at 2 AM",
    titleUrdu: "رات کے دو بجے کا ایک خیال",
    category: "Late Night Essays",
    excerpt:
      "When the city goes quiet, the thoughts we bury under daytime busyness begin to speak with quiet clarity.",
    readTime: "4 min read",
    date: "Autumn 2026",
    status: "Upcoming"
  },
  {
    id: "story-2",
    title: "خاموشی",
    titleUrdu: "The Anatomy of Silence",
    category: "Reflections",
    excerpt:
      "Understanding the subtle difference between being empty of words, and being so full that no single word suffices.",
    readTime: "3 min read",
    date: "SHAGGY Reflections",
    status: "Contemplation"
  },
  {
    id: "story-3",
    title: "وہ جو کہہ نہ سکے",
    titleUrdu: "That Which Remained Unsaid",
    category: "Memoir Fragments",
    excerpt:
      "A tribute to the conversations that stayed trapped in hesitation, and the quiet glances that said everything instead.",
    readTime: "5 min read",
    date: "Coming Soon",
    status: "Draft"
  },
  {
    id: "story-4",
    title: "Between Words",
    titleUrdu: "لفظوں کے درمیاں",
    category: "Poetics & Life",
    excerpt:
      "Notes on how Faiz and Faraz taught a quiet young heart to navigate longing, presence, and deep human bonds.",
    readTime: "6 min read",
    date: "Literary Journey",
    status: "Upcoming"
  }
];

