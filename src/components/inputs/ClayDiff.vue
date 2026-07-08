<script setup lang="ts">
    import { computed } from "vue";

    const progress = defineModel({
        type: Number,
        default: 50
    });

    const props = defineProps({
        id: {
            type: String,
            required: true
        },
        src: {
            type: String,
            required: true
        },
        alt: {
            type: String,
            default: "Image preview"
        },
        label: {
            type: String,
            default: "Blur diff"
        },
        blur: {
            type: Number,
            default: 0.75
        },
        glass: {
            type: Boolean,
            default: false
        },
        liquidGlass: {
            type: Boolean,
            default: false
        },
        small: {
            type: Boolean,
            default: false
        },
        large: {
            type: Boolean,
            default: false
        }
    });

    const classes = computed((): Record<string, boolean> => ({
        "clay-diff--glass": props.glass && !props.liquidGlass,
        "clay-diff--liquid-glass": props.liquidGlass,
        "clay-diff--small": props.small,
        "clay-diff--large": props.large
    }));
    const normalizedProgress = computed((): number =>
    {
        const value = Number.isFinite(progress.value) ?
            progress.value :
            50;

        return Math.min(100, Math.max(0, value));
    });
    const styles = computed((): Record<string, string> => ({
        "--clay-diff-progress": `${normalizedProgress.value}%`,
        "--clay-diff-blur-strength": `${props.blur}em`
    }));
</script>

<template>
    <figure class="clay-diff"
            :class="classes"
            :style="styles">
        <div class="clay-diff__media">
            <img :src="src"
                 :alt="alt"
                 class="clay-diff__image clay-diff__image--base" />

            <div class="clay-diff__overlay" aria-hidden="true">
                <img :src="src"
                     alt=""
                     class="clay-diff__image clay-diff__image--blur" />
            </div>

            <input :id="id"
                   v-model.number="progress"
                   type="range"
                   min="0"
                   max="100"
                   step="1"
                   class="clay-diff__dragger"
                   :aria-label="label" />
            <div class="clay-diff__splitter" aria-hidden="true"></div>
        </div>
    </figure>
</template>

<style lang="scss">
    @use "@/assets/scss/functions";
    @use "@/assets/scss/mixins";

    :root
    {
        --clay-diff-color-background: var(--clay-light-color);
        --clay-diff-color-line: var(--clay-primary-color);
        --clay-diff-color-outline: oklch(from var(--clay-diff-color-line) l c calc(h + 180));
        --clay-diff-color-shadow: oklch(from var(--clay-diff-color-line) calc(l - 0.25) c h);
        --clay-diff-color-handle: oklch(from var(--clay-diff-color-line) calc(l + 0.075) c h);

        --clay-diff-roundness: 1em;
        --clay-diff-spacing: 0.5em;
        --clay-diff-progress: 50%;
        --clay-diff-blur-strength: 0.75em;
        --clay-diff-glass-tint: rgba(from var(--white) r g b / 0.15);
        --clay-diff-glass-sheen: rgba(from var(--white) r g b / 0.55);
        --clay-diff-glass-shade: rgba(from var(--black) r g b / 0.12);
        --clay-diff-liquid-highlight: rgba(from var(--white) r g b / 0.7);
        --clay-diff-liquid-shade: rgba(from var(--black) r g b / 0.25);
        --clay-diff-track-height: 0.625em;
        --clay-diff-thumb-size: 1.5em;
        --clay-diff-motion-duration: 120ms;
        --clay-diff-motion-function: linear;
    }

