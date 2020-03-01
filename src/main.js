const path = require('path')
const { app, globalShortcut, BrowserWindow, Tray, Menu } = require('electron')

let MainWindow,
    MainTray,
    MainTrayMenu

app.on('ready', () => {

  MainTray = new Tray(path.resolve(path.join('assets', 'Icon.png')))
  MainTrayMenu = Menu.buildFromTemplate([
    { label: 'Open Winbar', click: () => {
      MainWindow.show()
    }},
    { type: 'separator' },
    { label: 'Force Reload', click: () => {
      MainWindow.reload()
      MainWindow.show()
    }},
    { label: 'Check for Updates...', click: () => {
      require("openurl").open("http://github.com/arakilian0/winbar/releases")
    }},
    { label: 'Documentation', click: () => {
      require("openurl").open("http://github.com/arakilian0/winbar")
    }},
    { type: 'separator' },
    { label: 'Quit Winbar', click: () => {
      MainWindow.destroy()
      app.quit()
    }}
  ])
  MainTray.setToolTip('Winbar')
  MainTray.setContextMenu(MainTrayMenu)

  MainWindow = new BrowserWindow({
    width: 480,
    height: 380,
    resizable: false,
    movable: false,
    transparent: true,
    frame: false,
    icon: path.resolve(path.join('assets', 'Icon.ico')),
    webPreferences: {
      nodeIntegration: true
    }
  })

  MainWindow.loadFile('src/index.html')

  MainWindow.on('close', (event) => {
    event.preventDefault()
    MainWindow.hide()
  })

  globalShortcut.register('Control+Space', () => { MainWindow.show() })

})


app.on('browser-window-focus', (event) => { MainWindow.show() })
app.on('browser-window-blur', (event) => { MainWindow.hide() })
