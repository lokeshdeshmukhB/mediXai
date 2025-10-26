import { Quiz, QuizResult } from '../models/Quiz.model.js';
import User from '../models/User.model.js';
import groq from '../config/groq.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load quiz data from JSON file
let quizData = {};
try {
  const jsonPath = path.join(__dirname, '../pharmacy_quiz_data.json');
  const rawData = fs.readFileSync(jsonPath, 'utf8');
  
  // Try to parse the JSON, handling potential formatting issues
  try {
    quizData = JSON.parse(rawData);
    if (quizData.quizData) {
      quizData = quizData.quizData; // Unwrap if nested
    }
  } catch (parseError) {
    // If direct parse fails, try to extract valid JSON
    const jsonMatch = rawData.match(/\{[\s\S]*"quizData"[\s\S]*\}\s*$/m);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      quizData = parsed.quizData || parsed;
    }
  }
  console.log('Quiz data loaded successfully. Categories:', Object.keys(quizData));
} catch (error) {
  console.error('Error loading quiz data:', error.message);
}

// Fallback quiz questions by category (backup)
const fallbackQuestions = {
  'Pharmacology': [
    {
      question: 'Which of the following is the primary mechanism of action of aspirin?',
      options: ['Inhibition of cyclooxygenase (COX) enzymes', 'Inhibition of lipoxygenase', 'Activation of prostaglandin receptors', 'Inhibition of thromboxane synthesis only'],
      correctAnswer: 0,
      explanation: 'Aspirin works by irreversibly inhibiting cyclooxygenase (COX) enzymes, which are responsible for prostaglandin synthesis.'
    },
    {
      question: 'What is the therapeutic drug monitoring range for digoxin?',
      options: ['0.5-2.0 ng/mL', '5-10 ng/mL', '10-20 ng/mL', '20-30 ng/mL'],
      correctAnswer: 0,
      explanation: 'The therapeutic range for digoxin is 0.5-2.0 ng/mL. Levels above 2.0 ng/mL increase the risk of toxicity.'
    },
    {
      question: 'Which receptor does morphine primarily act on?',
      options: ['Mu (μ) opioid receptor', 'Delta (δ) receptor', 'Kappa (κ) receptor', 'NMDA receptor'],
      correctAnswer: 0,
      explanation: 'Morphine is a mu (μ) opioid receptor agonist, which mediates its analgesic effects.'
    },
    {
      question: 'What is the mechanism of action of warfarin?',
      options: ['Vitamin K epoxide reductase inhibition', 'Direct thrombin inhibition', 'Factor Xa inhibition', 'Platelet aggregation inhibition'],
      correctAnswer: 0,
      explanation: 'Warfarin inhibits vitamin K epoxide reductase, preventing the synthesis of vitamin K-dependent clotting factors.'
    },
    {
      question: 'Which cytochrome P450 enzyme is responsible for metabolizing most drugs?',
      options: ['CYP3A4', 'CYP2D6', 'CYP1A2', 'CYP2C9'],
      correctAnswer: 0,
      explanation: 'CYP3A4 is the most abundant CYP enzyme and metabolizes approximately 50% of all drugs.'
    }
  ],
  'Clinical Pharmacy': [
    {
      question: 'What is the first-line treatment for type 2 diabetes mellitus?',
      options: ['Metformin', 'Insulin', 'Sulfonylureas', 'DPP-4 inhibitors'],
      correctAnswer: 0,
      explanation: 'Metformin is the first-line treatment for type 2 diabetes due to its efficacy, safety profile, and cardiovascular benefits.'
    },
    {
      question: 'Which antibiotic class should be avoided in pregnant women?',
      options: ['Tetracyclines', 'Penicillins', 'Cephalosporins', 'Macrolides'],
      correctAnswer: 0,
      explanation: 'Tetracyclines can cause tooth discoloration and bone growth inhibition in the fetus and should be avoided during pregnancy.'
    },
    {
      question: 'What is the target INR range for patients on warfarin for atrial fibrillation?',
      options: ['2.0-3.0', '1.0-2.0', '3.0-4.0', '4.0-5.0'],
      correctAnswer: 0,
      explanation: 'The target INR range for most indications including atrial fibrillation is 2.0-3.0.'
    },
    {
      question: 'Which medication is contraindicated with grapefruit juice?',
      options: ['Simvastatin', 'Metformin', 'Lisinopril', 'Metoprolol'],
      correctAnswer: 0,
      explanation: 'Grapefruit juice inhibits CYP3A4, significantly increasing simvastatin levels and risk of myopathy.'
    },
    {
      question: 'What is the recommended first-line treatment for hypertension in African American patients?',
      options: ['Calcium channel blockers or thiazide diuretics', 'ACE inhibitors', 'Beta-blockers', 'Alpha-blockers'],
      correctAnswer: 0,
      explanation: 'Calcium channel blockers and thiazide diuretics are more effective in African American patients with hypertension.'
    },
    {
      question: 'What is the antidote for acetaminophen overdose?',
      options: ['N-acetylcysteine', 'Naloxone', 'Flumazenil', 'Activated charcoal'],
      correctAnswer: 0,
      explanation: 'N-acetylcysteine (NAC) is the specific antidote for acetaminophen overdose, preventing liver damage.'
    },
    {
      question: 'Which drug class is first-line for heart failure with reduced ejection fraction?',
      options: ['ACE inhibitors', 'Calcium channel blockers', 'Alpha blockers', 'Nitrates'],
      correctAnswer: 0,
      explanation: 'ACE inhibitors are first-line therapy for heart failure with reduced ejection fraction, improving survival.'
    },
    {
      question: 'What is the mechanism of proton pump inhibitors?',
      options: ['Inhibit H+/K+ ATPase', 'Block H2 receptors', 'Neutralize acid', 'Coat stomach lining'],
      correctAnswer: 0,
      explanation: 'PPIs irreversibly inhibit the H+/K+ ATPase pump in gastric parietal cells, reducing acid secretion.'
    },
    {
      question: 'Which anticoagulant requires INR monitoring?',
      options: ['Warfarin', 'Rivaroxaban', 'Apixaban', 'Dabigatran'],
      correctAnswer: 0,
      explanation: 'Warfarin requires regular INR monitoring to ensure therapeutic anticoagulation.'
    },
    {
      question: 'What is the first-line treatment for acute asthma exacerbation?',
      options: ['Short-acting beta-agonist', 'Long-acting beta-agonist', 'Inhaled corticosteroid', 'Leukotriene modifier'],
      correctAnswer: 0,
      explanation: 'Short-acting beta-agonists (like albuterol) are first-line for acute asthma symptoms.'
    }
  ],
  'Medicinal Chemistry': [
    {
      question: 'What functional group is characteristic of alcohols?',
      options: ['-OH', '-COOH', '-NH2', '-CHO'],
      correctAnswer: 0,
      explanation: 'The hydroxyl group (-OH) is the characteristic functional group of alcohols.'
    },
    {
      question: 'What is an ester?',
      options: ['R-COO-R', 'R-CO-R', 'R-OH', 'R-NH2'],
      correctAnswer: 0,
      explanation: 'An ester has the functional group R-COO-R, formed from a carboxylic acid and alcohol.'
    },
    {
      question: 'Which element is essential in all organic compounds?',
      options: ['Carbon', 'Nitrogen', 'Oxygen', 'Sulfur'],
      correctAnswer: 0,
      explanation: 'Carbon is the essential element that defines organic chemistry and all organic compounds.'
    },
    {
      question: 'What is a prodrug?',
      options: ['Inactive compound converted to active drug in body', 'Active drug', 'Drug metabolite', 'Drug excipient'],
      correctAnswer: 0,
      explanation: 'A prodrug is an inactive or less active compound that is metabolized in the body to produce the active drug.'
    },
    {
      question: 'What does lipophilicity measure?',
      options: ['Affinity for lipids/fats', 'Water solubility', 'Protein binding', 'Molecular weight'],
      correctAnswer: 0,
      explanation: 'Lipophilicity measures a compound\'s affinity for lipid environments, important for membrane permeability.'
    },
    {
      question: 'What is the purpose of adding a fluorine atom to drugs?',
      options: ['Increase metabolic stability', 'Increase molecular weight', 'Decrease activity', 'Add color'],
      correctAnswer: 0,
      explanation: 'Fluorine substitution often increases metabolic stability due to the strong C-F bond.'
    },
    {
      question: 'What is an aromatic ring?',
      options: ['Cyclic structure with delocalized electrons', 'Any ring structure', 'Aliphatic chain', 'Functional group'],
      correctAnswer: 0,
      explanation: 'Aromatic rings are cyclic structures with delocalized pi electrons, like benzene.'
    },
    {
      question: 'What is stereoisomerism?',
      options: ['Same formula, different spatial arrangement', 'Different formula', 'Same structure', 'Different elements'],
      correctAnswer: 0,
      explanation: 'Stereoisomers have the same molecular formula but different three-dimensional arrangements.'
    },
    {
      question: 'What is a chiral center?',
      options: ['Carbon with four different groups', 'Any carbon atom', 'Double bond', 'Ring structure'],
      correctAnswer: 0,
      explanation: 'A chiral center is typically a carbon atom bonded to four different groups.'
    },
    {
      question: 'What does SAR stand for in drug design?',
      options: ['Structure-Activity Relationship', 'Systematic Analysis Report', 'Standard Analytical Review', 'Synthesis And Research'],
      correctAnswer: 0,
      explanation: 'SAR (Structure-Activity Relationship) relates chemical structure to biological activity.'
    }
  ],
  'Pharmaceutics': [
    {
      question: 'What is a tablet?',
      options: ['Solid dosage form', 'Liquid dosage form', 'Semi-solid dosage form', 'Gaseous dosage form'],
      correctAnswer: 0,
      explanation: 'A tablet is a solid dosage form containing drug and excipients compressed into a specific shape.'
    },
    {
      question: 'What is the purpose of a coating on tablets?',
      options: ['Protect drug, improve appearance, mask taste', 'Increase weight', 'Reduce cost', 'Speed dissolution'],
      correctAnswer: 0,
      explanation: 'Tablet coatings protect the drug, improve appearance, mask unpleasant tastes, and can control release.'
    },
    {
      question: 'What is bioavailability?',
      options: ['Fraction of drug reaching systemic circulation', 'Drug potency', 'Drug purity', 'Drug stability'],
      correctAnswer: 0,
      explanation: 'Bioavailability is the fraction of administered drug that reaches the systemic circulation unchanged.'
    },
    {
      question: 'What is an excipient?',
      options: ['Inactive ingredient in formulation', 'Active drug', 'Impurity', 'Preservative only'],
      correctAnswer: 0,
      explanation: 'Excipients are inactive ingredients used in drug formulations to aid manufacturing and stability.'
    },
    {
      question: 'What is dissolution?',
      options: ['Process of solid dissolving in liquid', 'Drug absorption', 'Drug metabolism', 'Drug excretion'],
      correctAnswer: 0,
      explanation: 'Dissolution is the process by which a solid drug dissolves in a liquid medium.'
    },
    {
      question: 'What is a sustained-release formulation?',
      options: ['Releases drug slowly over time', 'Immediate release', 'No release', 'Rapid release'],
      correctAnswer: 0,
      explanation: 'Sustained-release formulations release drug gradually over an extended period.'
    },
    {
      question: 'What is particle size reduction used for?',
      options: ['Increase dissolution rate', 'Decrease dissolution', 'Add color', 'Reduce cost'],
      correctAnswer: 0,
      explanation: 'Reducing particle size increases surface area, enhancing dissolution rate.'
    },
    {
      question: 'What is an emulsion?',
      options: ['Mixture of immiscible liquids', 'Solution', 'Suspension', 'Powder'],
      correctAnswer: 0,
      explanation: 'An emulsion is a mixture of two immiscible liquids stabilized by an emulsifying agent.'
    },
    {
      question: 'What is the purpose of a binder in tablets?',
      options: ['Hold ingredients together', 'Speed dissolution', 'Add flavor', 'Preserve drug'],
      correctAnswer: 0,
      explanation: 'Binders help hold tablet ingredients together during compression.'
    },
    {
      question: 'What is lyophilization?',
      options: ['Freeze-drying process', 'Wet granulation', 'Coating process', 'Milling process'],
      correctAnswer: 0,
      explanation: 'Lyophilization (freeze-drying) removes water from products while maintaining stability.'
    }
  ],
  'Pharmacotherapy': [
    {
      question: 'What is the goal of antihypertensive therapy?',
      options: ['Lower blood pressure to target range', 'Cure hypertension', 'Increase blood pressure', 'Diagnose hypertension'],
      correctAnswer: 0,
      explanation: 'Antihypertensive therapy aims to lower and maintain blood pressure within target ranges.'
    },
    {
      question: 'What is first-line therapy for type 2 diabetes?',
      options: ['Metformin', 'Insulin', 'Sulfonylureas', 'GLP-1 agonists'],
      correctAnswer: 0,
      explanation: 'Metformin is the first-line pharmacological treatment for type 2 diabetes.'
    },
    {
      question: 'Which drug class is used for heart failure?',
      options: ['ACE inhibitors', 'Antibiotics', 'Antihistamines', 'Antifungals'],
      correctAnswer: 0,
      explanation: 'ACE inhibitors are a cornerstone of heart failure treatment.'
    },
    {
      question: 'What is the purpose of anticoagulants?',
      options: ['Prevent blood clots', 'Dissolve clots', 'Increase clotting', 'Treat infections'],
      correctAnswer: 0,
      explanation: 'Anticoagulants prevent the formation of blood clots.'
    },
    {
      question: 'What is the target A1C for most diabetic patients?',
      options: ['<7%', '<5%', '<10%', '<12%'],
      correctAnswer: 0,
      explanation: 'The general A1C target for most adults with diabetes is <7%.'
    },
    {
      question: 'Which medication class treats depression?',
      options: ['Antidepressants', 'Antibiotics', 'Antihistamines', 'Antacids'],
      correctAnswer: 0,
      explanation: 'Antidepressants are used to treat depression and related mood disorders.'
    },
    {
      question: 'What is the purpose of statins?',
      options: ['Lower cholesterol', 'Lower blood sugar', 'Lower blood pressure', 'Treat infections'],
      correctAnswer: 0,
      explanation: 'Statins are used to lower cholesterol levels and reduce cardiovascular risk.'
    },
    {
      question: 'What is rescue therapy in asthma?',
      options: ['Quick-relief medication for acute symptoms', 'Long-term control', 'Prevention', 'Cure'],
      correctAnswer: 0,
      explanation: 'Rescue therapy provides quick relief of acute asthma symptoms.'
    },
    {
      question: 'What is the purpose of immunosuppressants?',
      options: ['Suppress immune system', 'Boost immunity', 'Treat infections', 'Reduce inflammation only'],
      correctAnswer: 0,
      explanation: 'Immunosuppressants reduce immune system activity, used in transplants and autoimmune diseases.'
    },
    {
      question: 'What is combination therapy?',
      options: ['Using multiple drugs together', 'Single drug therapy', 'No medication', 'Alternative medicine'],
      correctAnswer: 0,
      explanation: 'Combination therapy uses multiple medications to achieve better therapeutic outcomes.'
    }
  ],
  'Toxicology': [
    {
      question: 'What is toxicology?',
      options: ['Study of poisons and their effects', 'Study of drugs', 'Study of plants', 'Study of animals'],
      correctAnswer: 0,
      explanation: 'Toxicology is the study of adverse effects of chemical substances on living organisms.'
    },
    {
      question: 'What is an antidote?',
      options: ['Substance that counteracts poison', 'Type of poison', 'Preservative', 'Antibiotic'],
      correctAnswer: 0,
      explanation: 'An antidote is a substance that counteracts the effects of a poison or toxin.'
    },
    {
      question: 'What does LD50 measure?',
      options: ['Lethal dose for 50% of population', 'Lowest dose', 'Loading dose', 'Legal dose'],
      correctAnswer: 0,
      explanation: 'LD50 is the dose that causes death in 50% of test subjects, measuring acute toxicity.'
    },
    {
      question: 'What is hepatotoxicity?',
      options: ['Liver toxicity', 'Kidney toxicity', 'Heart toxicity', 'Brain toxicity'],
      correctAnswer: 0,
      explanation: 'Hepatotoxicity refers to chemical-induced liver damage.'
    },
    {
      question: 'Which organ is primary for detoxification?',
      options: ['Liver', 'Kidney', 'Heart', 'Lungs'],
      correctAnswer: 0,
      explanation: 'The liver is the primary organ for drug metabolism and detoxification.'
    },
    {
      question: 'What is a carcinogen?',
      options: ['Cancer-causing substance', 'Pain reliever', 'Antibiotic', 'Vitamin'],
      correctAnswer: 0,
      explanation: 'A carcinogen is any substance capable of causing cancer.'
    },
    {
      question: 'What is nephrotoxicity?',
      options: ['Kidney toxicity', 'Liver toxicity', 'Heart toxicity', 'Lung toxicity'],
      correctAnswer: 0,
      explanation: 'Nephrotoxicity is toxic injury to the kidneys.'
    },
    {
      question: 'What is acute toxicity?',
      options: ['Effects from single/short exposure', 'Long-term effects', 'No effects', 'Beneficial effects'],
      correctAnswer: 0,
      explanation: 'Acute toxicity refers to adverse effects from a single or short-term exposure.'
    },
    {
      question: 'What is the antidote for acetaminophen overdose?',
      options: ['N-acetylcysteine', 'Naloxone', 'Atropine', 'Flumazenil'],
      correctAnswer: 0,
      explanation: 'N-acetylcysteine (NAC) is the specific antidote for acetaminophen overdose.'
    },
    {
      question: 'What is teratogenicity?',
      options: ['Ability to cause birth defects', 'Cancer-causing', 'Liver damage', 'Kidney damage'],
      correctAnswer: 0,
      explanation: 'Teratogenicity is the ability of a substance to cause developmental malformations or birth defects.'
    }
  ]
};

