'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import { clubs } from '@/data/clubs';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  clubRecs?: string[];
  loading?: boolean;
}

const presetQuestions = [
  '我课程比较满，适合什么社团？',
  '我比较社恐，有没有低压力的社团？',
  '我想提升简历，优先考虑哪些社团？',
  '我零基础但想尝试技术类社团可以吗？',
  '有没有适合女生的体育社团？',
  '我想交朋友，哪些社团社交氛围好？',
];

// Fallback mock responses when AI API is not configured
const mockResponses: Record<string, { text: string; clubs: string[] }> = {
  '我课程比较满，适合什么社团？': {
    text: '课程比较满的同学，建议优先考虑时间投入较少（每周2-4小时）且活动不强制参加的社团。根据平台数据，以下社团的时间弹性较好：\n\n• **光影社**：每周1-2次活动，不强制参加，非常灵活\n• **绿行环保社**：每周仅1次活动，2-3小时，压力最小\n• **微光志愿团**：活动自由报名，可以根据课表灵活安排\n\n这些社团不会因为你某周没来就有压力，适合想参与但时间有限的同学。建议避免舞团、创行等需要固定训练时间的社团。',
    clubs: ['photo-club', 'green-action', 'volunteer-service'],
  },
  '我比较社恐，有没有低压力的社团？': {
    text: '完全理解你的顾虑！其实很多社团对内向同学非常友好。我帮你筛选了几个社交压力较小的：\n\n• **光影社**：活动以拍照为主，不需要太多社交互动，可以一个人安静创作\n• **绿行环保社**：氛围很轻松，活动以行动为主，不用演讲或展示\n• **AI前沿研究社**：学术氛围，大家都专注在技术上，社交压力很小\n\n而且，很多社团的老成员反馈，加入后社交焦虑反而减轻了，因为大家有共同话题，交流变得自然。你不需要一开始就很活跃，慢慢融入就好。',
    clubs: ['photo-club', 'green-action', 'ai-research'],
  },
  '我想提升简历，优先考虑哪些社团？': {
    text: '想提升简历竞争力，建议选择能产出"可量化成果"的社团。以下社团在简历加分方面表现突出：\n\n• **科创工坊**：竞赛获奖、项目经验、实习对接，成员平均拿到2个以上技术实习\n• **创行 Startup Lab**：创业项目经历 + 路演经验，很受互联网和咨询公司认可\n• **潮声新媒体**：新媒体运营数据、内容作品集，适合媒体/运营方向\n• **金融研习社**：行业研究报告 + 券商实习对接\n\n关键不是社团名字，而是你在社团中做了什么。建议选1-2个深度参与，而不是加很多社团但都浅尝辄止。',
    clubs: ['tech-innovation', 'startup-lab', 'media-studio', 'finance-club'],
  },
  '我零基础但想尝试技术类社团可以吗？': {
    text: '当然可以！零基础加入技术社团是非常常见的，不用担心。\n\n• **科创工坊**：明确欢迎零基础，有新手培训计划，约40%的成员入社时零基础。面试主要聊兴趣和想法，不考技术\n• **AI前沿研究社**：这个需要有基础的Python编程能力，建议先入门后再考虑\n\n如果你是完全零基础，建议路线：\n1. 先加入科创工坊，跟着新手培训学基础\n2. 大一下学期或大二再考虑AI研究社等进阶社团\n\n科创工坊的很多"大神"成员，大一入社时也是零基础。技术是可以学的，重要的是你有好奇心和行动力。',
    clubs: ['tech-innovation', 'ai-research'],
  },
  '有没有适合女生的体育社团？': {
    text: '当然有！\n\n• **飞翼篮球社**：有女子队和混合娱乐队，氛围很包容\n• **Pulse舞团**：男女都有，零基础也可以加入基础班，很多女生在这里从零学到上台表演\n\n除了传统体育社团，如果你想运动但不想太高强度，绿行环保社的自然观察徒步活动也是不错的选择，既运动又轻松。\n\n选择体育社团，最重要的是自己喜欢，不用在意性别比例。每个社团都很欢迎女生加入。',
    clubs: ['basketball-club', 'dance-crew', 'green-action'],
  },
  '我想交朋友，哪些社团社交氛围好？': {
    text: '想交朋友选社团，关键看两个指标：活动频率和互动深度。以下社团社交氛围特别好：\n\n• **飞翼篮球社**：打球本身就是社交，每周固定时间一起运动，很容易建立友谊\n• **Pulse舞团**：排练需要配合，大家感情会很深，公演后的成就感更是凝聚力的来源\n• **微光志愿团**：一起做公益的过程中很容易产生深度连接\n• **幕间戏剧社**：排戏的过程就像一个小家庭，归属感很强\n\n建议选一个活动频率适中（每周2-3次）的社团，太少见面不容易熟悉，太多容易疲劳。',
    clubs: ['basketball-club', 'dance-crew', 'volunteer-service', 'drama-troupe'],
  },
};

