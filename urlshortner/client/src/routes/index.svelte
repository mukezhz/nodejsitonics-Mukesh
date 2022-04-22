<script>
    import { Router, link, Route } from "svelte-routing";
    import Shortner from "../components/Shortner.svelte";
    import Original from "../components/Original.svelte";
    import Home from "../components/Home.svelte";

    export let url = "";
</script>

<Router {url}>
    <div>
        <!-- <Route path="/:key" component={Original} /> -->
        <Route path="/:key" component={Original} />
        <Route path="/shortner" component={Shortner} />
        <Route path="/" component={Home} />
    </div>
</Router>
