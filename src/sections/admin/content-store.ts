import { create } from "zustand";

export type FaqEntry = {
  id: string;
  question: string;
  answer: string;
};

export type EtiquetteSlide = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
};

export type Testimonial = {
  id: string;
  author: string;
  quote: string;
};

export type ValueCard = {
  id: string;
  title: string;
  description: string;
  wrapperClasses: string;
  accentClasses: string;
  descriptionClasses: string;
};

export type SocietyHighlight = {
  id: string;
  title: string;
  description: string;
};

export type EventItem = {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  highlights: string[];
};

export type AdminCollectionKey =
  | "faqs"
  | "etiquetteSlides"
  | "testimonials"
  | "valueCards"
  | "societyHighlights"
  | "events";

type CollectionMap = {
  faqs: FaqEntry;
  etiquetteSlides: EtiquetteSlide;
  testimonials: Testimonial;
  valueCards: ValueCard;
  societyHighlights: SocietyHighlight;
  events: EventItem;
};

export type ContentCollections = {
  [K in AdminCollectionKey]: Array<CollectionMap[K]>;
};

export type CollectionInput<K extends AdminCollectionKey> = Omit<
  CollectionMap[K],
  "id"
>;

const deepClone = <T,>(value: T): T => JSON.parse(JSON.stringify(value));

const createId = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : Math.random().toString(36).slice(2, 9);

const inferRecordLabel = (record: Record<string, unknown>) =>
  (record.title ??
    record.question ??
    record.author ??
    record.id ??
    "item") as string;

const initialData: ContentCollections = {
  faqs: [
    {
      id: "faq-1",
      question: "What’s the vibe like?",
      answer:
        "First of all, we have a strict 50:50 ratio between man & woman...",
    },
    {
      id: "faq-2",
      question: "Can I come as a single?",
      answer:
        "Why not? If you’re confident enough to come as a single, please come!...",
    },
    {
      id: "faq-3",
      question: "Where to get tested?",
      answer:
        "At our Play Party, we expect our participants & members to submit their recent (no longer than 3 months) STI result...",
    },
  ],
  etiquetteSlides: [
    {
      id: "etiquette-1",
      title: "Dress Code Mandatory",
      description:
        "Depending on the events you’re joining, participants are expected to follow the theme; no dress code = no entry.",
      imageUrl: "etiquette-left.jpg",
    },
    {
      id: "etiquette-2",
      title: "No Photography",
      description:
        "During our events, no recordings/cameras are allowed. Only official photographers or designated booths are allowed.",
      imageUrl: "etiquette-center.jpg",
    },
    {
      id: "etiquette-3",
      title: "Ask Before Touching",
      description: "Explicit consent is required every time. No exceptions.",
      imageUrl: "etiquette-right.jpg",
    },
  ],
  testimonials: [
    {
      id: "testi-1",
      quote: "I loved the party and the community vibe, everything was really nicely organised.",
      author: "Guest",
    },
    {
      id: "testi-2",
      quote: "Intro was a great way to get things started. People were all very friendly!",
      author: "Guest",
    },
    {
      id: "testi-3",
      quote: "We both thought it was very professional and were impressed with the care given by the angels.",
      author: "First-time Couple",
    },
  ],
  valueCards: [
    {
      id: "value-1",
      title: "Safe Space",
      description:
        "We foster a judgement-free environment where people can explore their identities, desires, and sexuality without fear or shame.",
      wrapperClasses: "bg-[#e11019] text-[#fde9df]",
      accentClasses: "bg-[#fde9df]/80",
      descriptionClasses: "text-[#fde9df]/85",
    },
    {
      id: "value-2",
      title: "Connection",
      description:
        "Genuine connections are the foundation of our community. We create opportunities for respectful, intentional interactions.",
      wrapperClasses: "bg-[#050505] text-[#f4f1ee]",
      accentClasses: "bg-[#f4f1ee]/70",
      descriptionClasses: "text-[#f4f1ee]/80",
    },
    {
      id: "value-3",
      title: "Consent",
      description:
        "Everything we do is rooted in enthusiastic, informed, and ongoing consent. Communication and boundaries are sacred.",
      wrapperClasses: "bg-[#f3e4d8] text-[#7b1218]",
      accentClasses: "bg-[#7b1218]/60",
      descriptionClasses: "text-[#7b1218]/80",
    },
  ],
  societyHighlights: [
    {
      id: "society-1",
      title: "Weekly Rope Jam With In-Ropes Community",
      description:
        "A casual weekly meeting for lovers of the sensual artistry of rope. Beginner friendly, focused on skill-sharing and safety.",
    },
    {
      id: "society-2",
      title: "Munch Social Parties, Drinks & Dance",
      description:
        "Private social gatherings to connect with sex-positive people. Expect curated discussions, drinks, and DJ sets.",
    },
    {
      id: "society-3",
      title: "Sex-Positive Workshop & Classes",
      description:
        "Educational sessions covering consent, domination, art of touch, shibari, and other liberating topics.",
    },
  ],
  events: [
    {
      id: "event-1",
      title: "Velvet Masquerade Play Party",
      date: "15 March 2025",
      location: "Private Villa, Bali",
      description:
        "A sensorial evening of curated performances, themed play rooms, and a meticulously balanced guest list.",
      highlights: ["Masks Required", "Curated Scenes", "60 Guests"],
    },
    {
      id: "event-2",
      title: "Consent & Connection Salon",
      date: "28 March 2025",
      location: "Members Lounge, Seminyak",
      description:
        "Facilitated conversations, rope tastings, lap dance workshops, and guided aftercare rituals for newcomers.",
      highlights: ["Newcomer Friendly", "Guided Workshops", "Aftercare Rituals"],
    },
    {
      id: "event-3",
      title: "Uluwatu Coastal Retreat",
      date: "24 — 27 April 2025",
      location: "Clifftop Residency, Uluwatu",
      description:
        "Four days of curated beach excursions, sensual rituals, and sunset play parties with boutique lodging.",
      highlights: ["All-Inclusive Stay", "Sunset Ceremonies", "Mentorship Circles"],
    },
  ],
};

