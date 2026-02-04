export interface TenseExample {
  tenseKey: string;
  affirmative: string;
  negative: string;
  question: string;
}

export interface TenseGrid {
  time: 'present' | 'past' | 'future';
  simple: TenseExample;
  continuous: TenseExample;
  perfect: TenseExample;
  perfectContinuous: TenseExample;
}

export const tensesGridData: TenseGrid[] = [
  {
    time: 'present',
    simple: {
      tenseKey: "presentSimple",
      affirmative: "I/we/you/they live in New-York He/she/it lives in New-York",
      negative: "I don't live in New-York She doesn't live in New York",
      question: "Do I/we/you/they live in New-York? Does he/she/it live in NY?"
    },
    continuous: {
      tenseKey: "presentContinuous",
      affirmative: "I am living in New-Your now. we/you/they are living in New-York He/she/it is living in New-York",
      negative: "I am not living in New-York They are not living in New-York She is not living in New York",
      question: "Are we/you/they living in New-York Is he/she/it living in NY? Am I living in NY?"
    },
    perfect: {
      tenseKey: "presentPerfect",
      affirmative: "I/we/you/they have lived in New-York. He/she/it has lived in New-York.",
      negative: "I/they/we/you have not lived in New-York She/he/it has not lived in New York",
      question: "Have I/we/you/they lived in New-York Has he/she/it lived in NY?"
    },
    perfectContinuous: {
      tenseKey: "presentPerfectContinuous",
      affirmative: "I/we/you/they have been living in New-York for 3 years. He/she/it has been living in New-York.",
      negative: "I/they/we/you have not been living in New-York for 3 years She/he/it has not been living in New York for 3 years",
      question: "Have I/we/you/they been living in New-York Has he/she/it been living in NY?"
    }
  },
  {
    time: 'past',
    simple: {
      tenseKey: "pastSimple",
      affirmative: "I/we/you/they/he/she moved to NY last year.",
      negative: "I/he/she/we/you/they did not (didn't) move to NY last year.",
      question: "Did I/we/you/they/he/she move to New-York?"
    },
    continuous: {
      tenseKey: "pastContinuous",
      affirmative: "I/he/she/it was living in NY We/they/you were living in New-York",
      negative: "I/he/she/it was not living in New-York We/they/you were not living in NY",
      question: "Was I/she/he/it living in New-York? Were they/we/you living in NY?"
    },
    perfect: {
      tenseKey: "pastPerfect",
      affirmative: "I/we/you/they/he/she/it had lived in New-York.",
      negative: "I/they/we/you have not lived in New-York She/he/it has not lived in New York",
      question: "Have I/we/you/they lived in New-York Has he/she/it lived in NY?"
    },
    perfectContinuous: {
      tenseKey: "pastPerfectContinuous",
      affirmative: "I/we/you/they had been living in New-York for 3 years before you arrived.",
      negative: "I/they/we/you had not been living in New-York for 3 years before you arrived",
      question: "Had I/we/you/they been living in New-York for 3 years before you arrived?"
    }
  },
  {
    time: 'future',
    simple: {
      tenseKey: "futureSimple",
      affirmative: "I/we/you/they/he/she will move to NY soon.",
      negative: "I/he/she/we/you/they will not move to NY soon",
      question: "Will I/we/you/they/he/she move to New-York soon?"
    },
    continuous: {
      tenseKey: "futureContinuous",
      affirmative: "This year I/he/she/it/we/they/you will be living in NY",
      negative: "This year I/he/she/it/we/they/you will not be living in NY",
      question: "Will I/she/he/it/they/we/you be living in New-York this year?"
    },
    perfect: {
      tenseKey: "futurePerfect",
      affirmative: "I/we/you/they/he/she/it will have moved in New-York by next month.",
      negative: "I/they/we/you will have not moved in New-York to New York by next month",
      question: "Will I/we/you/they have moved in New-York by next month?"
    },
    perfectContinuous: {
      tenseKey: "futurePerfectContinuous",
      affirmative: "I/we/you/they will have been living in New-York for 3 by next month.",
      negative: "I/they/we/you will not have been living in New-York for 3 by next month.",
      question: "Will I/we/you/they have been living in New-York for 3 by next month?"
    }
  }
];
