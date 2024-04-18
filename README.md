<div align="center">
  <img width="300px" src="https://github.com/syntaxHax/demonDrop/assets/86668558/4089a5c5-cfbd-46d2-bbad-0175ce5214a1" />
  <h1>demonDrop</h1>
<br/>
  
Drop a C2 beacon (or anything else, really) on target and execute it - with the Flipper Zero and Momentum firmware.
<br/><br/><br/>br/>

<div align="center">
  <img width="500px" src="https://github.com/syntaxHax/demonDrop/assets/86668558/2588ef6c-ce3f-48ab-b508-79117a6601ef" />
  <br/><br/><br/>br/>
</div>

<div align="left">

  ## REQUIREMENTS

  - Flipper Zero
  - Momentum firmware DEV d81e72d0 09-04-2024 or newer
    - https://momentum-fw.dev/update/

  ## USAGE

  - copy demonDrop.js to FlipperZero > SD Card > apps > Scripts
  - create a folder called "payloads" in FlipperZero > SD Card > apps > Scripts (i.e. "SD Card\apps\Scripts\payloads")
    - place a file called "demon.exe" inside the Payloads folder
  - plug in the Flipper Zero to the target computer, then in the Flipper main menu navigate to Apps > Scripts
    - when ready, run demonDrop.js
  - wait a few moments... maybe 30 seconds or so.... and the payload should have executed
    - on the Flipper Zero screen you will see "DONE" when finished
  - unplug the Flipper Zero from the target and (hopefully) enjoy your new C2 beacon

  <b>Provided for cyber security testing / lab purposes ONLY. Use ethically and with permission to protect and educate others!</b>

</div>
