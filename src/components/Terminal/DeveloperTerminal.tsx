import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Terminal as TerminalIcon } from 'lucide-react';
import { projectsData } from '../../data/projects';
import { skillsData } from '../../data/skills';
import { siteConfig } from '../../data/siteConfig';
import { useLanguage } from '../../hooks/useLanguage';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface TerminalLine {
  id: number;
  type: 'input' | 'output' | 'error';
  lines: { text: string; url?: string }[];
}

const COMMANDS = ['help', 'about', 'skills', 'projects', 'contact', 'clear'] as const;

export function DeveloperTerminal() {
  const { lang, t } = useLanguage();
  const prefersReduced = useReducedMotion();
  const [input, setInput] = useState('');
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [entries, setEntries] = useState<TerminalLine[]>([
    {
      id: 1,
      type: 'output',
      lines: [{ text: t.terminal.welcome }],
    },
  ]);

  const scrollBoxRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const nextId = useRef(2);

  useEffect(() => {
    if (scrollBoxRef.current) {
      scrollBoxRef.current.scrollTop = scrollBoxRef.current.scrollHeight;
    }
  }, [entries]);

  const appendTypedOutput = (lines: { text: string; url?: string }[], type: 'output' | 'error' = 'output') => {
    const entryId = nextId.current++;
    if (prefersReduced || lines.length <= 1) {
      setEntries((prev) => [...prev, { id: entryId, type, lines }]);
      return;
    }

    // Progressive line reveal for realistic terminal typing feel
    setEntries((prev) => [...prev, { id: entryId, type, lines: [lines[0]] }]);
    lines.slice(1).forEach((line, idx) => {
      window.setTimeout(() => {
        setEntries((prev) =>
          prev.map((item) =>
            item.id === entryId ? { ...item, lines: [...item.lines, line] } : item,
          ),
        );
      }, (idx + 1) * 55);
    });
  };

  const executeCommand = (rawCmd: string) => {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    const inputEntryId = nextId.current++;
    setEntries((prev) => [
      ...prev,
      { id: inputEntryId, type: 'input', lines: [{ text: cmd }] },
    ]);
    setCmdHistory((prev) => [cmd, ...prev]);
    setHistoryIndex(-1);

    if (cmd === 'clear') {
      setEntries([]);
      return;
    }

    if (cmd === 'help') {
      appendTypedOutput([
        { text: lang === 'uz' ? 'Mavjud buyruqlar:' : 'Available commands:' },
        { text: '  help      — ' + (lang === 'uz' ? "Buyruqlar ro'yxati" : 'Show available commands') },
        { text: '  about     — ' + (lang === 'uz' ? 'Dasturchi haqida' : 'Developer profile') },
        { text: '  skills    — ' + (lang === 'uz' ? 'Texnologiyalar steki' : 'Technical stack') },
        { text: '  projects  — ' + (lang === 'uz' ? 'Portfel loyihalari' : 'Portfolio projects') },
        { text: '  contact   — ' + (lang === 'uz' ? "Bog'lanish ma'lumotlari" : 'Contact channels') },
        { text: '  clear     — ' + (lang === 'uz' ? 'Terminalni tozalash' : 'Clear terminal output') },
      ]);
      return;
    }

    if (cmd === 'about') {
      appendTypedOutput([
        { text: "Ne'matov Islomjon" },
        { text: 'Full-Stack Developer' },
        { text: 'Frontend & Backend Development.' },
        { text: siteConfig.owner.slogan },
      ]);
      return;
    }

    if (cmd === 'skills') {
      appendTypedOutput(
        skillsData.map((s) => ({
          text: `${s.name.padEnd(12, ' ')} [${s.category.toUpperCase()}]`,
        })),
      );
      return;
    }

    if (cmd === 'projects') {
      appendTypedOutput(
        projectsData.map((p) => ({
          text: `${p.index}. ${p.name} — ${p.url}`,
          url: p.url,
        })),
      );
      return;
    }

    if (cmd === 'contact') {
      const configuredSocials = siteConfig.socialLinks.filter((s) => Boolean(s.url));
      const output: { text: string; url?: string }[] = [
        {
          text:
            lang === 'uz'
              ? "Bog'lanish bo'limiga o'tish uchun #contact ga tushing."
              : 'Scroll to #contact to send a message via the contact form.',
        },
      ];
      if (siteConfig.contactEmail) {
        output.push({ text: `Email: ${siteConfig.contactEmail}` });
      }
      if (configuredSocials.length > 0) {
        configuredSocials.forEach((s) => {
          output.push({ text: `${s.label}: ${s.url}`, url: s.url || undefined });
        });
      } else {
        output.push({
          text:
            lang === 'uz'
              ? 'Ijtimoiy havolalar src/data/siteConfig.ts faylida sozlanadi.'
              : 'Social links can be configured in src/data/siteConfig.ts.',
        });
      }
      appendTypedOutput(output);
      return;
    }

    appendTypedOutput([{ text: `${cmd}: ${t.terminal.unknown}` }], 'error');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeCommand(input);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdHistory.length === 0) return;
      const nextIdx = Math.min(historyIndex + 1, cmdHistory.length - 1);
      setHistoryIndex(nextIdx);
      setInput(cmdHistory[nextIdx]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex <= 0) {
        setHistoryIndex(-1);
        setInput('');
      } else {
        const nextIdx = historyIndex - 1;
        setHistoryIndex(nextIdx);
        setInput(cmdHistory[nextIdx]);
      }
    }
  };

  return (
    <section id="terminal" className="relative bg-[#080808] py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10"
        >
          <p className="font-mono text-xs font-medium tracking-[0.2em] text-[#FF5A1F]">
            {t.terminal.kicker}
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {t.terminal.title}
          </h2>
          <p className="mt-3 text-sm text-[#A3A3A3] sm:text-base">{t.terminal.subtitle}</p>
        </motion.div>

        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          onClick={() => inputRef.current?.focus()}
          className="metallic-card overflow-hidden rounded-2xl"
        >
          {/* Terminal Window Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-[#141414] px-4 py-3 sm:px-6">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5" aria-hidden="true">
                <span className="h-3 w-3 rounded-full bg-[#FF2B1C]" />
                <span className="h-3 w-3 rounded-full bg-[#FF7A24]" />
                <span className="h-3 w-3 rounded-full bg-white/25" />
              </div>
              <div className="flex items-center gap-2 font-mono text-xs text-[#A3A3A3]">
                <TerminalIcon className="h-3.5 w-3.5 text-[#FF5A1F]" />
                <span>islomjon@portfolio: ~</span>
              </div>
            </div>

            {/* Quick Command Buttons */}
            <div className="flex flex-wrap items-center gap-1.5">
              {COMMANDS.map((cmd) => (
                <button
                  key={cmd}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    executeCommand(cmd);
                    inputRef.current?.focus();
                  }}
                  className="rounded-md border border-white/10 bg-[#0B0B0B] px-2.5 py-1 font-mono text-[11px] text-[#A3A3A3] transition-colors hover:border-[#FF2B1C]/60 hover:text-white"
                >
                  {cmd}
                </button>
              ))}
            </div>
          </div>

          {/* Terminal Output & Prompt */}
          <div
            ref={scrollBoxRef}
            className="h-80 overflow-y-auto bg-[#090909] p-5 font-mono text-xs leading-relaxed sm:h-96 sm:p-6 sm:text-sm"
          >
            <div className="space-y-3">
              {entries.map((entry) => (
                <div key={entry.id} className="space-y-1">
                  {entry.type === 'input' ? (
                    <div className="flex items-center gap-2 text-white">
                      <span className="text-[#FF2B1C]">&gt;</span>
                      <span>{entry.lines[0]?.text}</span>
                    </div>
                  ) : (
                    entry.lines.map((line, idx) => (
                      <div
                        key={idx}
                        className={`whitespace-pre-wrap break-all sm:break-words ${
                          entry.type === 'error' ? 'text-[#FF5A1F]' : 'text-[#D4D4D4]'
                        }`}
                      >
                        {line.url ? (
                          <a
                            href={line.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="underline decoration-[#FF2B1C]/60 underline-offset-4 hover:text-[#FF7A24]"
                          >
                            {line.text}
                          </a>
                        ) : (
                          line.text
                        )}
                      </div>
                    ))
                  )}
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="mt-4 flex items-center gap-2">
              <label htmlFor="terminal-command-input" className="text-[#FF2B1C] shrink-0">
                &gt;
              </label>
              <input
                id="terminal-command-input"
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={t.terminal.placeholder}
                autoComplete="off"
                spellCheck={false}
                className="w-full bg-transparent text-white placeholder-[#525252] focus:outline-none"
              />
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
