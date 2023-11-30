import MediaList from "./MediaList";
import Recommendations from "./Recommendations";
import SecondarySideDetails from "./SecondarySideDetails";
import TopCastList from "./TopCastList";

const SecondaryDetails = ({details=null, imageBaseURL='', showType=''}) => {
    return (<div style={{width: '100vw', display: 'flex', justifyContent: 'center'}}>
        <div style={{width: '60%'}}>
            <TopCastList castList={details?.cast} imageBaseURL={imageBaseURL}/>
            <MediaList details={details} imageBaseURL={imageBaseURL}/>
            <Recommendations details={details} imageBaseURL={imageBaseURL} showType={showType}/>
        </div>
        <div style={{width: '20%'}}>
            <SecondarySideDetails details={details} imageBaseURL={imageBaseURL} showType={showType}/>
        </div>
    </div>)
}

export default SecondaryDetails;