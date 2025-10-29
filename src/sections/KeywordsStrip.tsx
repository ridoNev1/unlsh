const KEYWORDS = ["Drink", "Dance", "Dine", "Connect", "Play", "Explore"];

const KeywordsStrip = () => {
  return (
    <div className="bg-black">
      <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-5 px-6 py-5 text-[13px] uppercase tracking-[0.6em] text-white">
        {KEYWORDS.map((word, index) => (
          <div key={word} className="flex items-center gap-4">
            <span>{word}</span>
            {index !== KEYWORDS.length - 1 && (
              <span className="text-white">&bull;</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default KeywordsStrip;
