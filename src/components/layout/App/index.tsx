import React, {useCallback, useEffect} from "react";
import './styles'
import {Canvas} from "../../common/Canvas";
import {DownloadButtons} from "../../common/DownloadButton";
import {view} from "@risingstack/react-easy-state";
import {app} from "../../../stores/appStore";
import {styles} from "./styles";
import {checkForImageFromLocalstorageUrlOrPaste} from "../../../utils/image";
import {Logo, LogoStyle} from "../../common/Logo";
import {browserStore} from "../../../stores/browserStore";
import {Settings} from "../../common/Settings/Settings";
import {FrameType} from "../../../types";
import {ThemeSelector} from "../../common/ThemeSelector";
import {phoneStore} from "../../../stores/phoneStore";
import {BackgroundSettings} from "../../common/Settings/BackgroundSettings";
import {CanvasSettings} from "../../common/Settings/CanvasSettings";
import {noFrameStore} from "../../../stores/noFrameStore";
import {RatingPromptBox} from "../../common/RatingPromptBox";
import  {FormEvent} from "react";
import { useDropzone } from "react-dropzone";

export const App = view(() => {
    useEffect(() => checkForImageFromLocalstorageUrlOrPaste(), [])

    const handleFrameTypeChange = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        app.frameType = ((e.target as HTMLElement).innerText as FrameType);
    };

    const frameToStyleMap = {
        // [FrameType.Phone]: phoneStore.styles,
        [FrameType.Browser]: browserStore.styles,
        [FrameType.None]: noFrameStore.styles,
    };

    const frameToShadow = {
        [FrameType.Browser]: browserStore.settings.showBoxShadow,
        // [FrameType.Phone]: phoneStore.settings.showShadow,
        [FrameType.None]: noFrameStore.settings.showShadow,
    };
    const handleImage = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
        const input = e.target as HTMLElement;
        console.log('as;');
        
    };
    const onDrop = useCallback(files => {
        if (files && files[0]) {
            const fileReader = new FileReader();
            fileReader.addEventListener("load", e => app.setUserImageData(e.target.result as string));
            fileReader.readAsDataURL(files[0]);
            // browserStore.settings.imageData = files[0] as string;
        }
    }, [])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop,  accept: ['.jpeg', '.png', '.jpg']})

    return (
        <main className={styles()}>
            <aside className="sidebar">
                <Logo style={LogoStyle.Light}/>
                <div className="settings">
                    <div className={'section-wrap'}>
                        <div className="frame-type">
                            <h3>Frame Type</h3>
                            <div className="btn-group btn-group-sm w-100 mb-3">
                                {Object.keys(FrameType).map(type => {
                                    return (
                                        <button
                                            key={type}
                                            onClick={handleFrameTypeChange}
                                            className={(app.frameType === type ? 'active' : '') + ' btn btn-success'}>
                                            {type}
                                        </button>
                                    )
                                })}
                            </div>
                        </div>
                        <ThemeSelector/>
                    </div>
                    <div className={'section-wrap'}>
                        <h3>Canvas Settings</h3>
                        <CanvasSettings/>
                    </div>
                    <div className={'section-wrap'}>
                        <h3>Background Settings</h3>
                        <BackgroundSettings/>
                    </div>
                    <div className={'section-wrap'}>
                        <h3>General Settings</h3>
                        <Settings/>
                    </div>
                    <RatingPromptBox/>
                </div>
                <div className="footer">
                    <DownloadButtons/>
                </div>
            </aside>
            <div className="main-content">
                <div className="data mt-5">
                       <div className="d-flex gap-2">
                       <div className="img">
                       
                        <div {...getRootProps()}>
                            
                        <input {...getInputProps()} />
                        {
                              app.GetUserImageData() == "/images/user.jpg"  ?
                     <div className="drop-here"> <span>Upload image</span></div> :
                    <img  onClick={handleImage} height={110} width={110} src={app.GetUserImageData()} alt="" />
                        }
                        </div>
                       </div>
                       <div className="info">
                       <div className="form-group">
                       <label htmlFor="name" className="form-label text-white">
                            Name
                            <input type="text" className="form-control" name="name" id="" 
                             value={browserStore.settings.name}
                             onInput={(e:FormEvent<HTMLInputElement>) => {browserStore.settings.name = e.currentTarget.value}}
                            />
                        </label>
                       </div>
                       <div className="form-group">
                       <label htmlFor="username" className="form-label text-white">
                            username
                            <input type="text" className="form-control" name="username" id=""
                              value={browserStore.settings.userName}
                              onInput={(e:FormEvent<HTMLInputElement>) => {browserStore.settings.userName = e.currentTarget.value}}
                            />
                        </label>
                       </div>
                       </div>
                       
                       </div>
                       <div className="form-group" dir="rtl">
                        <label htmlFor="text" className="form-label text-white"> 
                        content
                            <textarea  maxLength={150} name="text" className="form-control" id="" cols={40} rows={4}
                             onInput={(e:FormEvent<HTMLTextAreaElement>) => {browserStore.settings.content = e.currentTarget.value}}
                             >
                                {browserStore.settings.content}
                            </textarea>
                        </label>
                       </div>
                      
             
                </div>
                <Canvas
                    imageData={app.imageData}
                    canvasBgColor={app.canvasBgColor}
                    canvasBgImage={app.canvasStyles.bgImage}
                    canvasVerticalPadding={app.canvasStyles.verticalPadding}
                    canvasHorizontalPadding={app.canvasStyles.horizontalPadding}
                    styles={(frameToStyleMap as any)[app.frameType]}
                    borderRadius={app.canvasStyles.borderRadius}
                    isDownloadMode={app.isDownloadMode}
                    showBoxShadow={(frameToShadow as any)[app.frameType]}
                    frameType={app.frameType}
                    isAutoRotateActive={app.isAutoRotateActive}
                    canvasBgType={app.canvasStyles.backgroundType}
                />
            </div>
        </main>
    );
});