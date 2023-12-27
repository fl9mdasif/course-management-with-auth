"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateDurationInWeeks = void 0;
// Define a function to calculate the duration in weeks
const calculateDurationInWeeks = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const timeDifference = Math.abs(end.getTime() - start.getTime());
    const durationInWeeks = Math.ceil(timeDifference / (1000 * 60 * 60 * 24 * 7));
    return durationInWeeks;
};
exports.calculateDurationInWeeks = calculateDurationInWeeks;
