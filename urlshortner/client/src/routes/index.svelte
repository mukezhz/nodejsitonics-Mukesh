<script>
    import { Router, link, Route } from "svelte-routing";
    import Shortner from "../components/Shortner.svelte";
    import Original from "../components/Original.svelte";

    export let url = "";
</script>

<Router {url}>
    <h1>
        <a href="/" use:link>URL Shortner</a>
    </h1>
    <div>
        <!-- <Route path="/:key" component={Original} /> -->
        <Route path="/:key" component={Original} />
        <Route path="/" component={Shortner} />
    </div>
</Router>

<style>
    a:hover {
        text-decoration: none;
    }
</style>
