export const getSummary = async (videoid: string): Promise<string> => {
  const res = await fetch("http://localhost:8080/api/summarize", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ videoid: videoid }),
  });
  const summary: string = await res.text();
  return summary;
};