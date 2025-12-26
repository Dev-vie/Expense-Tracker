export const dynamic = "force-static";

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-2xl font-semibold tracking-tight">Privacy Policy</h1>
      <p className="mt-3 text-muted-foreground">
        Your privacy matters. This app stores your data securely in Supabase and
        does not sell or share personal information.
      </p>
      <div className="mt-6 space-y-4">
        <p>
          - Data: Expenses and profile information are stored in your account
          database.
        </p>
        <p>
          - Cookies/Sessions: Used only for authentication and session
          management.
        </p>
        <p>
          - Contact: Use the social links to reach out for questions or removal
          requests.
        </p>
      </div>
    </div>
  );
}
