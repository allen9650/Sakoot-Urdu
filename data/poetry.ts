export interface PoetryItem {
  id: string;
  poet: "فیض احمد فیض" | "احمد فراز";
  poetEnglish: "Faiz Ahmad Faiz" | "Ahmad Faraz";
  title: string;
  titleEnglish: string;
  verseUrdu: string[];
  translationEnglish: string;
  theme: string;
  rekhtaUrl: string;
  year?: string;
}

export const VERIFIED_POETRY: PoetryItem[] = [
  {
    id: "faiz-tanhai",
    poet: "فیض احمد فیض",
    poetEnglish: "Faiz Ahmad Faiz",
    title: "تنہائی",
    titleEnglish: "Tanhai (Solitude)",
    verseUrdu: [
      "پھر کوئی آیا دلِ زار! نہیں کوئی نہیں",
      "راہرو ہوگا، کہیں اور چلا جائے گا"
    ],
    translationEnglish:
      "Then someone came, grieving heart! No, no one... It must be a traveler, bound for somewhere else.",
    theme: "Solitude & Nocturnal Reflection",
    rekhtaUrl: "https://www.rekhta.org/nazms/tanhai-faiz-ahmad-faiz-nazms"
  },
  {
    id: "faraz-khwabon-mein",
    poet: "احمد فراز",
    poetEnglish: "Ahmad Faraz",
    title: "اب کے ہم بچھڑے",
    titleEnglish: "Ab Ke Hum Bichhde",
    verseUrdu: [
      "اب کے ہم بچھڑے تو شاید کبھی خوابوں میں ملیں",
      "جس طرح سوکھے ہوئے پھول کتابوں میں ملیں"
    ],
    translationEnglish:
      "If we part now, perhaps we shall meet in dreams, the way dried petals are found between pages of old books.",
    theme: "Literature, Books & Fragile Memory",
    rekhtaUrl:
      "https://www.rekhta.org/ghazals/ab-ke-hum-bichhde-to-shayad-kabhi-khwabon-mein-milein-ahmad-faraz-ghazals"
  },
  {
    id: "faiz-raat-yun",
    poet: "فیض احمد فیض",
    poetEnglish: "Faiz Ahmad Faiz",
    title: "رات یوں دل میں تری",
    titleEnglish: "Raat Yun Dil Mein",
    verseUrdu: [
      "رات یوں دل میں تری کھوئی ہوئی یاد آئی",
      "جیسے ویرانے میں چپکے سے بہار آ جائے"
    ],
    translationEnglish:
      "Tonight your lost memory entered my heart softly, as if spring arrived quietly in a desolate land.",
    theme: "Quiet Night & Remembrance",
    rekhtaUrl:
      "https://www.rekhta.org/ghazals/raat-yun-dil-men-terii-faiz-ahmad-faiz-ghazals"
  },
  {
    id: "faraz-suna-hai",
    poet: "احمد فراز",
    poetEnglish: "Ahmad Faraz",
    title: "سنا ہے لوگ اسے آنکھ بھر کے دیکھتے ہیں",
    titleEnglish: "Suna Hai Log Use",
    verseUrdu: [
      "سنا ہے لوگ اسے آنکھ بھر کے دیکھتے ہیں",
      "سو اس کے شہر میں کچھ دن ٹھہر کے دیکھتے ہیں"
    ],
    translationEnglish:
      "I hear people gaze at them with eyes full of wonder; so let us linger in their city for a few days to see.",
    theme: "Observation & Longing",
    rekhtaUrl:
      "https://www.rekhta.org/ghazals/suna-hai-log-use-aankh-bhar-ke-dekhte-hain-ahmad-faraz-ghazals"
  },
  {
    id: "faiz-gulon-mein",
    poet: "فیض احمد فیض",
    poetEnglish: "Faiz Ahmad Faiz",
    title: "گلوں میں رنگ بھرے",
    titleEnglish: "Gulon Mein Rang Bhare",
    verseUrdu: [
      "گلوں میں رنگ بھرے بادِ نو بہار چلے",
      "چلے بھی آؤ کہ گلشن کا کاروبار چلے"
    ],
    translationEnglish:
      "Let blossoms fill with colour, let the breeze of early spring blow; do come, so that the life of the garden may begin.",
    theme: "Hope & Gentle Longing",
    rekhtaUrl:
      "https://www.rekhta.org/ghazals/gulon-mein-rang-bhare-baad-e-nau-bahaar-chale-faiz-ahmad-faiz-ghazals"
  },
  {
    id: "faraz-ranjish",
    poet: "احمد فراز",
    poetEnglish: "Ahmad Faraz",
    title: "رنجش ہی سہی",
    titleEnglish: "Ranjish Hi Sahi",
    verseUrdu: [
      "رنجش ہی سہی دل ہی دکھانے کے لیے آ",
      "آ پھر سے مجھے چھوڑ کے جانے کے لیے آ"
    ],
    translationEnglish:
      "Even if with grievances, come if only to break my heart; come, even if it is to leave me once again.",
    theme: "Devotion & Unspoken Pain",
    rekhtaUrl:
      "https://www.rekhta.org/ghazals/ranjish-hii-sahii-dil-hii-dukhaane-ke-liye-aa-ahmad-faraz-ghazals"
  }
];

// Interactive floating snippets spawned during character gaze and clicks
export const FLOATING_POETRY_SNIPPETS = [
  {
    urdu: "پھر کوئی آیا دلِ زار! نہیں کوئی نہیں...",
    poet: "فیض احمد فیض"
  },
  {
    urdu: "جس طرح سوکھے ہوئے پھول کتابوں میں ملیں...",
    poet: "احمد فراز"
  },
  {
    urdu: "جیسے ویرانے میں چپکے سے بہار آ جائے...",
    poet: "فیض احمد فیض"
  },
  {
    urdu: "سو اس کے شہر میں کچھ دن ٹھہر کے دیکھتے ہیں...",
    poet: "احمد فراز"
  },
  {
    urdu: "چلے بھی آؤ کہ گلشن کا کاروبار چلے...",
    poet: "فیض احمد فیض"
  }
];

