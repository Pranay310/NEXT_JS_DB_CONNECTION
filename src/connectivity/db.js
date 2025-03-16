const { user_name, password } = process.env;
export const connectionSrt =
  "mongodb+srv://" +
  user_name +
  ":" +
  password +
  "@cluster0.65fg2.mongodb.net/next_test?retryWrites=true&w=majority&appName=Cluster0";
console.log(user_name, password);
