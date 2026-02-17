import { useState, useEffect, useCallback } from "react";

const MAX_GUESSES = 5;

const KEYBOARD_ROWS = [
  ["Q","W","E","R","T","Y","U","I","O","P"],
  ["A","S","D","F","G","H","J","K","L"],
  ["ENTER","Z","X","C","V","B","N","M","⌫"],
];

// Large fallback word bank — 5 letters only
const FALLBACK_WORDS = [
  "react","debug","array","build","style","clone","merge","fetch","async","await",
  "class","state","props","hooks","query","model","logic","chart","proxy","event",
  "frame","stack","layer","route","store","cache","token","login","modal","theme",
  "world","light","brave","crisp","storm","flame","track","globe","plant","grace",
  "pixel","sonic","ultra","vivid","waltz","scout","spark","surge","swift","sword",
  "table","tower","water","weave","worth","write","yield","zebra","stone","blade",
  "orbit","flair","grind","heist","kneel","mango","ozone","pouch","quirk","rebel",
  "snack","taunt","viper","windy","frost","glare","inbox","joker","karma","lemon",
  "maple","nerve","olive","panic","quake","risky","salsa","talon","abbey","blaze",
  "crane","exert","gloom","haste","irony","joust","knack","lunar","maxim","optic",
  "plumb","quill","rusty","shiny","trove","venom","extra","youth","zippy","acute",
  "flame","flare","flint","flock","flood","floor","flora","floss","flour","flown",
  "fluff","fluke","flung","flunk","flute","birch","bison","black","bland","blank",
  "blare","blast","blaze","bleak","bleed","blend","bless","blimp","blind","bliss",
];

async function fetchRandomWord() {
  const controllers = [new AbortController(), new AbortController()];
  const timeout = (ctrl) => setTimeout(() => ctrl.abort(), 4000);

  // Try primary API — request 5-letter words specifically
  try {
    const t1 = timeout(controllers[0]);
    const res = await fetch("https://random-word-api.herokuapp.com/word?number=10&length=5", {
      signal: controllers[0].signal,
    });
    clearTimeout(t1);
    if (res.ok) {
      const data = await res.json();
      const word = data.find((w) => w.length === 5);
      if (word) return word.toUpperCase();
    }
  } catch {}

  // Try secondary API
  try {
    const t2 = timeout(controllers[1]);
    const res = await fetch("https://random-word-api.vercel.app/api?words=10&length=5", {
      signal: controllers[1].signal,
    });
    clearTimeout(t2);
    if (res.ok) {
      const data = await res.json();
      const word = data.find((w) => w.length === 5);
      if (word) return word.toUpperCase();
    }
  } catch {}

  // Fallback to built-in 5-letter list
  return FALLBACK_WORDS[Math.floor(Math.random() * FALLBACK_WORDS.length)].toUpperCase();
}

function evaluateGuess(guess, target) {
  const result = Array(guess.length).fill("absent");
  const targetArr = target.split("");
  const guessArr = guess.split("");

  guessArr.forEach((ch, i) => {
    if (ch === targetArr[i]) {
      result[i] = "correct";
      targetArr[i] = null;
    }
  });

  guessArr.forEach((ch, i) => {
    if (result[i] === "correct") return;
    const ti = targetArr.indexOf(ch);
    if (ti !== -1) {
      result[i] = "present";
      targetArr[ti] = null;
    }
  });

  return result;
}

function getTileStyle(status, revealed, isFirst) {
  if (isFirst) return "bg-amber-400 dark:bg-accent-500 border-2 border-amber-400 dark:border-accent-500 text-white font-extrabold";
  if (!revealed) return "bg-gray-50 dark:bg-base-800 border-2 border-gray-600 dark:border-base-600 text-gray-900 dark:text-text-primary";
  if (status === "correct") return "bg-emerald-500 border-2 border-emerald-500 text-white";
  if (status === "present") return "bg-amber-400 dark:bg-amber-500 border-2 border-amber-400 dark:border-amber-500 text-white";
  return "bg-gray-500 dark:bg-base-600 border-2 border-gray-500 dark:border-base-600 text-white";
}

