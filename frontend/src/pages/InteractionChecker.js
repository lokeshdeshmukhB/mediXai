import React, { useState } from 'react';
import { interactionAPI } from '../services/api';
import { Search, X, AlertCircle, AlertTriangle, CheckCircle } from 'lucide-react';

const InteractionChecker = () => {
  const [selectedDrugs, setSelectedDrugs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [interactions, setInteractions] = useState([]);
  const [loading, setLoading] = useState(false);

  const commonDrugs = [
    'Aspirin', 'Warfarin', 'Lisinopril', 'Metformin', 'Atorvastatin',
    'Amlodipine', 'Omeprazole', 'Losartan', 'Levothyroxine', 'Metoprolol',
    'Ibuprofen', 'Acetaminophen', 'Amoxicillin', 'Ciprofloxacin', 'Prednisone',
    'Simvastatin', 'Clopidogrel', 'Digoxin', 'Furosemide', 'Hydrochlorothiazide',
    'Spironolactone', 'Ramipril', 'Carvedilol', 'Diltiazem', 'Verapamil',
    'Allopurinol', 'Colchicine', 'Insulin', 'Glipizide', 'Glyburide',
    'Pioglitazone', 'Sitagliptin', 'Empagliflozin', 'Dapagliflozin', 'Liraglutide',
    'Azithromycin', 'Doxycycline', 'Cephalexin', 'Levofloxacin', 'Trimethoprim',
    'Fluconazole', 'Ketoconazole', 'Acyclovir', 'Valacyclovir', 'Oseltamivir',
    'Pantoprazole', 'Esomeprazole', 'Ranitidine', 'Famotidine', 'Sucralfate',
    'Ondansetron', 'Metoclopramide', 'Loperamide', 'Bisacodyl', 'Docusate',
    'Alprazolam', 'Lorazepam', 'Diazepam', 'Clonazepam', 'Zolpidem',
    'Sertraline', 'Fluoxetine', 'Escitalopram', 'Paroxetine', 'Venlafaxine',
    'Duloxetine', 'Bupropion', 'Mirtazapine', 'Trazodone', 'Amitriptyline',
    'Gabapentin', 'Pregabalin', 'Carbamazepine', 'Valproic Acid', 'Lamotrigine',
    'Phenytoin', 'Levetiracetam', 'Topiramate', 'Lithium', 'Quetiapine',
    'Risperidone', 'Olanzapine', 'Aripiprazole', 'Haloperidol', 'Clozapine',
    'Montelukast', 'Albuterol', 'Fluticasone', 'Budesonide', 'Ipratropium',
    'Theophylline', 'Cetirizine', 'Loratadine', 'Fexofenadine', 'Diphenhydramine',
    'Pseudoephedrine', 'Guaifenesin', 'Dextromethorphan', 'Codeine', 'Tramadol',
    'Morphine', 'Oxycodone', 'Hydrocodone', 'Fentanyl', 'Naloxone',
    'Tamsulosin', 'Finasteride', 'Dutasteride', 'Sildenafil', 'Tadalafil',
    'Estradiol', 'Progesterone', 'Levonorgestrel', 'Norethindrone', 'Medroxyprogesterone',
    'Testosterone', 'Anastrozole', 'Letrozole', 'Tamoxifen', 'Raloxifene'
  ];

  const addDrug = (drug) => {
    if (!selectedDrugs.includes(drug)) {
      setSelectedDrugs([...selectedDrugs, drug]);
      setShowResults(false);
    }
    setSearchTerm('');
  };

  const removeDrug = (drug) => {
    setSelectedDrugs(selectedDrugs.filter(d => d !== drug));
    setShowResults(false);
  };

  const checkInteractions = async () => {
    if (selectedDrugs.length < 2) {
      alert('Please select at least 2 drugs');
      return;
    }

    setLoading(true);
    try {
      const response = await interactionAPI.checkInteractions({
        drugs: selectedDrugs
      });
      setInteractions(response.data.data.interactions);
      setShowResults(true);
    } catch (error) {
      console.error('Error checking interactions:', error);
      alert('Failed to check interactions. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity.toLowerCase()) {
      case 'high':
        return {
          border: 'border-red-500',
          bg: 'bg-red-50',
          text: 'text-red-800',
          badge: 'bg-red-100'
        };
      case 'moderate':
        return {
          border: 'border-yellow-500',
          bg: 'bg-yellow-50',
          text: 'text-yellow-800',
          badge: 'bg-yellow-100'
        };
      case 'low':
        return {
          border: 'border-blue-500',
          bg: 'bg-blue-50',
          text: 'text-blue-800',
          badge: 'bg-blue-100'
        };
      default:
        return {
          border: 'border-gray-500',
          bg: 'bg-gray-50',
          text: 'text-gray-800',
          badge: 'bg-gray-100'
        };
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Drug Interaction Checker ⚠️</h1>
        <p className="text-gray-600 mt-2">Check for potential drug interactions and contraindications</p>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Search and add medications
        </label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for a drug..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {searchTerm && (
          <div className="mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
            {commonDrugs
              .filter(drug => drug.toLowerCase().includes(searchTerm.toLowerCase()))
              .map((drug, index) => (
                <button
                  key={index}
                  onClick={() => addDrug(drug)}
                  className="w-full text-left px-4 py-3 hover:bg-gray-50 transition border-b border-gray-100 last:border-b-0"
                >
                  {drug}
                </button>
              ))}
          </div>
        )}

        {selectedDrugs.length > 0 && (
          <div className="mt-4">
            <p className="text-sm font-medium text-gray-700 mb-2">Selected Medications:</p>
            <div className="flex flex-wrap gap-2">
              {selectedDrugs.map((drug, index) => (
                <div
                  key={index}
                  className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full flex items-center gap-2"
                >
                  <span>{drug}</span>
                  <button
                    onClick={() => removeDrug(drug)}
                    className="hover:bg-blue-200 rounded-full p-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={checkInteractions}
          disabled={selectedDrugs.length < 2 || loading}
          className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
        >
          {loading ? 'Checking Interactions...' : 'Check Interactions'}
        </button>
      </div>

      {loading && (
        <div className="text-center py-8">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Analyzing drug interactions...</p>
        </div>
      )}

      {showResults && !loading && selectedDrugs.length >= 2 && (
        <div className="space-y-4">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-4">
              <AlertCircle className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-bold text-gray-900">Interaction Results</h2>
            </div>

            {interactions.length > 0 ? (
              <div className="space-y-4">
                {interactions.map((interaction, index) => {
                  const colors = getSeverityColor(interaction.severity);
                  return (
                    <div key={index} className={`border-l-4 ${colors.border} ${colors.bg} p-4 rounded-lg`}>
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-bold text-gray-900">
                            {interaction.drugs.join(' + ')}
                          </p>
                          <span className={`inline-block mt-1 px-3 py-1 ${colors.badge} ${colors.text} text-sm font-medium rounded-full`}>
                            {interaction.severity} Risk
                          </span>
                        </div>
                        <AlertTriangle className={`w-6 h-6 ${colors.text}`} />
                      </div>
                      <p className="text-gray-700 mt-3 mb-2">{interaction.description}</p>
                      <div className="bg-white p-3 rounded border border-gray-200 mt-3">
                        <p className="text-sm font-medium text-gray-900">Recommendation:</p>
                        <p className="text-sm text-gray-700 mt-1">{interaction.recommendation}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-lg">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <p className="font-medium text-green-900">
                    No significant interactions detected between the selected medications
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
            <div className="flex gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-yellow-900">Important Notice</p>
                <p className="text-sm text-yellow-800 mt-1">
                  This tool is for educational purposes only. Always consult with a healthcare professional before making any medication decisions. Drug interactions can be complex and patient-specific factors must be considered.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InteractionChecker;
