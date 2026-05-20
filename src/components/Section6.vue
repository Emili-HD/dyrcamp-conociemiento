<template>
    <section class="section">
        <video
            ref="leftMediaRef"
            class="col-start-1 col-span-full md:aspect-video"
            muted
            loop
            autoplay
            playsinline
        >
            <source
                src="/media/videos/comp_anime_final_mobile.mp4"
                media="(max-width: 767px)"
                type="video/mp4"
            >
            <source
                src="/media/videos/comp_anime_final_v02_desktop.mp4"
                media="(min-width: 768px)"
                type="video/mp4"
            >
        </video>
    </section>
</template>

<script setup>

</script>
