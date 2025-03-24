export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST requests allowed' });
  }

  const { question } = req.body;

  if (!question) {
    return res.status(400).json({ error: 'Missing question' });
  }

  try {
    const response = await fetch('https://open.bigmodel.cn/api/paas/v4/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 6a6c86f181a84da6b8e315b2b377c890.fHqPDniu4vA2Z4SF'
      },
      body: JSON.stringify({
        model: 'glm-4',
        messages: [
          {
            role: 'user',
            content: `请帮我用结构化方式讲解以下知识点：${question}，输出格式为：\n{
              title: '知识点标题',
              explanations: {
                professional: '专业版讲解',
                beginner: '小白版讲解',
                case: '案例版讲解'
              }
            }`
          }
        ]
      })
    });

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;
    const result = JSON.parse(content);
    res.status(200).json(result);
  } catch (err) {
    console.error('[智谱接口出错]', err);
    res.status(500).json({ error: '调用智谱失败', details: err.message });
  }
}
