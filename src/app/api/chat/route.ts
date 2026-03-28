import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { clubs } from '@/data/clubs';

// Build a compact club knowledge base for the system prompt
function buildClubKnowledge(): string {
  return clubs.map(club => {
    return `【${club.name}】类别:${club.category} | 标签:${club.tags.join(',')} | 人数:${club.memberCount} | 活动频率:${club.activityFrequency} | 周投入:${club.weeklyHours} | 门槛:${club.recruitRequirement} | 面试:${club.hasInterview ? club.interviewForm : '无需面试'} | 适合:${club.suitableFor.join('；')} | 不适合:${club.notSuitableFor.join('；')} | 满意度:${club.satisfaction}/5 | 留存率:${club.retentionRate}% | 简介:${club.description.slice(0, 100)}`;
  }).join('\n\n');
}

const SYSTEM_PROMPT = `你是"社团星图"平台的AI择团顾问，名字叫"星图助手"。你的角色是一位了解所有社团信息的热心学长/学姐，帮助大一新生选择适合自己的社团。

## 你的性格特点
- 亲切友好，像聊天一样自然，不要过于正式
- 专业但有人味，能回应新生的焦虑和犹豫
- 基于数据给建议，不随便推荐，推荐要说出理由
- 如果不确定，诚实说"这个我不太确定"

## 你掌握的社团信息
以下是平台上所有入驻社团的详细信息：

${buildClubKnowledge()}

## 回答规则
1. 推荐社团时，必须结合用户的具体情况（时间、兴趣、性格等）来推荐
2. 每次推荐不超过3-4个社团，并简要说明推荐理由
3. 如果用户有顾虑（社恐、时间少、零基础等），先回应顾虑再推荐
4. 用户问的如果不是社团相关的问题，友好地引导回社团话题
5. 回答控制在200字以内，简洁有重点
6. 可以适当使用emoji，但不要太多
7. 如果推荐了具体社团，在回答末尾用【推荐社团：社团名1、社团名2】的格式列出，方便前端提取

## 你不应该做的
- 不编造平台上不存在的社团
- 不给出超出平台信息范围的承诺
- 不评价社团的好坏，而是分析"适不适合你"`;

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json();

    const apiKey = process.env.AI_API_KEY;
    const baseURL = process.env.AI_BASE_URL || 'https://api.deepseek.com';
    const model = process.env.AI_MODEL || 'deepseek-chat';

    if (!apiKey) {
      return NextResponse.json(
        { error: 'AI API key not configured', fallback: true },
        { status: 200 }
      );
    }

    const client = new OpenAI({
      apiKey,
      baseURL,
    });

    const completion = await client.chat.completions.create({
      model,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        ...messages.map((m: { role: string; content: string }) => ({
          role: m.role as 'user' | 'assistant',
          content: m.content,
        })),
      ],
      max_tokens: 800,
      temperature: 0.7,
    });

    const reply = completion.choices[0]?.message?.content || '抱歉，我暂时无法回答，请稍后再试。';

    // Extract recommended club names from the response
    const clubMatch = reply.match(/【推荐社团[：:](.*?)】/);
    const recommendedClubNames = clubMatch
      ? clubMatch[1].split(/[、,，]/).map(s => s.trim())
      : [];

    // Map names to IDs
    const recommendedClubIds = recommendedClubNames
      .map(name => clubs.find(c => c.name.includes(name) || name.includes(c.name))?.id)
      .filter(Boolean) as string[];

    // Clean up the reply (remove the club tag at the end)
    const cleanReply = reply.replace(/【推荐社团[：:].*?】/g, '').trim();

    return NextResponse.json({
      reply: cleanReply,
      clubRecs: recommendedClubIds,
    });
  } catch (error) {
    console.error('AI API error:', error);
    return NextResponse.json(
      { error: 'AI service temporarily unavailable', fallback: true },
      { status: 200 }
    );
  }
}
