import { useState } from 'react';

export default function YarnSubstitutionTool() {
  const yarnWeights = [
    { id: '0', name: 'Lace (0)', avgMeters: 915 }, // average of 730-1100m per 100g
    { id: '1', name: 'Super Fine (1)', avgMeters: 457.5 }, // average of 365-550m per 100g
    { id: '2', name: 'Fine (2)', avgMeters: 355 }, // average of 300-410m per 100g
    { id: '3', name: 'Light (3)', avgMeters: 265 }, // average of 220-310m per 100g
    { id: '4', name: 'Medium/Worsted (4)', avgMeters: 192.5 }, // average of 165-220m per 100g
    { id: '5', name: 'Bulky (5)', avgMeters: 110 }, // average of 90-130m per 100g
    { id: '6', name: 'Super Bulky (6)', avgMeters: 72.5 }, // average of 55-90m per 100g
    { id: '7', name: 'Jumbo (7)', avgMeters: 50 } // estimated <45m per 100g
  ];

  const [targetYarn, setTargetYarn] = useState({ weight: '', amount: '' });
  const [substituteYarn, setSubstituteYarn] = useState({ weight: '' });
  const [unit, setUnit] = useState('meters');
  const [result, setResult] = useState(null);

  const handleCalc = () => {
    if (!targetYarn.weight || !targetYarn.amount || !substituteYarn.weight) {
      alert('Please fill in all fields');
      return;
    }

    const targetAmount = parseFloat(targetYarn.amount);
    if (targetAmount <= 0 || isNaN(targetAmount)) {
      alert('Please enter a valid amount');
      return;
    }

    const targetWeight = yarnWeights.find(w => w.id === targetYarn.weight);
    const substituteWeight = yarnWeights.find(w => w.id === substituteYarn.weight);

    if (!targetWeight || !substituteWeight) {
      alert('Invalid yarn weights selected');
      return;
    }

    // Convert input to meters if needed for calculation
    const targetAmountInMeters = unit === 'meters' ? targetAmount : targetAmount * 0.9144;

    // Simple ratio calculation: if you need X meters of target yarn,
    // you need (X * substitute_weight / target_weight) meters of substitute yarn
    const conversionRatio = targetWeight.avgMeters / substituteWeight.avgMeters;
    const substituteAmountInMeters = targetAmountInMeters * conversionRatio;

    // Convert result back to user's preferred unit
    const substituteAmountResult = unit === 'meters' ? substituteAmountInMeters : substituteAmountInMeters / 0.9144;

    let advice = '';
    if (conversionRatio > 1.2) {
      advice = 'The substitute yarn is thicker - you\'ll need less length but should adjust your needle size and gauge.';
    } else if (conversionRatio < 0.8) {
      advice = 'The substitute yarn is thinner - you\'ll need more length but should adjust your needle size and gauge.';
    } else {
      advice = 'These yarn weights are similar - the substitution should work well with minimal adjustments.';
    }

    setResult({
      advice,
      substituteAmount: substituteAmountResult.toFixed(1),
      conversionRatio: conversionRatio.toFixed(2),
      unit
    });
  };

  return (
    <div className="yarn-tool">
      <h3>Yarn Substitute Calculator</h3>

      <div>
        <label>Target yarn weight:</label>
        <select value={targetYarn.weight} onChange={e => setTargetYarn(prev => ({ ...prev, weight: e.target.value }))}>
          <option value="">Select yarn weight</option>
          {yarnWeights.map(w => <option key={w.id} value={w.id}>{w.name}</option>)}
        </select>
        <input 
          type="number" 
          placeholder={`Amount you have (${unit})`}
          value={targetYarn.amount} 
          onChange={e => setTargetYarn(prev => ({ ...prev, amount: e.target.value }))} 
        />
        <select value={unit} onChange={e => setUnit(e.target.value)}>
          <option value="meters">Meters</option>
          <option value="yards">Yards</option>
        </select>
      </div>

      <div>
        <label>Substitute yarn weight:</label>
        <select value={substituteYarn.weight} onChange={e => setSubstituteYarn(prev => ({ ...prev, weight: e.target.value }))}>
          <option value="">Select yarn weight</option>
          {yarnWeights.map(w => <option key={w.id} value={w.id}>{w.name}</option>)}
        </select>
      </div>

      <button className="btn" onClick={handleCalc}>Calculate</button>

      <div>
        <label>Amount converted:</label>
        <input 
          type="text" 
          placeholder={`Converted amount (${unit})`}
          value={result ? result.substituteAmount : ''} 
          readOnly
          style={{backgroundColor: '#f0f0f0'}}
        />
      </div>

      {result && (
        <div className="result">
          <p><strong>{result.advice}</strong></p>
          <p>Conversion ratio: {result.conversionRatio}× (substitute/target)</p>
        </div>
      )}

      {/* CSS Styles */}
      <style>
        {`
          .btn {
            background: #007bff;
            color: white;
            padding: 0.5rem 1rem;
            border-radius: 0.25rem;
            border: none;
            cursor: pointer;
            margin-top: 1rem;
            display: block;
            font-size: 16px;
          }
          .btn:hover {
            background: #0056b3;
          }
          .yarn-tool {
            background: #f9f9f9;
            padding: 1rem;
            border-radius: 8px;
            max-width: 600px;
          }
          select, input {
            margin: 0.5rem 0;
            display: block;
          }
        `}
      </style>
    </div>
  );
}