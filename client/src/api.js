export const fetchCategories = async () => {
  const response = await fetch("https://opentdb.com/api_category.php");
  const data = await response.json();
  const educationalCategoryIds = [17, 18, 19, 21, 22]; // Add more educational category IDs as needed
  return data.trivia_categories.filter((category) =>
    educationalCategoryIds.includes(category.id)
  );
};
