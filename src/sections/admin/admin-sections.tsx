import type { JSX } from "react";
import { z } from "zod";
import type { AdminCollectionKey } from "./content-store";
import { EntityManager } from "./entity-manager";

const faqSchema = z.object({
  question: z.string().min(1, "Pertanyaan wajib diisi"),
  answer: z.string().min(1, "Jawaban wajib diisi"),
});

const etiquetteSchema = z.object({
  title: z.string().min(1, "Judul wajib diisi"),
  description: z.string().min(1, "Deskripsi wajib diisi"),
  imageUrl: z.string().min(1, "URL gambar wajib diisi"),
});

const testimonialSchema = z.object({
  author: z.string().min(1, "Nama wajib diisi"),
  quote: z.string().min(1, "Testimoni wajib diisi"),
});

const valueSchema = z.object({
  title: z.string().min(1, "Judul wajib diisi"),
  description: z.string().min(1, "Deskripsi wajib diisi"),
  wrapperClasses: z.string().min(1, "Wrapper classes wajib"),
  accentClasses: z.string().min(1, "Accent classes wajib"),
  descriptionClasses: z.string().min(1, "Description classes wajib"),
});

const societySchema = z.object({
  title: z.string().min(1, "Judul wajib diisi"),
  description: z.string().min(1, "Deskripsi wajib diisi"),
});

const eventSchema = z.object({
  title: z.string().min(1, "Judul wajib"),
  date: z.string().min(1, "Tanggal wajib"),
  location: z.string().min(1, "Lokasi wajib"),
  description: z.string().min(1, "Deskripsi wajib"),
  highlights: z
    .array(z.string().min(1, "Highlight tidak boleh kosong"))
    .min(1, "Tambahkan minimal satu highlight"),
});

type FaqValues = z.infer<typeof faqSchema>;
type EtiquetteValues = z.infer<typeof etiquetteSchema>;
type TestimonialValues = z.infer<typeof testimonialSchema>;
type ValueValues = z.infer<typeof valueSchema>;
type SocietyValues = z.infer<typeof societySchema>;
type EventValues = z.infer<typeof eventSchema>;

const faqDefaults: FaqValues = { question: "", answer: "" };
const etiquetteDefaults: EtiquetteValues = {
  title: "",
  description: "",
  imageUrl: "",
};
const testimonialDefaults: TestimonialValues = {
  author: "",
  quote: "",
};
const valueDefaults: ValueValues = {
  title: "",
  description: "",
  wrapperClasses: "",
  accentClasses: "",
  descriptionClasses: "",
};
const societyDefaults: SocietyValues = {
  title: "",
  description: "",
};
const eventsDefaults: EventValues = {
  title: "",
  date: "",
  location: "",
  description: "",
  highlights: [],
};

const FaqsSection = () => (
  <EntityManager
    title="Frequently Asked Questions"
    description="Koleksi pertanyaan dan jawaban untuk membimbing anggota baru sebelum RSVP."
    collection="faqs"
    schema={faqSchema}
    defaultValues={faqDefaults}
    fields={[
      { name: "question", label: "Pertanyaan", type: "text", placeholder: "Apa pertanyaan yang sering muncul?" },
      { name: "answer", label: "Jawaban", type: "editor" },
    ]}
    listConfig={{
      getPrimaryText: (record) => record.question,
      getSecondaryText: (record) => {
        const plain = record.answer.replace(/<[^>]+>/g, "");
        return plain.length > 120 ? `${plain.slice(0, 120)}...` : plain;
      },
    }}
  />
);

const EtiquetteSection = () => (
  <EntityManager
    title="Basic Etiquette"
    description="Atur slide sopan santun untuk carousel edukasi pada landing page."
    collection="etiquetteSlides"
    schema={etiquetteSchema}
    defaultValues={etiquetteDefaults}
    fields={[
      { name: "title", label: "Judul", type: "text", placeholder: "Dress Code Mandatory" },
      { name: "description", label: "Deskripsi", type: "editor" },
      {
        name: "imageUrl",
        label: "Banner",
        type: "image",
        helper: "Unggah gambar 4:3 (min 1600px). URL otomatis tersimpan setelah upload.",
      },
    ]}
    listConfig={{
      getPrimaryText: (record) => record.title,
      getSecondaryText: (record) => {
        const plain = record.description.replace(/<[^>]+>/g, "");
        return plain.length > 120 ? `${plain.slice(0, 120)}...` : plain;
      },
    }}
  />
);

