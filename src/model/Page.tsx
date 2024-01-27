export interface Page<T> {
    total: number;
    data: T[],
    pages: number,
    current: number
}