// @desc    Generate quiz using AI
// @route   POST /api/quiz/generate
// @access  Private
export const generateQuiz = async (req, res) => {
  try {
    const { category, difficulty, numberOfQuestions = 10 } = req.body;

    if (!category || !difficulty) {
      return res.status(400).json({
        status: 'error',
        message: 'Please provide category and difficulty'
      });
    }

    console.log(`Generating quiz: ${category} - ${difficulty} - ${numberOfQuestions} questions`);

    // Map difficulty to JSON key format
    const difficultyMap = {
      'Beginner': 'easy',
      'Intermediate': 'medium',
      'Advanced': 'hard'
    };
    const jsonDifficulty = difficultyMap[difficulty] || difficulty.toLowerCase();
    
    // First, try to use questions from JSON file
    if (quizData[category] && quizData[category][jsonDifficulty]) {
      const availableQuestions = quizData[category][jsonDifficulty];
      if (availableQuestions && availableQuestions.length > 0) {
        console.log(`Using questions from JSON file for ${category} - ${difficulty} (${availableQuestions.length} available)`);
        
        // Randomly select questions (or all if less than requested)
        const shuffled = [...availableQuestions].sort(() => 0.5 - Math.random());
        const selectedQuestions = shuffled.slice(0, Math.min(numberOfQuestions, availableQuestions.length));
        
        // If we have enough questions, return them
        if (selectedQuestions.length >= 5) {
          const quiz = await Quiz.create({
            category,
            difficulty,
            questions: selectedQuestions,
            createdBy: req.user._id
          });
          
          return res.status(200).json({
            status: 'success',
            data: quiz
          });
        }
      }
    }

    // If JSON data not available, try AI generation
    console.log('JSON data not available, attempting AI generation...');

    // Enhanced prompt with clearer instructions
    const prompt = `You are a pharmacy education expert. Generate exactly ${numberOfQuestions} multiple-choice questions about ${category} at ${difficulty} level.

IMPORTANT: Return ONLY a valid JSON array. No markdown, no code blocks, no explanations.

Format:
[
  {
    "question": "Clear, specific question about ${category}",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correctAnswer": 0,
    "explanation": "Brief explanation why this answer is correct"
  }
]

Rules:
- correctAnswer must be 0, 1, 2, or 3 (index of correct option)
- Each question must be relevant to ${category}
- Difficulty: ${difficulty}
- Return ONLY the JSON array, nothing else`;

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'You are a pharmacy education expert. You MUST respond with ONLY valid JSON format. No markdown, no code blocks, no extra text.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.7,
      max_tokens: 3000
    });

    let responseText = completion.choices[0]?.message?.content;
    console.log('Raw AI Response:', responseText?.substring(0, 200));
    
    if (!responseText) {
      throw new Error('Empty response from AI');
    }

    // Clean up response - remove markdown code blocks if present
    responseText = responseText.trim();
    responseText = responseText.replace(/```json\s*/g, '');
    responseText = responseText.replace(/```\s*/g, '');
    
    // Extract JSON from response
    let questions;
    try {
      // Try direct parse first
      const parsed = JSON.parse(responseText);
      
      // Handle if response is wrapped in an object
      if (parsed.questions && Array.isArray(parsed.questions)) {
        questions = parsed.questions;
      } else if (Array.isArray(parsed)) {
        questions = parsed;
      } else {
        throw new Error('Invalid response structure');
      }
      
      // Validate questions structure
      if (!questions || questions.length === 0) {
        throw new Error('No questions generated');
      }
      
      // Validate each question
      questions = questions.map((q, index) => {
        if (!q.question || !Array.isArray(q.options) || q.options.length !== 4) {
          throw new Error(`Invalid question structure at index ${index}`);
        }
        if (typeof q.correctAnswer !== 'number' || q.correctAnswer < 0 || q.correctAnswer > 3) {
          throw new Error(`Invalid correctAnswer at index ${index}`);
        }
        return {
          question: q.question,
          options: q.options,
          correctAnswer: q.correctAnswer,
          explanation: q.explanation || 'No explanation provided'
        };
      });
      
      console.log(`Successfully generated ${questions.length} questions`);
      
    } catch (parseError) {
      console.error('Failed to parse AI response:', parseError.message);
      console.error('Response text:', responseText);
      return res.status(500).json({
        status: 'error',
        message: 'Failed to generate valid quiz questions. Please try again.',
        details: parseError.message
      });
    }

    // Create quiz in database
    const quiz = await Quiz.create({
      category,
      difficulty,
      questions,
      createdBy: req.user._id
    });

    res.status(200).json({
      status: 'success',
      data: quiz
    });
  } catch (error) {
    console.error('Quiz generation error:', error);
    
    // Try to use fallback questions
    const fallbackCategory = Object.keys(fallbackQuestions).find(key => 
      category.toLowerCase().includes(key.toLowerCase())
    );
    
    if (fallbackCategory && fallbackQuestions[fallbackCategory]) {
      console.log(`Using fallback questions for ${category}`);
      const questions = fallbackQuestions[fallbackCategory].slice(0, numberOfQuestions);
      
      try {
        const quiz = await Quiz.create({
          category,
          difficulty,
          questions,
          createdBy: req.user._id
        });
        
        return res.status(200).json({
          status: 'success',
          data: quiz,
          message: 'Quiz generated using fallback questions'
        });
      } catch (dbError) {
        console.error('Database error with fallback:', dbError);
      }
    }
    
    res.status(500).json({
      status: 'error',
      message: 'Failed to generate quiz. Please try again.',
      details: error.message
    });
  }
};

