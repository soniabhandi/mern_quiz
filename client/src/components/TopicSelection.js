import { useContext, useEffect, useState } from "react";
import { QuizContext } from "../contexts/quiz";
import { fetchCategories } from "../api";
import "./topic.css";

const TopicSelection = () => {
  const [categories, setCategories] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState("");
  const [quizState, dispatch] = useContext(QuizContext);

  useEffect(() => {
    const getCategories = async () => {
      const categories = await fetchCategories();
      setCategories(categories);
    };
    getCategories();
  }, []);

  const handleTopicSelect = (topicId) => {
    setSelectedTopic(topicId);
    dispatch({ type: "SET_TOPIC", payload: topicId });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedTopic) {
      dispatch({ type: "START_QUIZ" });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="topic-selection">
      <h2>Select a Topic</h2>
      {categories.map((category) => (
        <div key={category.id}>
          <label>
            <input
              type="radio"
              value={category.id}
              checked={selectedTopic === category.id}
              onChange={() => handleTopicSelect(category.id)}
            />
            {category.name}
          </label>
        </div>
      ))}
      <button type="submit" disabled={!selectedTopic}>
        Start Quiz
      </button>
    </form>
  );
};

export default TopicSelection;
