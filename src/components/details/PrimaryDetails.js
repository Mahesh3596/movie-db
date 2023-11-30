import { Typography } from "@mui/material";
import moment from "moment";
import PrimaryDetailsAction from "./PrimaryDetailsAction";

const PrimaryDetails = ({details=null, imageBaseURL='', showType=''}) => {
    function getCountry () {
        return details?.production_companies?.sort((a,b) => a.id - b.id)[0]?.origin_country
    }
    function getCertificate (country) {
        return details?.release_dates?.results.filter(({iso_3166_1}) => iso_3166_1 === country)[0]?.release_dates[0]?.certification
    }
    function getDirector () {
        return showType === 'movie' ? 
            details?.crew.filter(({job}) => job === 'Director')?.[0]?.name || 'NA' : 
            details?.crew.filter(({known_for_department}) => known_for_department === 'Writing')?.[0]?.name || 'NA'
    }
    function getRoles (person) {
        return details?.crew.filter(({name}) => name === person)?.map(role => role.job).join(', ')
    }
    return (<div className="primary-details-container">
        <div style={{backgroundImage: `url(${imageBaseURL}/w1920_and_h427_multi_faces${details.backdrop_path})`}}>
            <div style={{backgroundColor: 'rgb(0 17 30 / 75%)', height: '400px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <div style={{width: '80%', display: 'flex'}}>
                    <div className="details-thumbnail">
                        <img
                            loading='lazy'
                            src={`${imageBaseURL}/w220_and_h330_face${details.poster_path}`}
                            alt={details?.title || details?.original_name}
                        />
                    </div>
                    <div className="primary-details-section">
                        <Typography sx={{color: 'white', paddingBottom: '5px'}} variant="h5" fontWeight="bold">
                            {details?.title || details?.original_name} <span style={{fontWeight: 'lighter',opacity: 0.8}}>{'('+(moment(details.release_date)).year()+')'}</span>
                        </Typography>
                        <div style={{display: 'flex', gap: '10px'}}>
                            <Typography sx={{color: 'white'}}>
                                {getCertificate(getCountry()) && <span className="certification">{getCertificate(getCountry())}</span>}
                                {moment(details.release_date).format('MMM DD, YYYY')+`${getCountry() ? ` (${getCountry()})` : ''}`}
                            </Typography>
                            <Typography sx={{color: 'white'}}><li>{details?.genres?.map(genre => genre.name).join(', ')}</li></Typography>
                            {showType !== 'tv' && <Typography sx={{color: 'white'}}><li>{moment.duration(details?.runtime, 'minutes').hours()+'h '+moment.duration(details?.runtime, 'minutes').minutes()+'m'}</li></Typography>}
                        </div>
                        <PrimaryDetailsAction details={details}/>
                        <span style={{color: 'silver', fontStyle: 'italic'}}>{details?.tagline}</span>
                        <div style={{color: 'white', display: 'flex', flexDirection: 'column', gap: 10, padding: '10px 0'}}>
                            <span style={{fontWeight: 'bolder', fontSize: '18px'}}>Overview</span>
                            <span style={{fontSize: '15px'}}>{details?.overview}</span>
                        </div>
                        <div style={{color: 'white', display: 'flex', flexDirection: 'column', gap: 5, padding: '10px 0'}}>
                            <span style={{fontWeight: 'bolder', fontSize: '15px'}}>{getDirector()}</span>
                            <span style={{fontSize: '13px'}}>{getRoles(getDirector())}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>)
}

export default PrimaryDetails;