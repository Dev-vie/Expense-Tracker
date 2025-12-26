export const dynamic = "force-static";

export default function RulesPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-2xl font-semibold tracking-tight">Rules</h1>
      <p className="mt-3 text-muted-foreground">
        Community and usage guidelines to keep things friendly and productive.
      </p>
      <div className="mt-6 space-y-4">
        <p>- Be respectful and constructive when sharing feedback.</p>
        <p>- Use the app responsibly; avoid sharing sensitive credentials.</p>
        <p>- Report issues or bugs via the social links in the footer.</p>
      </div>
    </div>
  );
}
