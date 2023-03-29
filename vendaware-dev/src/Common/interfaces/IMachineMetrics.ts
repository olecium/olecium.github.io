
export interface IMachineMetrics {
    date: Date;             //  reading date
    fVends: number;         //  number of failed vends
    sVends: number;         //  number of successful vends
}

export interface IMachineMetricsMap {
    [machineId: string]: ReadonlyArray<IMachineMetrics>;
}