// @desc    Submit quiz result
// @route   POST /api/quiz/submit
// @access  Private
export const submitQuiz = async (req, res) => {
  try {
    const { quizId, answers, timeTaken } = req.body;
    const userId = req.user._id;

    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({
        status: 'error',
        message: 'Quiz not found'
      });
    }

    // Calculate score
    let score = 0;
    const detailedAnswers = answers.map((answer, index) => {
      const isCorrect = answer === quiz.questions[index].correctAnswer;
      if (isCorrect) score += 10;
      
      return {
        questionId: quiz.questions[index]._id,
        selectedAnswer: answer,
        isCorrect
      };
    });

    // Save quiz result
    const result = await QuizResult.create({
      user: userId,
      quiz: quizId,
      category: quiz.category,
      difficulty: quiz.difficulty,
      score,
      totalQuestions: quiz.questions.length,
      timeTaken,
      answers: detailedAnswers
    });

    // Update user stats
    await User.findByIdAndUpdate(userId, {
      $inc: {
        'stats.quizzesCompleted': 1,
        'stats.totalScore': score
      }
    });

    res.status(200).json({
      status: 'success',
      data: {
        result,
        score,
        totalQuestions: quiz.questions.length,
        percentage: (score / (quiz.questions.length * 10)) * 100
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// @desc    Get user quiz history
// @route   GET /api/quiz/history
// @access  Private
export const getQuizHistory = async (req, res) => {
  try {
    const results = await QuizResult.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .populate('quiz', 'category difficulty')
      .limit(20);

    res.status(200).json({
      status: 'success',
      data: results
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// @desc    Get leaderboard
// @route   GET /api/quiz/leaderboard
// @access  Private
export const getLeaderboard = async (req, res) => {
  try {
    const users = await User.find()
      .select('name university stats.totalScore stats.quizzesCompleted')
      .sort({ 'stats.totalScore': -1 })
      .limit(50);

    const leaderboard = users.map((user, index) => ({
      rank: index + 1,
      name: user.name,
      university: user.university,
      score: user.stats.totalScore,
      quizzesCompleted: user.stats.quizzesCompleted
    }));

    res.status(200).json({
      status: 'success',
      data: leaderboard
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};
