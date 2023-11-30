import MediaList from "./MediaList";
import SecondarySideDetails from "./SecondarySideDetails";
import TopCastList from "./TopCastList";

const SecondaryDetails = ({details=null, imageBaseURL=''}) => {
    return (<div style={{width: '100vw', display: 'flex', justifyContent: 'center'}}>        
        <div style={{width: '60%'}}>
            <TopCastList castList={details?.cast} imageBaseURL={imageBaseURL}/>
            <MediaList details={details} imageBaseURL={imageBaseURL}/>
        </div>
        <div style={{width: '20%'}}>
            <SecondarySideDetails details={details}/>
        </div>
    </div>)
}

export default SecondaryDetails;