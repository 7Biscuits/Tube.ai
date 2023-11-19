export const getAnswer = async (
  videoId: string,
  question: string
): Promise<string> => {
  const res = await fetch("http://localhost:8080/api/question", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ videoId, question }),
  });
  const answer: string = await res.text();
  return answer;
};