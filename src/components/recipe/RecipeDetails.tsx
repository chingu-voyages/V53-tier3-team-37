'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RecipeResult, Ingredient } from '../../app/(dashboard)/recipes/definitions/definitions';
import { X } from "lucide-react";
import { toast } from '@/hooks/use-toast';

interface RecipeDetailsProps {
  recipe: RecipeResult;
  onClose: () => void;
}

const RecipeDetails:React.FC<RecipeDetailsProps> = ({ recipe, onClose }) => {
  const [checkedIngredients, setCheckedIngredients] = useState<Set<string>>(new Set());


  console.log("dailyCalories: ", localStorage.getItem('dailyCalories'), " dailyProtein: ", localStorage.getItem('dailyProtein'))
  const toggleIngredient = (ingredient: string) => {
    setCheckedIngredients((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(ingredient)) {
        newSet.delete(ingredient);
      } else {
        newSet.add(ingredient);
      }
      return newSet;
    });
  };

  const addToDailyTracker = (calories: number, protein: number) => {
    // Get the current stored values
    const storedCalories = Number(localStorage.getItem("dailyCalories")) ?? 0;
    const storedProtein = Number(localStorage.getItem("dailyProtein")) ?? 0;
  
    // Update values
    const newCalories = storedCalories + calories;
    const newProtein = storedProtein + protein;
  
    // Save back to localStorage
    localStorage.setItem("dailyCalories", newCalories.toString());
    localStorage.setItem("dailyProtein", newProtein.toString());

    toast({
      title: "Nutrition Added!",
      description: `+${calories} kcal | +${protein}g protein`,
    });
  };

  return (
<div className="flex-1 px-2 flex flex-col min-h-0">
  {/* Close Button */}
  <button
    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
    onClick={onClose}
  >
    <X size={24} />
  </button>

  {/* Title */}
  <h2 className="text-2xl font-semibold text-gray-800 text-center mt-4">
    {recipe.title}
  </h2>

  {/* Ingredients Section */}
  <div className="flex-1 min-h-0 flex flex-col">
    <h3 className="text-xl font-semibold mb-4">Ingredients</h3>
    <ul className="flex-1 min-h-0 overflow-y-auto pr-2 bg-gray-100 rounded-md">
      {recipe.nutrition.ingredients.map((ingredient) => (
        <li key={ingredient.name} className="flex justify-between items-center p-2">
          <span
            className={`text-gray-800 transition-all ${
              checkedIngredients.has(ingredient.name) ? "line-through opacity-50" : ""
            }`}
          >
            {ingredient.name} ({ingredient.amount * recipe.servings} {ingredient.unit})
          </span>
          <input
            type="checkbox"
            checked={checkedIngredients.has(ingredient.name)}
            onChange={() => toggleIngredient(ingredient.name)}
            className="w-5 h-5"
          />
        </li>
      ))}
    </ul>
  </div>

  {/* Steps Section */}
  <div className="flex-1 min-h-0 flex flex-col mt-6">
    <h3 className="text-xl font-semibold mb-4">Steps</h3>
    <ol className="flex-1 min-h-0 overflow-y-auto bg-gray-100 pr-2 pl-5 rounded-md list-decimal list-inside space-y-3">
      {recipe.analyzedInstructions[0].steps.map((step) => (
        <li key={step.number} className="text-gray-700">{step.step}</li>
      ))}
    </ol>
  </div>

  {/* Add to Daily Tracker Button */}
  <button
    className="w-full bg-primary text-white px-6 py-3 rounded-lg shadow-lg mt-4"
    onClick={() => addToDailyTracker(
      recipe.nutrition.nutrients[0].amount, 
      recipe.nutrition.nutrients[10].amount
    )}
  >
    Add to Daily Tracker
  </button>
</div>
  );
};

export default RecipeDetails;