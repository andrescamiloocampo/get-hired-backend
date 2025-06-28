export interface SkillModel {
  id: string;
  name: string;
  level: string;
  jobs: JobModel[];
}

export interface JobModel {
  company: string;
  position: string;
  startDate: Date;
  endDate: Date;
  description: string;
  achievements: AchievementModel[];
}

export interface AchievementModel {
  id: string;
  name: string;
}
