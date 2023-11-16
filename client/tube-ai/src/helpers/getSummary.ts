export const getSummary = async (yturl: string): Promise<string> => {
  const res = await fetch("http://localhost:8080/api/summary", {
    method: "GET",
    headers: {
      "Content-Type": "text/plain",
    },
    body: yturl,
  });
  const summary: string = await res.json();
  return summary;
};