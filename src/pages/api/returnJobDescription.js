const generateDescription = async ({
    exerciseName,
    clientele,
    keyWords,
    tone,
    numWords,
  }) => {
    try {
      const response = await fetch(
        "https://api.openai.com/v1/engines/text-davinci-003/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          },
          //update the template literal below to be for your exercise description prompt
          body: JSON.stringify({
            prompt: `Write a detailed description for the fitness exercise called ${exerciseName} 
            ${clientele ? `catering towards an audience of ${clientele} clientele` : ""} that is around ${
              numWords || 200
            } words in a ${tone || "neutral"} tone. ${
              keyWords ? `Incorporate the following keywords: ${keyWords}.` : ""
            }. The description should be written in a way that is SEO friendly, highlighting its unique uses and benefits.`,
            max_tokens: 100,
            temperature: 0.5,
          }),
        }
      );
      const data = await response.json();
  
      return data.choices[0].text;
    } catch (err) {
      console.error(err);
    }
  };
  
  export default async function handler(req, res) {
    const { exerciseName, clientele, keyWords, tone, numWords } = req.body;
  
    const jobDescription = await generateDescription({
      exerciseName,
      clientele,
      keyWords,
      tone,
      numWords,
    });
  
    res.status(200).json({
      jobDescription,
    });
  }