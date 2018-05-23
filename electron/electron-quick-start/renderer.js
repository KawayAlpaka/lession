// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
require("./renderer-process/open");
require("./renderer-process/menu");
require("./renderer-process/msg-a");
require("./renderer-process/notification");
require("./renderer-process/link");