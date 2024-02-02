<script lang="ts">
    import type { EventHandler } from 'svelte/elements';
  import Map from './Map.svelte';
    import { guessedLength, streetsGuessed } from './store';
  let currentText;
  const onSubmit: EventHandler = (ev) => {
    ev.preventDefault()
    addStreet(currentText)
    currentText = "";
  }
  let addStreet;
  const TOTAL_LENGTH = 4491.257131512817;
  guessedLength
</script>

<main style="min-h-screen w-screen sm:flex ">
  <div class="guesspanel h-screen">
    <h1 class="text-lg p-3"> Chicago Street Name Game!</h1>
    <p>Guessed {$guessedLength.toPrecision(5)} of {TOTAL_LENGTH.toPrecision(5)} miles of streets. ({(($guessedLength/TOTAL_LENGTH)*100).toPrecision(5)}%)</p>
    <form on:submit={onSubmit}>
    <input class="p-2" type="text" bind:value={currentText}>
    <button type="submit">Guess</button>
    </form>
    <h3>Guessed So Far:</h3>
    <ul>
      {#each $streetsGuessed as street}
        <li>{street}</li>
      {/each}
    </ul>
    
  </div>

  <Map bind:addStreet={addStreet} />
</main>

<style>
  main {
    display: flex;
  }
</style>