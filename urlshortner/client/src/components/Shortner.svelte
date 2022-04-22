<script>
    import { Link } from "svelte-routing";
    import { clientURL, apiUrl } from "../const";
    let data = null;

    const shortenURL = async (e) => {
        e.preventDefault();
        const newform = new FormData(e.target);
        const url = newform.get("url");
        const response = await fetch(`${apiUrl}/api/shorten`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify({
                originalURL: url,
            }),
        });
        const json = await response.json();
        data = json;
    };
</script>

<form on:submit={shortenURL}>
    <div>
        <label for="url"><h1>Original URL:</h1></label>
        <input type="text" name="url" id="url" size="30" required />
    </div>
    <input type="submit" value="Enter" />
</form>

<div>
    {#if !data}
        <p />
    {:else if !data.shorten}
        <p>Sorry! unable to shorten the url. Read the message below</p>
        <p>
            {data.message}
        </p>
    {:else}
        <h1>Your shorten URL is:</h1>
        <Link to={`${data.shorten}`}>{`${clientURL}/${data.shorten}`}</Link>
    {/if}
</div>
