export const dynamic = "force-static";

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-2xl font-semibold tracking-tight">About</h1>
      <p className="mt-3 text-muted-foreground">
        This Expense Tracker helps you record, categorize, and analyze your
        expenses with a clean, modern interface.
      </p>
      <div className="mt-6 space-y-4">
        <p>
          Built with Next.js, Supabase, and Tailwind CSS, the app focuses on a
          delightful user experience and practical features.
        </p>
        <p>
          Feedback is welcome—reach out through the social links in the footer.
        </p>
      </div>
    </div>
  );
}
