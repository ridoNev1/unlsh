import React, { useMemo, useRef, useState } from "react";
import { useForm, useStore } from "@tanstack/react-form";
import type { StandardSchemaV1 } from "@tanstack/form-core";
import { z } from "zod";
import Header from "../sections/Header";
import Footer from "../sections/Footer";
import importantBg from "../assets/important-bg.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import countryCodesData from "../../CountryCodes.json";

const APPLYING_AS_VALUES = ["single", "couple"] as const;
const CITY_VALUES = ["bali", "thailand", "global"] as const;
const EVENT_VALUES = [
  "rope-jam",
  "jan-2026",
  "feb-2026",
  "mar-2026",
  "apr-2026",
  "may-2026",
  "jun-2026",
] as const;
const ATTENDED_VALUES = ["yes", "no"] as const;
const AGE_VALUES = ["20-30", "31-40", "41-50", "51-60"] as const;
const APPLYING_AS_OPTIONS = [
  {
    label: "Single",
    value: APPLYING_AS_VALUES[0],
    helper: "Attending solo with concierge support",
  },
  {
    label: "Couple",
    value: APPLYING_AS_VALUES[1],
    helper: "Arriving with your partner or playmate",
  },
] as const;
const CITY_OPTIONS = [
  {
    label: "Bali",
    description: "For curated villa immersions and rooftop salons.",
    value: CITY_VALUES[0],
  },
  {
    label: "Thailand",
    description: "Bangkok + Phuket residencies and crew takeovers.",
    value: CITY_VALUES[1],
  },
  {
    label: "Anywhere in the World",
    description: "I will travel for UNLSH programming.",
    value: CITY_VALUES[2],
  },
] as const;
const EVENT_OPTIONS = [
  { label: "Weekly Rope Jam", value: EVENT_VALUES[0] },
  { label: "Event in January, 2026", value: EVENT_VALUES[1] },
  { label: "Event in February, 2026", value: EVENT_VALUES[2] },
  { label: "Event in March, 2026", value: EVENT_VALUES[3] },
  { label: "Event in April, 2026", value: EVENT_VALUES[4] },
  { label: "Event in May, 2026", value: EVENT_VALUES[5] },
  { label: "Event in June, 2026", value: EVENT_VALUES[6] },
] as const;
const AGE_OPTIONS = [
  { label: "20 – 30 Years", value: AGE_VALUES[0] },
  { label: "31 – 40 Years", value: AGE_VALUES[1] },
  { label: "41 – 50 Years", value: AGE_VALUES[2] },
  { label: "51 – 60 Years", value: AGE_VALUES[3] },
] as const;
const MAX_FILES = 5;
const MAX_FILE_SIZE_MB = 10;
const MAX_FILE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
const DEFAULT_DIAL_CODE = "+62";

type CountryCode = {
  name: string;
  dial_code: string;
  code: string;
};

const selectionPreprocess = <T extends z.ZodTypeAny>(schema: T) =>
  z.preprocess((val) => (val === "" ? undefined : val), schema);

const fileSchema = z
  .custom<File>(
    (value) => (typeof File === "undefined" ? true : value instanceof File),
    {
      message: "Please upload a valid file",
    }
  )
  .refine(
    (file) =>
      typeof File === "undefined" ||
      !file ||
      (file instanceof File && file.size <= MAX_FILE_BYTES),
    {
      message: `Each file must be ${MAX_FILE_SIZE_MB}MB or smaller`,
    }
  );

