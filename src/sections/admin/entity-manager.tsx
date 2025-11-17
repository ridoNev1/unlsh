import { useEffect, useMemo, useRef, useState } from "react";
import { useForm, useStore } from "@tanstack/react-form";
import type { StandardSchemaV1 } from "@tanstack/form-core";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { ChevronDown } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import type {
  AdminCollectionKey,
  CollectionInput,
  ContentCollections,
} from "./content-store";
import { useAdminContentStore } from "./content-store";
import RichTextEditor from "./text-editor";

const toStandardSchema = <T extends z.ZodTypeAny>(
  schema: T
): StandardSchemaV1<z.input<T>, z.output<T>> => ({
  "~standard": {
    version: 1,
    vendor: "zod",
    validate: (value: unknown) => {
      const result = schema.safeParse(value);
      if (result.success) {
        return { value: result.data };
      }
      return {
        issues: result.error.issues.map((issue) => ({
          message: issue.message,
          path: issue.path,
        })),
      };
    },
  },
});

export type FieldType = "text" | "editor" | "tags" | "datetime" | "image";

export type FieldConfig = {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  helper?: string;
};

export type ListConfig<TRecord> = {
  getPrimaryText: (record: TRecord) => string;
  getSecondaryText?: (record: TRecord) => string | undefined;
  getTags?: (record: TRecord) => string[];
};

export interface EntityManagerProps<K extends AdminCollectionKey> {
  title: string;
  description: string;
  collection: K;
  schema: z.ZodTypeAny;
  defaultValues: Record<string, any>;
  fields: FieldConfig[];
  listConfig: ListConfig<ContentCollections[K][number]>;
  emptyState?: string;
  allowCreate?: boolean;
  allowDelete?: boolean;
}

const FieldError = ({ message }: { message?: string }) =>
  message ? <p className="text-xs text-[#b4231f]">{message}</p> : null;

const TagInput = ({
  value,
  onChange,
  placeholder,
}: {
  value: string[];
  onChange: (next: string[]) => void;
  placeholder?: string;
}) => {
  const [draft, setDraft] = useState("");

  const handleAdd = () => {
    const trimmed = draft.trim();
    if (!trimmed) return;
    onChange(Array.from(new Set([...value, trimmed])));
    setDraft("");
  };

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <Input
          value={draft}
          placeholder={placeholder}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              handleAdd();
            }
          }}
          className="border-white/15 bg-[#120104] text-white placeholder-white/40"
        />
        <Button
          type="button"
          variant="ghost"
          className="bg-white/10 text-white hover:bg-white/20"
          onClick={handleAdd}
        >
          Tambah
        </Button>
      </div>
      <div className="flex flex-wrap gap-2">
        {value.map((item) => (
          <button
            key={item}
            type="button"
            className="rounded-full border border-white/20 px-3 py-1 text-xs uppercase tracking-[0.3em] text-white/80"
            onClick={() =>
              onChange(value.filter((highlight) => highlight !== item))
            }
          >
            {item}
          </button>
        ))}
        {!value.length ? (
          <span className="text-xs text-white/60">
            Belum ada item. Tambahkan minimal satu highlight.
          </span>
        ) : null}
      </div>
    </div>
  );
};

interface ImageUploadFieldProps {
  label: string;
  helper?: string;
  error?: string;
  field: any;
  placeholder?: string;
}

