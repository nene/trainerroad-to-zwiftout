import fs from "fs";
import trainerroadToZwiftout from "./trainerroad-to-zwiftout.js";

var json = JSON.parse(fs.readFileSync("./test-workout.json", "utf-8"));
var expected = fs.readFileSync("./test-output.txt", "utf-8");

const result = trainerroadToZwiftout(json.Workout);

if (expected === result) {
    console.log("success :)");
} else {
    console.log("FAIL :(");
    process.exit(1);
}
