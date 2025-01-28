export const getRecipes = async (
  weight: string,
  height: string,
  age: string,
  activityLevel: string,
  gender: string,
  mealsPerDay: string = "3"
) => {
  const addBMR = gender === "men" ? 5 : -161;
  const BMR =
    10 * parseFloat(weight) +
    6.25 * parseFloat(height) -
    5 * parseInt(age) +
    addBMR;
    
  const activityLevelNum = () => {
    switch (activityLevel) {
      case "sedentary":
        return 1.2;
      case "lightly active":
        return 1.375;
      case "moderately active":
        return 1.55;
      case "very active":
        return 1.725;
      case "super active":
        return 1.9;
      default:
        throw new Error("Invalid activity level");
    }
  };

  const calories = (BMR * activityLevelNum()) / parseInt(mealsPerDay);
  const protein = (calories * 0.2) / 4;
  const fat = (calories * 0.3) / 9;
  const carbs = (calories * 0.5) / 4;

  const maxCalories = Math.round(calories * 1.1);
  const minCalories = Math.round(calories * 0.9);
  const maxProtein = Math.round(protein * 1.1);
  const minProtein = Math.round(protein * 0.9);
  const maxFat = Math.round(fat * 1.1);
  const minFat = Math.round(fat * 0.9);
  const maxCarbs = Math.round(carbs * 1.1);
  const minCarbs = Math.round(carbs * 0.9);

  try {
    // all parameters -> 0 recipes
    const res = await fetch(
      `https://api.spoonacular.com/recipes/findByNutrients?maxCalories=${maxCalories}&minCalories=${minCalories}&maxProtein=${maxProtein}&minProtein=${minProtein}&maxFat=${maxFat}&minFat=${minFat}&maxCarbs=${maxCarbs}&minCarbs=${minCarbs}&apiKey=${process.env.SPOONACULAR_API_KEY}`
    );

    // only calories -> 10 recipes
    // const res = await fetch(
    //   `https://api.spoonacular.com/recipes/findByNutrients?maxCalories=${maxCalories}&minCalories=${minCalories}&apiKey=${process.env.SPOONACULAR_API_KEY}`
    // );

    // calories and protein -> 10 recipes
    // const res = await fetch(
    //   `https://api.spoonacular.com/recipes/findByNutrients?maxCalories=${maxCalories}&minCalories=${minCalories}&maxProtein=${maxProtein}&minProtein=${minProtein}&apiKey=${process.env.SPOONACULAR_API_KEY}`
    // );

    // calories, protein, fat -> 5 recipes
    // const res = await fetch(
    //   `https://api.spoonacular.com/recipes/findByNutrients?maxCalories=${maxCalories}&minCalories=${minCalories}&maxProtein=${maxProtein}&minProtein=${minProtein}&maxFat=${maxFat}&minFat=${minFat}&apiKey=${process.env.SPOONACULAR_API_KEY}`
    // );

    // calories, protein, carbs -> 3 recipes
    // const res = await fetch(
    //   `https://api.spoonacular.com/recipes/findByNutrients?maxCalories=${maxCalories}&minCalories=${minCalories}&maxProtein=${maxProtein}&minProtein=${minProtein}&maxCarbs=${maxCarbs}&minCarbs=${minCarbs}&apiKey=${process.env.SPOONACULAR_API_KEY}`
    // );

    // only max -> 10 recipes
    // const res = await fetch(
    //   `https://api.spoonacular.com/recipes/findByNutrients?maxCalories=${maxCalories}&maxProtein=${maxProtein}&maxFat=${maxFat}&maxCarbs=${maxCarbs}&apiKey=${process.env.SPOONACULAR_API_KEY}`
    // );

    // only min -> 10 recipes
    // const res = await fetch(
    //   `https://api.spoonacular.com/recipes/findByNutrients?&minCalories=${minCalories}&minProtein=${minProtein}&minFat=${minFat}&minCarbs=${minCarbs}&apiKey=${process.env.SPOONACULAR_API_KEY}`
    // );

    // const res = await fetch(
    //   `https://api.spoonacular.com/recipes/findByNutrients?maxCalories=${maxCalories}&minCalories=${minCalories}&maxProtein=${maxProtein}&minProtein=${minProtein}&maxFat=${maxFat}&minFat=${minFat}&maxCarbs=${maxCarbs}&minCarbs=${minCarbs}&apiKey=${process.env.SPOONACULAR_API_KEY}`
    // );

    // const res = await fetch(
    //   `https://api.spoonacular.com/recipes/findByNutrients?maxCalories=${maxCalories}&minCalories=${minCalories}&maxProtein=${maxProtein}&minProtein=${minProtein}&maxFat=${maxFat}&minFat=${minFat}&maxCarbs=${maxCarbs}&minCarbs=${minCarbs}&apiKey=${process.env.SPOONACULAR_API_KEY}`
    // );

    if (!res.ok) {
      return null;
    }

    const recipes = await res.json();
 
    return recipes;
  } catch (err) {
    console.error("Calculation of nutrients Failed:", err);
  }
};
