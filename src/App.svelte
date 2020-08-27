<script>
  import { onMount } from "svelte";

  import {
    requestNotificationPermission,
    show_notification
  } from "./sw-helpers";

  import rest_sound from "../public/assets/rest_sound.mp3";
  import work_sound from "../public/assets/work_sound.mp3";
  import silence from "../public/assets/silence.mp3";

  let rest_counter = 0;
  let initial_work_minutes;
  let initial_rest_minutes;
  let initial_long_rest_minutes;
  let work_minutes = initial_work_minutes;
  let rest_minutes = initial_rest_minutes;
  let seconds = 0;
  $: minutes = initial_work_minutes;
  let is_active = false;
  let countdown_interval;
  const restsound = new Audio(rest_sound);
  const worksound = new Audio(work_sound);
  const silent = new Audio(silence);

  onMount(() => {
    try {
      initial_work_minutes = localStorage.getItem("initial_work_minutes");
      if (initial_work_minutes == null) {
        throw null;
      }
    } catch (error) {
      initial_work_minutes = 25;
    }
    try {
      initial_rest_minutes = localStorage.getItem("initial_rest_minutes");
      if (initial_rest_minutes == null) {
        throw null;
      }
    } catch (error) {
      initial_rest_minutes = 5;
    }
    try {
      initial_long_rest_minutes = localStorage.getItem(
        "initial_long_rest_minutes"
      );
      if (initial_long_rest_minutes == null) {
        throw null;
      }
    } catch (error) {
      initial_long_rest_minutes = 15;
    }
  });

  const save_changes = () => {
    localStorage.setItem("initial_work_minutes", initial_work_minutes);
    localStorage.setItem("initial_rest_minutes", initial_rest_minutes);
    localStorage.setItem(
      "initial_long_rest_minutes",
      initial_long_rest_minutes
    );
  };

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
    is_active = true;
    requestNotificationPermission();
    countdown_interval = setInterval(() => {
      if (seconds > 0) {
        seconds--;
        if (minutes === 0 && seconds === 0) {
          clearInterval(countdown_interval);
          is_active = false;
          //   is_complete = true;
          if (rest_counter === 3) {
            show_notification("Time for a long break");
		  }
		  else {
            show_notification("Time for a short break");
		  }
          restsound.play().catch(error => console.error(error));
          start_rest();
        }
        return;
      }
      seconds = 59;
      minutes--;
    }, 1000);
  };

  const start_rest = () => {
    rest_counter++;
    if (rest_counter === 4) {
      minutes = initial_long_rest_minutes;
      rest_counter = 0;
    } else {
      minutes = initial_rest_minutes;
    }
    is_active = true;
    countdown_interval = setInterval(() => {
      if (seconds > 0) {
        seconds--;
        if (minutes === 0 && seconds === 0) {
          clearInterval(countdown_interval);
          is_active = false;
          //   is_complete = true;
          show_notification("Time to work");
          worksound.play().catch(error => console.error(error));
          start_work();
        }
        return;
      }
      seconds = 59;
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
    display: flex;
    justify-content: center;
    align-items: center;
    width: 15rem;
    height: 8rem;
    font-size: 3rem;
    margin: auto;
  }

  input {
    font-size: 2rem;
    width: 9rem;
    margin: auto;
    margin-bottom: 3rem;
    /* margin-top: 5rem; */
    color: rgb(20, 80, 60);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .countdown {
    font-size: 5rem;
    width: 17rem;
    margin: auto;
    margin-bottom: 3rem;
    margin-top: 5rem;
    color: aquamarine;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .duration {
    font-size: 1.5rem;
    width: 17rem;
    margin: auto;
    margin-bottom: 0.5rem;
    margin-top: 1rem;
    color: yellow;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .details {
    font-size: 1.5rem;
    width: 17rem;
    margin: auto;
    margin-bottom: 0.5rem;
    color: yellow;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .start {
    background-color: lightgreen;
  }
  .stop {
    background-color: orange;
    margin-bottom: 8rem;
  }
</style>

<div class="countdown">{countdown()}</div>
<button
  id="start"
  class="start"
  on:click={first_start_work}
  disabled={is_active}>
  START
</button>
<br />
<button id="stop" class="stop" on:click={stop}>STOP</button>

<details class="details">
  <summary>Settings</summary>
  <div class="duration">Work duration:</div>
  <input
    type="number"
    bind:value={initial_work_minutes}
    on:input={() => save_changes()} />

  <div class="duration">Short rest duration:</div>
  <input
    type="number"
    bind:value={initial_rest_minutes}
    on:input={() => save_changes()} />

  <div class="duration">Long rest duration:</div>
  <input
    type="number"
    bind:value={initial_long_rest_minutes}
    on:input={() => save_changes()} />
</details>
