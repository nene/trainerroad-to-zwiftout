# Trainerroad to Zwiftout

Converts TrainerRoad workout in JSON format to [Zwiftout](https://github.com/nene/zwiftout) format.

## Install

```sh
npm install trainerroad-to-zwiftout
```

## Usage as a library

```js
import trainerroadToZwiftout from "trainerroad-to-zwiftout";

const json = {
    Workout: {
        Details: {
            WorkoutName: "Bald Knob",
            WorkoutDescription:
                "<p>Bald Knob is 60 minutes of aerobic Endurance riding.</p>",
        },
        workoutData: [
            { seconds: 0, memberFtpPercent: 133.5, ftpPercent: 50.0 },
            { seconds: 1000, memberFtpPercent: 133.5, ftpPercent: 50.0 },
            { seconds: 2000, memberFtpPercent: 133.5, ftpPercent: 50.0 },
            { seconds: 3000, memberFtpPercent: 133.5, ftpPercent: 50.0 },
            { seconds: 4000, memberFtpPercent: 133.5, ftpPercent: 50.0 },
        ],
        intervalData: [
            {
                Start: 0,
                End: 3600,
                Name: "Workout",
                IsFake: false,
                TestInterval: false,
                StartTargetPowerPercent: 50.0,
            },
            {
                Start: 0,
                End: 150,
                Name: "Fake",
                IsFake: true,
                TestInterval: false,
                StartTargetPowerPercent: 50.0,
            },
        ],
    },
    Alternates: [],
};

console.log(trainerroadToZwiftout(json.Workout));
```

Outputs something like:

```
Name: Bald Knob
Author: TrainerRoad
Description: Bald Knob is 60 minutes of aerobic Endurance riding.

Rest: 02:30 50%
Interval: 02:30 55%
Interval: 02:30 60%
Interval: 02:30 65%
```

## Usage as a command line tool

```sh
cat workout.json | trainerroad-to-zwiftout
```
