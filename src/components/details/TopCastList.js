import { Typography } from "@mui/material";
import ProfileCard from "./ProfileCard";


const TopCastList = ({castList=[], imageBaseURL=''}) => {
    return (<div>
        <Typography variant="h6" fontWeight='bold' paddingTop='20px'>Top Billed Cast</Typography>
        <div className="top-cast-list-container">
            {castList.map((cast) => <ProfileCard key={cast.id} info={cast} imageBaseURL={imageBaseURL}/>)}
        </div>
        <Typography fontWeight='bold' padding='10px 0'>Full Cast & Crew</Typography> <hr/>
    </div>)
}

export default TopCastList;