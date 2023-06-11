import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  avatarUrl: { type: String },
  githubLoggedIn: { type: Boolean, default: false },
  username: { type: String, required: true, unique: true },
  password: { type: String },
  email: { type: String, required: true, unique: true },
  videos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Video" }],
  comments: [
    { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Comment" },
  ],
});

userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 5);
  }
  /* 단 한 줄 밖에 없는 미들웨어이기 때문에 굳이 await를 붙이지 않아도 
  의도대로 잘 작동하기 때문에 위의 await에 await가 기능을 하지 않는다는 표시가 뜨는 것입니다.*/
});

const User = mongoose.model("User", userSchema);

export default User;
