require("dotenv").config({ path: "./.env" });
const app = require("./app/app");

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`-------- Server running on port ${port} -------------`);
});
