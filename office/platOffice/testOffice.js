const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)

console.log('vh', vh)
console.log('bgsize', document.getElementById("container").style.backgroundSize)


document.getElementById("container").style.backgroundSize = `${vw} ${vh}`

const bigTable = document.getElementById("bigTable")
const smallTable = document.getElementById("smallTable")
const arrayTable = document.getElementById("arrayTable")

bigTable.style.left = `${150*vw/1600}px`
bigTable.style.top = `${400*vh/952}px`
smallTable.style.left = `${570*vw/1600}px`
smallTable.style.top = `${50*vh/952}px`
arrayTable.style.left = `${750*vw/1600}px`
arrayTable.style.top = `${500*vh/952}px`