import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import React, { useCallback, useRef } from 'react';
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Webcam from 'react-webcam';
import { setCameraImage } from '../features/cameraSlice';
import '../styling/WebcamCapture.scss';

const videoConstraints = {
    width: 250,
    height: 400,
    facingMode: "user",
}

function WebcamCapture() {
    const webcamRef = useRef(null);
    const dispatch = useDispatch();
    const history = useHistory();

    const capture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        dispatch(setCameraImage(imageSrc));
        history.push('/preview')

    }, [webcamRef])

    return (
        <div className="webcamCapture">
            <Webcam 
                audio={false}
                height={videoConstraints.height}
                width={videoConstraints.width}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                fontSize="large"
                style={{
                    objectFit: "cover",
                 }}
            />
            <RadioButtonUncheckedIcon
                className='webcamCapture__button'
                onClick={capture}
                fontSize="large"
            />
        </div>
    )
}

export default WebcamCapture

