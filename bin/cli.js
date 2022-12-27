import fs from "fs";
import trainerroadToZwiftout from "../trainerroad-to-zwiftout";

var json = JSON.parse(fs.readFileSync(0, "utf-8"));

console.log(trainerroadToZwiftout(json.Workout));
