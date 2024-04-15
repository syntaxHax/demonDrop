<div align="center">
  <img width="200px" src="https://github.com/syntaxHax/demonDrop/assets/86668558/4089a5c5-cfbd-46d2-bbad-0175ce5214a1" />
  <h1>demonDrop</h1>
</div

<div align="left">

Drop a C2 beacon (or anything else, really) on target and execute it - with the Flipper Zero and Momentum firmware.
<br/><br/><br/><br/>

## REQUIREMENTS

- Flipper Zero
- Momentum firmware DEV d81e72d0 09-04-2024 or newer
    - https://momentum-fw.dev/update/

## USAGE

- copy demonDrop.js to FlipperZero > SD Card > apps > Scripts
- create a folder called "Payloads" in FlipperZero > SD Card > apps > Scripts (i.e. "SD Card\apps\Scripts\Payloads")
    - place a file called "demon.exe" inside the Payloads folder
- plug in the Flipper Zero to the target computer, then in the Flipper main menu navigate to Apps > Scripts
    - when ready, run demonDrop.js
- wait a few moments... maybe 30 seconds or so.... and the payload should have executed
    - on the Flipper Zero screen you will see "DONE" once the payload has executed
- unplug the Flipper Zero from the target and (hopefully) enjoy your new C2 beacon
</div>

Only use ethically, responsibly, and with permission! I cannot be held responsible for any misuse of this code.
