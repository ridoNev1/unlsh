import { useEffect, useMemo, useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { AppSidebar } from "@/sections/admin/app-sidebar";
import {
  ADMIN_SECTIONS,
  ADMIN_SIDEBAR_GROUPS,
} from "@/sections/admin/admin-sections";
import {
  useAdminContentStore,
  type AdminCollectionKey,
} from "@/sections/admin/content-store";
import "@/index.css";

const DEFAULT_SECTION: AdminCollectionKey = ADMIN_SECTIONS[0]?.id ?? "faqs";

const AdminPage = () => {
  const [activeSectionId, setActiveSectionId] =
    useState<AdminCollectionKey>(DEFAULT_SECTION);
  const fetchCollections = useAdminContentStore(
    (state) => state.fetchCollections
  );
  const isBootstrapped = useAdminContentStore((state) => state.isBootstrapped);
  const isLoading = useAdminContentStore((state) => state.isLoading);
  const error = useAdminContentStore((state) => state.error);

  useEffect(() => {
    if (!isBootstrapped && !isLoading) {
      void fetchCollections();
    }
  }, [isBootstrapped, isLoading, fetchCollections]);

  const ActiveSection = useMemo(() => {
    const match = ADMIN_SECTIONS.find(
      (section) => section.id === activeSectionId
    );
    return match ?? ADMIN_SECTIONS[0];
  }, [activeSectionId]);

  return (
    <section className="min-h-screen bg-[#120104] font-avenir text-white">
      <SidebarProvider
        style={
          {
            "--sidebar-width": "calc(var(--spacing) * 72)",
            "--header-height": "calc(var(--spacing) * 12)",
          } as React.CSSProperties
        }
      >
        <AppSidebar
          groups={ADMIN_SIDEBAR_GROUPS}
          activeItemId={activeSectionId}
          onItemSelect={(itemId) =>
            setActiveSectionId(itemId as AdminCollectionKey)
          }
        />
        <SidebarInset className="bg-[#120104]">
          <header className="flex h-16 items-center gap-2 border-b border-white/5 bg-[#1b0508] px-4">
            <SidebarTrigger className="-ml-1 text-white" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4 bg-white/20"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink className="text-white/70" href="#">
                    Content System
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-white">
                    {ActiveSection.title}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </header>

          <main className="space-y-8 px-6 py-8 bg-[#120104]">
            {error ? (
              <div className="rounded-2xl border border-red-400/40 bg-red-500/10 p-4 text-red-100">
                <p className="text-sm font-semibold">Gagal memuat data</p>
                <p className="text-sm text-red-100/80">{error}</p>
                <Button
                  type="button"
                  variant="outline"
                  className="mt-3 border-white/20 text-white"
                  onClick={() => fetchCollections()}
                >
                  Coba Lagi
                </Button>
              </div>
            ) : null}

            {!isBootstrapped && isLoading ? (
              <div className="rounded-3xl border border-white/20 bg-white/5 p-6 text-center text-white/70">
                Memuat konten awal...
              </div>
            ) : null}

            {ActiveSection ? <ActiveSection.render /> : null}
          </main>
        </SidebarInset>
      </SidebarProvider>
    </section>
  );
};

export default AdminPage;
