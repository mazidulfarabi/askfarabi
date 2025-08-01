exports.handler = async function(event, context) {
  const { message } = JSON.parse(event.body || '{}');

  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "meta-llama/llama-3-8b-instruct",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: message }
      ]
    })
  });

  const data = await res.json();

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};
