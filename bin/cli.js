import fs from "fs";
import trainerroadToZwiftout from "../trainerroad-to-zwiftout.js";

var json = JSON.parse(fs.readFileSync(0, "utf-8"));

console.log(trainerroadToZwiftout(json.Workout));
