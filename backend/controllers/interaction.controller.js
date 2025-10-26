import groq from '../config/groq.js';

// Drug interaction database (can be expanded)
const drugInteractions = {
  'aspirin-warfarin': {
    severity: 'High',
    description: 'Increased risk of bleeding. Both drugs affect blood clotting mechanisms.',
    recommendation: 'Avoid combination if possible. If necessary, monitor INR closely and watch for signs of bleeding.'
  },
  'aspirin-ibuprofen': {
    severity: 'Moderate',
    description: 'Ibuprofen may reduce the cardioprotective effects of low-dose aspirin.',
    recommendation: 'Take ibuprofen at least 2 hours after or 8 hours before aspirin.'
  },
  'warfarin-metformin': {
    severity: 'Low',
    description: 'Minimal interaction. Metformin may slightly enhance anticoagulant effect.',
    recommendation: 'Monitor INR when starting or stopping metformin.'
  },
  'warfarin-simvastatin': {
    severity: 'Moderate',
    description: 'Simvastatin may enhance the anticoagulant effect of warfarin.',
    recommendation: 'Monitor INR closely when starting or adjusting simvastatin dose.'
  },
  'warfarin-amoxicillin': {
    severity: 'Moderate',
    description: 'Antibiotics may alter gut flora affecting vitamin K production, potentially increasing INR.',
    recommendation: 'Monitor INR more frequently during and after antibiotic therapy.'
  },
  'clopidogrel-omeprazole': {
    severity: 'High',
    description: 'Omeprazole inhibits CYP2C19, reducing clopidogrel activation and antiplatelet effect.',
    recommendation: 'Consider using pantoprazole instead of omeprazole if PPI needed.'
  },
  'digoxin-furosemide': {
    severity: 'Moderate',
    description: 'Furosemide-induced hypokalemia increases risk of digoxin toxicity.',
    recommendation: 'Monitor potassium levels and digoxin levels regularly. Consider potassium supplementation.'
  },
  'metformin-lisinopril': {
    severity: 'Low',
    description: 'ACE inhibitors may enhance hypoglycemic effect of metformin.',
    recommendation: 'Monitor blood glucose, especially when initiating therapy.'
  },
  'simvastatin-diltiazem': {
    severity: 'Moderate',
    description: 'Diltiazem inhibits CYP3A4, increasing simvastatin levels and risk of myopathy.',
    recommendation: 'Limit simvastatin dose to 10mg daily when used with diltiazem.'
  },
  'atorvastatin-clarithromycin': {
    severity: 'High',
    description: 'Clarithromycin significantly increases statin levels, increasing risk of rhabdomyolysis.',
    recommendation: 'Consider temporarily discontinuing statin during clarithromycin therapy.'
  },
  'lisinopril-spironolactone': {
    severity: 'Moderate',
    description: 'Both drugs can increase potassium levels, risk of hyperkalemia.',
    recommendation: 'Monitor serum potassium and renal function regularly.'
  },
  'metoprolol-verapamil': {
    severity: 'High',
    description: 'Both drugs slow heart rate and AV conduction, risk of severe bradycardia and heart block.',
    recommendation: 'Avoid combination. If necessary, monitor ECG and heart rate closely.'
  },
  'fluoxetine-tramadol': {
    severity: 'High',
    description: 'Increased risk of serotonin syndrome. Both drugs increase serotonin levels.',
    recommendation: 'Avoid combination if possible. Monitor for serotonin syndrome symptoms.'
  },
  'sertraline-aspirin': {
    severity: 'Moderate',
    description: 'SSRIs may increase bleeding risk when combined with antiplatelet agents.',
    recommendation: 'Monitor for signs of bleeding. Consider gastroprotection.'
  },
  'lithium-hydrochlorothiazide': {
    severity: 'High',
    description: 'Thiazide diuretics reduce lithium clearance, increasing risk of toxicity.',
    recommendation: 'Monitor lithium levels closely. May need to reduce lithium dose by 50%.'
  },
  'phenytoin-valproic acid': {
    severity: 'Moderate',
    description: 'Complex interaction affecting levels of both drugs.',
    recommendation: 'Monitor levels of both drugs and adjust doses accordingly.'
  },
  'theophylline-ciprofloxacin': {
    severity: 'High',
    description: 'Ciprofloxacin inhibits theophylline metabolism, increasing toxicity risk.',
    recommendation: 'Reduce theophylline dose by 50% and monitor levels closely.'
  },
  'methotrexate-trimethoprim': {
    severity: 'High',
    description: 'Both drugs are folate antagonists, increased risk of bone marrow suppression.',
    recommendation: 'Avoid combination. If necessary, monitor CBC closely.'
  },
  'allopurinol-azathioprine': {
    severity: 'High',
    description: 'Allopurinol inhibits azathioprine metabolism, increasing toxicity risk.',
    recommendation: 'Reduce azathioprine dose to 25% of usual dose.'
  },
  'ketoconazole-simvastatin': {
    severity: 'High',
    description: 'Ketoconazole significantly increases statin levels via CYP3A4 inhibition.',
    recommendation: 'Avoid combination. Consider alternative antifungal or statin.'
  }
};

