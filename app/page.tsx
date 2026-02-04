'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { tensesGridData, TenseExample, TenseGrid } from '@/lib/tenses-data';
import { generateTenses } from '@/lib/openai-service';
import { SkeletonLoader } from '@/components/skeleton-loader';

const highlightText = (text: string, bgColor: string) => {
  // Define pronouns and common verb patterns to highlight
  const pronouns = ['I/we/you/they', 'He/she/it', 'I/he/she/we/you/they', 'I/we/you/they/he/she/it', 'I/we/you/they/he/she', 'We/they/you', 'I/he/she/it', 'They', 'She', 'I', 'we/you/they', 'he/she/it', 'I/they/we/you', 'She/he/it', 'I/he/she/we/you/they'];
  
  // Determine contrast color based on background
  const getContrastColor = () => {
    if (bgColor.includes('green')) return 'text-emerald-900 font-bold';
    if (bgColor.includes('red')) return 'text-rose-900 font-bold';
    return 'text-amber-900 font-bold';
  };
  
  const getVerbColor = () => {
    if (bgColor.includes('green')) return 'text-teal-800 font-semibold underline decoration-2';
    if (bgColor.includes('red')) return 'text-red-900 font-semibold underline decoration-2';
    return 'text-orange-800 font-semibold underline decoration-2';
  };
  
  const pronounColor = getContrastColor();
  const verbColor = getVerbColor();
  
  // Split by spaces and process each word
  let result = text;
  
  // Highlight pronouns first
  pronouns.forEach(pronoun => {
    const regex = new RegExp(`(${pronoun.replace(/\//g, '\\/')})`, 'g');
    result = result.replace(regex, `<span class="${pronounColor}">$1</span>`);
  });
  
  // Highlight common verbs and their forms
  const verbs = ['live', 'lives', 'living', 'lived', 'move', 'moved', 'moving', 'was', 'were', 'am', 'are', 'is', 'did', 'do', 'does', 'have', 'has', 'had', 'been', 'will', 'be'];
  verbs.forEach(verb => {
    const regex = new RegExp(`\\b(${verb})\\b`, 'gi');
    result = result.replace(regex, `<span class="${verbColor}">$1</span>`);
  });
  
  // Handle "not" and contractions
  const negations = ["don't", "doesn't", "didn't", "not", "won't", "haven't", "hasn't", "hadn't", "isn't", "aren't", "wasn't", "weren't"];
  negations.forEach(neg => {
    const regex = new RegExp(`\\b(${neg.replace("'", "\'")})\\b`, 'gi');
    result = result.replace(regex, `<span class="${verbColor}">$1</span>`);
  });
  
  return result;
};

const TenseCell = ({ tense, isLoading }: { tense?: TenseExample; isLoading?: boolean }) => {
  if (isLoading) {
    return <SkeletonLoader />;
  }

  if (!tense) return null;

  return (
    <div className="flex flex-col h-full gap-2 p-2">
      {/* Positive */}
      <div className="bg-green-200 p-4 flex items-center justify-center min-h-[120px]">
        <div 
          className="text-sm text-gray-800 leading-relaxed text-center"
          dangerouslySetInnerHTML={{ __html: highlightText(tense.affirmative, 'green') }}
        />
      </div>
      
      {/* Negative */}
      <div className="bg-red-200 p-4 flex items-center justify-center min-h-[120px]">
        <div 
          className="text-sm text-gray-800 leading-relaxed text-center"
          dangerouslySetInnerHTML={{ __html: highlightText(tense.negative, 'red') }}
        />
      </div>
      
      {/* Question */}
      <div className="bg-yellow-200 p-4 flex items-center justify-center min-h-[120px]">
        <div 
          className="text-sm text-gray-800 leading-relaxed text-center"
          dangerouslySetInnerHTML={{ __html: highlightText(tense.question, 'yellow') }}
        />
      </div>
    </div>
  );
};

