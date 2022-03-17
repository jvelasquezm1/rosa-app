export const getDatesInRange = (startDate: string, endDate: string) => {
    const dates = [];
    const dateISO = new Date(startDate);
    const endDateISO = new Date(endDate);
    while (dateISO <= endDateISO) {
        dates.push(new Date(dateISO));
        dateISO.setDate(dateISO.getDate() + 1);
    }
    return dates;
}

