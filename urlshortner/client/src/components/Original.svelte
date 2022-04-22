<script>
    import { onMount, getContext } from "svelte";
    import { Link } from "svelte-routing";
    import { clientURL, apiUrl } from "../const";

    export let key;
    let data = null;

    onMount(async (e) => {
        const response = await fetch(`${apiUrl}/api/${key}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
        });
        const json = await response.json();
        data = json;
    });
</script>

<div>
    <p>
        {#if !data}
            <p id="loading" />
        {:else if !data.originalURL}
            <p>No data</p>
            <Link to="/">Shortener</Link>
        {:else}
            <h1>The original URL:</h1>
            <a href={data.originalURL} taget="_blank">{data.originalURL}</a>
            <p>
                <Link to="/">Go Home</Link>
            </p>
        {/if}
    </p>
</div>

<style>
    @import url(https://fonts.googleapis.com/css?family=Roboto:100);

    #loading {
        display: inline-block;
        width: 50px;
        height: 50px;
        border: 3px solid rgba(77, 7, 99, 0.5);
        border-radius: 50%;
        border-top-color: rgb(99, 4, 136);
        animation: spin 1s ease-in-out infinite;
        -webkit-animation: spin 1s ease-in-out infinite;
    }

    @keyframes spin {
        to {
            -webkit-transform: rotate(360deg);
        }
    }
    @-webkit-keyframes spin {
        to {
            -webkit-transform: rotate(360deg);
        }
    }
</style>