function getKeyStyle(letter, letterStates) {
  const state = letterStates[letter];
  if (state === "correct") return "bg-emerald-500 text-white border-emerald-500";
  if (state === "present") return "bg-amber-400 text-white border-amber-400";
  if (state === "absent") return "bg-gray-500 dark:bg-base-600 text-white border-gray-500 dark:border-base-600";
  return "bg-gray-200 dark:bg-base-700 text-gray-800 dark:text-text-primary border-gray-300 dark:border-base-600 hover:border-amber-400 dark:hover:border-accent-500";
}

export default function WordleSection() {
  const [target, setTarget] = useState("");
  const [loading, setLoading] = useState(true);
  const [guesses, setGuesses] = useState([]);
  const [current, setCurrent] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const [shake, setShake] = useState(false);
  const [letterStates, setLetterStates] = useState({});

  const loadWord = async () => {
    setLoading(true);
    try {
      const word = await fetchRandomWord();
      setTarget(word);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadWord(); }, []);

  const wordLen = target.length;

  const submitGuess = useCallback(() => {
    if (!target || current.length !== wordLen) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }

    const result = evaluateGuess(current, target);
    const newGuesses = [...guesses, { word: current, result }];
    setGuesses(newGuesses);
    setCurrent("");

    const newStates = { ...letterStates };
    current.split("").forEach((ch, i) => {
      const prev = newStates[ch];
      if (prev === "correct") return;
      if (result[i] === "correct") { newStates[ch] = "correct"; return; }
      if (prev === "present") return;
      newStates[ch] = result[i];
    });
    setLetterStates(newStates);

    if (current === target) { setWon(true); setGameOver(true); }
    else if (newGuesses.length >= MAX_GUESSES) { setGameOver(true); }
  }, [current, guesses, letterStates, target, wordLen]);

  const handleKey = useCallback((key) => {
    if (gameOver || !target) return;
    if (key === "ENTER") { submitGuess(); return; }
    if (key === "⌫" || key === "BACKSPACE") { setCurrent((c) => c.slice(0, -1)); return; }
    if (/^[A-Z]$/.test(key) && current.length < wordLen) setCurrent((c) => c + key);
  }, [gameOver, current, wordLen, submitGuess, target]);

  useEffect(() => {
    const onKey = (e) => handleKey(e.key.toUpperCase());
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handleKey]);

  const resetGame = () => {
    setGuesses([]);
    setCurrent("");
    setGameOver(false);
    setWon(false);
    setLetterStates({});
    setShake(false);
    loadWord();
  };

  // Build grid rows — first row is the "hint" row (first letter + blanks)
  const guessRows = [
    ...guesses,
    ...(!gameOver && guesses.length < MAX_GUESSES
      ? [{ word: current.padEnd(wordLen, " "), result: null, active: true }]
      : []),
    ...Array(Math.max(0, MAX_GUESSES - guesses.length - (gameOver ? 0 : 1))).fill(
      { word: " ".repeat(wordLen), result: null }
    ),
  ].slice(0, MAX_GUESSES);

  return (
    <section id="wordle" className="relative z-10 py-16 sm:py-24 px-4 sm:px-6 bg-gray-100/60 dark:bg-transparent transition-colors duration-300">
      <div className="max-w-lg mx-auto flex flex-col items-center gap-6 sm:gap-8 bg-white dark:bg-transparent border border-gray-200 dark:border-transparent rounded-2xl p-5 sm:p-8 shadow-sm dark:shadow-none transition-colors duration-300">

        {/* Header */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="h-px w-10 bg-amber-500 dark:bg-accent-500" />
            <span className="text-amber-600 dark:text-accent-500 text-sm font-medium tracking-widest uppercase">
              Mini Game
            </span>
            <span className="h-px w-10 bg-amber-500 dark:bg-accent-500" />
          </div>
          <h2
            className="text-4xl font-bold text-gray-900 dark:text-text-primary"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Wordle
          </h2>
          <p className="text-gray-500 dark:text-text-secondary text-sm mt-2">
            The first letter is revealed — guess the 5-letter word in {MAX_GUESSES} tries
          </p>
        </div>

        {loading ? (
          /* Loading state */
          <div className="flex flex-col items-center gap-3 py-12 text-gray-400 dark:text-text-muted">
            <svg className="animate-spin w-8 h-8 text-amber-500 dark:text-accent-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
            </svg>
            <span className="text-sm">Fetching a word...</span>
          </div>
        ) : (
          <>
            {/* Hint row — first letter + length */}
            <div className="flex flex-col items-center gap-2">
              <p className="text-xs text-gray-400 dark:text-text-muted tracking-widest uppercase mb-1">Your hint</p>
              <div className="flex gap-2">
                {Array.from({ length: wordLen }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-lg text-base sm:text-lg font-bold uppercase
                      ${i === 0
                        ? "bg-amber-400 dark:bg-accent-500 border-2 border-amber-400 dark:border-accent-500 text-white"
                        : "bg-transparent border-b-2 border-gray-400 dark:border-base-500 text-transparent"
                      }`}
                  >
                    {i === 0 ? target[0] : "_"}
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-400 dark:text-text-muted mt-1">5 letters</p>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-gray-200 dark:bg-base-700" />

            {/* Guess Grid */}
            <div className="flex flex-col gap-2">
              {guessRows.map((row, ri) => (
                <div
                  key={ri}
                  className={`flex gap-2 ${row.active && shake ? "animate-[shake_0.4s_ease]" : ""}`}
                >
                  {Array.from({ length: wordLen }).map((_, ci) => {
                    const ch = row.word[ci]?.trim() || "";
                    const status = row.result ? row.result[ci] : null;
                    const revealed = !!row.result;
                    const isCurrent = row.active && ci < current.length;

                    return (
                      <div
                        key={ci}
                        className={`w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-lg font-bold text-base sm:text-lg uppercase transition-all duration-300
                          ${getTileStyle(status, revealed, false)}
                          ${isCurrent ? "scale-105 border-amber-400 dark:border-accent-500" : ""}
                          ${ch && !revealed ? "border-gray-600 dark:border-base-400" : ""}
                        `}
                        style={{ transitionDelay: revealed ? `${ci * 80}ms` : "0ms" }}
                      >
                        {ch}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>

            {/* Game over message */}
            {gameOver && (
              <div className={`w-full text-center py-3 px-4 rounded-xl border font-semibold text-sm
                ${won
                  ? "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-300 dark:border-emerald-700 text-emerald-700 dark:text-emerald-400"
                  : "bg-red-50 dark:bg-red-900/20 border-red-300 dark:border-red-700 text-red-700 dark:text-red-400"
                }`}
              >
                {won ? `🎉 You got it in ${guesses.length}!` : `The word was "${target}"`}
              </div>
            )}

            {/* On-screen Keyboard */}
            <div className="flex flex-col items-center gap-1 sm:gap-1.5 w-full">
              {KEYBOARD_ROWS.map((row, ri) => (
                <div key={ri} className="flex gap-1 sm:gap-1.5 justify-center">
                  {row.map((key) => (
                    <button
                      key={key}
                      onClick={() => handleKey(key)}
                      className={`h-12 sm:h-12 rounded-lg border font-bold uppercase tracking-wide transition-all duration-150 active:scale-95
                        ${key === "ENTER" || key === "⌫"
                          ? "px-1.5 sm:px-3 min-w-[40px] sm:min-w-[52px] text-[9px] sm:text-xs"
                          : "w-7 sm:w-9 text-xs"}
                        ${getKeyStyle(key, letterStates)}
                      `}
                    >
                      {key}
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </>
        )}

        {/* New Game */}
        {!loading && (
          <button
            onClick={resetGame}
            className="px-6 py-2.5 rounded-lg border border-gray-300 dark:border-base-600 text-gray-500 dark:text-text-secondary hover:text-amber-500 dark:hover:text-accent-500 hover:border-amber-400 dark:hover:border-accent-500 text-sm font-medium transition-all duration-200"
          >
            New Word
          </button>
        )}
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-6px); }
          40% { transform: translateX(6px); }
          60% { transform: translateX(-4px); }
          80% { transform: translateX(4px); }
        }
      `}</style>
    </section>
  );
}