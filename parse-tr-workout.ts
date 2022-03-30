import json from "./tr-workout.json";

const timeData = json.Workout.workoutData;
const intervals = json.Workout.intervalData;

function getPowerRange(start: number, end: number): [number, number] {
    const startMs = start * 1000;
    const endMs = end * 1000;
    let startPower = 0;
    let endPower = 0;
    for (const time of timeData) {
        if (startMs === time.seconds) {
            startPower = time.ftpPercent;
        }
        if (endMs === time.seconds) {
            endPower = time.ftpPercent;
            break;
        }
    }
    return [startPower, endPower];
}

function stripTags(html: string): string {
    return html.replace(/<\/?\w+>/g, "");
}

console.log(`Name: ${json.Workout.Details.WorkoutName}`);
console.log(`Author: TrainerRoad`);
console.log(`Description: ${stripTags(json.Workout.Details.WorkoutDescription)}`);
console.log("");

intervals.forEach((interval) => {
    if (interval.Name === "Workout") {
        return;
    }
    const duration = (interval.End - interval.Start) / 60;
    const [startPower, almostEndPower] = getPowerRange(interval.Start, interval.End - 1);
    const type = startPower <= 50 && almostEndPower <= 50 ? "Rest" : "Interval";

    if (startPower === almostEndPower) {
        console.log(`${type}: ${duration}:00 ${startPower}%`);
    } else {
        const [startPower, endPower] = getPowerRange(interval.Start, interval.End);
        if (Math.abs(endPower - almostEndPower) < 1) {
            console.log(`${type}: ${duration}:00 ${startPower}%..${endPower}%`);
        } else {
            console.log(`${type}: ${duration}:00 ${startPower}%..${Math.round(almostEndPower)}%`);
        }
    }
});