.clay-diff // Contenitore principale del componente di confronto.
{
    background-color: var(--clay-diff-color-background);
    background-image: linear-gradient(rgba(from var(--white) r g b / 0.2), rgba(from var(--black) r g b / 0.1));
    background-blend-mode: overlay;
    border-radius: calc(var(--clay-diff-roundness) * 1.5);

    @include mixins.clay-shadow-elevation($color: var(--clay-diff-color-shadow), $intensity: 0.5);

    display: grid;
    inline-size: fit-content;
    max-inline-size: 100%;
    margin: 0;
    overflow: hidden;
    padding: calc(var(--clay-diff-spacing) * 1.25);
    position: relative;
    transition: background-color var(--clay-ease-duration) var(--clay-ease-function),
                box-shadow var(--clay-ease-duration) var(--clay-ease-function),
                transform var(--clay-ease-duration) var(--clay-ease-function);

    &::before
    {
        @include mixins.clay-shadow-puff($color: var(--clay-diff-color-shadow), $intensity: 0.5);

        border-radius: inherit;
        content: "";
        inset: 0;
        mix-blend-mode: luminosity;
        pointer-events: none;
        position: absolute;
        z-index: 0;
    }
}

    .clay-diff__media // Area immagine che contiene sovrapposizione e maniglia.
        {
            border-radius: var(--clay-diff-roundness);
            box-shadow: inset 0 0 0 1px rgba(from var(--clay-diff-color-line) r g b / 0.333);
            cursor: ew-resize;
            display: grid;
            isolation: isolate;
            overflow: clip;
            position: relative;
            z-index: 1;
        }
    .clay-diff__image // Stile condiviso per immagine base e sfocata.
        {
            display: block;
            grid-area: 1 / 1;
            inline-size: auto;
            max-inline-size: 100%;
            user-select: none;
        }

    .clay-diff__overlay // Strato sfocato ritagliato in base alla progressione.
        {
            clip-path: inset(0 calc(100% - var(--clay-diff-progress)) 0 0 round var(--clay-diff-roundness));
            grid-area: 1 / 1;
            inset: 0;
            position: absolute;
            transition: clip-path var(--clay-diff-motion-duration) var(--clay-diff-motion-function);
        }
    .clay-diff__image--blur // Effetto sfocatura applicato all'immagine sovrapposta.
        {
            filter: blur(var(--clay-diff-blur-strength)) saturate(120%) brightness(1.05);
            transform: scale(1.02);
            transform-origin: center;
        }

    .clay-diff--glass, // Le varianti vetro rivelano l'immagine base sotto una lastra: la copia sfocata è superflua.
    .clay-diff--liquid-glass
        {
            .clay-diff__image--blur
                {
                    display: none;
                }
        }

    .clay-diff--glass // Variante vetro
        {
            .clay-diff__overlay // La lastra sfoca l'immagine sottostante e la tinge come vetro.
                {
                    backdrop-filter: blur(var(--clay-diff-blur-strength)) saturate(140%) brightness(1.05);
                    background-color: var(--clay-diff-glass-tint);
                    background-image: linear-gradient(135deg,
                                                      var(--clay-diff-glass-sheen) 0%,
                                                      transparent 40%,
                                                      var(--clay-diff-glass-shade) 100%);
                    box-shadow: inset 0 0.0625em 0 0 var(--clay-diff-glass-sheen),
                                inset 0 -0.0625em 0 0 var(--clay-diff-glass-shade),
                                inset -0.075em 0 0.25em -0.05em var(--clay-diff-glass-sheen);
                }
        }

    .clay-diff--liquid-glass // Variante vetro liquido
        {
            .clay-diff__overlay // La lastra rifrange e satura l'immagine sottostante, tingendola appena.
                {
                    backdrop-filter: blur(var(--clay-diff-blur-strength)) saturate(200%) brightness(1.1);
                    background-color: var(--clay-diff-glass-tint);

                    &::after // Riflesso vetroso
                        {
                            border-radius: var(--clay-diff-roundness);
                            background-image: linear-gradient(var(--clay-diff-glass-sheen),
                                                              rgba(from var(--white) r g b / 0) 45%);
                            box-shadow:
                                inset 0 0.08em 0.06em -0.02em var(--clay-diff-liquid-highlight),
                                inset 0 -0.06em 0.08em -0.02em var(--clay-diff-liquid-shade);
                            content: "";
                            inset: 0;
                            pointer-events: none;
                            position: absolute;
                            z-index: 1;
                        }
                }
        }

    .clay-diff__splitter // Divisore verticale visibile
        {
            background-color: rgba(from var(--clay-diff-color-line) r g b / 0.75);
            box-shadow: 0 0 0 2px rgba(from var(--white) r g b / 0.333),
                        0 0 0.5em 0 rgba(from var(--clay-diff-color-shadow) r g b / 0.5);
            inline-size: 0.15em;
            inset-block: 0;
            inset-inline-start: var(--clay-diff-progress);
            pointer-events: none;
            position: absolute;
            transform: translateX(-50%);
            transition: inset-inline-start var(--clay-diff-motion-duration) var(--clay-diff-motion-function),
                        box-shadow var(--clay-ease-duration) var(--clay-ease-function);

            &::before
            {
                background-color: var(--clay-diff-color-handle);
                background-image: linear-gradient(rgba(from var(--white) r g b / 0.25),
                                                  rgba(from var(--black) r g b / 0.125));
                background-blend-mode: overlay;
                border-radius: 999em;
                box-shadow: inset 0 -0.125em 0.25em 0 rgba(from var(--black) r g b / 0.25),
                            0 0.125em 0.25em 0 rgba(from var(--clay-diff-color-shadow) r g b / 0.5);
                content: "";
                inset-block-start: 50%;
                inset-inline-start: 50%;
                inline-size: calc(var(--clay-diff-thumb-size) * 1.1);
                position: absolute;
                transform: translate(-50%, -50%);
                aspect-ratio: 1;
            }
        }

    .clay-diff__dragger // Controllo a cursore invisibile su tutta l'area interattiva.
        {
            appearance: none;
            background: transparent;
            border: none;
            cursor: ew-resize;
            inset: 0;
            inline-size: 100%;
            margin: 0;
            outline: none;
            opacity: 0;
            position: absolute;
            z-index: 2;

            &::-webkit-slider-runnable-track
            {
                block-size: 100%;
            }
            &::-webkit-slider-thumb
            {
                appearance: none;
                block-size: 100%;
                inline-size: 2.5em;
            }

            &::-moz-range-track
            {
                block-size: 100%;
            }
            &::-moz-range-thumb
            {
                border: none;
                block-size: 100%;
                inline-size: 2.5em;
            }
        }
    .clay-diff__dragger:focus-visible + .clay-diff__splitter // Evidenziazione da tastiera mostrata sul divisore.
        {
            box-shadow: functions.clay-outline($color: var(--clay-diff-color-outline), $width: 0.15em),
                        0 0 0.5em 0 rgba(from var(--clay-diff-color-shadow) r g b / 0.5);
        }

    .clay-diff--small // Variante dimensione piccola.
        {
            font-size: 0.75em;
        }
    .clay-diff--large // Variante dimensione grande.
        {
            font-size: 1.25em;
        }

    @media (prefers-reduced-motion: reduce)
        {
            .clay-diff, // Contenitore principale.
            .clay-diff__overlay, // Strato di rivelazione sfocato.
            .clay-diff__splitter, // Divisore visivo.
            .clay-diff__dragger::-webkit-slider-thumb, // Area di trascinamento in WebKit.
            .clay-diff__dragger::-moz-range-thumb // Area di trascinamento in Firefox.
            {
                transition-duration: 0ms;
            }
        }

    @media (prefers-contrast: more)
        {
            .clay-diff__splitter // Divisore con contrasto più forte.
            {
                box-shadow: 0 0 0 2px rgba(from var(--white) r g b / 0.75),
                            0 0 0.5em 0 rgba(from var(--black) r g b / 0.75);
            }
            .clay-diff__dragger:focus-visible + .clay-diff__splitter // Bordo da tastiera più marcato in alto contrasto.
            {
                box-shadow: functions.clay-outline($color: var(--clay-diff-color-outline), $width: 0.2em);
            }
        }

    @media (forced-colors: active)
        {
            .clay-diff, // Contenitore principale in modalità colori forzati.
            .clay-diff__media, // Area immagine in modalità colori forzati.
            .clay-diff__dragger // Livello input in modalità colori forzati.
            {
                forced-color-adjust: none;
            }

            .clay-diff // Colori di riserva del contenitore.
            {
                background: Canvas;
                border: 1px solid CanvasText;
                box-shadow: none;
            }
            .clay-diff__media // Bordo di riserva dell'area immagine.
            {
                box-shadow: inset 0 0 0 1px CanvasText;
            }
            .clay-diff--glass .clay-diff__overlay, // Lastra di vetro neutralizzata: solo un bordo di separazione.
            .clay-diff--liquid-glass .clay-diff__overlay
            {
                backdrop-filter: none;
                background: transparent;
                box-shadow: inset -1px 0 0 0 CanvasText;
            }
            .clay-diff--liquid-glass .clay-diff__overlay::after // Riflesso vetro liquido rimosso in colori forzati.
            {
                display: none;
            }
            .clay-diff__splitter // Colore di riserva del divisore.
            {
                background: Highlight;
                box-shadow: none;
            }
            .clay-diff__splitter::before, // Colore di riserva della maniglia.
            .clay-diff__dragger::-webkit-slider-thumb, // Cursore di riserva in WebKit.
            .clay-diff__dragger::-moz-range-thumb // Cursore di riserva in Firefox.
            {
                background: Highlight;
                box-shadow: none;
            }
        }

    @media (prefers-color-scheme: dark)
        {
        :root
        {
            --clay-diff-color-background: var(--clay-dark-color);
            --clay-diff-color-line: oklch(from var(--clay-primary-color) calc(l + 0.15) c h);
            --clay-diff-color-outline: oklch(from var(--clay-diff-color-line) calc(l + 0.1) c calc(h + 180));
            --clay-diff-color-shadow: var(--black);
            --clay-diff-color-handle: oklch(from var(--clay-diff-color-line) calc(l + 0.05) c h);
            --clay-diff-glass-tint: rgba(from var(--white) r g b / 0.08);
            --clay-diff-glass-sheen: rgba(from var(--white) r g b / 0.3);
            --clay-diff-glass-shade: rgba(from var(--black) r g b / 0.25);
            --clay-diff-liquid-highlight: rgba(from var(--white) r g b / 0.4);
            --clay-diff-liquid-shade: rgba(from var(--black) r g b / 0.4);
        }

        .clay-diff // Taratura dell'elevazione in modalità scura.
        {
            @include mixins.clay-shadow-elevation($color: var(--clay-diff-color-shadow), $intensity: 0.5);
        }
    }
</style>
