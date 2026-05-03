# Laravel + Electron Desktop App Guide

A clean reference guide for converting a Laravel project into a desktop application using Electron.

---

## What is Electron?

Electron is a desktop application framework that allows developers to build cross-platform desktop apps using web technologies.

It combines:

### Chromium
Used to render the application interface

### Node.js
Used to interact with the operating system

This allows web applications to run as native desktop applications.

---

## Why Electron?

Electron was created to solve the problem of rebuilding web applications for desktop platforms.

Instead of rewriting a web app using desktop-specific languages like:

- C#
- C++
- Java

You can reuse:

- HTML
- CSS
- JavaScript

---

## How Electron Works in This Project

Electron:

1. Creates a desktop window
2. Loads the Laravel application
3. Displays it as a desktop app
4. Packages it as an executable file

---

## Requirements

Make sure the following are installed:

* PHP
* Composer
* Node.js
* npm
* A working Laravel project

---

## Step 1: Open Your Laravel Project

```bash
cd E:\Backend\Laravel Projects\ChatApp
```

---

## Step 2: Prepare Laravel for Production

```bash
php artisan optimize
npm run build
```

---

## Step 3: Install Electron

```bash
npm install electron --save-dev
```

---

## Step 4: Install Electron Builder

```bash
npm install electron-builder --save-dev
```

---

## Step 5: Create `main.js`

Create a file named:

```txt
main.js
```

Add the following code:

```javascript
import { app, BrowserWindow } from 'electron';

function createWindow() {
    const win = new BrowserWindow({
        width: 1400,
        height: 900,
        autoHideMenuBar: true,
        // icon: './icon.png'
    });

    win.loadURL('http://127.0.0.1:8000');
    win.maximize();
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
```

---

## Step 6: Update `package.json`

```json
{
  "private": true,
  "type": "module",
  "name": "chatapp",
  "version": "1.0.0",
  "main": "main.js",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "desktop": "electron .",
    "dist": "electron-builder"
  },
  "build": {
    "appId": "com.chatapp.desktop",
    "productName": "ChatApp",
    "win": {
      "target": "portable"
    }
  }
}
```

---

## Step 7: Run Laravel

```bash
php artisan serve
```

Expected output:

```txt
http://127.0.0.1:8000
```

Keep it running.

---

## Step 8: Test Desktop App

```bash
npm run desktop
```

This launches the desktop app before building the executable.

---

## Step 9: Build EXE

Run VS Code as Administrator, then:

```bash
npm run dist
```

---

## Step 10: Output File

Generated inside:

```txt
dist/
```

Usually:

```txt
ChatApp Portable.exe
```

---

## Step 11: Deploy for Clients

Replace:

```javascript
win.loadURL('http://127.0.0.1:8000');
```

With:

```javascript
win.loadURL('https://yourdomain.com');
```

Then rebuild:

```bash
npm run dist
```

Send the generated `.exe` file to the client.

---

## Step 12: Rebuild After Changes

### Laravel Changes

```bash
npm run build
npm run dist
```

### Electron Changes Only

```bash
npm run dist
```

---

## Important Commands

### Run Laravel

```bash
php artisan serve
```

### Test Desktop App

```bash
npm run desktop
```

### Build Executable

```bash
npm run dist
```

---

## Common Errors

### `require is not defined`

Use `import` instead of `require`.

---

### `Cannot create symbolic link`

Run VS Code as Administrator.

---

## Notes

Best for:

* Local testing
* Desktop packaging
* Deploying Laravel apps as desktop wrappers

For real client deployment, always point Electron to an online server/domain.
