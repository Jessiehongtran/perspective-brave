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


const curMode = sessionStorage.getItem('data-theme')
const container = document.getElementsByClassName('container')[0]
const logo = document.getElementsByClassName('logo')[0]
const direction = document.getElementsByClassName("direction")[0]
const name = document.getElementsByClassName("name")[0]
const title = document.getElementsByClassName("title")[0]
const bioWrapper = document.getElementsByClassName("bio-wrapper")[0]
const charImage = document.getElementById("charImage")
const introWrapper = document.getElementsByClassName("intro-wrapper")[0]

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
    ellipse.src= "https://res.cloudinary.com/dfulxq7so/image/upload/v1617747582/Rectangle_137_green-dark_x9ugqg.svg"
    ellipseBig.src= "https://res.cloudinary.com/dfulxq7so/image/upload/v1617747582/Ellipse_yellow-dark_li42vk.svg"
    polygon.src= "https://res.cloudinary.com/dfulxq7so/image/upload/v1617749725/Polygon_blue-dark_lloy5c.svg"
    leftSlide.src= "https://res.cloudinary.com/dfulxq7so/image/upload/v1617747582/leftSlide-dark_fggzk5.svg"
    direction.style.color = "#FFFFFF"
    group2.src = "https://res.cloudinary.com/dfulxq7so/image/upload/v1617745715/Group_105-dark_n6co6r.svg"
    rightSlide.src= "https://res.cloudinary.com/dfulxq7so/image/upload/v1617747582/rightSlide-dark_iltwbn.svg"
    logo.src="https://res.cloudinary.com/dfulxq7so/image/upload/v1617746117/Group_45-dark_u84cig.svg"
    bioWrapper.style.backgroundColor = "#000000"
    bioWrapper.style.color = "#FFFFFF"
    introWrapper.style.backgroundImage = 'url(https://res.cloudinary.com/dfulxq7so/image/upload/v1617913920/yangIntroBG-dark_bn4ksc.png)'
}