const formSchema = z.object({
  applyingAs: selectionPreprocess(
    z.enum(APPLYING_AS_VALUES, { error: "Select how you are applying" })
  ),
  likelyCities: z.array(z.enum(CITY_VALUES)).min(1, "Select at least one city"),
  desiredEvents: z
    .array(z.enum(EVENT_VALUES))
    .min(1, "Select at least one event"),
  attendedBefore: selectionPreprocess(
    z.enum(ATTENDED_VALUES, { error: "Let us know if you have joined before" })
  ),
  memberReferences: z.string().min(1, "Share at least one member reference"),
  turnOns: z.string().min(1, "Tell us what turns you on"),
  playPartyExperience: z
    .string()
    .min(1, "Share your experience with play parties"),
  motivation: z.string().min(1, "Tell us why you want to party with us"),
  consentPerspective: z
    .string()
    .min(1, "Share your thoughts on consent & boundaries"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Masukkan email yang valid"),
  whatsappDialCode: z.string().min(1, "Pilih kode negara"),
  whatsapp: z
    .string()
    .min(6, "Masukkan nomor WhatsApp yang aktif")
    .regex(/^[0-9]+$/, "Hanya angka"),
  socialHandle: z.string().min(1, "Bagikan akun sosial atau fetish Anda"),
  ageRange: selectionPreprocess(
    z.enum(AGE_VALUES, { error: "Pilih rentang usia" })
  ),
  photos: z
    .array(fileSchema)
    .min(1, "Upload at least one clear photo")
    .max(MAX_FILES, `Maximum ${MAX_FILES} photos allowed`),
  termsAgreed: z.boolean().refine((val) => val, {
    message: "You must agree with the terms",
  }),
});

type FormValues = z.input<typeof formSchema>;
type ParsedFormValues = z.output<typeof formSchema>;

type SubmitStatus = { type: "success" | "error"; message: string };

const toStandardSchema = <T extends z.ZodTypeAny>(
  schema: T
): StandardSchemaV1<z.input<T>, z.output<T>> => ({
  "~standard": {
    version: 1,
    vendor: "zod",
    validate: (value: unknown) => {
      const result = schema.safeParse(value);
      return result.success
        ? { value: result.data }
        : {
            issues: result.error.issues.map((issue) => ({
              message: issue.message,
              path: issue.path,
            })),
          };
    },
  },
});

const standardSchema = toStandardSchema(formSchema);

const defaultValues: FormValues = {
  applyingAs: "",
  likelyCities: [],
  desiredEvents: [],
  attendedBefore: "",
  memberReferences: "",
  turnOns: "",
  playPartyExperience: "",
  motivation: "",
  consentPerspective: "",
  firstName: "",
  lastName: "",
  email: "",
  whatsappDialCode: DEFAULT_DIAL_CODE,
  whatsapp: "",
  socialHandle: "",
  ageRange: "",
  photos: [],
  termsAgreed: false,
};

const LONG_FORM_FIELDS = [
  {
    name: "turnOns" as const,
    label: "What turns you on the most?",
    helper: "Tell our Angels what activates your desire.",
  },
  {
    name: "playPartyExperience" as const,
    label:
      "How is your experience with Play Party or similar events & community?",
    helper: "Feel free to share a recent scene, ritual, or aftercare story.",
  },
  {
    name: "motivation" as const,
    label: "What makes you want to party with us?",
    helper: "Let us know why UNLSH feels like your next playground.",
  },
  {
    name: "consentPerspective" as const,
    label:
      "Do you respect other people's limit/boundaries? Please express your opinion regarding consent & boundaries.",
    helper: "We protect the sanctity of consent. Share your ethos.",
  },
];

const heroStats = [
  { label: "Application Review", value: "48 – 72 Hours" },
  { label: "Photo Requirement", value: "Up to 5 clear images" },
  { label: "Concierge", value: "rsvp @unlsh .society" },
];

const FormPage = () => {
  const photoInputRef = useRef<HTMLInputElement | null>(null);
  const [status, setStatus] = useState<SubmitStatus | null>(null);
  const countryOptions = useMemo(() => {
    return [...(countryCodesData as CountryCode[])].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  }, []);

  const form = useForm({
    defaultValues,
    validators: {
      onChange: standardSchema,
      onSubmit: standardSchema,
    },
    onSubmit: async ({ value, formApi }) => {
      try {
        const parsed = formSchema.parse(value) as ParsedFormValues;
        await submitToSheets(parsed);
        setStatus({
          type: "success",
          message: "Application received. Our concierge will respond shortly.",
        });
        formApi.reset();
        if (photoInputRef.current) {
          photoInputRef.current.value = "";
        }
      } catch (error) {
        setStatus({
          type: "error",
          message:
            error instanceof Error
              ? error.message
              : "Submission failed. Please try again.",
        });
      }
    },
  });

  const { isSubmitting, isSubmitted } = useStore(form.store, (state) => ({
    isSubmitting: state.isSubmitting,
    isSubmitted: state.isSubmitted,
  }));

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setStatus(null);
    form.handleSubmit();
  };

  return (
    <div className="min-h-screen bg-[#120104] font-avenir text-white">
      <Header />
      <main>
        <section
          className="relative isolate overflow-hidden bg-[#150005]"
          style={{
            backgroundImage: `url(${importantBg})`,
            backgroundSize: "cover",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#1c0409]/95 via-[#150005]/85 to-[#340a16]/90" />
          <div className="relative mx-auto max-w-6xl px-6 py-24">
            <div className="grid gap-10 lg:grid-cols-[1.05fr_.95fr]">
              <div className="flex flex-col gap-5 text-left">
                <span className="text-[10px] uppercase text-[#ff6f61]">
                  Membership Intake / 2025
                </span>
                <h1 className="font-bo text-5xl uppercase text-[#fde9df] md:text-[3.6rem]">
                  Request Your Invite to UNLSH
                </h1>
                <p className="max-w-2xl text-base text-[#fde9df]/85">
                  Every form is personally read by our concierge team. Share
                  your appetite, your references, and the experiences that
                  shaped you. We curate intentional rooms and want to ensure you
                  align with our code of care.
                </p>
                <div className="grid gap-3 sm:grid-cols-3">
                  {heroStats.map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-2xl border border-white/15 bg-white/5 px-4 py-5 text-left"
                    >
                      <p className="text-[10px] uppercase text-[#ffb5a4]">
                        {stat.label}
                      </p>
                      <p className="mt-1.5 font-bo text-xl uppercase text-white">
                        {stat.value}
                      </p>
                    </div>
                  ))}
                </div>
                <p className="text-base text-[#fde9df]/80">
                  Need help before applying? Email
                  <a
                    href="mailto:rsvp@unlsh.society"
                    className="ml-2 underline decoration-dotted underline-offset-4 hover:text-white"
                  >
                    rsvp@unlsh.society
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#FAF1E6] py-20 text-[#2d0610]">
          <div className="mx-auto max-w-6xl px-6">
            <div className="flex flex-col gap-10">
              <aside className="flex flex-col gap-6">
                <div>
                  <span className="text-base uppercase text-[#7d0f16]">
                    Intake Brief
                  </span>
                  <h2 className="mt-2 font-bo text-4xl uppercase text-[#2d0610]">
                    Expectations & Energy
                  </h2>
                  <p className="mt-3 text-base leading-relaxed text-[#3a0c12]/85">
                    This application helps us understand how to best welcome
                    you. Be honest about your desires, boundaries, and
                    references. Pair applications should be submitted
                    together—tell us both names if you are applying as a couple.
                  </p>
                </div>
                <div className="grid gap-3 rounded-3xl border border-[#e2c5b5] bg-white/80 p-6 shadow-lg">
                  <div>
                    <p className="text-base uppercase text-[#7d0f16]">
                      We Value
                    </p>
                    <ul className="mt-3 space-y-2 text-base text-[#3a0c12]/80">
                      <li>
                        • Radical consent, mutual respect, and thoughtful
                        aftercare.
                      </li>
                      <li>
                        • A willingness to co-create atmosphere, not just
                        consume it.
                      </li>
                      <li>
                        • Clear photos to verify you (and your partner) are real
                        humans.
                      </li>
                    </ul>
                  </div>
                  <div className="rounded-2xl border border-[#bb7560] bg-[#fff5ee] p-4">
                    <p className="text-base uppercase text-[#7d0f16]">
                      Need a referral?
                    </p>
                    <p className="mt-2 text-base text-[#3a0c12]/80">
                      Join an etiquette salon or digital pre-brief. We will
                      connect you with a Mentor Angel for guidance if you are
                      new to curated play.
                    </p>
                  </div>
                </div>
              </aside>

              <div className="relative rounded-[32px] border border-[#d9b3a3] bg-white/95 p-8 shadow-2xl">
                <div className="pointer-events-none absolute -top-16 right-6 h-32 w-32 rounded-full bg-[#ffb5a4]/40 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-10 left-4 h-24 w-24 rounded-full bg-[#ffd7c9]/40 blur-3xl" />
                <form className="relative space-y-8" onSubmit={handleSubmit}>
                  <FormSection
                    title="Application Type"
                    description="Tell us how you intend to arrive and where we should meet you."
                  >
                    <form.Field name="applyingAs">
                      {(field) => (
                        <div className="space-y-3">
                          <div className="grid gap-3 md:grid-cols-2">
                            {APPLYING_AS_OPTIONS.map((option) => (
                              <ToggleCard
                                key={option.value}
                                label={option.label}
                                helper={option.helper}
                                isActive={field.state.value === option.value}
                                onClick={() => field.handleChange(option.value)}
                                onBlur={field.handleBlur}
                              />
                            ))}
                          </div>
                          <FieldError
                            message={getFieldError(
                              field.state.meta,
                              isSubmitted
                            )}
                          />
                        </div>
                      )}
                    </form.Field>

                    <form.Field name="likelyCities">
                      {(field) => (
                        <div className="space-y-3">
                          <Label className="text-base uppercase text-[#7d0f16]">
                            In which cities are you likely to attend UNLSH
                            events?
                          </Label>
                          <div className="grid gap-3">
                            {CITY_OPTIONS.map((city) => {
                              const isActive = field.state.value.includes(
                                city.value
                              );
                              return (
                                <ToggleCard
                                  key={city.value}
                                  label={city.label}
                                  helper={city.description}
                                  isActive={isActive}
                                  onClick={() =>
                                    field.handleChange(
                                      isActive
                                        ? field.state.value.filter(
                                            (val) => val !== city.value
                                          )
                                        : [...field.state.value, city.value]
                                    )
                                  }
                                  onBlur={field.handleBlur}
                                />
                              );
                            })}
                          </div>
                          <FieldError
                            message={getFieldError(
                              field.state.meta,
                              isSubmitted
                            )}
                          />
                        </div>
                      )}
                    </form.Field>

                    <form.Field name="desiredEvents">
                      {(field) => (
                        <div className="space-y-3">
                          <Label className="text-base uppercase text-[#7d0f16]">
                            Which event would you like to attend? (You may
                            select more than one)
                          </Label>
                          <div className="grid gap-3 sm:grid-cols-2">
                            {EVENT_OPTIONS.map((event) => {
                              const isActive = field.state.value.includes(
                                event.value
                              );
                              return (
                                <TogglePill
                                  key={event.value}
                                  label={event.label}
                                  isActive={isActive}
                                  onClick={() =>
                                    field.handleChange(
                                      isActive
                                        ? field.state.value.filter(
                                            (val) => val !== event.value
                                          )
                                        : [...field.state.value, event.value]
                                    )
                                  }
                                  onBlur={field.handleBlur}
                                />
                              );
                            })}
                          </div>
                          <FieldError
                            message={getFieldError(
                              field.state.meta,
                              isSubmitted
                            )}
                          />
                        </div>
                      )}
                    </form.Field>

                    <form.Field name="attendedBefore">
                      {(field) => (
                        <div className="space-y-3">
                          <Label className="text-base uppercase text-[#7d0f16]">
                            Have you attended an event with us before?
                          </Label>
                          <div className="flex flex-wrap gap-3">
                            {ATTENDED_VALUES.map((value) => (
                              <TogglePill
                                key={value}
                                label={value === "yes" ? "Yes" : "No"}
                                isActive={field.state.value === value}
                                onClick={() => field.handleChange(value)}
                                onBlur={field.handleBlur}
                              />
                            ))}
                          </div>
                          <FieldError
                            message={getFieldError(
                              field.state.meta,
                              isSubmitted
                            )}
                          />
                        </div>
                      )}
                    </form.Field>
                  </FormSection>

                  <FormSection
                    title="We Want to Know You Better"
                    description="Your answers help us craft the right rooms, rituals, and pairings."
                  >
                    <form.Field name="memberReferences">
                      {(field) => (
                        <div className="space-y-2">
                          <Label
                            htmlFor="memberReferences"
                            className="text-base uppercase text-[#7d0f16]"
                          >
                            UNLSH Member References (state their name)
                          </Label>
                          <Input
                            id="memberReferences"
                            value={field.state.value}
                            onChange={(event) =>
                              field.handleChange(event.target.value)
                            }
                            onBlur={field.handleBlur}
                            aria-invalid={!!field.state.meta.errors?.length}
                            placeholder="Example: Aya & Rio"
                            className="bg-white"
                          />
                          <FieldError
                            message={getFieldError(
                              field.state.meta,
                              isSubmitted
                            )}
                          />
                        </div>
                      )}
                    </form.Field>
                    {LONG_FORM_FIELDS.map((question) => (
                      <form.Field key={question.name} name={question.name}>
                        {(field) => (
                          <div className="space-y-2">
                            <Label
                              htmlFor={question.name}
                              className="text-base uppercase text-[#7d0f16]"
                            >
                              {question.label}
                            </Label>
                            <Textarea
                              id={question.name}
                              rows={4}
                              value={field.state.value}
                              onChange={(event) =>
                                field.handleChange(event.target.value)
                              }
                              onBlur={field.handleBlur}
                              aria-invalid={!!field.state.meta.errors?.length}
                              placeholder={question.helper}
                              className="bg-white"
                            />
                            <FieldError
                              message={getFieldError(
                                field.state.meta,
                                isSubmitted
                              )}
                            />
                          </div>
                        )}
                      </form.Field>
                    ))}
                  </FormSection>

                  <FormSection
                    title="Applicant Information"
                    description="Let us know how to address you and how to reach you."
                  >
                    <div className="grid gap-4 md:grid-cols-2">
                      <form.Field name="firstName">
                        {(field) => (
                          <FieldInput
                            id="firstName"
                            label="First Name"
                            placeholder="Alter or real name"
                            field={field}
                            isSubmitted={isSubmitted}
                          />
                        )}
                      </form.Field>
                      <form.Field name="lastName">
                        {(field) => (
                          <FieldInput
                            id="lastName"
                            label="Last Name"
                            placeholder="Surname / House"
                            field={field}
                            isSubmitted={isSubmitted}
                          />
                        )}
                      </form.Field>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <form.Field name="email">
                        {(field) => (
                          <FieldInput
                            id="email"
                            type="email"
                            label="Email Address"
                            placeholder="you@email.com"
                            field={field}
                            isSubmitted={isSubmitted}
                          />
                        )}
                      </form.Field>
                      <div className="space-y-2">
                        <Label className="text-base text-[#7d0f16]">
                          WhatsApp / Phone Number
                        </Label>
                        <div className="grid gap-3 md:grid-cols-[180px,1fr]">
                          <form.Field name="whatsappDialCode">
                            {(field) => (
                              <div className="space-y-1">
                                <select
                                  value={field.state.value}
                                  onChange={(event) =>
                                    field.handleChange(event.target.value)
                                  }
                                  onBlur={field.handleBlur}
                                  aria-invalid={
                                    !!field.state.meta.errors?.length
                                  }
                                  className="w-full rounded-xl border border-[#d9b3a3] bg-white px-3 py-2 text-left text-sm text-[#2d0610] md:text-base"
                                >
                                  {countryOptions.map((country) => (
                                    <option
                                      key={country.code}
                                      value={country.dial_code}
                                    >
                                      {country.dial_code} — {country.name}
                                    </option>
                                  ))}
                                </select>
                                <FieldError
                                  message={getFieldError(
                                    field.state.meta,
                                    isSubmitted
                                  )}
                                />
                              </div>
                            )}
                          </form.Field>
                          <form.Field name="whatsapp">
                            {(field) => (
                              <div className="space-y-1">
                                <Input
                                  id="whatsapp"
                                  value={field.state.value}
                                  onChange={(event) =>
                                    field.handleChange(
                                      event.target.value.replace(/[^0-9]/g, "")
                                    )
                                  }
                                  onBlur={field.handleBlur}
                                  placeholder="812xxxxxxx"
                                  aria-invalid={
                                    !!field.state.meta.errors?.length
                                  }
                                  className="bg-white"
                                  inputMode="numeric"
                                  pattern="[0-9]*"
                                />
                                <FieldError
                                  message={getFieldError(
                                    field.state.meta,
                                    isSubmitted
                                  )}
                                />
                              </div>
                            )}
                          </form.Field>
                        </div>
                      </div>
                    </div>
                    <form.Field name="socialHandle">
                      {(field) => (
                        <FieldInput
                          id="socialHandle"
                          label="Your Social Media / Fetlife / Feeld / SDC / RHP Account"
                          placeholder="Paste the link"
                          field={field}
                          isSubmitted={isSubmitted}
                        />
                      )}
                    </form.Field>
                    <form.Field name="ageRange">
                      {(field) => (
                        <div className="space-y-3">
                          <Label className="text-base uppercase text-[#7d0f16]">
                            Your Age?
                          </Label>
                          <div className="flex flex-wrap gap-3">
                            {AGE_OPTIONS.map((option) => (
                              <TogglePill
                                key={option.value}
                                label={option.label}
                                isActive={field.state.value === option.value}
                                onClick={() => field.handleChange(option.value)}
                                onBlur={field.handleBlur}
                              />
                            ))}
                          </div>
                          <FieldError
                            message={getFieldError(
                              field.state.meta,
                              isSubmitted
                            )}
                          />
                        </div>
                      )}
                    </form.Field>
                  </FormSection>

                  <FormSection
                    title="Verification & Agreements"
                    description="We require a clear photo to keep the community safe."
                  >
                    <form.Field name="photos">
                      {(field) => (
                        <div className="space-y-3">
                          <Label className="text-base uppercase text-[#7d0f16]">
                            Are you a real person? Upload up to 5 clear photos
                            (max {MAX_FILE_SIZE_MB}MB each)
                          </Label>
                          <div className="space-y-3">
                            <input
                              ref={photoInputRef}
                              id="photos"
                              type="file"
                              multiple
                              accept="image/*"
                              onChange={(event) => {
                                const files = event.target.files
                                  ? Array.from(event.target.files)
                                  : [];
                                const merged = [
                                  ...field.state.value,
                                  ...files,
                                ].slice(0, MAX_FILES);
                                field.handleChange(merged);
                                event.target.value = "";
                              }}
                              onBlur={field.handleBlur}
                              className="w-full cursor-pointer rounded-xl border border-dashed border-[#c38170] bg-[#fff5ee] px-4 py-6 text-base text-[#7d0f16]"
                            />
                            {field.state.value.length ? (
                              <ul className="space-y-2 text-base text-[#3a0c12]">
                                {field.state.value.map((file, index) => (
                                  <li
                                    key={`${file.name}-${index}`}
                                    className="flex items-center justify-between rounded-xl bg-[#fff5ee] px-4 py-2"
                                  >
                                    <span>
                                      {file.name} •{" "}
                                      {(file.size / 1024 / 1024).toFixed(1)} MB
                                    </span>
                                    <button
                                      type="button"
                                      className="text-[0.7rem] uppercase text-[#7d0f16]"
                                      onClick={() =>
                                        field.handleChange(
                                          field.state.value.filter(
                                            (_, idx) => idx !== index
                                          )
                                        )
                                      }
                                    >
                                      Remove
                                    </button>
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <p className="text-xs text-[#3a0c12]/70">
                                It's important to have a clear pic of your face.
                                No sunglasses, no mask, no heavy filter.
                              </p>
                            )}
                          </div>
                          <FieldError
                            message={getFieldError(
                              field.state.meta,
                              isSubmitted
                            )}
                          />
                        </div>
                      )}
                    </form.Field>

                    <form.Field name="termsAgreed">
                      {(field) => (
                        <div className="space-y-4">
                          <div className="rounded-3xl border border-[#e2c5b5] bg-[#fff5ee] p-5 text-base text-[#3a0c12]">
                            <p>
                              Our mission is to create a safe, fun, and
                              comfortable space for everyone. Ignorance of the
                              rules is not an excuse—read them carefully before
                              you submit.
                            </p>
                            <ul className="mt-4 space-y-2 text-base">
                              <li>
                                (i) Do not disclose identifying information of
                                guests or organizers.
                              </li>
                              <li>
                                (ii) No photography or video recording in all
                                areas.
                              </li>
                              <li>
                                (iii) Treat everyone with respect and notify
                                organizers if you see a non-consensual act.
                              </li>
                              <li>(iv) Absolutely no drugs at the party.</li>
                              <li>
                                (v) Any violation results in immediate removal.
                              </li>
                            </ul>
                          </div>
                          <label className="flex items-start gap-3 text-base text-[#3a0c12]">
                            <input
                              type="checkbox"
                              className="mt-1 size-4 rounded border-[#bb7560] text-[#7d0f16] focus:ring-[#7d0f16]"
                              checked={field.state.value}
                              onChange={(event) =>
                                field.handleChange(event.target.checked)
                              }
                              onBlur={field.handleBlur}
                            />
                            <span className="font-medium">I Agree</span>
                          </label>
                          <FieldError
                            message={getFieldError(
                              field.state.meta,
                              isSubmitted
                            )}
                          />
                        </div>
                      )}
                    </form.Field>
                  </FormSection>

                  {status ? (
                    <p
                      className={cn(
                        "rounded-2xl px-4 py-3 text-base",
                        status.type === "success"
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-red-50 text-red-700"
                      )}
                    >
                      {status.message}
                    </p>
                  ) : null}

                  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <p className="text-base uppercase text-[#7d0f16]">
                      Submit when every field feels true to you
                    </p>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full justify-center bg-[#7d0f16] text-white hover:bg-[#52090e] md:w-auto"
                    >
                      {isSubmitting ? "Sending..." : "Submit Application"}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

async function submitToSheets(values: ParsedFormValues) {
  const scriptURL = import.meta.env.VITE_SCRIPT_URL;
  if (!scriptURL) {
    throw new Error(
      "Missing VITE_SCRIPT_URL. Please configure the Google Apps Script endpoint."
    );
  }

  const formData = new FormData();

  formData.append(
    "applyingAs",
    mapLabel(APPLYING_AS_OPTIONS, values.applyingAs)
  );
  values.likelyCities.forEach((city) =>
    formData.append("likelyCities", mapLabel(CITY_OPTIONS, city))
  );
  values.desiredEvents.forEach((event) =>
    formData.append("desiredEvents", mapLabel(EVENT_OPTIONS, event))
  );
  formData.append(
    "attendedBefore",
    values.attendedBefore === "yes" ? "Yes" : "No"
  );
  formData.append("memberReferences", values.memberReferences);
  formData.append("turnOns", values.turnOns);
  formData.append("playPartyExperience", values.playPartyExperience);
  formData.append("motivation", values.motivation);
  formData.append("consentPerspective", values.consentPerspective);
  formData.append("firstName", values.firstName);
  formData.append("lastName", values.lastName);
  formData.append("email", values.email);
  const dialCode = values.whatsappDialCode || DEFAULT_DIAL_CODE;
  formData.append("whatsapp", `${dialCode} ${values.whatsapp}`.trim());
  formData.append("socialHandle", values.socialHandle);
  formData.append("ageRange", mapLabel(AGE_OPTIONS, values.ageRange));
  formData.append("termsAgreed", values.termsAgreed ? "I Agree" : "");

  const uploadedPhotoLinks = values.photos.length
    ? await Promise.all(values.photos.map((file) => uploadPhoto(file)))
    : [];
  formData.append("photoLinks", JSON.stringify(uploadedPhotoLinks));

  const response = await fetch(scriptURL, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to submit form. Please try again.");
  }

  const result = await response.json();
  console.log("Apps Script Response:", result);
  console.log("Debug Info:", result.debug);
}

async function uploadPhoto(file: File): Promise<string> {
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

function mapLabel<T extends { value: string; label: string }>(
  options: readonly T[],
  value: string
) {
  return options.find((option) => option.value === value)?.label ?? value;
}

interface ToggleProps {
  label: string;
  helper?: string;
  isActive: boolean;
  onClick: () => void;
  onBlur?: () => void;
}

const ToggleCard = ({
  label,
  helper,
  isActive,
  onClick,
  onBlur,
}: ToggleProps) => (
  <button
    type="button"
    onClick={onClick}
    onBlur={onBlur}
    aria-pressed={isActive}
    className={cn(
      "rounded-2xl border px-5 py-4 text-left transition",
      isActive
        ? "border-[#7d0f16] bg-[#7d0f16]/10 shadow-[0_20px_45px_rgba(125,15,22,0.25)]"
        : "border-[#e2c5b5] bg-white/60 hover:border-[#bb7560] hover:bg-white"
    )}
  >
    <span className="text-base uppercase text-[#7d0f16]">{label}</span>
    {helper ? (
      <p className="mt-2 text-base text-[#3a0c12]/85">{helper}</p>
    ) : null}
  </button>
);

const TogglePill = ({ label, isActive, onClick, onBlur }: ToggleProps) => (
  <button
    type="button"
    onClick={onClick}
    onBlur={onBlur}
    aria-pressed={isActive}
    className={cn(
      "rounded-full border px-5 py-2 text-base uppercase transition",
      isActive
        ? "border-[#7d0f16] bg-[#7d0f16] text-white"
        : "border-[#d9b3a3] bg-white text-[#7d0f16] hover:border-[#7d0f16]/70"
    )}
  >
    {label}
  </button>
);

interface FormSectionProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

const FormSection = ({ title, description, children }: FormSectionProps) => (
  <section className="space-y-4">
    <header>
      <p className="text-base uppercase text-[#bb7560]">{title}</p>
      <p className="mt-1.5 text-base text-[#3a0c12]/80">{description}</p>
    </header>
    <div className="space-y-5">{children}</div>
  </section>
);

const FieldError = ({ message }: { message?: string }) =>
  message ? <p className="text-xs text-[#b4231f]">{message}</p> : null;

interface FieldInputProps {
  id: string;
  label: string;
  placeholder?: string;
  type?: string;
  field: any;
  isSubmitted: boolean;
}

const FieldInput = ({
  id,
  label,
  placeholder,
  type = "text",
  field,
  isSubmitted,
}: FieldInputProps) => (
  <div className="space-y-2">
    <Label htmlFor={id} className="text-base text-[#7d0f16]">
      {label}
    </Label>
    <Input
      id={id}
      type={type}
      value={field.state.value}
      onChange={(event) => field.handleChange(event.target.value)}
      onBlur={field.handleBlur}
      placeholder={placeholder}
      aria-invalid={!!field.state.meta.errors?.length}
      className="bg-white"
    />
    <FieldError message={getFieldError(field.state.meta, isSubmitted)} />
  </div>
);

function getFieldError(meta: any, isSubmitted: boolean) {
  if (!meta || !meta.errors?.length) {
    return undefined;
  }

  const firstError = normalizeError(meta.errors[0]);
  if (meta.isTouched) {
    return firstError;
  }
  if (isSubmitted) {
    return firstError;
  }

  return undefined;
}

function normalizeError(error: unknown): string | undefined {
  if (!error) return undefined;
  if (typeof error === "string") return error;
  if (
    typeof error === "object" &&
    "message" in (error as Record<string, unknown>) &&
    typeof (error as Record<string, unknown>).message === "string"
  ) {
    return (error as { message: string }).message;
  }
  try {
    return JSON.stringify(error);
  } catch {
    return String(error);
  }
}

export default FormPage;
