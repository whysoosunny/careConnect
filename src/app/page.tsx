import { Hero } from "@/components/Hero";
import { Tabs } from "@/components/Tabs";

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />

      <section className="mx-auto w-full max-w-3xl px-4 pb-16">
        <div className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/5 sm:p-7">
          <Tabs />
        </div>
      </section>

      <footer className="border-t border-black/10 dark:border-white/10">
        <div className="mx-auto max-w-3xl px-4 py-6 text-center text-xs text-foreground/50">
          <p>
            CareConnect brings patient support requests, volunteer registration, and
            helpful information together in one place.
          </p>
          <p className="mt-1">
            Demonstration project. Use sample data only. CareBot provides information,
            not medical advice.
          </p>
        </div>
      </footer>
    </main>
  );
}

