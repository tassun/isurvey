import { KnUtility } from "../utils/KnUtility";

let now = new Date();
let text = KnUtility.serializeTimestamp(now);
console.log("default",text);
text = KnUtility.serializeTimestamp(now, "-");
console.log("delimiter",text);
text = KnUtility.serializeTimestamp(now, "", false);
console.log("no millis",text);
