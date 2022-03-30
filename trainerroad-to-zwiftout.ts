import fs from 'fs';

var json = JSON.parse(fs.readFileSync(0, 'utf-8'));

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

function formatDuration(seconds: number): string {
    const ss = String(seconds % 60).padStart(2, "0");
    const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
    return `${mm}:${ss}`;
}

console.log(`Name: ${json.Workout.Details.WorkoutName}`);
console.log(`Author: TrainerRoad`);
console.log(`Description: ${stripTags(json.Workout.Details.WorkoutDescription)}`);
console.log("");

intervals.forEach((interval) => {
    if (interval.Name === "Workout") {
        return;
    }
    const duration = formatDuration(interval.End - interval.Start);
    const [startPower, almostEndPower] = getPowerRange(interval.Start, interval.End - 1);
    const type = startPower <= 50 && almostEndPower <= 50 ? "Rest" : "Interval";

    if (startPower === almostEndPower) {
        console.log(`${type}: ${duration} ${startPower}%`);
    } else {
        const [startPower, endPower] = getPowerRange(interval.Start, interval.End);
        if (Math.abs(endPower - almostEndPower) < 1) {
            console.log(`${type}: ${duration} ${startPower}%..${endPower}%`);
        } else {
            console.log(`${type}: ${duration} ${startPower}%..${Math.round(almostEndPower)}%`);
        }
    }
});
