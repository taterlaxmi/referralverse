export async function generateWithAI(promptText, expectJson = true) {
    const geminiKey = process.env.GEMINI_API_KEY;
    const groqKey = process.env.GROQ_API_KEY;

    if (!geminiKey && !groqKey) {
        throw new Error("Missing both GEMINI_API_KEY and GROQ_API_KEY in environment.");
    }

    let extractedData = null;
    let success = false;

    // 1. Attempt Gemini 2.0 Flash
    if (geminiKey) {
        try {
            console.log("🤖 Attempting generation with Gemini 2.0 Flash...");
            const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${geminiKey}`;
            const body = {
                contents: [{ parts: [{ text: promptText }] }]
            };
            if (expectJson) {
                body.generationConfig = { responseMimeType: "application/json" };
            }
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });

            if (response.ok) {
                const data = await response.json();
                const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
                extractedData = expectJson ? JSON.parse(rawText || "{}") : rawText;
                console.log(`✅ Success with Gemini!`);
                success = true;
            } else {
                console.warn(`⚠️ Gemini failed with status ${response.status}.`);
            }
        } catch (e) {
            console.warn(`❌ Gemini error: ${e.message}`);
        }
    }

    // 2. Fallback to Groq
    if (!success && groqKey) {
        try {
            console.log("🤖 Attempting fallback to Groq (Llama-3)...");
            const messages = [{ role: 'user', content: promptText }];
            if (expectJson) {
                messages[0].content += "\nReturn ONLY valid JSON array or object.";
            }

            const body = {
                model: 'llama-3.3-70b-versatile',
                messages: messages
            };
            if (expectJson) {
                body.response_format = { type: 'json_object' };
            }

            const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${groqKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });

            if (response.ok) {
                const data = await response.json();
                const content = data.choices?.[0]?.message?.content || "";
                extractedData = expectJson ? JSON.parse(content || "{}") : content;
                console.log(`✅ Success with Groq!`);
                success = true;
            } else {
                console.warn(`⚠️ Groq failed with status ${response.status}.`);
            }
        } catch (e) {
            console.warn(`❌ Groq error: ${e.message}`);
        }
    }

    if (!success) {
        throw new Error("Both AI extraction methods failed. Please check your API keys and quotas.");
    }

    return extractedData;
}
