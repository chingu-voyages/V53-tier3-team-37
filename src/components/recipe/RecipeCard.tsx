'use client'

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import RecipeDetails from "./RecipeDetails";
import { RecipeResult } from "@/app/(dashboard)/recipes/definitions/definitions";

interface RecipeCardProps {
  recipe: RecipeResult
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  const [isFlipped, setIsFlipped] = useState(false);


  return (
    <div className="flex justify-center items-center min-h-screen w-full px-4 sm:px-6" style={{ perspective: "1000px" }}>
      <motion.div
        className="relative w-full max-w-md h-[90vh]"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        <AnimatePresence mode="wait">
        {!isFlipped ? (
            <motion.div
              key="front"
              className="absolute w-full h-full bg-white flex flex-col items-center p-4 rounded-2xl shadow-lg overflow-hidden"
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >

            <h2 className="text-2xl font-bold text-center text-gray-900">{recipe.title}</h2>
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-40 object-cover rounded-2xl mt-2 shadow-md mx-auto"
            />
            <div className="bg-white/70 p-3 rounded-lg shadow-sm w-full h-24 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
            dangerouslySetInnerHTML={{ __html: recipe.summary }} />

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="relative flex flex-col items-center bg-white/50 backdrop-blur-md p-4 rounded-md shadow-md overflow-hidden">
                <div className="absolute bottom-0 right-0 w-full h-full bg-gradient-to-tl from-transparent from-40% to-red-400 opacity-40 pointer-events-none"></div>
                <p className="text-sm font-medium text-gray-600">Calories</p>
                <p className="text-2xl font-bold text-gray-900">
                  {recipe.nutrition.nutrients[0].amount} <span className="text-xs text-gray-600">kcal</span>
                </p>
              </div>
              <div className="relative flex flex-col items-center bg-white/50 backdrop-blur-md p-4 rounded-md shadow-md overflow-hidden">
                <div className="absolute bottom-0 right-0 w-full h-full bg-gradient-to-tl from-transparent from-40% to-teal-400 opacity-40 pointer-events-none"></div>
                <p className="text-sm font-medium text-gray-600">Carbs</p>
                <p className="text-2xl font-bold text-gray-900">
                  {recipe.nutrition.nutrients[3].amount} <span className="text-xs text-gray-600">g</span>
                </p>
              </div>
              <div className="relative flex flex-col items-center bg-white/50 backdrop-blur-md p-4 rounded-md shadow-md overflow-hidden">
                <div className="absolute bottom-0 right-0 w-full h-full bg-gradient-to-tl from-transparent from-40% to-yellow-400 opacity-40 pointer-events-none"></div>
                <p className="text-sm font-medium text-gray-600">Fat</p>
                <p className="text-2xl font-bold text-gray-900">
                  {recipe.nutrition.nutrients[1].amount} <span className="text-xs text-gray-600">g</span>
                </p>
              </div>
              <div className="relative flex flex-col items-center bg-white/50 backdrop-blur-md p-4 rounded-md shadow-md overflow-hidden">
                <div className="absolute bottom-0 right-0 w-full h-full bg-gradient-to-tl from-transparent from-40% to-lime-400 opacity-40 pointer-events-none"></div>
                <p className="text-sm font-medium text-gray-600">Protein</p>
                <p className="text-2xl font-bold text-gray-900">
                  {recipe.nutrition.nutrients[10].amount} <span className="text-xs text-gray-600">g</span>
                </p>
              </div>
            </div>

            <button
              className="mt-6 px-5 py-3 w-full bg-gradient-to-r from-red-400 to-yellow-400 text-white font-semibold rounded-xl shadow-md transition-all hover:scale-105 hover:shadow-lg"
              onClick={(e) => {
                e.stopPropagation();
                setIsFlipped(true);
              }}
            >
              Let’s Cook!
            </button>
          </motion.div>
          ) : (
            <motion.div
              key="back"
              className="absolute w-full h-full bg-white p-4 rounded-2xl shadow-lg flex flex-col overflow-hidden"
              initial={{ opacity: 0, rotateY: 180 }}
              animate={{ opacity: 1, rotateY: 180 }}
              exit={{ opacity: 0 }}
            >
              <RecipeDetails recipe={recipe} onClose={() => setIsFlipped(false)} />
            </motion.div>
          
        )}
        </AnimatePresence>
    </motion.div>
    </div>
  );
};

export default RecipeCard;