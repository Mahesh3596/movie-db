import { Typography } from "@mui/material";
import moment from "moment";
import PrimaryDetailsAction from "./PrimaryDetailsAction";
import imgPlaceholder from "../../assets/trending-movies-ph.png"

const PrimaryDetails = ({details=null, imageBaseURL='', showType=''}) => {
    function getCountry () {
        return details?.release?.iso_3166_1 || ''
    }
    function getCertificate () {
        if (showType === 'movie') return details?.release?.release_dates?.[0]?.certification || ''
        if (showType === 'tv') return details?.release?.rating || ''
    }
    function getTopCrew () {
        const roles = details?.crew.sort((a,b) => b.popularity - a.popularity).slice(0, 3)
        return Array.from(new Set(roles.map(a => a.name))).map(name => { return roles.find(a => a.name === name) })
    }
    function getRoles (person) {
        return details?.crew.filter(({name}) => name === person)?.map(role => role.job).join(', ')
    }
    return (<div className="primary-details-container">
        <div style={{backgroundImage: `url(${imageBaseURL}w1920_and_h800_multi_faces${details.backdrop_path})`, backgroundSize: 'cover'}}>
            <div style={{backgroundColor: 'rgb(0 17 30 / 75%)', height: '500px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <div style={{width: '80%', display: 'flex'}}>
                    <div className="details-thumbnail">
                        {details?.poster_path ? <img
                            loading='lazy'
                            src={`${imageBaseURL}w500${details.poster_path}`}
                            alt={details?.title || details?.original_name}
                        />:
                        <img
                            src={imgPlaceholder}
                            alt={details?.title || details?.original_name}
                        />}
                    </div>
                    <div className="primary-details-section">
                        <Typography sx={{color: 'white', paddingBottom: '5px'}} variant="h5" fontWeight="bold">
                            {details?.title || details?.original_name} <span style={{fontWeight: 'lighter',opacity: 0.8}}>{'('+(moment(details.release_date)).year()+')'}</span>
                        </Typography>
                        <div style={{display: 'flex', gap: '10px'}}>
                            <Typography sx={{color: 'white'}}>
                                {getCertificate() && <span className="certification">{getCertificate()}</span>}
                                {moment(details.release_date).format('MMM DD, YYYY')+`${getCountry() ? ` (${getCountry()})` : ''}`}
                            </Typography>
                            <Typography sx={{color: 'white'}}><li>{details?.genres?.map(genre => genre.name).join(', ')}</li></Typography>
                            {showType !== 'tv' && <Typography sx={{color: 'white'}}><li>{moment.duration(details?.runtime, 'minutes').hours()+'h '+moment.duration(details?.runtime, 'minutes').minutes()+'m'}</li></Typography>}
                        </div>
                        <PrimaryDetailsAction details={details} showType={showType}/>
                        <span style={{color: 'silver', fontStyle: 'italic'}}>{details?.tagline}</span>
                        <div style={{color: 'white', display: 'flex', flexDirection: 'column', gap: 10, padding: '10px 0'}}>
                            <span style={{fontWeight: 'bolder', fontSize: '18px'}}>Overview</span>
                            <span style={{fontSize: '15px'}}>{details?.overview}</span>
                        </div>
                        <div style={{display: 'flex', gap: 40}}>
                            {getTopCrew().map(crew => <div key={crew.id} style={{color: 'white', display: 'flex', flexDirection: 'column', gap: 5, padding: '10px 0'}}>
                                <span style={{fontWeight: 'bolder', fontSize: '15px'}}>{crew?.name || 'NA'}</span>
                                <span style={{fontSize: '13px'}}>{getRoles(crew?.name)}</span>
                            </div>)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>)
}

export default PrimaryDetails;