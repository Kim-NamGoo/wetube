//mongoose 설치
import "dotenv/config";
import "./db";
import "./models/Video";
import "./models/User";

import app from "./server";

app.listen(5000, () => console.log("Listening server http://localhost:5000"));
