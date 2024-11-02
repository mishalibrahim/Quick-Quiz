"use server";
export const getQuizQuestions = async () => {
  try {
    const questions = [
      {
        id: 1,
        question: "Which company developed JavaScript?",
        options: ["Netscape", "Microsoft", "Google", "Apple"],
        answers: ["Netscape"],
      },
      {
        id: 2,
        question: "Which of the following are JavaScript frameworks?",
        options: ["React", "Laravel", "Django", "Rails", "Angular"],
        answers: ["React", "Angular"],
      },
      {
        id: 3,
        imgsrc: "/assets/question2.png",
        question: "What is the output of '2' + 2 in JavaScript?",
        options: ["4", "'22'", "NaN", "undefined"],
        answers: ["'22'"],
      },
    ];
    return { status: 200, data: questions };
  } catch (error) {
    return { status: 500, error: error };
  }
};

export const submitAnswer = async ({
  questionId,
  selectedOptions,
  timeTaken,
}) => {
  try {
    console.log("Submitting answer for question", questionId);
    return { status: 200, success: true };
  } catch (error) {
    return { status: 500, error: error };
  }
};

export const finishTest = async (userAnswers) => {
    console.log('userAnswers', userAnswers);
  try {
    const response = await getQuizQuestions();
    const questions = response.data;
    let correctAnswers = 0;

    userAnswers.forEach((userAnswer) => {
      const question = questions.find((q) => q.id === userAnswer.questionId);
      const isCorrect =
        question.answers.every((answer) =>
          userAnswer.selectedOptions.includes(answer)
        ) &&
        userAnswer.selectedOptions.every((option) =>
          question.answers.includes(option)
        );
      console.log(
        `Question ${question.id}: ${isCorrect ? "Correct" : "Incorrect"}`
      );
      if (isCorrect) {
        correctAnswers++;
      }
    });

    const totalQuestions = questions.length;
    const score = (correctAnswers / totalQuestions) * 100;

    const data = { correctAnswers, totalQuestions, score };

    return { status: 200, data };
  } catch (error) {
    return { status: 500, error: error };
  }
};
