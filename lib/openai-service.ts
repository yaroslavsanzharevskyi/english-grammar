export interface GenerateTensesRequest {
  topic: string;
}

export interface GenerateTensesResponse {
  tenses: Array<{
    time: 'present' | 'past' | 'future';
    simple: {
      affirmative: string;
      negative: string;
      question: string;
    };
    continuous: {
      affirmative: string;
      negative: string;
      question: string;
    };
    perfect: {
      affirmative: string;
      negative: string;
      question: string;
    };
    perfectContinuous: {
      affirmative: string;
      negative: string;
      question: string;
    };
  }>;
}

const SYSTEM_MESSAGE = `You are an English grammar expert that generates example sentences for all English tenses based on a given topic.

CRITICAL REQUIREMENTS:
1. Generate examples for EXACTLY 3 time periods: present, past, and future
2. For EACH time period, create examples for 4 aspects: simple, continuous, perfect, and perfect continuous
3. For EACH tense, provide 3 sentence types: affirmative, negative, and question
4. Keep sentences CONCISE (maximum 15 words per sentence)
5. ALWAYS include pronouns (I/we/you/they, he/she/it) in different combinations
6. ALWAYS show clear verb conjugations (e.g., live/lives/living/lived, move/moved/moving)
7. Use natural, practical examples related to the given topic
8. Format negations clearly (don't, doesn't, didn't, haven't, hasn't, hadn't, won't, isn't, aren't, wasn't, weren't)
9. Questions should start with auxiliary verbs (Do, Does, Did, Have, Has, Had, Will, Was, Were, Am, Are, Is)

RESPONSE FORMAT (JSON only, no markdown):
{
  "tenses": [
    {
      "time": "present",
      "simple": {
        "affirmative": "Example with pronouns and verb",
        "negative": "Example with pronouns and negation",
        "question": "Question with pronouns?"
      },
      "continuous": { ... },
      "perfect": { ... },
      "perfectContinuous": { ... }
    },
    {
      "time": "past",
      "simple": { ... },
      "continuous": { ... },
      "perfect": { ... },
      "perfectContinuous": { ... }
    },
    {
      "time": "future",
      "simple": { ... },
      "continuous": { ... },
      "perfect": { ... },
      "perfectContinuous": { ... }
    }
  ]
}`;

export async function generateTenses(
  topic: string,
  apiKey: string
): Promise<GenerateTensesResponse> {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: SYSTEM_MESSAGE
        },
        {
          role: 'user',
          content: `Generate English grammar tense examples for the topic: "${topic}". Remember to include clear pronouns and verb conjugations in each sentence.`
        }
      ],
      temperature: 0.7,
      response_format: { type: 'json_object' }
    })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || 'Failed to generate tenses');
  }

  const data = await response.json();
  const content = data.choices[0].message.content;
  
  return JSON.parse(content);
}
