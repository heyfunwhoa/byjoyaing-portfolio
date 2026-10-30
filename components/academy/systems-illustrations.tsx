/**
 * Static editorial illustrations inspired by devl's Webhook Relay, Server Rack
 * and Shield Lock concepts. Original SVG markup; no upstream code or assets copied.
 * See docs/design/component-adoption.md for source review and scope.
 */
function WebhookScene() {
  return (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 480 200" className="h-auto w-full">
      <path d="M92 100H178M234 100C290 100 290 42 354 42M234 100H354M234 100C290 100 290 158 354 158"
        className="fill-none stroke-accent" strokeWidth="2" />
      <path d="M345 42l9 0-6-5m6 63-6-5m6 63-6-5" className="fill-none stroke-accent" strokeWidth="2" />
      <rect x="28" y="68" width="64" height="64" rx="16" className="fill-card stroke-border" />
      <path d="M47 88h26v24H47zm4 6h18m-18 6h13" className="fill-none stroke-foreground" strokeWidth="2" />
      <rect x="178" y="72" width="56" height="56" rx="18" className="fill-accent" />
      <path d="M193 92h26m-26 8h26m-26 8h18" className="fill-none stroke-accent-foreground" strokeWidth="2" />
      {[18,76,134].map((y, index) => (
        <g key={y}>
          <rect x="354" y={y} width="92" height="48" rx="12" className="fill-card stroke-border" />
          <circle cx="375" cy={y+24} r="8" className="fill-none stroke-accent" strokeWidth="2" />
          {index === 1
            ? <path d={`M375 ${y+19}v6l4 2`} className="fill-none stroke-accent" strokeWidth="2" />
            : <path d={`M371 ${y+24}l3 3 5-6`} className="fill-none stroke-accent" strokeWidth="2" />}
          <path d={`M393 ${y+21}h35m-35 7h23`} className="fill-none stroke-border" strokeWidth="2" />
        </g>
      ))}
      <path d="M326 126c-12 26-45 33-65 10m0 0h12m-12 0v12" className="fill-none stroke-accent" strokeWidth="2" strokeDasharray="4 5" />
      <rect x="121" y="94" width="18" height="12" rx="3" className="fill-accent" />
    </svg>
  );
}

function ServerScene() {
  return (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 280 180" className="mx-auto h-auto w-full max-w-72">
      <ellipse cx="140" cy="155" rx="82" ry="12" className="fill-background" />
      <rect x="65" y="19" width="150" height="132" rx="16" className="fill-background stroke-border" />
      {[32,69,106].map(y => (
        <g key={y}>
          <rect x="77" y={y} width="126" height="31" rx="8" className="fill-card stroke-border" />
          <circle cx="94" cy={y+15} r="4" className="fill-accent" />
          <path d={`M108 ${y+11}h48m-48 8h32m33-11v13m6-13v13m6-13v13`} className="fill-none stroke-muted" strokeWidth="2" />
        </g>
      ))}
      <path d="M116 151v13m48-13v13" className="stroke-foreground" strokeWidth="3" />
    </svg>
  );
}

function AccessScene() {
  return (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 280 180" className="mx-auto h-auto w-full max-w-72">
      <path d="M140 19l65 25v43c0 35-26 58-65 76-39-18-65-41-65-76V44z" className="fill-background stroke-accent" strokeWidth="2" />
      <path d="M140 30l54 21v36c0 28-20 48-54 64-34-16-54-36-54-64V51z" className="fill-none stroke-border" />
      <rect x="114" y="77" width="52" height="42" rx="10" className="fill-accent" />
      <path d="M125 77V64a15 15 0 0130 0v13" className="fill-none stroke-foreground" strokeWidth="4" />
      <circle cx="140" cy="94" r="4" className="fill-accent-foreground" />
      <path d="M140 97v9" className="stroke-accent-foreground" strokeWidth="3" />
    </svg>
  );
}

export function SystemsIllustrations() {
  return (
    <section aria-labelledby="systems-illustrations-title" className="mt-12">
      <p className="text-sm font-medium text-accent">Three visual starting points</p>
      <h2 id="systems-illustrations-title" className="mt-2 font-display text-2xl font-semibold sm:text-3xl">
        Make the invisible parts easier to understand.
      </h2>
      <p className="mt-3 max-w-3xl text-sm leading-6 text-muted">
        Illustrative examples, not live infrastructure or security results. Start here before exploring the planned modules below.
      </p>
      <div className="mt-6 grid min-w-0 gap-4 lg:grid-cols-2">
        <figure className="min-w-0 rounded-2xl border border-border bg-surface-sage p-5 sm:p-6 lg:col-span-2">
          <div className="grid items-center gap-6 md:grid-cols-2">
            <div className="min-w-0"><WebhookScene /></div>
            <figcaption className="min-w-0">
              <p className="text-xs font-medium text-accent">01 / Webhook delivery</p>
              <h3 className="mt-2 text-xl font-semibold">One event. Several destinations.</h3>
              <p className="mt-3 text-sm leading-6 text-muted">
                A source reports a change. A relay forwards it to several receivers. In this illustration, two receivers acknowledge it and one needs another attempt.
              </p>
              <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-6">
                <li>Send the event to the intended endpoint.</li>
                <li>If delivery fails, wait before a limited retry.</li>
                <li>Use an event ID to avoid doing the same work twice.</li>
              </ol>
              <p className="mt-4 text-xs leading-5 text-muted">
                An acknowledgment confirms receipt, not that every downstream task finished. Retries can still fail and need review.
              </p>
            </figcaption>
          </div>
        </figure>
        <figure className="min-w-0 rounded-2xl border border-border bg-card p-5 sm:p-6">
          <ServerScene />
          <figcaption>
            <p className="text-xs font-medium text-accent">02 / Infrastructure</p>
            <h3 className="mt-2 text-xl font-semibold">Give each part a clear job.</h3>
            <p className="mt-3 text-sm leading-6 text-muted">
              An API receives requests, a worker handles background jobs, and a database stores records. These roles can share infrastructure or run separately.
            </p>
            <p className="mt-3 text-xs leading-5 text-muted">
              The rack is a visual metaphor. It does not imply that each role needs its own physical server.
            </p>
          </figcaption>
        </figure>
        <figure className="min-w-0 rounded-2xl border border-border bg-card p-5 sm:p-6">
          <AccessScene />
          <figcaption>
            <p className="text-xs font-medium text-accent">03 / Access checks</p>
            <h3 className="mt-2 text-xl font-semibold">Identity first. Permission next.</h3>
            <p className="mt-3 text-sm leading-6 text-muted">
              Authentication checks who is making a request. Authorization checks whether that identity can perform this action on this record.
            </p>
            <p className="mt-3 text-xs leading-5 text-muted">
              A lock icon is not evidence of protection. The application must enforce the checks on the server.
            </p>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
