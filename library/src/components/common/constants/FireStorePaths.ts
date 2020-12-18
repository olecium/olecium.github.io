export const FS_USERS_PATH: string = `users`;


export const getMachinesCollection = (customerId: string): string => {
    return `/data/${customerId}/machines`;
};

export const getMetricsCollection = (customerId: string): string => {
    return `/data/${customerId}/metrics`;
};

