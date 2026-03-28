'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';

const interestOptions = ['技术', '创新', '公益', '文艺', '体育', '媒体', '学术', '商业', '表达'];
const goalOptions = ['交友', '提升技能', '竞赛经历', '简历加分', '兴趣探索'];
const personalityOptions = [
  { group: '社交风格', options: ['外向', '内向'] },
  { group: '做事风格', options: ['执行型', '策划型'] },
  { group: '角色偏好', options: ['舞台前', '幕后'] },
];
const skillOptions = ['Python', '编程', 'JavaScript', '前端', '后端', '数据分析', '设计', '视频剪辑', '写作', '摄影', '演讲', '其他'];
const timeOptions = ['2-3小时', '4-6小时', '6-10小时', '10小时以上'];

export default function ProfilePage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [interests, setInterests] = useState<string[]>([]);
  const [goals, setGoals] = useState<string[]>([]);
  const [personality, setPersonality] = useState<string[]>([]);
  const [skills, setSkills] = useState<string[]>([]);
  const [time, setTime] = useState('');
  const [acceptInterview, setAcceptInterview] = useState(true);
  const [acceptTrial, setAcceptTrial] = useState(true);

  const totalSteps = 4;

  const toggleItem = (list: string[], setList: (v: string[]) => void, item: string) => {
    setList(list.includes(item) ? list.filter(i => i !== item) : [...list, item]);
  };

  const canNext = () => {
    if (step === 0) return interests.length > 0;
    if (step === 1) return goals.length > 0 && time !== '';
    if (step === 2) return personality.length > 0;
    return true;
  };

  const handleSubmit = () => {
    router.push('/student/match');
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">智能建档</h1>
          <p className="text-slate-500">只需1分钟，帮你找到更适合的社团</p>
        </div>

        {/* Progress */}
        <div className="flex items-center gap-2 mb-10 max-w-md mx-auto">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div key={i} className="flex-1 flex items-center gap-2">
              <div className={`h-1.5 flex-1 rounded-full transition-all ${i <= step ? 'bg-primary-500' : 'bg-slate-200'}`} />
            </div>
          ))}
          <span className="text-sm text-slate-400 ml-2">{step + 1}/{totalSteps}</span>
        </div>

        <div className="card p-8">
          {/* Step 0: Interests */}
          {step === 0 && (
            <div className="animate-fade-in">
              <h2 className="text-lg font-semibold text-slate-900 mb-1">你对哪些方向感兴趣？</h2>
              <p className="text-sm text-slate-500 mb-6">可多选，这会帮助AI理解你的偏好方向</p>
              <div className="grid grid-cols-3 gap-3">
                {interestOptions.map(item => (
                  <button
                    key={item}
                    onClick={() => toggleItem(interests, setInterests, item)}
                    className={`p-4 rounded-xl border-2 text-sm font-medium transition-all ${
                      interests.includes(item)
                        ? 'border-primary-500 bg-primary-50 text-primary-700'
                        : 'border-slate-100 bg-white text-slate-600 hover:border-slate-200'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 1: Goals & Time */}
          {step === 1 && (
            <div className="animate-fade-in">
              <h2 className="text-lg font-semibold text-slate-900 mb-1">你加入社团的目标是？</h2>
              <p className="text-sm text-slate-500 mb-6">选择你最看重的目标，可多选</p>
              <div className="flex flex-wrap gap-3 mb-8">
                {goalOptions.map(item => (
                  <button
                    key={item}
                    onClick={() => toggleItem(goals, setGoals, item)}
                    className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                      goals.includes(item)
                        ? 'bg-primary-500 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>

              <h2 className="text-lg font-semibold text-slate-900 mb-1">每周可投入多少时间？</h2>
              <p className="text-sm text-slate-500 mb-4">选择一个你能舒适维持的时间范围</p>
              <div className="grid grid-cols-2 gap-3">
                {timeOptions.map(item => (
                  <button
                    key={item}
                    onClick={() => setTime(item)}
                    className={`p-3 rounded-xl border-2 text-sm font-medium transition-all ${
                      time === item
                        ? 'border-primary-500 bg-primary-50 text-primary-700'
                        : 'border-slate-100 bg-white text-slate-600 hover:border-slate-200'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Personality */}
          {step === 2 && (
            <div className="animate-fade-in">
              <h2 className="text-lg font-semibold text-slate-900 mb-1">你的性格偏好</h2>
              <p className="text-sm text-slate-500 mb-6">帮助我们推荐与你风格更契合的社团</p>
              {personalityOptions.map(group => (
                <div key={group.group} className="mb-6">
                  <p className="text-sm font-medium text-slate-700 mb-3">{group.group}</p>
                  <div className="flex gap-3">
                    {group.options.map(item => (
                      <button
                        key={item}
                        onClick={() => toggleItem(personality, setPersonality, item)}
                        className={`flex-1 p-3 rounded-xl border-2 text-sm font-medium transition-all ${
                          personality.includes(item)
                            ? 'border-primary-500 bg-primary-50 text-primary-700'
                            : 'border-slate-100 bg-white text-slate-600 hover:border-slate-200'
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Step 3: Skills & Preferences */}
          {step === 3 && (
            <div className="animate-fade-in">
              <h2 className="text-lg font-semibold text-slate-900 mb-1">已有技能（可选）</h2>
              <p className="text-sm text-slate-500 mb-4">帮我们匹配更精准的社团</p>
              <div className="flex flex-wrap gap-2 mb-8">
                {skillOptions.map(item => (
                  <button
                    key={item}
                    onClick={() => toggleItem(skills, setSkills, item)}
                    className={`px-4 py-2 rounded-full text-sm transition-all ${
                      skills.includes(item)
                        ? 'bg-primary-500 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>

              <h2 className="text-lg font-semibold text-slate-900 mb-4">你的接受度</h2>
              <div className="space-y-4">
                <label className="flex items-center justify-between p-4 rounded-xl border border-slate-100 bg-white cursor-pointer hover:border-slate-200">
                  <span className="text-sm text-slate-700">接受面试选拔</span>
                  <div className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${acceptInterview ? 'bg-primary-500' : 'bg-slate-200'}`}
                    onClick={() => setAcceptInterview(!acceptInterview)}>
                    <div className={`w-5 h-5 rounded-full bg-white shadow-sm absolute top-0.5 transition-transform ${acceptInterview ? 'translate-x-5' : 'translate-x-0.5'}`} />
                  </div>
                </label>
                <label className="flex items-center justify-between p-4 rounded-xl border border-slate-100 bg-white cursor-pointer hover:border-slate-200">
                  <span className="text-sm text-slate-700">接受试训期</span>
                  <div className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${acceptTrial ? 'bg-primary-500' : 'bg-slate-200'}`}
                    onClick={() => setAcceptTrial(!acceptTrial)}>
                    <div className={`w-5 h-5 rounded-full bg-white shadow-sm absolute top-0.5 transition-transform ${acceptTrial ? 'translate-x-5' : 'translate-x-0.5'}`} />
                  </div>
                </label>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-100">
            <button
              onClick={() => setStep(Math.max(0, step - 1))}
              className={`btn-ghost ${step === 0 ? 'invisible' : ''}`}
            >
              ← 上一步
            </button>
            {step < totalSteps - 1 ? (
              <button
                onClick={() => setStep(step + 1)}
                disabled={!canNext()}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                下一步 →
              </button>
            ) : (
              <button onClick={handleSubmit} className="btn-primary shadow-lg shadow-primary-200">
                🎯 开始匹配
              </button>
            )}
          </div>
        </div>

        {/* Reassurance */}
        <div className="mt-6 text-center">
          <p className="text-xs text-slate-400">你的信息仅用于匹配推荐，不会公开展示给其他用户</p>
        </div>
      </div>
    </div>
  );
}
