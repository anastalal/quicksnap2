import {autoEffect, store} from '@risingstack/react-easy-state';
import {CanvasBackgroundTypes, FrameType, ImageFormats} from "../types";
import {getImageDimensions} from "../utils/image";
import {phoneStore} from "./phoneStore";
import {Routes, routeStore} from "./routeStore";
import {observe} from '@nx-js/observer-util'
import { browserStore } from './browserStore';

export const bgImages = [
    '1.jpg',
    '2.jpg',
    '3.png',
    '4.jpg',
    '3.png',
    '4.jpg',
    '3.png',
    '4.jpg',
].map(img => `/images/backgrounds/${img}`);
export const bgColors = [
    '(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%)',
    '(to top, #a18cd1 0%, #fbc2eb 100%)',
    '(to top, #fad0c4 0%, #ffd1ff 100%)',
    '(to right, #ffecd2 0%, #fcb69f 100%)',
    '(to top, #ff9a9e 0%, #fecfef 99%, #fecfef 100%)',
    '(to top, #fbc2eb 0%, #a6c1ee 100%)',
    '(to top, #fdcbf1 0%, #fdcbf1 1%, #e6dee9 100%)',
    '(120deg, #a1c4fd 0%, #c2e9fb 100%)',
    '(120deg, #d4fc79 0%, #96e6a1 100%)',
    '(120deg, #84fab0 0%, #8fd3f4 100%)',
    '(to top, #cfd9df 0%, #e2ebf0 100%)',
    '(120deg, #a6c0fe 0%, #f68084 100%)',
    '(120deg, #fccb90 0%, #d57eeb 100%)',
    '(120deg, #e0c3fc 0%, #8ec5fc 100%)',
    '(120deg, #f093fb 0%, #f5576c 100%)',
    '(to right, #43e97b 0%, #38f9d7 100%)',
    '(to top, #a8edea 0%, #fed6e3 100%)',
    '(to top, #5ee7df 0%, #b490ca 100%)',
    '(to top, #d299c2 0%, #fef9d7 100%)',
    '(135deg, #f5f7fa 0%, #c3cfe2 100%)',
    '(to top, #fddb92 0%, #d1fdff 100%)',
    '(to top, #9890e3 0%, #b1f4cf 100%)',
    '(to top, #ebc0fd 0%, #d9ded8 100%)',
    '(to top, #96fbc4 0%, #f9f586 100%)',
    '(to top, #cd9cf2 0%, #f6f3ff 100%)'
    //37 old hat
   
].map(img => `${img}`);
export const defaultCanvasBgColor = '#a090c1';
export const defaultCanvasTexrColor = '#564E6E';

export const defaultResettableCanvasStyles = {
    verticalPadding: 60,
    horizontalPadding: 80,
    gradientAngle: 45,
    shadowSize: 4,
    rotateX: 0,
    rotateY: 0,
    borderRadius: 10,
    size: 100,
    textColor: defaultCanvasTexrColor,
}

export interface ICanvasStyles {
    bgColor: string;
    bgImage?: string;
    verticalPadding: number;
    horizontalPadding: number;
    backgroundType: CanvasBackgroundTypes;
    gradientColorOne: string;
    gradientColorTwo: string;
    gradientAngle: number;
    shadowSize: number;
    rotateX: number;
    rotateY: number;
    borderRadius: number;
    size: number;
    userName: string;
    name : string;
    content : string;
    textColor: string;
    bgColor2: string;
}

export interface IStore {
    frameType: FrameType;
    imageData?: string;
    userImageDate?: string;
    originalImageData?: string;
    originalUserImageData?: string;
    canvasStyles: ICanvasStyles;
    isDownloadMode: boolean;
    defaultImageFormat: ImageFormats;
    canvasBgColor: string;
    isAutoRotateActive: boolean;
    disableAutoRotate: boolean;
    hasDownloaded: boolean;
    shouldShowRatingPrompt: boolean;
    cssTransformString: string;

    setImageData(imageData: string): void;
    setUserImageData(imageData: string): void;
    GetUserImageData(): string;
    adjustMeasurementForDownload(width: number): number;
}

