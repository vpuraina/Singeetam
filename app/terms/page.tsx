export const metadata = { title: "Terms & Conditions — Singeetam" };

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-14 text-muted">
      <h1 className="brand-word text-3xl font-bold">Terms &amp; Conditions</h1>
      <p className="mt-2 text-sm">Last updated: [add date when you publish this]</p>

      <div className="mt-8 flex flex-col gap-6 leading-relaxed">
        <section>
          <h2 className="text-lg font-semibold text-white">1. Your account</h2>
          <p>
            You&apos;re responsible for the activity on your Singeetam account and for keeping
            your login credentials secure. You must be old enough to legally use this service in
            your country to sign up.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white">2. Uploaded content</h2>
          <p>
            When you upload a track, you confirm you own the rights to it or have permission to
            share it. You keep ownership of what you upload, but you grant Singeetam a license to
            store, stream, and display it to other users through the app. Don&apos;t upload
            content you don&apos;t have the rights to distribute.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white">3. Acceptable use</h2>
          <p>
            No uploading of copyrighted material you don&apos;t own, no illegal content, no
            harassment, and no attempting to abuse or overload the platform. We may remove content
            or suspend accounts that violate this.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white">4. Premium subscriptions</h2>
          <p>
            Premium unlocks additional features described on the Premium page. Subscriptions
            renew automatically until cancelled; you can cancel any time from your account
            settings, and access continues until the end of the current billing period.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white">5. Changes to these terms</h2>
          <p>
            We may update these terms as the product changes. Meaningful changes will be
            communicated in-app before they take effect.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white">6. Contact</h2>
          <p>Questions about these terms? Reach out at [your support email].</p>
        </section>
      </div>
    </div>
  );
}