// @desc    Check drug interactions
// @route   POST /api/interaction/check
// @access  Private
export const checkInteractions = async (req, res) => {
  try {
    const { drugs } = req.body;

    if (!drugs || drugs.length < 2) {
      return res.status(400).json({
        status: 'error',
        message: 'Please provide at least 2 drugs'
      });
    }

    // Normalize drug names
    const normalizedDrugs = drugs.map(drug => drug.toLowerCase().trim());

    // Check predefined interactions
    const foundInteractions = [];
    
    for (let i = 0; i < normalizedDrugs.length; i++) {
      for (let j = i + 1; j < normalizedDrugs.length; j++) {
        const key1 = `${normalizedDrugs[i]}-${normalizedDrugs[j]}`;
        const key2 = `${normalizedDrugs[j]}-${normalizedDrugs[i]}`;
        
        if (drugInteractions[key1]) {
          foundInteractions.push({
            drugs: [drugs[i], drugs[j]],
            ...drugInteractions[key1]
          });
        } else if (drugInteractions[key2]) {
          foundInteractions.push({
            drugs: [drugs[i], drugs[j]],
            ...drugInteractions[key2]
          });
        }
      }
    }

    // Use AI to check for additional interactions
    const prompt = `As a clinical pharmacist, analyze potential drug interactions between these medications: ${drugs.join(', ')}.

For each significant interaction found, provide:
1. Which drugs interact
2. Severity level (High/Moderate/Low)
3. Brief description of the interaction
4. Clinical recommendation

Format as JSON array:
[
  {
    "drugs": ["Drug1", "Drug2"],
    "severity": "High",
    "description": "...",
    "recommendation": "..."
  }
]

If no significant interactions, return an empty array. Focus on clinically significant interactions only.`;

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'You are a clinical pharmacist expert in drug interactions. Provide accurate, evidence-based information.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.3,
      max_tokens: 1500
    });

    const responseText = completion.choices[0]?.message?.content;
    
    let aiInteractions = [];
    try {
      const jsonMatch = responseText.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        aiInteractions = JSON.parse(jsonMatch[0]);
      }
    } catch (parseError) {
      console.error('Failed to parse AI response:', responseText);
    }

    // Combine predefined and AI-generated interactions
    const allInteractions = [...foundInteractions];
    
    // Add AI interactions that aren't already in predefined list
    aiInteractions.forEach(aiInt => {
      const isDuplicate = foundInteractions.some(fi => 
        fi.drugs.every(d => aiInt.drugs.includes(d))
      );
      if (!isDuplicate) {
        allInteractions.push(aiInt);
      }
    });

    res.status(200).json({
      status: 'success',
      data: {
        interactions: allInteractions,
        totalChecked: drugs.length,
        hasInteractions: allInteractions.length > 0
      }
    });
  } catch (error) {
    console.error('Interaction check error:', error);
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// @desc    Get drug information
// @route   GET /api/interaction/drug/:name
// @access  Private
export const getDrugInfo = async (req, res) => {
  try {
    const { name } = req.params;

    const prompt = `Provide comprehensive information about the drug "${name}" including:
1. Generic and brand names
2. Drug class
3. Mechanism of action
4. Common indications
5. Common side effects
6. Important contraindications
7. Dosing considerations

Format as JSON:
{
  "genericName": "...",
  "brandNames": ["..."],
  "drugClass": "...",
  "mechanism": "...",
  "indications": ["..."],
  "sideEffects": ["..."],
  "contraindications": ["..."],
  "dosing": "..."
}`;

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'You are a pharmacy reference expert. Provide accurate drug information.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.3,
      max_tokens: 1000
    });

    const responseText = completion.choices[0]?.message?.content;
    
    let drugInfo;
    try {
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      drugInfo = JSON.parse(jsonMatch[0]);
    } catch (parseError) {
      drugInfo = { rawInfo: responseText };
    }

    res.status(200).json({
      status: 'success',
      data: drugInfo
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};
