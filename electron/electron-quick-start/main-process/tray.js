const electron = require('electron');
const Menu = electron.Menu;
const Tray = electron.Tray;
const path = require("path");


var appIcon = new Tray(path.join(__dirname,"./icon.png"));
var contextMenu = Menu.buildFromTemplate([
    { label: 'Item1', type: 'radio' },
    { label: 'Item2', type: 'radio' },
    { label: 'Item3', type: 'radio', checked: true },
    { label: 'Item4', type: 'radio' }
]);
appIcon.setToolTip('This is my application.');
appIcon.setContextMenu(contextMenu);
