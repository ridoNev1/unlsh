import { LoginForm } from "@/sections/admin/login-form";

export default function LoginPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#120104] text-white">
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1b0508] via-transparent to-[#3a0c12]" />
        <div className="absolute -left-32 top-10 h-96 w-96 rounded-full bg-[#ff6f61]/20 blur-3xl" />
        <div className="absolute -right-32 bottom-0 h-[28rem] w-[28rem] rounded-full bg-[#ffd7c9]/20 blur-[140px]" />
      </div>

      <div className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col justify-center gap-12 px-6 py-16 md:px-8 lg:px-12">
        <header className="space-y-4 text-center">
          <p className="text-xs uppercase tracking-[0.6em] text-[#ffb5a4]">
            Member Console
          </p>
          <h1 className="font-bo text-4xl uppercase leading-tight md:text-5xl">
            UNLSH Concierge Login
          </h1>
          <p className="mx-auto max-w-2xl text-sm text-white/70 md:text-base">
            Masuk untuk mengelola konten Value Cards, Basic Etiquette, FAQ, dan
            jadwal acara. Hanya staf UNLSH yang memiliki akses ke halaman ini.
          </p>
        </header>

        <div className="mx-auto w-full max-w-4xl">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
