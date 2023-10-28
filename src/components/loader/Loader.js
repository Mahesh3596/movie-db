import loaderCamera from '../../assets/loader-camera.png'
import loaderReel from '../../assets/loader-reel.png'
import './Loader.css'

const Loader = () => {
    return (
        <div className="loader-container">
            <div style={{position: 'relative'}}>
                <img className='loader-reel'
                    src={loaderReel} 
                    style={{position: 'absolute', top: -40, left: 10}}/>
                <img src={loaderCamera} style={{position: 'absolute'}}/>
            </div>
        </div>
    )
}

export default Loader