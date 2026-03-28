import { Application, ClubApplicant } from './types';

export const mockApplications: Application[] = [
  {
    id: 'app-1',
    clubId: 'tech-innovation',
    clubName: '科创工坊',
    status: 'interview',
    appliedAt: '2025-09-05',
    updatedAt: '2025-09-12',
    interviewTime: '9月14日 14:00',
    interviewLocation: '创新楼 302室',
    notes: '请准备一段简短的自我介绍，聊聊你感兴趣的技术方向',
    timeline: [
      { date: '9月5日', event: '提交报名', status: 'done' },
      { date: '9月8日', event: '报名确认', status: 'done' },
      { date: '9月12日', event: '通知面试', status: 'done' },
      { date: '9月14日', event: '面试', status: 'current' },
      { date: '9月18日', event: '结果通知', status: 'pending' },
    ],
  },
  {
    id: 'app-2',
    clubId: 'photo-club',
    clubName: '光影社',
    status: 'joined',
    appliedAt: '2025-09-03',
    updatedAt: '2025-09-15',
    timeline: [
      { date: '9月3日', event: '提交报名', status: 'done' },
      { date: '9月5日', event: '报名确认', status: 'done' },
      { date: '9月15日', event: '确认加入', status: 'done' },
    ],
  },
  {
    id: 'app-3',
    clubId: 'ai-research',
    clubName: 'AI前沿研究社',
    status: 'written_test',
    appliedAt: '2025-09-08',
    updatedAt: '2025-09-13',
    notes: '请于9月15日前完成在线笔试，链接已发送至邮箱',
    timeline: [
      { date: '9月8日', event: '提交报名', status: 'done' },
      { date: '9月10日', event: '报名确认', status: 'done' },
      { date: '9月13日', event: '发送笔试', status: 'current' },
      { date: '9月18日', event: '面试', status: 'pending' },
      { date: '9月22日', event: '结果通知', status: 'pending' },
    ],
  },
  {
    id: 'app-4',
    clubId: 'debate-team',
    clubName: '思辩社',
    status: 'submitted',
    appliedAt: '2025-09-10',
    updatedAt: '2025-09-10',
    timeline: [
      { date: '9月10日', event: '提交报名', status: 'done' },
      { date: '9月12日', event: '报名确认', status: 'pending' },
      { date: '9月14日', event: '面试', status: 'pending' },
      { date: '9月16日', event: '结果通知', status: 'pending' },
    ],
  },
  {
    id: 'app-5',
    clubId: 'startup-lab',
    clubName: '创行 Startup Lab',
    status: 'rejected',
    appliedAt: '2025-09-06',
    updatedAt: '2025-09-16',
    notes: '感谢你的申请！本次招新竞争较为激烈，我们鼓励你下学期继续报名。',
    timeline: [
      { date: '9月6日', event: '提交报名', status: 'done' },
      { date: '9月8日', event: '报名确认', status: 'done' },
      { date: '9月15日', event: '面试', status: 'done' },
      { date: '9月16日', event: '未通过', status: 'done' },
    ],
  },
];

export const mockApplicants: ClubApplicant[] = [
  { id: 'a1', name: '张明远', avatar: '👨‍💻', interests: ['编程', '算法', 'AI'], matchScore: 92, skills: ['Python', 'C++', 'TensorFlow'], goals: ['竞赛经历', '提升技能'], appliedAt: '2025-09-05', status: 'interview' },
  { id: 'a2', name: '李思琪', avatar: '👩‍🎓', interests: ['前端', '设计', '产品'], matchScore: 88, skills: ['JavaScript', 'Figma'], goals: ['提升技能', '简历加分'], appliedAt: '2025-09-06', status: 'reviewing' },
  { id: 'a3', name: '王浩宇', avatar: '🧑‍💻', interests: ['硬件', 'IoT', '机器人'], matchScore: 85, skills: ['Arduino', 'Python'], goals: ['竞赛经历', '兴趣探索'], appliedAt: '2025-09-06', status: 'reviewing' },
  { id: 'a4', name: '陈雨涵', avatar: '👩‍💼', interests: ['数据分析', '机器学习'], matchScore: 78, skills: ['Python', 'SQL'], goals: ['提升技能', '简历加分'], appliedAt: '2025-09-07', status: 'submitted' },
  { id: 'a5', name: '赵天成', avatar: '🧔', interests: ['Web开发', '创业'], matchScore: 75, skills: ['React', 'Node.js'], goals: ['简历加分', '交友'], appliedAt: '2025-09-08', status: 'submitted' },
  { id: 'a6', name: '孙晓彤', avatar: '👩‍🔬', interests: ['算法', '数学建模'], matchScore: 91, skills: ['C++', 'MATLAB', 'Python'], goals: ['竞赛经历', '提升技能'], appliedAt: '2025-09-05', status: 'accepted' },
  { id: 'a7', name: '郑宇轩', avatar: '👨‍🎨', interests: ['UI设计', '前端'], matchScore: 72, skills: ['Figma', 'CSS'], goals: ['兴趣探索', '交友'], appliedAt: '2025-09-09', status: 'submitted' },
  { id: 'a8', name: '吴梦琳', avatar: '👩‍🏫', interests: ['编程', '教育技术'], matchScore: 80, skills: ['Python', 'Java'], goals: ['提升技能', '竞赛经历'], appliedAt: '2025-09-07', status: 'interview' },
];

export const statusMap: Record<string, { label: string; color: string; bgColor: string }> = {
  submitted: { label: '已投递', color: 'text-blue-700', bgColor: 'bg-blue-50' },
  reviewing: { label: '审核中', color: 'text-amber-700', bgColor: 'bg-amber-50' },
  written_test: { label: '待笔试', color: 'text-purple-700', bgColor: 'bg-purple-50' },
  interview: { label: '待面试', color: 'text-orange-700', bgColor: 'bg-orange-50' },
  accepted: { label: '已录取', color: 'text-emerald-700', bgColor: 'bg-emerald-50' },
  rejected: { label: '未通过', color: 'text-red-700', bgColor: 'bg-red-50' },
  joined: { label: '已加入', color: 'text-emerald-700', bgColor: 'bg-emerald-50' },
};
