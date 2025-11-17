import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import EtiquetteLeft from "@/assets/etiquette-left.jpg";
import { apiRequest } from "@/sections/admin/api-client";
import { setAuthSession } from "@/sections/admin/auth-storage";
import { useAdminAuth } from "@/sections/admin/auth-context";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const navigate = useNavigate();
  const { refreshSession } = useAdminAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await apiRequest<{ token: string; user: { id: string; email: string; role: string } }>(
        "/api/auth/login",
        {
          method: "POST",
          body: JSON.stringify({ email, password }),
        }
      );

      setAuthSession(response.token, response.user);
      refreshSession();
      toast.success("Berhasil masuk sebagai admin.");
      navigate("/admin-dashboard", { replace: true });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Gagal masuk.";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden border-white/10 bg-[#1b0508]/95 text-white shadow-[0_45px_140px_rgba(0,0,0,0.55)]">
        <CardContent className="grid p-0 md:grid-cols-[1.1fr_0.9fr]">
          <form className="flex flex-col gap-6 p-6 md:p-10" onSubmit={handleSubmit}>
            <FieldGroup className="space-y-5">
              <div className="space-y-2 text-center md:text-left">
                <p className="text-xs uppercase tracking-[0.55em] text-[#ffb5a4]">
                  Concierge Access
                </p>
                <h2 className="font-bo text-3xl uppercase leading-tight text-white">
                  Welcome back, Angel
                </h2>
                <p className="text-sm text-white/70">
                  Masuk untuk mengurus Value Cards, Basic Etiquette, FAQ, dan
                  permintaan RSVP komunitas.
                </p>
              </div>

              <Field>
                <FieldLabel htmlFor="email" className="text-white">
                  Email
                </FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="concierge@unlsh.society"
                  className="border-white/15 bg-[#120104] text-white placeholder-white/50"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password" className="text-white">
                    Password
                  </FieldLabel>
                  <a
                    href="#"
                    className="ml-auto text-xs uppercase tracking-[0.3em] text-white/70 hover:text-white"
                  >
                    Forgot?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  className="border-white/15 bg-[#120104] text-white placeholder-white/40"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
              </Field>

              <Field>
                <Button
                  type="submit"
                  className="w-full justify-center bg-[#ff6f61] text-white hover:bg-[#ff3f43]"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Memproses..." : "Masuk"}
                </Button>
              </Field>
            </FieldGroup>
          </form>

          <div className="relative hidden min-h-full md:block">
            <img
              src={EtiquetteLeft}
              alt="UNLSH gathering"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-[#120104]/50 via-transparent to-[#120104]" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-sm text-white/80">
              “Intake, curation, dan aftercare dijaga manual untuk memastikan
              standar intim UNLSH.”
            </div>
          </div>
        </CardContent>
      </Card>
      <FieldDescription className="text-center text-white/70">
        Dengan melanjutkan, Anda menyetujui {" "}
        <a className="underline decoration-dotted" href="#">
          Terms of Service
        </a>{" "}
        & {" "}
        <a className="underline decoration-dotted" href="#">
          Privacy Policy
        </a>
        .
      </FieldDescription>
    </div>
  );
}
