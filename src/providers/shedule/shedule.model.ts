export interface IShedule {
    pairs: Array<{
        number: number,
        startTime: string,
        endTime: string,
    }>;
    topWeek: Array<Array<{
        pair: string,
        startTime: string,
        endTime: string,
        subject: string,
        teacher: string,
        lectureHall: string
    }>>;
    lowerWeek: Array<Array<{
        pair: string,
        startTime: string,
        endTime: string,
        subject: string,
        teacher: string,
        lectureHall: string
    }>>;
}