const ImageUploadField = ({
  label,
  helper,
  error,
  placeholder,
  field,
}: ImageUploadFieldProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const value = (field.state.value as string) ?? "";

  const handleUpload = async (file?: File | null) => {
    if (!file) return;
    try {
      setUploadError(null);
      setIsUploading(true);
      const url = await uploadAdminImage(file);
      field.handleChange(url as never);
    } catch (err) {
      setUploadError(
        err instanceof Error ? err.message : "Gagal mengunggah gambar."
      );
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <Label className="text-sm text-white">{label}</Label>
      <div className="rounded-2xl border border-white/15 bg-black/20 p-4">
        {value ? (
          <div className="overflow-hidden rounded-xl border border-white/10">
            <img
              src={value}
              alt={label}
              className="h-48 w-full object-cover"
              onError={() => setUploadError("Tidak dapat menampilkan gambar.")}
            />
          </div>
        ) : (
          <div className="flex h-48 items-center justify-center rounded-xl border border-dashed border-white/15 text-sm text-white/60">
            {placeholder ?? "Belum ada gambar. Unggah untuk mengganti."}
          </div>
        )}
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <Button
            type="button"
            variant="ghost"
            className="bg-white/10 text-white hover:bg-white/20"
            disabled={isUploading}
            onClick={() => inputRef.current?.click()}
          >
            {isUploading ? "Mengunggah..." : "Upload Gambar"}
          </Button>
          {value ? (
            <Button
              type="button"
              variant="ghost"
              className="bg-[#3a0c12] text-white hover:text-white hover:bg-[#52101a]"
              onClick={() => field.handleChange("" as never)}
            >
              Hapus
            </Button>
          ) : null}
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(event) => {
              const file = event.target.files?.[0];
              void handleUpload(file);
              event.target.value = "";
            }}
          />
        </div>
        <p className="mt-2 truncate text-xs text-white/60">{value || ""}</p>
        {uploadError ? (
          <p className="text-xs text-[#ff6f61]">{uploadError}</p>
        ) : null}
        {helper ? <p className="text-xs text-white/60">{helper}</p> : null}
      </div>
      <FieldError message={error} />
    </div>
  );
};

interface DateTimeFieldProps {
  label: string;
  helper?: string;
  placeholder?: string;
  error?: string;
  field: any;
}

