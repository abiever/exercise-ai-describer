import React, { useState } from "react";

export default function Dashboard() {
  const [exerciseDescription, setExerciseDescription] = useState("");

  const [exerciseName, setExcerciseName] = useState("");
  const [clientele, setClientele] = useState("");
  const [keyWords, setKeyWords] = useState("");
  const [tone, setTone] = useState("");
  const [numWords, setNumWords] = useState("");

  const [isGenerating, setIsGenerating] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(exerciseDescription);
    setIsCopied(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsGenerating(true);
    const res = await fetch("/api/returnExerciseDescription", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        exerciseName,
        clientele,
        keyWords,
        tone,
        numWords,
      }),
    });
    setIsGenerating(false);
    const data = await res.json();
    setExerciseDescription(data.exerciseDescription.trim());
  };

  return (
    <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid gap-y-12 md:grid-cols-2 md:gap-x-12 ">
        <div className="">
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="flex flex-col">
              <label className="sr-only" htmlFor="ExerciseName">
                Exercise Name
              </label>
              <input
                type="text"
                className="block w-full rounded-md bg-stone-900 border border-gray-400 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm px-4 py-2 placeholder-gray-400 my-2 text-white"
                name="ExerciseName"
                placeholder="Exercise Name"
                id="ExerciseName"
                value={exerciseName}
                onChange={(e) => setExcerciseName(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="clientele" className="sr-only">
                Clientele
              </label>
              <input
                value={clientele}
                onChange={(e) => setClientele(e.target.value)}
                className="block w-full rounded-md bg-stone-900 border border-gray-400 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm px-4 py-2 placeholder-gray-400 my-2 text-white"
                placeholder="Clientele/Audience (Optional)"
                type="text"
                name="clientele"
                id="clientele"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="keywords" className="sr-only">
                SEO Keywords for AI (Optional)
              </label>
              <textarea
                rows={7}
                value={keyWords}
                onChange={(e) => setKeyWords(e.target.value)}
                name="keyWords"
                id="keyWords"
                placeholder="SEO Keywords for AI (Optional)"
                className="block w-full rounded-md bg-stone-900 border border-gray-400 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm px-4 py-2 placeholder-gray-400 my-2 text-white"
              />
            </div>
            <div className="flex flex-col">
              <label className="sr-only" htmlFor="tone">
                Tone
              </label>

              <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="block w-full rounded-md bg-stone-900 border border-gray-400 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm px-4 py-2 placeholder-gray-400 my-2 text-white"
                name="tone"
                id="tone"
              >
                <option value="default">Select Tone (Optional)</option>
                <option value="casual">Casual</option>
                <option value="friendly">Friendly</option>
                <option value="professional">Professional</option>
                <option value="meathead">Meathead</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label htmlFor="words" className="sr-only">
                Number of Words (Optional)
              </label>
              <input
                value={numWords}
                onChange={(e) => setNumWords(e.target.value)}
                type="number"
                className="block w-full rounded-md bg-stone-900 border border-gray-400 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm px-4 py-2 placeholder-gray-400 my-2 text-white"
                placeholder="Number Of Words - Default 200 (Optional)"
                name="words"
                id="words"
              />
            </div>

            <button
              className={`bg-amber-500 w-full hover:bg-amber-600 text-white font-bold mt-6 py-2 px-4 rounded
                ${
                  isGenerating || exerciseName === ""
                    ? "cursor-not-allowed opacity-50"
                    : ""
                }`}
              type="submit"
              disabled={isGenerating || exerciseName === ""}
            >
              {isGenerating ? "Generating..." : "Generate Exercise Description"}
            </button>
          </form>
        </div>
        <div className="">
          <div className="flex flex-col">
            <label htmlFor="output" className="sr-only">
              Output
            </label>
            <textarea
              rows={
                exerciseDescription === ""
                  ? 7
                  : exerciseDescription.split("\\n").length + 12
              }
              name="output"
              onChange={(e) => setExerciseDescription(e.target.value)}
              value={exerciseDescription}
              disabled={exerciseDescription === ""}
              id="output"
              placeholder="AI Generated Exercise Description"
              className="block w-full rounded-md bg-stone-900 border border-gray-400 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm px-4 py-2 placeholder-gray-400 my-2 text-white"
            />
            <button
              onClick={handleCopy}
              className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded"
              type="submit"
              disabled={exerciseDescription === ""}
            >
              {isCopied ? "Copied" : "Copy to Clipboard"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}