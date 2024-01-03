import { useEffect } from "react";

//https://codepen.io/tiagorechau/pen/NWWORPj : color extraction example
const ImgColorExtractor = ({imgSrcId='', onExtracted=() => {}}) => {
    useEffect(() => {
        if (imgSrcId) {
            const canvas = document.getElementById('canvas')
            const ctx = canvas.getContext("2d")
            const imageSrc = document.getElementById(imgSrcId)
            const image = new Image();
            image.src = imageSrc.src;
            image.crossOrigin = "Anonymous";
            
            image.addEventListener('load', e => {
                ctx.drawImage(image, 0, 0, 1, 1)
                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
                if (imageData.data) {
                    onExtracted({
                        bgColor: `rgb(${imageData.data[0]},${imageData.data[1]},${imageData.data[2]})`,
                        txtColor: `rgb(${255-imageData.data[0]},${255-imageData.data[1]},${255-imageData.data[2]})`,
                    })
                }
            })
        }
    }, [imgSrcId])
    return (<canvas id="canvas" width="1px" height="1px" style={{display: 'none'}}></canvas>)
}

export default ImgColorExtractor;