const DEFAULT_TIME = "19:00";
const DATE_FORMATTER = new Intl.DateTimeFormat("en-US", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

const DateTimeField = ({
  label,
  helper,
  placeholder,
  error,
  field,
}: DateTimeFieldProps) => {
  const [open, setOpen] = useState(false);
  const value = field.state.value as string;
  const { date, time } = useMemo(() => parseDateTimeValue(value), [value]);
  const [timeInput, setTimeInput] = useState(time);

  useEffect(() => {
    setTimeInput(time);
  }, [time]);

  const handleDateSelect = (next?: Date) => {
    if (!next) return;
    field.handleChange(
      formatDateTimeValue(next, timeInput, field.state.value) as never
    );
    setOpen(false);
  };

  const handleTimeChange = (nextTime: string) => {
    setTimeInput(nextTime);
    if (!date) return;
    field.handleChange(
      formatDateTimeValue(date, nextTime, field.state.value) as never
    );
  };

  const buttonLabel = date
    ? DATE_FORMATTER.format(date)
    : placeholder ?? "Pilih tanggal";

  return (
    <div className="space-y-2">
      <Label className="text-sm text-white">{label}</Label>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              className="flex-1 justify-between border border-white/15 bg-[#120104] text-white hover:bg-[#120104] hover:text-white"
            >
              <span>{buttonLabel}</span>
              <ChevronDown className="h-4 w-4 opacity-70" />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-auto border-white/10 bg-[#1b0508] p-0 text-white"
            align="start"
          >
            <Calendar
              mode="single"
              selected={date}
              onSelect={handleDateSelect}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        <div className="flex flex-1 flex-col gap-2">
          <Input
            type="time"
            value={timeInput}
            onChange={(event) => handleTimeChange(event.target.value)}
            className="border-white/15 bg-[#120104] text-white placeholder-white/40"
          />
          <span className="text-xs text-white/60">
            {date
              ? `Waktu: ${timeInput || DEFAULT_TIME}`
              : "Pilih tanggal terlebih dahulu"}
          </span>
        </div>
      </div>
      {helper ? <p className="text-xs text-white/60">{helper}</p> : null}
      <FieldError message={error} />
    </div>
  );
};

const parseDateTimeValue = (value?: string) => {
  if (!value) {
    return { date: undefined, time: DEFAULT_TIME };
  }

  const normalized = value.trim();
  const timeMatch = normalized.match(/(\d{1,2}:\d{2})/);
  const parsedTime = normalizeTime(timeMatch?.[1]) ?? DEFAULT_TIME;

  const isoCandidate = Date.parse(normalized);
  if (!Number.isNaN(isoCandidate)) {
    return { date: new Date(isoCandidate), time: parsedTime };
  }

  const dateOnly = timeMatch
    ? normalized.replace(timeMatch[1], "").trim()
    : normalized;
  const fallback = Date.parse(dateOnly);
  if (!Number.isNaN(fallback)) {
    return { date: new Date(fallback), time: parsedTime };
  }

  return { date: undefined, time: parsedTime };
};

const normalizeTime = (value?: string) => {
  if (!value) return undefined;
  const [h, m = "0"] = value.split(":");
  const hours = Math.min(23, Math.max(0, Number(h)));
  const minutes = Math.min(59, Math.max(0, Number(m)));
  if (Number.isNaN(hours) || Number.isNaN(minutes)) {
    return undefined;
  }
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0"
  )}`;
};

const formatDateTimeValue = (date?: Date, time?: string, fallback?: string) => {
  if (!date) return fallback ?? "";
  const normalizedTime = normalizeTime(time) ?? DEFAULT_TIME;
  const formattedDate = DATE_FORMATTER.format(date);
  return `${formattedDate} ${normalizedTime}`.trim();
};

async function uploadAdminImage(file: File): Promise<string> {
  const uploadURL = import.meta.env.VITE_UPLOAD_ENDPOINT;
  if (!uploadURL) {
    throw new Error("Missing VITE_UPLOAD_ENDPOINT for photo uploads");
  }

  const uploadPayload = new FormData();
  uploadPayload.append("file", file);

  const response = await fetch(uploadURL, {
    method: "POST",
    body: uploadPayload,
  });

  if (!response.ok) {
    throw new Error(`Failed to upload ${file.name}`);
  }

  const data = await response.json().catch(() => ({}));

  const fileMatch = Array.isArray(data.uploadedFiles)
    ? data.uploadedFiles.find((entry: any) => entry?.filename === file.name) ||
      data.uploadedFiles[0]
    : undefined;

  const resolvedUrl =
    data.imageUrl ||
    data.publicUrl ||
    data.url ||
    data.Location ||
    data.location ||
    (fileMatch?.imageUrl ??
      (fileMatch?.filename && import.meta.env.VITE_UPLOAD_PUBLIC_BASE
        ? `${import.meta.env.VITE_UPLOAD_PUBLIC_BASE}/${fileMatch.filename}`
        : undefined)) ||
    (data.filename && import.meta.env.VITE_UPLOAD_PUBLIC_BASE
      ? `${import.meta.env.VITE_UPLOAD_PUBLIC_BASE}/${data.filename}`
      : undefined);

  if (!resolvedUrl) {
    throw new Error("Upload response missing a file URL");
  }

  return resolvedUrl;
}

function getFieldError(meta: any, isSubmitted: boolean) {
  if (!meta || !meta.errors?.length) {
    return undefined;
  }
  const firstError = meta.errors[0];
  if (meta.isTouched || isSubmitted) {
    return typeof firstError === "string"
      ? firstError
      : (firstError as { message?: string }).message;
  }
  return undefined;
}

export function EntityManager<K extends AdminCollectionKey>({
  title,
  description,
  collection,
  schema,
  defaultValues,
  fields,
  listConfig,
  emptyState,
  allowCreate = true,
  allowDelete = true,
}: EntityManagerProps<K>) {
  type FormValues = Record<string, any>;
  const standardSchema = toStandardSchema(schema) as StandardSchemaV1<
    FormValues,
    FormValues
  >;
  const records = useAdminContentStore(
    (state) => state.collections[collection]
  ) as ContentCollections[K];
  const createRecord = useAdminContentStore((state) => state.createRecord);
  const updateRecord = useAdminContentStore((state) => state.updateRecord);
  const deleteRecord = useAdminContentStore((state) => state.deleteRecord);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pendingDelete, setPendingDelete] = useState<
    ContentCollections[K][number] | null
  >(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const { getPrimaryText, getSecondaryText, getTags } = listConfig;

  const form = useForm({
    defaultValues,
    validators: {
      onSubmit: standardSchema as any,
      onChange: standardSchema as any,
    },
    onSubmit: async ({ value, formApi }) => {
      setIsSubmitting(true);
      try {
        if (!editingId && !allowCreate) {
          toast.error("Konten ini hanya dapat diperbarui.");
          return;
        }
        const payload = value as CollectionInput<K>;
        if (editingId) {
          const updated = await updateRecord(collection, editingId, payload);
          toast.success(
            `${getPrimaryText(updated) ?? "Konten"} berhasil diperbarui.`
          );
        } else {
          const created = await createRecord(collection, payload);
          toast.success(
            `${getPrimaryText(created) ?? "Konten"} berhasil ditambahkan.`
          );
        }
        formApi.reset();
        setEditingId(null);
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "Gagal menyimpan konten."
        );
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  const isSubmitted = useStore(form.store, (state) => state.isSubmitted);
  const isEditing = Boolean(editingId);

  const startEdit = (record: ContentCollections[K][number]) => {
    setEditingId(record.id);
  };

  const cancelEdit = () => {
    setEditingId(null);
    form.reset(defaultValues);
  };

  useEffect(() => {
    if (!editingId) {
      form.reset(defaultValues);
      return;
    }

    const record = records.find((item) => item.id === editingId);
    if (!record) return;

    const { id: _id, ...rest } = record as { id: string } & Record<string, any>;
    form.reset(rest as FormValues);
  }, [editingId, records, form, defaultValues]);

  const requestDelete = (record: ContentCollections[K][number]) => {
    if (!allowDelete) return;
    setPendingDelete(record);
    setIsDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
    setPendingDelete(null);
  };

  const confirmDelete = async () => {
    if (!pendingDelete) return;
    try {
      await deleteRecord(collection, pendingDelete.id);
      toast.success(
        `${getPrimaryText(pendingDelete) ?? "Konten"} berhasil dihapus.`
      );
      if (editingId === pendingDelete.id) {
        cancelEdit();
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Gagal menghapus konten."
      );
    } finally {
      closeDeleteDialog();
    }
  };

  return (
    <section className="space-y-8">
      <header className="space-y-3">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.6em] text-[#ffb5a4]">
              Content Bucket
            </p>
            <h2 className="font-bo text-3xl uppercase text-[#fde9df]">
              {title}
            </h2>
          </div>
        </div>
        <p className="text-base text-[#fde9df]/80">{description}</p>
      </header>

      <div className="grid gap-8 lg:grid-cols-[1fr_420px]">
        <div className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl">
          {records.length ? (
            <div className="space-y-4">
              {records.map((record) => (
                <article
                  key={record.id}
                  className={cn(
                    "rounded-2xl border border-white/10 bg-white/5 p-4 text-white transition",
                    editingId === record.id
                      ? "border-[#ff6f61] bg-[#381018]"
                      : "hover:border-[#ff6f61]/40"
                  )}
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-sm uppercase tracking-[0.3em] text-white/70">
                        ID #{record.id.slice(-6)}
                      </p>
                      <h3 className="mt-2 text-lg font-semibold">
                        {getPrimaryText(record)}
                      </h3>
                      {getSecondaryText?.(record) ? (
                        <p className="text-sm text-white/70">
                          {getSecondaryText(record)}
                        </p>
                      ) : null}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="bg-white/10 text-white hover:text-white hover:bg-white/20"
                        onClick={() => startEdit(record)}
                      >
                        Edit
                      </Button>
                      {allowDelete ? (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="bg-[#3a0c12] text-white hover:text-white hover:bg-[#52101a]"
                          onClick={() => requestDelete(record)}
                        >
                          Hapus
                        </Button>
                      ) : null}
                    </div>
                  </div>
                  {getTags?.(record)?.length ? (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {getTags(record)!.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-white/20 px-3 py-1 text-xs uppercase tracking-[0.3em] text-white/70"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </article>
              ))}
            </div>
          ) : (
            <div className="flex h-full min-h-[200px] items-center justify-center text-center text-white/70">
              {emptyState ?? "Belum ada konten. Tambahkan item baru."}
            </div>
          )}
        </div>

        <div className="rounded-3xl border border-white/15 bg-[#1b0508] p-6 text-white shadow-2xl">
          <form
            className="space-y-6"
            onSubmit={(event) => {
              event.preventDefault();
              form.handleSubmit();
            }}
          >
            <div>
              <p className="text-xs uppercase tracking-[0.5em] text-[#ffb5a4]">
                {isEditing ? "Update" : allowCreate ? "Create" : "Edit"}
              </p>
              <h3 className="font-bo text-2xl uppercase text-white">
                {isEditing
                  ? "Perbarui Konten"
                  : allowCreate
                  ? "Tambah Konten"
                  : "Edit Konten"}
              </h3>
              {!allowCreate && !isEditing ? (
                <p className="text-sm text-white/60">
                  Pilih item dari daftar untuk diperbarui.
                </p>
              ) : null}
            </div>

            {fields.map((field) => (
              <form.Field key={field.name} name={field.name}>
                {(fieldApi) => {
                  const error = getFieldError(fieldApi.state.meta, isSubmitted);
                  if (field.type === "text") {
                    const value =
                      (fieldApi.state.value as string | undefined) ?? "";
                    return (
                      <div className="space-y-2">
                        <Label className="text-sm text-white">
                          {field.label}
                        </Label>
                        <Input
                          value={value}
                          placeholder={field.placeholder}
                          onChange={(event) =>
                            fieldApi.handleChange(
                              event.target.value as unknown as never
                            )
                          }
                          onBlur={fieldApi.handleBlur}
                          className="border-white/15 bg-[#120104] text-white placeholder-white/40"
                        />
                        {field.helper ? (
                          <p className="text-xs text-white/60">
                            {field.helper}
                          </p>
                        ) : null}
                        <FieldError message={error} />
                      </div>
                    );
                  }

                  if (field.type === "editor") {
                    const editorValue =
                      (fieldApi.state.value as string | undefined) ?? "";
                    return (
                      <RichTextEditor
                        value={editorValue}
                        onChange={(next) =>
                          fieldApi.handleChange(next as unknown as never)
                        }
                        label={field.label}
                        description={field.helper}
                        error={error}
                        placeholder={field.placeholder}
                      />
                    );
                  }

                  if (field.type === "tags") {
                    const tagsValue =
                      (fieldApi.state.value as string[] | undefined) ?? [];
                    return (
                      <div className="space-y-2">
                        <Label className="text-sm text-white">
                          {field.label}
                        </Label>
                        <TagInput
                          value={tagsValue}
                          onChange={(next) =>
                            fieldApi.handleChange(next as unknown as never)
                          }
                          placeholder={field.placeholder}
                        />
                        {field.helper ? (
                          <p className="text-xs text-white/60">
                            {field.helper}
                          </p>
                        ) : null}
                        <FieldError message={error} />
                      </div>
                    );
                  }

                  if (field.type === "datetime") {
                    return (
                      <DateTimeField
                        label={field.label}
                        helper={field.helper}
                        placeholder={field.placeholder}
                        error={error}
                        field={fieldApi}
                      />
                    );
                  }

                  if (field.type === "image") {
                    return (
                      <ImageUploadField
                        label={field.label}
                        helper={field.helper}
                        placeholder={field.placeholder}
                        error={error}
                        field={fieldApi}
                      />
                    );
                  }

                  return null;
                }}
              </form.Field>
            ))}

            <div className="flex flex-wrap gap-3">
              <Button
                type="submit"
                className="flex-1 justify-center bg-[#7d0f16] text-white hover:bg-[#52090e]"
                disabled={isSubmitting || (!allowCreate && !isEditing)}
              >
                {isSubmitting
                  ? "Menyimpan..."
                  : isEditing
                  ? "Simpan Perubahan"
                  : allowCreate
                  ? "Tambah"
                  : "Pilih Konten"}
              </Button>
              {isEditing ? (
                <Button
                  type="button"
                  variant="ghost"
                  className="flex-1 justify-center bg-[#3a0c12] text-white hover:text-white hover:bg-[#52101a]"
                  onClick={cancelEdit}
                >
                  Batalkan
                </Button>
              ) : null}
            </div>
          </form>
        </div>
      </div>
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={(open) => {
          setIsDeleteDialogOpen(open);
          if (!open) {
            setPendingDelete(null);
          }
        }}
      >
        <AlertDialogContent className="border-white/10 bg-[#1b0508] text-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus Konten?</AlertDialogTitle>
            <AlertDialogDescription className="text-white/70">
              {pendingDelete
                ? `Anda yakin ingin menghapus "${getPrimaryText(
                    pendingDelete
                  )}"? Tindakan ini tidak dapat dibatalkan.`
                : "Anda yakin ingin menghapus konten ini?"}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-white/20 bg-red-600 hover:text-white text-white hover:bg-red-600">
              Batalkan
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-[#7d0f16] text-white hover:bg-[#52090e]"
              onClick={(event) => {
                event.preventDefault();
                void confirmDelete();
              }}
            >
              Hapus
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
}
