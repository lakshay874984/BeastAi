     <Markdown
  remarkPlugins={[remarkGfm]}
  components={{
  h1 : ({ children }) => (
    <h1 className="text-2xl font-bold mt-6 mb-3 pb-2 border-b border-white/10 tracking-tight text-slate-50">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-xl font-semibold mt-5 mb-2 tracking-tight text-slate-100">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-lg font-semibold mt-4 mb-2 text-slate-200">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="mb-3 leading-relaxed whitespace-pre-wrap break-words text-slate-200">
      {children}
    </p>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-slate-50">{children}</strong>
  ),
  em: ({ children }) => (
    <em className="italic text-slate-300">{children}</em>
  ),
  ul: ({ children }) => (
    <ul className="list-disc pl-5 space-y-1.5 my-3 marker:text-amber-400/70">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal pl-5 space-y-1.5 my-3 marker:text-amber-400/70 marker:font-medium">
      {children}
    </ol>
  ),
  li: ({ children }) => (
    <li className="text-slate-200 leading-relaxed">{children}</li>
  ),
  hr: () => <hr className="my-6 border-t border-white/10" />,
  blockquote: ({ children }) => (
    <blockquote className="my-4 pl-4 border-l-2 border-amber-400/50 text-slate-400 italic">
      {children}
    </blockquote>
  ),
  table: ({ children }) => (
    <div className="overflow-x-auto my-4 rounded-lg border border-white/10">
      <table className="min-w-full border-collapse text-sm">{children}</table>
    </div>
  ),
  thead: ({ children }) => <thead className="bg-white/[0.04]">{children}</thead>,
  th: ({ children }) => (
    <th className="border-b border-white/10 px-3 py-2.5 text-left font-semibold text-slate-100 text-xs uppercase tracking-wide">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="border-b border-white/5 px-3 py-2.5 text-slate-300">
      {children}
    </td>
  ),
  tbody: ({ children }) => (
    <tbody>{children}</tbody>
),
  a: ({ href, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="text-amber-400 hover:text-amber-300 underline decoration-amber-400/30 hover:decoration-amber-300/60 underline-offset-2 transition-colors inline-flex items-center gap-1"
    >
      {children}
      <ExternalLink size={14} className="opacity-70" />
    </a>
  ),
  code: ({ className, children }) => {
    const value = String(children).trim();

    if (!className) {
      return (
        <code className="px-1.5 py-0.5 rounded-md bg-amber-400/10 text-amber-200 text-[0.9em] font-mono border border-amber-400/10">
          {value}
        </code>
      );
    }

    const language = className.replace("language-", "");

    return (
      <div className="my-4 overflow-hidden rounded-xl border border-white/10 bg-[#111318] shadow-lg shadow-black/20">
        <div className="flex items-center justify-between bg-[#1b1d24] border-b border-white/10 px-4 py-2">
          <span className="uppercase text-[11px] font-medium tracking-wider text-slate-400">
            {language}
          </span>
          <button
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-amber-300 transition-colors"
            onClick={() => copyCode(value)}
          >
            {copiedCode === value ? (
              <>
                <Check size={14} className="text-emerald-400" />
                <span className="text-emerald-400">Copied</span>
              </>
            ) : (
              <>
                <Copy size={14} />
                Copy
              </>
            )}
          </button>
        </div>

        <SyntaxHighlighter
          language={language}
          style={oneDark}
          wrapLongLines
          showLineNumbers
          customStyle={{
            margin: 0,
            padding: "16px",
            background: "#0d1117",
            fontSize: "13px",
          }}
        >
          {value}
        </SyntaxHighlighter>
      </div>
    );
  },
  img: ({ src }) => {
    if (!src) return null;
    return (
      <img
        src={src}
        onClick={() => setLightBox(src)}
        loading="lazy"
        onError={(e) => e.currentTarget.remove()}
        className="w-40 h-28 rounded-xl object-cover border border-white/10 cursor-zoom-in hover:border-amber-400/40 hover:opacity-90 transition-all"
      />
    );
  },
}}

>
  {content}
</Markdown>