const chars = [
    {
        name: "Jevon",
        pronounce: "his",
        avatar: "https://res.cloudinary.com/dfulxq7so/image/upload/v1613262123/Jevon_zb3caa.svg",
        title: "Salesman",
        bio: `
            Jevon is the only black male in his team. Lorem ipsum dolor sit amet consectetur adipiscing elit. Duis dapibus rutrum facilisis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Etiam tristique libero eu nibh porttitor amet fermentum.
            <br/>Nullam venenatis erat id vehicula ultrices sed ultricies condimentum. Magna sed etiam consequat, et lorem adipiscing sed nulla. Volutpat nisl et tempus et dolor libero, feugiat magna tempus, sed et lorem adipiscing.
        `
    },
    {
        name: "Yang",
        pronounce: "her",
        avatar: "https://res.cloudinary.com/dfulxq7so/image/upload/v1613262323/yang_oyy0oi.svg",
        title: "Software Developer",
        bio: `
            Yang feels that she is treated unfairly at work due to her gender. She is the only woman on her team and, in meetings, she is always asked to take notes even though there is always a project manager present.
            <br/>She also feels her work is scrutinized more stringently against her male counterparts. For example, if she makes a mistake, it is called out in front of her peers. She doesn’t see that happening with her male peers.
        `
    },
    {
        name: "Elijah",
        pronounce: "her",
        avatar: "https://res.cloudinary.com/dfulxq7so/image/upload/v1613262303/elijah_xmsqid.svg",
        title: "Transgender woman",
        bio: `
            Elijah is the only transgender person in her team. Lorem ipsum dolor sit amet consectetur adipiscing elit. Duis dapibus rutrum facilisis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Etiam tristique libero eu nibh porttitor amet fermentum.
            <br/>Nullam venenatis erat id vehicula ultrices sed ultricies condimentum. Magna sed etiam consequat, et lorem adipiscing sed nulla. Volutpat nisl et tempus et dolor libero, feugiat magna tempus, sed et lorem adipiscing.
        `
    }
]

// let charId = parseInt(location.search.substring(1));

let sizeElastic = parseInt(localStorage.getItem('sizeElastic')) || 0

const curMode = sessionStorage.getItem('data-theme')
const container = document.getElementsByClassName('container')[0]
const logo = document.getElementsByClassName('logo')[0]
const direction = document.getElementsByClassName("direction")[0]
const name = document.getElementsByClassName("name")[0]
const title = document.getElementsByClassName("title")[0]
const bioWrapper = document.getElementsByClassName("bio-wrapper")[0]
const charImage = document.getElementById("charImage")
const introWrapper = document.getElementsByClassName("intro-wrapper")[0]
const decreaseSizeIcon = document.getElementsByClassName('icon decrease-size')[0]
            const increaseSizeIcon = document.getElementsByClassName('icon increase-size')[0]


const selectedCharInd = parseInt(sessionStorage.getItem('charId'))
direction.innerHTML = `
    You will be playing a role of ${chars[selectedCharInd].name}
    <br/>Welcome to a day in ${chars[selectedCharInd].pronounce} life
`

name.innerHTML = chars[selectedCharInd].name.toUpperCase()
title.innerHTML =  chars[selectedCharInd].title
bioWrapper.innerHTML = chars[selectedCharInd].bio
charImage.src = chars[selectedCharInd].avatar



if (curMode && curMode === "dark"){
    container.style.backgroundImage = "url(https://res.cloudinary.com/dfulxq7so/image/upload/v1617748796/charSelectionBG-dark_bmdl73.svg)"
    ellipse.src= "https://res.cloudinary.com/dfulxq7so/image/upload/v1618873211/Ellipse_25-darkkk_dkdlbp.svg"
    ellipseBig.src= "https://res.cloudinary.com/dfulxq7so/image/upload/v1618874636/ellipse-green-darkkk_srjznt.svg"
    leftSlide.src= "https://res.cloudinary.com/dfulxq7so/image/upload/v1618873211/leftSlide-darkkk_lkxxyl.svg"
    polygon.src = "https://res.cloudinary.com/dfulxq7so/image/upload/v1618874801/Polygon_14-darkkkk_cpnyuw.svg"
    direction.style.color = "#FFFFFF"
    group2.src = "https://res.cloudinary.com/dfulxq7so/image/upload/v1617745715/Group_105-dark_n6co6r.svg"
    rightSlide.src= "https://res.cloudinary.com/dfulxq7so/image/upload/v1618873310/rightSlide-darkkk_nun33v.svg"
    logo.src="https://res.cloudinary.com/dfulxq7so/image/upload/v1617746117/Group_45-dark_u84cig.svg"
    bioWrapper.style.backgroundColor = "#000000"
    bioWrapper.style.border = "1px solid #FFFFFF"
    bioWrapper.style.color = "#FFFFFF"
    introWrapper.style.backgroundImage = 'url(https://res.cloudinary.com/dfulxq7so/image/upload/v1618942390/Group_90_jdp60y.svg)'
    introWrapper.style.color = "#FFFFFF"
    increaseSizeIcon.src = "https://res.cloudinary.com/dfulxq7so/image/upload/v1619023453/increaseText-icon-dark_q2g7qj.svg"
                decreaseSizeIcon.src = "https://res.cloudinary.com/dfulxq7so/image/upload/v1619023453/decreaseText-icon-dark_e2uv48.svg"
} 

//set sizes
direction.style.fontSize = `${26 + sizeElastic}px`
name.style.fontSize = `${40 + sizeElastic}px`
title.style.fontSize = `${20 + sizeElastic}px`
bioWrapper.style.fontSize = `${18 + sizeElastic}px`
bioWrapper.style.lineHeight = `${30 + sizeElastic}px`

function updateSize(){
    if (sizeElastic > -25 && sizeElastic < 40){
        direction.style.fontSize = `${26 + sizeElastic}px`
        direction.style.lineHeight = `${38 + sizeElastic}px`
    }
    if (sizeElastic > -39 && sizeElastic < 60){
        name.style.fontSize = `${40 + sizeElastic}px`
    }
    if (sizeElastic > -17 && sizeElastic < 30){
        name.style.fontSize = `${40 + sizeElastic}px`
        bioWrapper.style.fontSize = `${18 + sizeElastic}px`
        bioWrapper.style.lineHeight = `${30 + sizeElastic}px`
    }
    localStorage.setItem('sizeElastic', sizeElastic)
}

function increaseSize(){
    sizeElastic += 1
    updateSize()
}
function decreaseSize(){
    sizeElastic -= 1
    updateSize()
}
