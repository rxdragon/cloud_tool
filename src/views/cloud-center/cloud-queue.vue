<template>
  <div class="cloud-queue">
    <div class="terminal glitch">
      <div class="scanline"></div>
      <p class="spinner">[/]</p>
      <div class="hydra">
        <div class="hydra_rebooting">
          <p>&lt; SYSTEM REBOOTING &gt;</p>
          <p class="text--sm">HYDRA VER 2.1 SYS RECOVERY</p>
          <p class="text--sm">PROCESS: <span class="process-amount">0</span>%</p>
          <p class="loading-bar"></p>
        </div>
        <div class="hydra_reboot_success hidden">
          <p>REBOOTING SUCCESSFUL</p>
        </div>
      </div>
    </div>
    <div class="input-box">
      <div class="time-date">{{ timeDate }}</div>
      <div class="history-code" v-for="(item, index) in historyValue" :key="index">➜ ~ {{ item.code }} {{ `\n` }}{{ item.result }}</div>
      <div class="row-code">➜ ~ <input type="text" v-model.trim="inputValue" @keydown.enter="submitDate" /></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import * as CloudApi from '@/api/cloudApi'

@Component
export default class CloudQueue extends Vue {
  private spinnerFrames: string[] = ['/', '-', '\\', '|']
  private loadedCharacter: string = '#'
  private unloadedCharacter: string = '.'
  private maxCharacters: number = 24
  private timeDate: string = ''
  private inputValue: string = ''
  private historyValue: any[] = []

  created () {
    let date = new Date().toString()
    date = date.substr(0, date.indexOf("GMT") - 1)
    this.timeDate = `Last login: ${date} on ttys000\n`
  }

  mounted () {
    const terminal: any = document.querySelector(".terminal")
    this.initStyle(terminal)
    this.initDrawSpinner()
  }

  initDrawSpinner (spinnerFrame = 0) {
    const spinners = document.querySelectorAll(".spinner")
    return setInterval(() => {
      spinnerFrame += 1
      spinners.forEach(
        (spinner: any) =>
          (spinner.innerText = `[${
            this.spinnerFrames[spinnerFrame % this.spinnerFrames.length]
          }]`)
      )
    }, this.RandomNumber(50, 300))
  }

  DrawLoadingBar () {
    const loadingBar = new Array(this.maxCharacters).fill(this.unloadedCharacter)
    return new Promise((resolve) => {
      const loadingBarAnimation = setInterval(() => {
        if (!loadingBar.includes(this.unloadedCharacter)) {
          clearInterval(loadingBarAnimation)
          resolve(true)
        }

        loadingBar.pop()
        loadingBar.unshift(this.loadedCharacter)
        this.RenderBar(loadingBar)
      }, this.RandomNumber(50, 300))
    })
  }

  RenderBar ( values: string[] ) {
    const processAmounts = document.querySelectorAll(".process-amount")
    const loadingBars = document.querySelectorAll(".loading-bar")
    const currentLoaded = values.lastIndexOf(this.loadedCharacter) + 1
    const loaded = values.slice(0, currentLoaded).join("")
    const unloaded = values.slice(currentLoaded).join("")

    // Update all the loading bars
    loadingBars.forEach(loadingBar => {
      loadingBar.innerHTML = `(${loaded}<span class="loading-bar--unloaded">${unloaded}</span>)`
    })

    // Update all the percentages
    let loadingPercent = Math.floor(currentLoaded / this.maxCharacters * 100)
    processAmounts.forEach((processAmount: any) => {
      processAmount.innerText = loadingPercent
    })
  }

  AnimateBox () {
    const hydra: any = document.querySelector(".hydra")
    const first = hydra.getBoundingClientRect()
    const terminal: any = document.querySelector(".terminal")
    const spinners = document.querySelectorAll(".spinner")
    const glitches = document.querySelectorAll(".glitch--clone")
    const rebootingText = document.querySelectorAll(".hydra_rebooting")
    const rebootSuccessText: any = document.querySelector(".hydra_reboot_success")

    terminal.classList.remove("glitch")

    this.HideAll([spinners, glitches, rebootingText])
    rebootSuccessText.classList.remove("hidden")
    rebootSuccessText.style.visibility = "hidden"
    const last = hydra.getBoundingClientRect()

    const hydraAnimation = hydra.animate([
      { transform: `scale(${first.width / last.width}, ${first.height / last.height})` },
      { transform: `scale(${first.width / last.width}, 1.2)` },
      { transform: `none` }
    ],{
      duration: 600,
      easing: 'cubic-bezier(0,0,0.32,1)',
    })

    hydraAnimation.addEventListener('finish', () => {
      rebootSuccessText.removeAttribute("style")
      hydra.removeAttribute("style")
    })
  }

  RandomNumber (min: number, max: number) {
    return Math.floor(Math.random() * min) + max
  }

  HideAll (elements: any[]) {
    elements.forEach(glitchGroup => glitchGroup.forEach((element: { classList: { add: (arg0: string) => any } }) => element.classList.add("hidden")) )
  }

  ShowAll (elements: any[]) {
    elements.forEach(glitchGroup => glitchGroup.forEach((element: { classList: { remove: (arg0: string) => any } }) => element.classList.remove("hidden")) )
  }

  initStyle (glitchElement: any) {
    const glitch = glitchElement.cloneNode(true)
    const glitchReverse = glitchElement.cloneNode(true)
    glitch.classList.add("glitch--clone", "glitch--bottom")
    glitchReverse.classList.add("glitch--clone", "glitch--top")
    glitch.setAttribute("aria-hidden", "true")
    glitchReverse.setAttribute("aria-hidden", "true")

    glitchElement.insertAdjacentElement("afterend", glitch)
    glitchElement.insertAdjacentElement("afterend", glitchReverse)
  }

