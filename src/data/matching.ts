import { MatchResult, UserProfile } from './types';
import { clubs } from './clubs';

// Default user profile for demo
export const defaultProfile: UserProfile = {
  interests: ['技术', '创新'],
  availableTime: '6-10小时',
  goals: ['提升技能', '竞赛经历', '简历加分'],
  personality: ['内向', '执行型', '幕后'],
  skills: ['Python', '基础数据分析'],
  acceptInterview: true,
  acceptTrial: true,
  acceptLongTerm: true,
};

export function generateMatchResults(profile: UserProfile): MatchResult[] {
  const results: MatchResult[] = clubs.map(club => {
    let score = 50;
    const reasons: MatchResult['reasons'] = [];
    const highlights: string[] = [];
    let isHiddenGem = false;

    // Interest matching
    const interestMap: Record<string, string[]> = {
      '技术': ['科技'],
      '创新': ['科技', '创业'],
      '公益': ['公益'],
      '文艺': ['文艺'],
      '体育': ['体育'],
      '媒体': ['媒体'],
      '学术': ['学术'],
      '商业': ['创业', '学术'],
      '表达': ['学术', '文艺'],
    };

    let interestScore = 0;
    profile.interests.forEach(interest => {
      const matchCats = interestMap[interest] || [];
      if (matchCats.includes(club.category)) {
        interestScore += 15;
      }
    });
    score += Math.min(interestScore, 25);

    if (interestScore > 0) {
      reasons.push({
        label: '兴趣方向匹配',
        detail: `你感兴趣的「${profile.interests.join('、')}」方向与该社团的核心领域高度吻合`,
        weight: 0.3,
        icon: '🎯',
      });
    }

    // Time matching
    const timeMap: Record<string, number> = { '2-3小时': 1, '4-6小时': 2, '6-10小时': 3, '10小时以上': 4 };
    const clubTimeMap: Record<string, number> = {
      '2-3小时': 1, '3-5小时': 2, '4-6小时': 2, '4-8小时': 3, '5-8小时': 3, '6-8小时': 3, '6-10小时': 3,
      '4-8小时（项目期更多）': 3,
    };
    const userTime = timeMap[profile.availableTime] || 2;
    const clubTime = clubTimeMap[club.weeklyHours] || 2;

    if (Math.abs(userTime - clubTime) <= 1) {
      score += 15;
      reasons.push({
        label: '时间投入匹配',
        detail: `该社团每周需要${club.weeklyHours}，与你可投入的${profile.availableTime}相符`,
        weight: 0.2,
        icon: '⏰',
      });
    } else if (userTime < clubTime) {
      score -= 5;
    }

    // Goal matching
    const goalMap: Record<string, string[]> = {
      '交友': ['体育', '公益', '文艺'],
      '提升技能': ['科技', '学术', '媒体'],
      '竞赛经历': ['科技', '学术'],
      '简历加分': ['科技', '创业', '学术', '媒体'],
      '兴趣探索': ['文艺', '体育', '公益'],
    };

    let goalScore = 0;
    profile.goals.forEach(goal => {
      if (goalMap[goal]?.includes(club.category)) {
        goalScore += 10;
      }
    });
    score += Math.min(goalScore, 20);

    if (goalScore > 0) {
      const matchedGoals = profile.goals.filter(g => goalMap[g]?.includes(club.category));
      reasons.push({
        label: '目标契合',
        detail: `该社团能帮助你实现「${matchedGoals.join('、')}」的目标`,
        weight: 0.25,
        icon: '🎯',
      });
    }

    // Personality matching
    if (profile.personality.includes('外向') && ['体育', '文艺'].includes(club.category)) {
      score += 8;
    }
    if (profile.personality.includes('内向') && ['科技', '学术', '公益'].includes(club.category)) {
      score += 8;
      reasons.push({
        label: '风格适配',
        detail: '该社团氛围友好，适合偏好深度交流的同学，社交压力较小',
        weight: 0.1,
        icon: '💡',
      });
    }

    // Skill matching
    if (profile.skills.some(s => ['Python', '编程', 'JavaScript', '前端', '后端', '数据分析'].includes(s)) &&
        club.category === '科技') {
      score += 10;
      highlights.push('你的技术技能在该社团中能得到充分发挥');
    }

    // Interview preference
    if (!profile.acceptInterview && club.hasInterview) {
      score -= 5;
    }

    // Hidden gem detection
    if (club.popularity === 'niche' && score > 65) {
      isHiddenGem = true;
      highlights.push('这是一个优质但低曝光的社团，匹配度高但竞争压力小');
    }

    // Satisfaction and retention bonus
    if (club.satisfaction >= 4.5) {
      score += 5;
      reasons.push({
        label: '口碑优秀',
        detail: `往届成员满意度 ${club.satisfaction}/5.0，留存率 ${club.retentionRate}%`,
        weight: 0.15,
        icon: '⭐',
      });
    }

    // Cap score
    score = Math.min(Math.max(score, 30), 98);

    return {
      clubId: club.id,
      score,
      reasons,
      highlights,
      isHiddenGem,
    };
  });

  return results.sort((a, b) => b.score - a.score);
}

export const mockMatchResults = generateMatchResults(defaultProfile);
