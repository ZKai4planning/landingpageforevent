export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#05070d] px-4 py-16 text-white sm:px-6 sm:py-20">
      <div className="mx-auto max-w-4xl rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 sm:p-8 lg:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.34em] text-blue-200/75">
          Terms And Conditions
        </p>
        <h1 className="mt-4 text-3xl font-bold sm:text-4xl">
          Website Terms
        </h1>
        <p className="mt-6 text-sm leading-relaxed text-white/75 sm:text-base">
          By submitting your details through this website, you confirm that the
          information you provide is accurate and that you consent to being
          contacted by Ai4Planning regarding your enquiry.
        </p>
        <p className="mt-4 text-sm leading-relaxed text-white/75 sm:text-base">
          Your submitted details may be stored securely for the purpose of
          responding to your request, arranging follow-up communication, and
          providing services related to planning, renovation, or construction
          support.
        </p>
        <p className="mt-4 text-sm leading-relaxed text-white/75 sm:text-base">
          Ai4Planning reserves the right to update these terms at any time. If
          you do not agree with these terms, please do not submit your personal
          information through the form.
        </p>
      </div>
    </main>
  );
}
