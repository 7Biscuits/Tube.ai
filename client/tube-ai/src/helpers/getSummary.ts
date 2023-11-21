interface IData {
  title: string;
  channel: string;
  summary: string;
}

export const getSummary = async (videoid: string): Promise<IData> => {
  const res = await fetch("http://localhost:8080/api/summarize", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ videoid: videoid }),
  });
  const data: IData = await res.json();
  return {
    title: data.title,
    channel: data.channel,
    summary: data.summary
  }
};