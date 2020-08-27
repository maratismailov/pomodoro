<script>
  import {
    requestNotificationPermission,
    show_rest,
    show_work
  } from "./sw-helpers";

  import rest_sound from "../public/assets/rest_sound.mp3";
  import work_sound from "../public/assets/work_sound.mp3";
  import silence from "../public/assets/silence.mp3";

  let initial_work_minutes = 2;
  let work_minutes = initial_work_minutes;
  let initial_rest_minutes = 1;
  let rest_minutes = initial_rest_minutes;
  let seconds = 0;
  let minutes = initial_work_minutes;
  let is_active = false;
  let countdown_interval;
  const restsound = new Audio(rest_sound);
  const worksound = new Audio(work_sound);
  const silent = new Audio(silence);

  //   let is_complete = false
  $: countdown = () => {
    return `${format_time(minutes)} : ${format_time(seconds)}`;
  };
  const format_time = num => `0${num}`.slice(-2);

  const first_start_work = () => {
    silent.play().catch(error => console.error(error));
    start_work();
  };

  const start_work = () => {
    minutes = initial_work_minutes;
    console.log("start");
    is_active = true;
    requestNotificationPermission();
    countdown_interval = setInterval(() => {
      if (seconds > 0) {
        seconds--;
        console.log("seconds");
        if (minutes === 0 && seconds === 0) {
          clearInterval(countdown_interval);
          is_active = false;
          //   is_complete = true;
          show_rest();
          restsound.play().catch(error => console.error(error));
          start_rest();
        }
        return;
      }
      seconds = 2;
      minutes--;
    }, 1000);
  };

  const start_rest = () => {
    minutes = initial_rest_minutes;
    is_active = true;
    console.log("start");
    countdown_interval = setInterval(() => {
      if (seconds > 0) {
        seconds--;
        console.log("seconds");
        if (minutes === 0 && seconds === 0) {
          clearInterval(countdown_interval);
          is_active = false;
          //   is_complete = true;
          show_work();
          worksound.play().catch(error => console.error(error));
          start_work();
        }
        return;
      }
      seconds = 2;
      minutes--;
    }, 1000);
  };

  const stop = () => {
    clearInterval(countdown_interval);
    is_active = false;
    minutes = initial_work_minutes;
    seconds = 0;
  };
</script>

<style>
  button {
    width: 15rem;
    height: 8rem;
    font-size: 3rem;
  }

  .countdown {
    font-size: 5rem;
    width: 17rem;
    margin: auto;
    margin-bottom: 3rem;
    margin-top: 5rem;
    color: aquamarine;
  }

  .start {
    background-color: lightgreen;
  }
  .stop {
    background-color: orange;
  }
</style>

<main>
  <div class="countdown">{countdown()}</div>
  <button id="start" class="start" on:click={first_start_work} disabled={is_active}>
    START
  </button>
  <br />
  <button id="stop" class="stop" on:click={stop}>STOP</button>

</main>
