export interface Club {
  id: string;
  name: string;
  logo: string;
  cover: string;
  category: string;
  tags: string[];
  slogan: string;
  description: string;
  memberCount: number;
  foundedYear: number;
  activityFrequency: string;
  weeklyHours: string;
  recruitRequirement: string;
  hasInterview: boolean;
  interviewForm: string;
  hasTrial: boolean;
  suitableFor: string[];
  notSuitableFor: string[];
  coreActivities: string[];
  achievements: string[];
  reviews: ClubReview[];
  faq: { q: string; a: string }[];
  recruitTimeline: RecruitTimelineItem[];
  popularity: 'hot' | 'medium' | 'niche';
  verified: boolean;
  retentionRate: number;
  satisfaction: number;
  contactInfo: string;
}

export interface ClubReview {
  id: string;
  author: string;
  grade: string;
  avatar: string;
  content: string;
  rating: number;
  date: string;
  tags: string[];
}

export interface RecruitTimelineItem {
  date: string;
  event: string;
  status: 'completed' | 'active' | 'upcoming';
}

export interface MatchResult {
  clubId: string;
  score: number;
  reasons: MatchReason[];
  highlights: string[];
  isHiddenGem: boolean;
}

export interface MatchReason {
  label: string;
  detail: string;
  weight: number;
  icon: string;
}

export interface UserProfile {
  interests: string[];
  availableTime: string;
  goals: string[];
  personality: string[];
  skills: string[];
  acceptInterview: boolean;
  acceptTrial: boolean;
  acceptLongTerm: boolean;
}

export interface Application {
  id: string;
  clubId: string;
  clubName: string;
  status: 'submitted' | 'reviewing' | 'written_test' | 'interview' | 'accepted' | 'rejected' | 'joined';
  appliedAt: string;
  updatedAt: string;
  interviewTime?: string;
  interviewLocation?: string;
  notes?: string;
  timeline: { date: string; event: string; status: string }[];
}

export interface ClubApplicant {
  id: string;
  name: string;
  avatar: string;
  interests: string[];
  matchScore: number;
  skills: string[];
  goals: string[];
  appliedAt: string;
  status: string;
}