const TestimonialsSection = () => (
  <EntityManager
    title="Testimonials"
    description="Kurasi social proof untuk meyakinkan calon anggota."
    collection="testimonials"
    schema={testimonialSchema}
    defaultValues={testimonialDefaults}
    fields={[
      { name: "author", label: "Nama/Peran", type: "text", placeholder: "Community Member" },
      { name: "quote", label: "Kutipan", type: "editor" },
    ]}
    listConfig={{
      getPrimaryText: (record) => record.author,
      getSecondaryText: (record) => {
        const plain = record.quote.replace(/<[^>]+>/g, "");
        return plain.length > 120 ? `${plain.slice(0, 120)}...` : plain;
      },
    }}
  />
);

const ValuesSection = () => (
  <EntityManager
    title="Value Cards"
    description="Kelola prinsip utama UNLSH yang muncul sebagai kartu flip."
    collection="valueCards"
    schema={valueSchema}
    defaultValues={valueDefaults}
    fields={[
      { name: "title", label: "Judul Nilai", type: "text" },
      { name: "description", label: "Deskripsi", type: "editor" },
    ]}
    allowCreate={false}
    allowDelete={false}
    listConfig={{
      getPrimaryText: (record) => record.title,
      getSecondaryText: (record) => {
        const plain = record.description.replace(/<[^>]+>/g, "");
        return plain.length > 120 ? `${plain.slice(0, 120)}...` : plain;
      },
    }}
  />
);

const SocietySection = () => (
  <EntityManager
    title="Society Highlights"
    description="Perbaharui highlight event komunitas mingguan/mingguan."
    collection="societyHighlights"
    schema={societySchema}
    defaultValues={societyDefaults}
    fields={[
      { name: "title", label: "Judul", type: "text" },
      { name: "description", label: "Deskripsi", type: "editor" },
    ]}
    listConfig={{
      getPrimaryText: (record) => record.title,
      getSecondaryText: (record) => {
        const plain = record.description.replace(/<[^>]+>/g, "");
        return plain.length > 120 ? `${plain.slice(0, 120)}...` : plain;
      },
    }}
  />
);

const EventsSection = () => (
  <EntityManager
    title="Upcoming Events"
    description="Kelola daftar acara untuk halaman Upcoming Events dan CTA Who Section."
    collection="events"
    schema={eventSchema}
    defaultValues={eventsDefaults}
    fields={[
      { name: "title", label: "Judul", type: "text" },
      {
        name: "date",
        label: "Tanggal & Waktu",
        type: "datetime",
        placeholder: "Pilih tanggal",
        helper: "Tanggal akan diformat otomatis (contoh: 15 Maret 2025 19:00)",
      },
      { name: "location", label: "Lokasi", type: "text" },
      { name: "description", label: "Deskripsi", type: "editor" },
      {
        name: "highlights",
        label: "Highlights",
        type: "tags",
        helper: "Tambahkan highlight kemudian klik item untuk menghapus",
      },
    ]}
    listConfig={{
      getPrimaryText: (record) => record.title,
      getSecondaryText: (record) => `${record.date} · ${record.location}`,
      getTags: (record) => record.highlights,
    }}
    emptyState="Belum ada acara. Tambahkan event pertama Anda."
  />
);

export type AdminSectionDefinition = {
  id: AdminCollectionKey;
  title: string;
  description: string;
  render: () => JSX.Element;
};

export const ADMIN_SECTIONS: AdminSectionDefinition[] = [
  {
    id: "faqs",
    title: "FAQs",
    description: "Pertanyaan yang sering ditanyakan calon anggota.",
    render: FaqsSection,
  },
  {
    id: "etiquetteSlides",
    title: "Basic Etiquette",
    description: "Slide aturan dasar selama event berlangsung.",
    render: EtiquetteSection,
  },
  {
    id: "testimonials",
    title: "Testimonials",
    description: "Suara komunitas dan tamu undangan.",
    render: TestimonialsSection,
  },
  {
    id: "valueCards",
    title: "Value Cards",
    description: "Nilai inti UNLSH.",
    render: ValuesSection,
  },
  {
    id: "societyHighlights",
    title: "Society Highlights",
    description: "Program mingguan untuk mempererat komunitas.",
    render: SocietySection,
  },
  {
    id: "events",
    title: "Upcoming Events",
    description: "Event besar dalam kalender UNLSH.",
    render: EventsSection,
  },
];

export const ADMIN_SIDEBAR_GROUPS = [
  {
    label: "Content Buckets",
    items: ADMIN_SECTIONS.map((section) => ({
      id: section.id,
      title: section.title,
      description: section.description,
    })),
  },
];
