export interface JournalThought {
  id: string;
  time: string;
  urdu: string;
  english: string;
  reflectionNote?: string;
}

export const JOURNAL_THOUGHTS: JournalThought[] = [
  {
    id: "thought-1",
    time: "02:14 AM",
    urdu: "کچھ لوگ تنہائی سے ڈرتے ہیں، مگر میرے لیے یہ ایک محفوظ پناہ گاہ ہے—جہاں شور خاموش ہو جاتا ہے اور میں اپنے آپ کو سن سکتا ہوں۔",
    english:
      "Some people fear solitude, but for me it is a sanctuary—where the noise dissolves, and I can finally hear myself.",
    reflectionNote: "On finding peace in quiet rooms"
  },
  {
    id: "thought-2",
    time: "Midnight",
    urdu: "میں ہر محفل میں کھل کر نہیں بول پاتا۔ لوگ سمجھتے ہیں کہ میں مغرور ہوں، لیکن سچ یہ ہے کہ میں تب ہی بات کرتا ہوں جب لفظ دل سے نکل رہے ہوں۔",
    english:
      "I cannot speak openly in every crowd. People mistake it for distance, but the truth is simple: I only speak when words rise genuinely from the heart.",
    reflectionNote: "On selective warmth"
  },
  {
    id: "thought-3",
    time: "Rainy Dusk",
    urdu: "ایک کپ چائے، کھڑکی سے نظر آتی بھیگی شام، اور شاعری کی ایک پرانی کتاب۔ مجھے زندگی سے اس سے زیادہ کی طلب کم ہی ہوتی ہے۔",
    english:
      "A cup of tea, a rainy twilight seen through the window, and a dog-eared volume of poetry. Rare are the times I seek anything more from life.",
    reflectionNote: "On quiet contentment"
  },
  {
    id: "thought-4",
    time: "03:40 AM",
    urdu: "جو باتیں ہم کہہ نہیں پاتے، وہ ختم نہیں ہوتیں؛ وہ رات کے اندھیرے میں ستاروں کی طرح دل کے آسمان پر چمکتی رہتی ہیں۔",
    english:
      "The things left unsaid never truly disappear; in the darkness of the night, they linger like distant stars across the sky of the heart.",
    reflectionNote: "On unspoken thoughts"
  }
];

