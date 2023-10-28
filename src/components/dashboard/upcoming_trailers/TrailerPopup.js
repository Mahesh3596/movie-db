import { Modal } from "@mui/material";
import { useEffect, useState } from "react";
import CloseIcon from '@mui/icons-material/Close';

const TrailerPopup = ({showTrailer=false, trailerObj={}, handleClose=() => {}}) => {
    const [modalObj, setModalObj] = useState({open: showTrailer, ...trailerObj})
    useEffect(() => {
        if (trailerObj.key) setModalObj(prevState => ({...prevState, ...trailerObj, open: showTrailer}))
    }, [showTrailer, trailerObj])
    const onClosePopup = () => {
        setModalObj({open: false})
        handleClose()
    }
    return (
        <Modal
            open={modalObj.open}
            onClose={onClosePopup}
            sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}
            disableAutoFocus
        >
            <div style={{display: 'grid'}}>
                <CloseIcon sx={{justifySelf: 'flex-end', color: 'white', cursor: 'pointer'}} onClick={onClosePopup}/>
                <div style={{width: '60vw', height: '60vh'}}>
                    <iframe
                        width="100%"
                        height="100%"
                        src={`https://www.youtube.com/embed/${modalObj.key}?autoplay=0`}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title={modalObj.name}
                    />
                </div>
            </div>
        </Modal>
    )
}

export default TrailerPopup;