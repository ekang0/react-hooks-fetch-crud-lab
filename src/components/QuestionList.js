import React, { useState, useEffect } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questionList, setQuestionList] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
    .then((res) => res.json())
    .then((data) => {
      //console.log(data);
      setQuestionList(data);
    });
  }, []);

  function handleDeleteClick(id){
    //console.log(id);
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE"
    })
    .then((res) => res.json())
    .then(() => {
      const updateQuestionList = questionList.filter((question) => question.id !== id)
      setQuestionList(updateQuestionList);
    })
    //console.log("delete successful")
  };

  function handleAnswerChange(id, correctIndex) {
    console.log(id, correctIndex);
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "correctIndex": correctIndex
      })
    })
    .then((res) => res.json())
    .then((updatedQuestion)=> {
      console.log(updatedQuestion);
      const updatedQuestionList = questionList.map((question) => question.id === updatedQuestion.id ? updatedQuestion : question);
      setQuestionList(updatedQuestionList);
    });
  };

  const questionItems = questionList.map((question) => {
    return (
      <QuestionItem 
      key={question.id}
      question={question}
      onDeleteClick={handleDeleteClick}
      onAnswerChange={handleAnswerChange}
      />
    )
  });

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questionItems}</ul>
    </section>
  );
}

export default QuestionList;
