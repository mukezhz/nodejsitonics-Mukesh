<script>
    import { Link } from "svelte-routing";
    let data = null;
    const clientURL = "http://localhost:8080";

    const shortenURL = async (e) => {
        e.preventDefault();
        const apiUrl = "http://localhost:5000";
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
    // data = JSON.parse(data);
    // if (!!data)
    // const { shorten = "", message = "" } = data;
</script>

<form on:submit={shortenURL}>
    <div>
        <label for="url">Original URL: </label>
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
        Your shorten URL is:
        <Link to={`${data.shorten}`}>{`${clientURL}/${data.shorten}`}</Link>
    {/if}
</div>
