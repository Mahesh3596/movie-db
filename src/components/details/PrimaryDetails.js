const PrimaryDetails = ({details=null, imageBaseURL=''}) => {
    return (<div className="primary-details-container">
        <div style={{backgroundImage: `url(${imageBaseURL}/w1920_and_h427_multi_faces${details.backdrop_path})`}}>
            <div style={{backgroundColor: 'rgb(0 17 30 / 75%)', height: '400px'}}>
            </div>
        </div>
    </div>)
}

export default PrimaryDetails;