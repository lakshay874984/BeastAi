import { Check, Copy, ExternalLink, FileCode2, X } from 'lucide-react'
import React from 'react'
import { useState } from 'react'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
function MessageBubble({ role, content, images, artifacts = [] }) {
  const isUser = role === "user"
  const [lightBox, setLightBox] = useState(null)
  const [copiedCode, setCopiedCode] = useState("")

  const copyCode = async (code) => {
    await navigator.clipboard.writeText(code)
    setCopiedCode(code)
    setTimeout(() => {
      setCopiedCode("")
    }, 2000)
  }


  return (
    <div className={`beast-message flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div className={`w-fit max-w-[92vw] md:max-w-[72%]
  px-4 py-2.5 rounded-2xl
  break-words overflow-hidden
  leading-relaxed
        ${isUser
          ? "bg-gradient-to-br from-red-700 to-red-900 text-white rounded-tr-sm"
          : " text-slate-200 rounded-tl-sm"
        }`}>

        {artifacts?.length > 0 && (
          <div className='mb-4 rounded-xl border border-white/10 bg-[#111318] p-3'>
            <div className='flex items-center justify-between gap-2'>
              <div>
                <div className='text-[10px] uppercase tracking-[0.24em] text-slate-400'>Generated Output</div>
                <div className='text-sm font-semibold text-slate-100'>
                  {artifacts[0]?.title || 'Project files'}
                </div>
              </div>
              <div className='rounded-full bg-emerald-500/10 px-2 py-1 text-[11px] text-emerald-300'>
                {artifacts[0]?.files?.length || 0} files
              </div>
            </div>

            <div className='mt-3 flex flex-wrap gap-2'>
              {artifacts[0]?.files?.map((file, index) => (
                <span key={`${file?.name || index}-${index}`} className='rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-slate-300'>
                  {file?.name}
                </span>
              ))}
            </div>

            {artifacts[0]?.files?.[0] && (
              <div className='mt-3 overflow-hidden rounded-lg border border-white/10 bg-[#0d1117]'>
                <div className='flex items-center gap-2 border-b border-white/10 px-3 py-2 text-[11px] uppercase tracking-[0.2em] text-slate-400'>
                  <FileCode2 size={13} />
                  {artifacts[0].files[0].name}
                </div>
                <pre className='max-h-56 overflow-auto whitespace-pre-wrap break-words px-3 py-3 text-[12px] leading-6 text-slate-300'>
                  {artifacts[0].files[0].content}
                </pre>
              </div>
            )}
          </div>
        )}

        {images?.length > 0 && (
          <div className='flex flex-wrap gap-3 mt-4'>
            {images.map((img, i) => (
              <img
                key={i}
                src={img}
                onClick={() => setLightBox(img)}
                loading="lazy"
                onError={(e) => e.currentTarget.remove()}
                className="w-40 h-28 rounded-xl object-cover border border-white/10 cursor-zoom-in hover:opacity-90 transition"

              />
            ))}
          </div>
        )}


          <Markdown
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({ children }) => (
              <h1 className='text-2xl font-bold mt-5 mb-3'>{children}</h1>
            ),
            h2: ({ children }) => (
              <h2 className='text-xl font-semibold mt-4 mb-2'>{children}</h2>
            ),
            h3: ({ children }) => (
              <h3 className='text-lg font-semibold mt-3 mb-2'>{children}</h3>
            ),
            p: ({ children }) => (
              <p className='mb-3 whitespace-pre-wrap break-words'>{children}</p>
            ),
            ul: ({ children }) => (
              <ul className='list-disc pl-5 space-y-1 my-2'>{children}</ul>
            ),
            ol: ({ children }) => (
              <ol className='list-decimal pl-5 space-y-1 my-2'>{children}</ol>
            ),
            table: ({ children }) => (
              <div className='overflow-x-auto my-4'>
                <table className='min-w-full border border-white/10'>
                  {children}
                </table>
              </div>
            ),
            th: ({ children }) => (

              <th className='border border-white/10 bg-white/5 px-3 py-2 text-left'>
                {children}
              </th>

            ),
            td: ({ children }) => (

              <td className='border border-white/10 px-3 py-2'>
                {children}
              </td>

            ),

            a: ({ href, children }) => (

              <a href={href}
                target="_blank"
                rel="noreferrer"
                className="text-red-400 underline inline-flex items-center gap-1"
              >
                {children}
                <ExternalLink size={14} />
              </a>

            ),
            code: ({ className, children }) => {
              const value = String(children).trim()
              

              if (!className) {
                return (
                  <code className='px-1.5 py-0.5 rounded bg-white/10 text-red-200'>
                    {value}
                  </code>
                )

              }

              const language = className.replace("language-", "")

              return (
                <div className='my-4 overflow-hidden rounded-xl border border-white/10 bg-[#111318]'>
                  <div className='flex items-center justify-between bg-[#1b1d24] border-b border-white/10 px-4 py-2'>
                    <span className='uppercase text-xs text-slate-400'>
                      {language}
                    </span>
                    <button className='flex items-center gap-1 text-xs' 
                    onClick={() => copyCode(value)}>
                      {
                        copiedCode == value ?
                          <>
                            <Check size={14}/>
                            Copied
                          </> :
                          <><Copy size={14} />Copy</>
                      }
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
              )
            },
          img:({src})=>{
            if(!src)return null;
            return (
              <img
                src={src}
                onClick={() => setLightBox(src)}
                loading="lazy"
                onError={(e) => e.currentTarget.remove()}
                className="w-40 h-28 rounded-xl object-cover border border-white/10 cursor-zoom-in hover:opacity-90 transition"
              />
            )
          }





          }}
        >
          {content}
        </Markdown>




      </div>
      {lightBox &&
        <div className='fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6'>
          <button
            className='absolute top-5 right-5 text-white/80 hover:text-white bg-white/10 rounded-full p-2'
            onClick={() => setLightBox(null)}
          >
            <X />
          </button>
          <img
            src={lightBox}
            className="max-w-[90vw] max-h-[85vh] rounded-2xl border border-white/10 shadow-2xl object-contain"

          />

        </div>}
    </div>
  )
}

export default MessageBubble
