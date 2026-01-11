const app = require("./app");
const PORT = process.env.PORT || 3000;
require("./cron/sessionCleanup");

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});


