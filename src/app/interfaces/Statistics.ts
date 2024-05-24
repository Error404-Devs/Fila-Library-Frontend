export interface StatisticsType {
    female_readers: number;
    frequency: number;
    male_readers: number;
    over_14: number;
    total_readers: number;
    under_14: number;
}

export const defaultStatisticsValues: StatisticsType = {
    female_readers: 0,
    frequency: 0,
    male_readers: 0,
    over_14: 0,
    total_readers: 0,
    under_14: 0
};