export default function Home() {
  const t = useTranslations();
  const [topic, setTopic] = useState('living in New-York');
  const [currentTopic, setCurrentTopic] = useState('living in New-York');
  const [isLoading, setIsLoading] = useState(false);
  const [tensesData, setTensesData] = useState<TenseGrid[]>(tensesGridData);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim() || isLoading) return;

    setIsLoading(true);
    setError(null);

    try {
      const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
      
      if (!apiKey || apiKey === 'your_openai_api_key_here') {
        throw new Error('OpenAI API key not configured. Please set NEXT_PUBLIC_OPENAI_API_KEY in .env.local');
      }

      const response = await generateTenses(topic, apiKey);
      
      // Transform the response to match our TenseGrid structure
      const transformedData: TenseGrid[] = response.tenses.map((tenseData) => ({
        time: tenseData.time,
        simple: {
          tenseKey: `${tenseData.time}Simple`,
          affirmative: tenseData.simple.affirmative,
          negative: tenseData.simple.negative,
          question: tenseData.simple.question
        },
        continuous: {
          tenseKey: `${tenseData.time}Continuous`,
          affirmative: tenseData.continuous.affirmative,
          negative: tenseData.continuous.negative,
          question: tenseData.continuous.question
        },
        perfect: {
          tenseKey: `${tenseData.time}Perfect`,
          affirmative: tenseData.perfect.affirmative,
          negative: tenseData.perfect.negative,
          question: tenseData.perfect.question
        },
        perfectContinuous: {
          tenseKey: `${tenseData.time}PerfectContinuous`,
          affirmative: tenseData.perfectContinuous.affirmative,
          negative: tenseData.perfectContinuous.negative,
          question: tenseData.perfectContinuous.question
        }
      }));

      setTensesData(transformedData);
      setCurrentTopic(topic);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate examples');
      console.error('Error generating tenses:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t('title')}
          </h1>
          <p className="text-lg text-gray-600">
            {t('subtitle')}
          </p>
        </div>

        {/* Topic Input Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="flex-1 w-full">
              <label htmlFor="topic" className="block text-sm font-semibold text-gray-700 mb-2">
                Enter a topic for grammar examples:
              </label>
              <input
                id="topic"
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g., ordering coffee, paying bills, booking a hotel..."
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                disabled={isLoading}
              />
            </div>
            <button
              type="submit"
              disabled={isLoading || !topic.trim()}
              className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors sm:mt-7"
            >
              {isLoading ? 'Generating...' : 'Generate'}
            </button>
          </form>
          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}
          {currentTopic && !error && (
            <div className="mt-4 text-sm text-gray-600">
              Current topic: <span className="font-semibold text-indigo-600">{currentTopic}</span>
            </div>
          )}
        </div>

        {/* Grid Container */}
        <div className="bg-white rounded-lg shadow-xl overflow-hidden p-4">
          {/* Grid: 3 rows (Past/Present/Future) x 4 columns (Simple/Continuous/Perfect/Perfect Continuous) */}
          <div className="flex flex-col gap-4">
            {/* Header Row */}
            <div className="grid grid-cols-5 gap-4">
              <div className="bg-transparent"></div>
              <div className="bg-gray-300 text-gray-800 font-bold p-4 flex items-center justify-center text-center uppercase rounded">
                Simple
              </div>
              <div className="bg-gray-300 text-gray-800 font-bold p-4 flex items-center justify-center text-center uppercase rounded">
                Continuous
              </div>
              <div className="bg-gray-300 text-gray-800 font-bold p-4 flex items-center justify-center text-center uppercase rounded">
                Perfect
              </div>
              <div className="bg-gray-300 text-gray-800 font-bold p-4 flex items-center justify-center text-center uppercase rounded">
                Perfect Continuous
              </div>
            </div>

            {/* Past Row */}
            <div className="grid grid-cols-5 gap-4">
              <div className="bg-gray-100 text-gray-800 font-bold p-4 flex items-center justify-center rounded">
                Past
              </div>
              <TenseCell tense={tensesData[1]?.simple} isLoading={isLoading} />
              <TenseCell tense={tensesData[1]?.continuous} isLoading={isLoading} />
              <TenseCell tense={tensesData[1]?.perfect} isLoading={isLoading} />
              <TenseCell tense={tensesData[1]?.perfectContinuous} isLoading={isLoading} />
            </div>

            {/* Present Row */}
            <div className="grid grid-cols-5 gap-4">
              <div className="bg-gray-100 text-gray-800 font-bold p-4 flex items-center justify-center rounded">
                Present
              </div>
              <TenseCell tense={tensesData[0]?.simple} isLoading={isLoading} />
              <TenseCell tense={tensesData[0]?.continuous} isLoading={isLoading} />
              <TenseCell tense={tensesData[0]?.perfect} isLoading={isLoading} />
              <TenseCell tense={tensesData[0]?.perfectContinuous} isLoading={isLoading} />
            </div>

            {/* Future Row */}
            <div className="grid grid-cols-5 gap-4">
              <div className="bg-gray-100 text-gray-800 font-bold p-4 flex items-center justify-center rounded">
                Future
              </div>
              <TenseCell tense={tensesData[2]?.simple} isLoading={isLoading} />
              <TenseCell tense={tensesData[2]?.continuous} isLoading={isLoading} />
              <TenseCell tense={tensesData[2]?.perfect} isLoading={isLoading} />
              <TenseCell tense={tensesData[2]?.perfectContinuous} isLoading={isLoading} />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-600">
          <p>Powered by AI - Generate examples for any topic you want to learn</p>
        </div>
      </div>
    </div>
  );
}
