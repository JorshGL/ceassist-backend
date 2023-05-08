export enum responseState {
  success = 'success',
  error = 'error',
}

export enum userRoles {
  admin = 'admin',
  student = 'estudiante',
  instructor = 'monitor',
}

export interface IPermissions {
  canEditOwnProfile: boolean;
  canViewOwnCalendar: boolean;
  canEditCourses: boolean;
}

export enum permissions {
  canEditOwnProfile = 'canEditOwnProfile',
  canViewOwnCalendar = 'canViewOwnCalendar',
  canEditCourses = 'canEditCourses',
}

export enum modalitys {
  onsite = 'presencial',
  remote = 'remota',
}

export enum monitoriaRoles {
  monitor = 'monitor',
  student = 'estudiante',
}

export interface IScheduleItem {
  start: string;
  end: string;
}

export enum days {
  monday = 'lunes',
  tuesday = 'martes',
  wednesday = 'miércoles',
  thursday = 'jueves',
  friday = 'viernes',
  saturday = 'sábado',
  sunday = 'domingo',
}

export interface IDailySchedule {
  day: days;
  times: IScheduleItem[];
}