  /**
   * @description 重制
   */
  resetAnmiton () {
    const terminal: any = document.querySelector(".terminal")
    const rebootSuccessText: any = document.querySelector(".hydra_reboot_success")
    const spinners = document.querySelectorAll(".spinner")
    const glitches = document.querySelectorAll(".glitch--clone")
    const rebootingText = document.querySelectorAll(".hydra_rebooting")
    const loadingBars = document.querySelectorAll(".loading-bar")

    terminal.classList.add("glitch")
    rebootSuccessText.classList.add("hidden")

    loadingBars.forEach(loadingBar => {
      loadingBar.innerHTML = ``
    })
    this.ShowAll([spinners, glitches, rebootingText])
  }

  async submitDate () {
    if (this.inputValue === 'sudo fix') {
      this.historyValue.push({
        code: this.inputValue,
        result: 'will start'
      })
      this.inputValue = ''
      await this.DrawLoadingBar()
      await CloudApi.fix2Queue()
      this.AnimateBox()
      setTimeout(() => {
        this.resetAnmiton()
      }, 2000)
    } else {
      this.historyValue.push({
        code: this.inputValue,
        result: 'zsh: can not find zhangzhiguo'
      })
      this.inputValue = ''
    }
  }
}
</script>
<style lang="less">
.loading-bar--unloaded {
  color: #fff;
  text-shadow: 0 0 5px #fff;
}
</style>

<style lang="less" scoped>
.cloud-queue {
  height: calc(100% + 12px);
  width: calc(100% + 24px);
  margin: -12px 0 0 -12px;

  font-family: SFMono-Regular, Consolas, Liberation Mono, Menlo, Courier,
    monospace;
  font-size: 3vw;
  font-weight: 100;
  text-shadow: 0 0 5px red;
  background-color: #0f0000;
  background-image: url(http://api.thumbr.it/whitenoise-200x200.png?background=00000000&noise=626262&density=15&opacity=15);
  background-size: 100px;
  color: #ff6666;
  text-align: center;

  height: 100%;
  display: grid;
  overflow: hidden;
}

.terminal {
  grid-row: 1;
  grid-column: 1;
  display: grid;
  grid-gap: 3vw;
  padding: 3vw;
  grid-template-rows: 1fr auto 1fr;
  grid-template-columns: 1fr auto 1fr;
}

.glitch {
  animation: glitch 1.5s linear infinite;
}

.glitch--clone {
  opacity: 0.2;
}

.glitch--clone .hydra {
  filter: blur(2px);
  opacity: 0.8;
}

.glitch--top {
  animation: glitch--top 1s linear infinite;
}

.glitch--top .hydra {
  transform: translate(4vw, 4vw);
}

.glitch--bottom {
  animation: glitch--bottom 0.75s linear infinite;
}

.glitch--bottom .hydra {
  transform: translate(-1vw, -1vw);
}

.hydra {
  box-shadow: 0 0 2px red, inset 0 0 2px red;
  padding: 2vw;
  border: 0.2vw solid #ff6666;
  grid-row: 2;
  grid-column: 2;
}

.spinner {
  text-align: left;
}

.input-box {
  padding: 4px;
  background-color: black;
  opacity: 0.7;

  font-weight: 200;
  font-size: 14px;

  white-space: pre-wrap;
  white-space: -moz-pre-wrap;
  white-space: -pre-wrap;
  white-space: -o-pre-wrap;
  word-wrap: break-word;

  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;

  text-align: left;
  
  overflow-y: auto;

  @keyframes blink { 50% { color: transparent; } }

  .time-date {
    display: inline-block;
  }

  .row-code {
    display: flex;
  }

  input {
    color: #ff6666;
    text-shadow: 0 0 5px red;
    width: 100%;
    outline: none;

    &::after {
      content: "|";
      animation: blink 2s steps(1) infinite;
    }
  }
}


.scanline {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.03);
  animation: scanline 6s linear infinite;
}

.hidden {
  display: none;
}

p {
  font-family: SFMono-Regular, Consolas, Liberation Mono, Menlo, Courier,
    monospace;
  font-size: inherit;
  line-height: 1.5;
  margin: 0;
}

.text--sm {
  font-size: 1.75vw;
}

* + .text--sm {
  padding-top: 0.5vw;
}

* + .loading-bar {
  padding-top: 1vw;
}

@keyframes scanline {
  0.01% {
    transform: translatey(-100%);
  }
  99.99% {
    transform: translatey(0);
  }
  100% {
    transform: translatey(-100%);
  }
}

@keyframes glitch {
  2%,
  64% {
    transform: translate(2px, 0) skew(0deg);
  }
  4%,
  60% {
    transform: translate(-2px, 0) skew(0deg);
  }
  62% {
    transform: translate(0, 0) skew(5deg);
  }
}

@keyframes glitch--top {
  2%,
  64% {
    transform: translate(2px, -2px);
  }
  4%,
  60% {
    transform: translate(-2px, 2px);
  }
  62% {
    transform: translate(13px, -1px) skew(-13deg);
  }
}

@keyframes glitch--bottom {
  2%,
  64% {
    transform: translate(-2px, 0);
  }
  4%,
  60% {
    transform: translate(-2px, 0);
  }
  62% {
    transform: translate(-22px, 5px) skew(21deg);
  }
}
</style>
