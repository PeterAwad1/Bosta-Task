export const TOKEN = 'Task&_token';
export const REFRESH_TOKEN = 'Task&_refresh_token';
export const USER_VERIFIED = 'Task&_user_verified';
export const USER_DATA = 'Task&_user_data';
export const MILLION = 1_000_000;
export const EMPTY_ARRAY = [];


export enum PROPERTY_STATUS_ENUM {
  Available = 1,
  Funded = 2,
  Exited = 3,
  Draft = 4,
}

export const PROPERTY_STATUS_ENUM_LABELS = [
  {
    labelEn: 'Draft',
    labelAr: 'مسودة',
    value: PROPERTY_STATUS_ENUM.Draft.toString(),
  },
  {
    labelEn: 'Available',
    labelAr: 'متاح',
    value: PROPERTY_STATUS_ENUM.Available.toString(),
  },
  {
    labelEn: 'Funded',
    labelAr: 'ممول',
    value: PROPERTY_STATUS_ENUM.Funded.toString(),
  },
  {
    labelEn: 'Exited',
    labelAr: 'منتهٍ',
    value: PROPERTY_STATUS_ENUM.Exited.toString(),
  },
];
