<script>
  import { fetchData } from "./airtable.js";

  async function parseData(data) {
    data = await data.then((data) => {
      data = sortByTypes(data);
      return data;
    });
    console.log(data);
    return data;
  }

  function sortByTypes(data) {
    let group = {};

    data.forEach(({ Types, ...rest }) => {
      group[Types] = group[Types] || {
        Types,
        name: Types,
        content: [],
      };
      group[Types].content.push(rest);
    });
    let result = Object.values(group);
    result.forEach((r) => {
      delete r["Types"];
    });
    return result;
  }

  $: data = fetchData;
  $: displayData = parseData(data);
</script>

<h1>Courroies trapézoïdales</h1>
{#await displayData}
  <p>Loading</p>
{:then data}
  <form>
    <fieldset>
      <legend>Courroies trapézoïdales</legend>
      <select>
        {#each data as section}
          <option value={section["name"]}>{section["name"]}</option>
        {/each}
      </select>
    </fieldset>
  </form>
  {#each data as type}
    <h2>{type["name"]}</h2>
    {#each type["content"] as section}
      <details>
        <summary>{section["Name"]}</summary>
        <div>
          {#each section["Longueurs primitives"].split(" ") as longueur}
            <span class={longueur >= parseInt(section["DYNAM"]) ? "dynam" : ""}
              >{longueur + " "}</span
            >
          {/each}
        </div>
      </details>
    {/each}
  {/each}
{/await}

<style>
  .dynam {
    color: red;
  }
</style>