const mockDb: ContentCollections = deepClone(initialData);

const simulateLatency = async <T,>(data: T, ms = 400): Promise<T> =>
  new Promise((resolve) => setTimeout(() => resolve(deepClone(data)), ms));

const mockApi = {
  async fetchCollections() {
    return simulateLatency(mockDb);
  },
  async createRecord<K extends AdminCollectionKey>(
    collection: K,
    payload: CollectionInput<K>
  ) {
    const record = { ...payload, id: createId() } as CollectionMap[K];
    const current = mockDb[collection] as CollectionMap[K][];
    mockDb[collection] = [...current, record] as ContentCollections[K];
    return simulateLatency(record);
  },
  async updateRecord<K extends AdminCollectionKey>(
    collection: K,
    id: string,
    payload: Partial<CollectionInput<K>>
  ) {
    const current = mockDb[collection] as CollectionMap[K][];
    mockDb[collection] = current.map((item) =>
      item.id === id ? ({ ...item, ...payload } as CollectionMap[K]) : item
    ) as ContentCollections[K];
    const updated = mockDb[collection].find((item) => item.id === id);
    if (!updated) {
      throw new Error(`Record ${id} not found in ${collection}`);
    }
    return simulateLatency(updated as CollectionMap[K]);
  },
  async deleteRecord<K extends AdminCollectionKey>(collection: K, id: string) {
    const current = mockDb[collection] as CollectionMap[K][];
    mockDb[collection] = current.filter((item) => item.id !== id) as ContentCollections[K];
    return simulateLatency({ success: true });
  },
};

interface AsyncState {
  isBootstrapped: boolean;
  isLoading: boolean;
  error: string | null;
  lastMutation?: {
    collection: AdminCollectionKey;
    action: "create" | "update" | "delete";
    timestamp: number;
    label?: string;
  };
}

interface ContentStore extends AsyncState {
  collections: ContentCollections;
  fetchCollections: () => Promise<void>;
  createRecord: <K extends AdminCollectionKey>(
    collection: K,
    payload: CollectionInput<K>
  ) => Promise<CollectionMap[K]>;
  updateRecord: <K extends AdminCollectionKey>(
    collection: K,
    id: string,
    payload: Partial<CollectionInput<K>>
  ) => Promise<CollectionMap[K]>;
  deleteRecord: <K extends AdminCollectionKey>(collection: K, id: string) => Promise<void>;
}

const emptyCollections: ContentCollections = {
  faqs: [],
  etiquetteSlides: [],
  testimonials: [],
  valueCards: [],
  societyHighlights: [],
  events: [],
};

export const useAdminContentStore = create<ContentStore>((set, get) => ({
  collections: emptyCollections,
  isBootstrapped: false,
  isLoading: false,
  error: null,
  async fetchCollections() {
    set({ isLoading: true, error: null });
    try {
      const data = await mockApi.fetchCollections();
      set({
        collections: data,
        isBootstrapped: true,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : String(error),
        isLoading: false,
      });
    }
  },
  async createRecord<K extends AdminCollectionKey>(
    collection: K,
    payload: CollectionInput<K>
  ) {
    set({ error: null });
    const record = await mockApi.createRecord(collection, payload);
    set((state) => {
      const current = state.collections[collection] as CollectionMap[K][];
      const nextCollection = [...current, record];
      return {
        collections: {
          ...state.collections,
          [collection]: nextCollection,
        } as ContentCollections,
        lastMutation: {
          action: "create",
          collection,
          timestamp: Date.now(),
          label: inferRecordLabel(record),
        },
      };
    });
    return record;
  },
  async updateRecord<K extends AdminCollectionKey>(
    collection: K,
    id: string,
    payload: Partial<CollectionInput<K>>
  ) {
    set({ error: null });
    const record = await mockApi.updateRecord(collection, id, payload);
    set((state) => {
      const current = state.collections[collection] as CollectionMap[K][];
      return {
        collections: {
          ...state.collections,
          [collection]: current.map((item) => (item.id === id ? record : item)),
        } as ContentCollections,
        lastMutation: {
          action: "update",
          collection,
          timestamp: Date.now(),
          label: inferRecordLabel(record),
        },
      };
    });
    return record;
  },
  async deleteRecord<K extends AdminCollectionKey>(collection: K, id: string) {
    set({ error: null });
    const existing = get().collections[collection].find((item) => item.id === id);
    await mockApi.deleteRecord(collection, id);
    set((state) => {
      const current = state.collections[collection] as CollectionMap[K][];
      return {
        collections: {
          ...state.collections,
          [collection]: current.filter((item) => item.id !== id),
        } as ContentCollections,
        lastMutation: {
          action: "delete",
          collection,
          timestamp: Date.now(),
          label: existing ? inferRecordLabel(existing) : undefined,
        },
      };
    });
  },
}));

export const getCollectionLabel = (collection: AdminCollectionKey) => {
  switch (collection) {
    case "faqs":
      return "FAQs";
    case "etiquetteSlides":
      return "Basic Etiquette";
    case "testimonials":
      return "Testimonials";
    case "valueCards":
      return "Value Carousel";
    case "societyHighlights":
      return "Society Highlights";
    case "events":
      return "Upcoming Events";
    default:
      return collection;
  }
};
