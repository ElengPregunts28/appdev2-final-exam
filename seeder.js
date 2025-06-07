const User = require("./models/Users");
const connectDB = require("./config/nodemailer.js");
const { hashValidation } = require("./middleware/authMiddleware");

const userSeeder = async () => {
  connectDB();

  await User.deleteMany({});

  const users = [];
  const hashedPassword = await hashValidation("secret123", 10);

  for (let index = 0; index < 100; index++) {
    const user = {
      email: `eleng${index}@gmail.com`,
      password: hashedPassword,
    };

    users.push(user);
  }

  await User.insertMany(users);
};

userSeeder();