export default function AdvisorPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: '你好！我是社团星图的AI择团顾问 👋\n\n我了解平台上所有社团的信息，包括它们的活动内容、时间投入、招新要求和往届评价。你可以把我当作一个了解所有社团的学长/学姐，随时问我任何关于选社团的问题。\n\n你可以直接问我问题，或者点击下面的常见问题快速开始：',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [aiMode, setAiMode] = useState<'auto' | 'mock'>('auto');
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMsg: Message = { role: 'user', content: text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    // Add loading message
    setMessages(prev => [...prev, { role: 'assistant', content: '', loading: true }]);

    // Try real AI first, fallback to mock
    if (aiMode === 'auto') {
      try {
        const chatHistory = [...messages.filter(m => !m.loading), userMsg]
          .filter(m => m.role === 'user' || (m.role === 'assistant' && messages.indexOf(m) > 0))
          .map(m => ({ role: m.role, content: m.content }));

        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: chatHistory }),
        });

        const data = await res.json();

        if (!data.fallback && data.reply) {
          // Real AI response
          setMessages(prev => [
            ...prev.filter(m => !m.loading),
            { role: 'assistant', content: data.reply, clubRecs: data.clubRecs },
          ]);
          setIsLoading(false);
          return;
        }
      } catch {
        // Fall through to mock
      }
    }

    // Mock fallback
    const mockResponse = mockResponses[text] || {
      text: `关于"${text}"，让我帮你分析一下。\n\n根据平台数据和你的画像，我建议你可以先浏览我们的社团发现页面，使用筛选功能找到感兴趣的社团。如果你有更具体的问题，比如关于时间投入、面试准备或者特定社团的情况，随时问我！\n\n你也可以试试我们的智能匹配功能，1分钟完成建档就能获得个性化推荐。`,
      clubs: ['tech-innovation', 'photo-club'],
    };

    // Simulate typing delay for mock
    await new Promise(resolve => setTimeout(resolve, 600));

    setMessages(prev => [
      ...prev.filter(m => !m.loading),
      { role: 'assistant', content: mockResponse.text, clubRecs: mockResponse.clubs },
    ]);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      <div className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 py-6 flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 mb-1">AI 择团顾问</h1>
            <p className="text-slate-500 text-sm">像咨询学长学姐一样，问我关于选社团的任何问题</p>
          </div>
          {/* AI Mode Indicator */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setAiMode(aiMode === 'auto' ? 'mock' : 'auto')}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                aiMode === 'auto'
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : 'bg-slate-50 text-slate-500 border border-slate-200'
              }`}
            >
              {aiMode === 'auto' ? '🟢 AI 模式' : '⚪ 演示模式'}
            </button>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 card p-6 mb-4 overflow-y-auto max-h-[60vh] space-y-6">
          {messages.map((msg, i) => (
            <div key={i} className={`chat-bubble flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm ${
                msg.role === 'user' ? 'bg-primary-100 text-primary-600' : 'bg-gradient-to-br from-primary-500 to-accent-500 text-white'
              }`}>
                {msg.role === 'user' ? '我' : 'AI'}
              </div>
              <div className={`max-w-[80%] ${msg.role === 'user' ? 'text-right' : ''}`}>
                {msg.loading ? (
                  <div className="inline-block p-4 rounded-2xl bg-white border border-slate-100 rounded-bl-md shadow-sm">
                    <div className="flex items-center gap-2 text-sm text-slate-400">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-2 h-2 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-2 h-2 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                      <span>正在思考...</span>
                    </div>
                  </div>
                ) : (
                  <div className={`inline-block p-4 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-primary-500 text-white rounded-br-md'
                      : 'bg-white border border-slate-100 text-slate-700 rounded-bl-md shadow-sm'
                  }`}>
                    {msg.content.split('\n').map((line, j) => (
                      <p key={j} className={j > 0 ? 'mt-2' : ''}>
                        {line.split('**').map((part, k) =>
                          k % 2 === 1 ? <strong key={k}>{part}</strong> : part
                        )}
                      </p>
                    ))}
                  </div>
                )}

                {/* Club recommendations */}
                {msg.clubRecs && msg.clubRecs.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {msg.clubRecs.map(id => {
                      const club = clubs.find(c => c.id === id);
                      return club ? (
                        <Link
                          key={id}
                          href={`/student/club?id=${id}`}
                          className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white border border-slate-100 text-sm hover:border-primary-200 hover:shadow-sm transition-all"
                        >
                          <span>{club.logo}</span>
                          <span className="text-slate-700 font-medium">{club.name}</span>
                          <span className="text-xs text-primary-500">→</span>
                        </Link>
                      ) : null;
                    })}
                  </div>
                )}
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        {/* Preset Questions */}
        {messages.length <= 2 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {presetQuestions.map(q => (
              <button
                key={q}
                onClick={() => handleSend(q)}
                disabled={isLoading}
                className="px-4 py-2 rounded-full bg-white border border-slate-200 text-sm text-slate-600 hover:border-primary-300 hover:text-primary-600 hover:bg-primary-50 transition-all disabled:opacity-50"
              >
                {q}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && !e.nativeEvent.isComposing && handleSend(input)}
            placeholder="输入你的问题，比如「我内向但想参加社团怎么办」"
            className="input-field flex-1"
            disabled={isLoading}
          />
          <button
            onClick={() => handleSend(input)}
            disabled={isLoading || !input.trim()}
            className="btn-primary px-6 disabled:opacity-50"
          >
            {isLoading ? '...' : '发送'}
          </button>
        </div>

        <p className="text-xs text-slate-400 text-center mt-3">
          {aiMode === 'auto' ? 'AI顾问由大语言模型驱动，基于平台社团数据提供个性化建议' : '当前为演示模式，使用预设回答'}
          · 建议仅供参考
        </p>
      </div>
    </div>
  );
}
