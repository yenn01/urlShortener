<script>
    import Input from './Input.svelte';
    let src = "./logo.png"

</script>
    <div class="cont-header"> 
        <img {src} alt="shorter logo">
       
    </div>

<style>
    .cont-header {
        display: flex;
        padding:0.5rem;
        padding-top: 1rem;
        justify-content: space-between;
        margin-bottom: 1rem;
        height: 3rem;
        align-items: center;
    }

    img {
        width:15rem;
    }

</style>