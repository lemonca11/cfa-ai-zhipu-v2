export default async function handler(req, res) {
  const { topic } = req.body;
  const response = await fetch("https://open.bigmodel.cn/api/paas/v4/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer 6a6c86f181a84da6b8e315b2b377c890.fHqPDniu4vA2Z4SF"
    },
    body: JSON.stringify({
      model: "glm-4",
      messages: [
        {
          role: "user",
          content: `请用以下JSON格式返回关于“${topic}”的讲解：{
            "title": "${topic}",
            "explanations": {
              "professional": "...",
              "beginner": "...",
              "case": "..."
            }
          }`
        }
      ]
    })
  });

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content || '{}';
  try {
    const result = JSON.parse(content);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: 'JSON解析失败', raw: content });
  }
}
