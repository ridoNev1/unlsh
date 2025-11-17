import { create } from "zustand"
import { apiRequest } from "@/sections/admin/api-client"

export type FaqEntry = {
  id: string
  question: string
  answer: string
}

export type EtiquetteSlide = {
  id: string
  title: string
  description: string
  imageUrl: string
}

export type Testimonial = {
  id: string
  author: string
  quote: string
}

export type ValueCard = {
  id: string
  title: string
  description: string
  wrapperClasses: string
  accentClasses: string
  descriptionClasses: string
}

export type SocietyHighlight = {
  id: string
  title: string
  description: string
}

export type EventItem = {
  id: string
  title: string
  date: string
  location: string
  description: string
  highlights: string[]
}

export type AdminCollectionKey =
  | "faqs"
  | "etiquetteSlides"
  | "testimonials"
  | "valueCards"
  | "societyHighlights"
  | "events"

type CollectionMap = {
  faqs: FaqEntry
  etiquetteSlides: EtiquetteSlide
  testimonials: Testimonial
  valueCards: ValueCard
  societyHighlights: SocietyHighlight
  events: EventItem
}

export type ContentCollections = {
  [K in AdminCollectionKey]: Array<CollectionMap[K]>
}

export type CollectionInput<K extends AdminCollectionKey> = Omit<
  CollectionMap[K],
  "id"
>

const inferRecordLabel = (record: Record<string, unknown>) =>
  (record.title ??
    record.question ??
    record.author ??
    record.id ??
    "item") as string

const emptyCollections: ContentCollections = {
  faqs: [],
  etiquetteSlides: [],
  testimonials: [],
  valueCards: [],
  societyHighlights: [],
  events: [],
}

const normalizeCollections = (
  payload: Partial<ContentCollections> | undefined | null
): ContentCollections => {
  const collectionKeys = Object.keys(emptyCollections) as AdminCollectionKey[]
  const normalized: ContentCollections = { ...emptyCollections }
  collectionKeys.forEach((key) => {
    normalized[key] = Array.isArray(payload?.[key])
      ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ([...payload![key]!] as any)
      : []
  })
  return normalized
}

interface AsyncState {
  isBootstrapped: boolean
  isLoading: boolean
  error: string | null
  lastMutation?: {
    collection: AdminCollectionKey
    action: "create" | "update" | "delete"
    timestamp: number
    label?: string
  }
}

interface ContentStore extends AsyncState {
  collections: ContentCollections
  fetchCollections: () => Promise<void>
  createRecord: <K extends AdminCollectionKey>(
    collection: K,
    payload: CollectionInput<K>
  ) => Promise<CollectionMap[K]>
  updateRecord: <K extends AdminCollectionKey>(
    collection: K,
    id: string,
    payload: Partial<CollectionInput<K>>
  ) => Promise<CollectionMap[K]>
  deleteRecord: <K extends AdminCollectionKey>(collection: K, id: string) => Promise<void>
}

const buildRecord = <T extends Record<string, unknown>>(
  response: any,
  fallback: Partial<T> & { id?: string }
): T => {
  const fromResponse = (response?.record ?? response?.data ?? response) as
    | (Partial<T> & { id?: string })
    | undefined

  const merged = {
    ...fallback,
    ...(fromResponse ?? {}),
  }

  if (!merged.id) {
    merged.id = crypto.randomUUID() as T["id"] extends string ? string : any
  }

  return merged as T
}

export const useAdminContentStore = create<ContentStore>((set, get) => ({
  collections: emptyCollections,
  isBootstrapped: false,
  isLoading: false,
  error: null,
  async fetchCollections() {
    set({ isLoading: true, error: null })
    try {
      const response = await apiRequest<{ collections?: Partial<ContentCollections> }>(
        "/api/admin/content"
      )
      const source = (response?.collections ?? null) as
        | Partial<ContentCollections>
        | null
        | undefined
  const collections = normalizeCollections(source)
      set({
        collections,
        isBootstrapped: true,
        isLoading: false,
      })
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Gagal memuat konten.",
        isLoading: false,
      })
    }
  },
  createRecord: async <K extends AdminCollectionKey>(
    collection: K,
    payload: CollectionInput<K>
  ) => {
    set({ error: null })
    const response = await apiRequest(`/api/admin/content/${collection}`, {
      method: "POST",
      body: JSON.stringify({ data: payload }),
    })
    const record = buildRecord<CollectionMap[K]>(response, {
      ...(payload as CollectionMap[K]),
    })
    set((state) => ({
      collections: {
        ...state.collections,
        [collection]: [...state.collections[collection], record],
      },
      lastMutation: {
        action: "create",
        collection,
        timestamp: Date.now(),
        label: inferRecordLabel(record),
      },
    }))
    void get().fetchCollections()
    return record
  },
  updateRecord: async <K extends AdminCollectionKey>(
    collection: K,
    id: string,
    payload: Partial<CollectionInput<K>>
  ) => {
    set({ error: null })
    const response = await apiRequest(`/api/admin/content/${collection}/${id}`, {
      method: "PUT",
      body: JSON.stringify({ data: payload }),
    })
    const existing = get().collections[collection].find((item) => item.id === id)
    const record = buildRecord<CollectionMap[K]>(response, {
      ...(existing as CollectionMap[K]),
      ...(payload as Partial<CollectionMap[K]>),
      id,
    })
    set((state) => ({
      collections: {
        ...state.collections,
        [collection]: state.collections[collection].map((item) =>
          item.id === id ? record : item
        ),
      },
      lastMutation: {
        action: "update",
        collection,
        timestamp: Date.now(),
        label: inferRecordLabel(record),
      },
    }))
    void get().fetchCollections()
    return record
  },
  deleteRecord: async <K extends AdminCollectionKey>(collection: K, id: string) => {
    set({ error: null })
    await apiRequest(`/api/admin/content/${collection}/${id}`, {
      method: "DELETE",
    })
    const existing = get().collections[collection].find((item) => item.id === id)
    set((state) => ({
      collections: {
        ...state.collections,
        [collection]: state.collections[collection].filter((item) => item.id !== id),
      },
      lastMutation: {
        action: "delete",
        collection,
        timestamp: Date.now(),
        label: existing ? inferRecordLabel(existing) : undefined,
      },
    }))
    void get().fetchCollections()
  },
}))