export let app = store({
    frameType: FrameType.Browser,
    defaultImageFormat: ImageFormats.PNG,
    isDownloadMode: false,
    imageData: null,
    originalImageData: null,
    isAutoRotateActive: false,
    disableAutoRotate: false,
    hasDownloaded: false,
    userImageDate: '/images/user.jpg',
    
    get shouldShowRatingPrompt(): boolean {
        return app.hasDownloaded
            && localStorage.getItem('hasReviewed') === null
            && window.location.href.includes('extension');
    },
    setImageData(imageData: string) {
        app.imageData = imageData;
        app.originalImageData = imageData;

        // switch to mobile for portrait screenshots
        getImageDimensions(imageData).then(({width, height}) => {
            app.frameType = FrameType.Browser;
            // app.frameType = height > width ? FrameType.Phone : FrameType.Browser;
        });

        routeStore.goToRoute(Routes.App);
    },
    setUserImageData(imageData: string) {
        app.userImageDate = imageData;
        app.originalUserImageData = imageData;
        // Convert the image data to Base64 string
        var base64ImageData = btoa(imageData);
        browserStore.settings.imageData = base64ImageData;

    },
    GetUserImageData() {
        var base64ImageData = browserStore.settings.imageData 
         // Convert the Base64 string back to the original image data

         if(browserStore.settings.imageData =='/images/user.jpg')
         {
            return base64ImageData;
         }
        else{
            var imageData = atob(base64ImageData);
            return imageData;
        }
      
    },
    
    get canvasBgColor(): string {
        switch (app.canvasStyles.backgroundType) {
            case CanvasBackgroundTypes.Gradient:
                // app.canvasStyles.bgColor = `linear-gradient(-${app.canvasStyles.gradientAngle}deg, ${app.canvasStyles.gradientColorOne}, ${app.canvasStyles.gradientColorTwo})`;
                return app.canvasStyles.bgColor2;
                // return `linear-gradient(-${app.canvasStyles.gradientAngle}deg, ${app.canvasStyles.gradientColorOne}, ${app.canvasStyles.gradientColorTwo})`;
            case CanvasBackgroundTypes.Image:
                return `url(${app.canvasStyles.bgImage})`;
            case CanvasBackgroundTypes.Solid:
                return app.canvasStyles.bgColor;
            case CanvasBackgroundTypes.None:
            default:
                return app.isDownloadMode ? 'transparent' : 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAMUlEQVQ4T2NkYGAQYcAP3uCTZhw1gGGYhAGBZIA/nYDCgBDAm9BGDWAAJyRCgLaBCAAgXwixzAS0pgAAAABJRU5ErkJggg==")';
        }
    },

    // helper function which increases an element's width while in download mode
    adjustMeasurementForDownload(measurement: number): number {
        const multiplier = app.frameType === FrameType.Browser ? 2 : 3;
        return app.isDownloadMode ? measurement * multiplier : measurement;
    },

    get cssTransformString(): string {
         return `scale(${app.isDownloadMode ? (app.canvasStyles.size/100)*.99 : app.canvasStyles.size/100}) perspective(${app.adjustMeasurementForDownload(800)}px) rotateX(${app.canvasStyles.rotateX}deg) rotateY(${app.canvasStyles.rotateY}deg)`;
    },

    canvasStyles: {
        ...defaultResettableCanvasStyles, ...{
            bgColor: defaultCanvasBgColor,
            bgImage: '/images/backgrounds/1.jpg',
            backgroundType: CanvasBackgroundTypes.Image,
            gradientColorOne: '#7e349c',
            gradientColorTwo: '#968bbd',
            textColor: defaultCanvasTexrColor,
            bgColor2:  `linear-gradient(-45deg, #7e349c, #968bbd)`
            
        }
    },
} as IStore);

if (localStorage.getItem('canvasStyles')) {
    app.canvasStyles = JSON.parse(localStorage.getItem('canvasStyles'))
}

autoEffect(() => {
    // This auto-rotates the image if the user switches to mobile and the image is landscape
    if (app.frameType && !app.disableAutoRotate) {
        getImageDimensions(app.imageData).then(({width, height}) => {
            // if (app.frameType === FrameType.Phone && width > height) {
            //     // rotateImage(app.imageData).then((rotated) => {
            //     //     app.imageData = rotated
            //     //     app.isAutoRotateActive = true;
            //     // });
            //     // Disable the auto-rotate for now and just hide the volume rocker
            //     phoneStore.settings.showVolumeRocker = false;
            // }
            if (app.frameType === FrameType.Browser && width < height) {
                // app.imageData = app.originalImageData;
                // app.isAutoRotateActive = false;
            }
        })
    }
});

// Handle syncing some settings with localStorage
observe(() => localStorage.setItem('canvasStyles', JSON.stringify(app.canvasStyles)));
