import {css} from "emotion";
import {ICanvasProps} from "./index";
import {app} from "../../../stores/appStore";
import {CanvasBackgroundTypes, FrameType} from "../../../types";
import {darken} from "polished";

export const styles = (props: ICanvasProps): string => {
    // todo - this is duplicated
    const determineWidth = (measurement: number): number => {
        return props.isDownloadMode ? measurement * 2 : measurement;
    }

    const getDownloadCanvasWidth = (): number => {
        switch (app.frameType) {
            case FrameType.Browser:
            case FrameType.None:
                return 2300;
            // case FrameType.Phone:
            //     return 1200;
        }
    }

    return css`
      position: sticky;
      top: 0;

      .rotate-alert {
        padding: 20px;
        text-align: center;
        color: #ffffff;

        a {
          color: #fe79ed;

          &:hover {
            color: ${darken(.1, '#fe79ed')};
          }
        }
      }
      
      .user-info p{
        margin: 0px;
        padding: 0px;
        font-size: ${app.adjustMeasurementForDownload(1)}em;
        margin-bottom:${app.adjustMeasurementForDownload(10)}px;
        line-height: ${app.adjustMeasurementForDownload(22)}px;
     
      }
      .user-info .info{
        margin-top: ${app.adjustMeasurementForDownload(20)}px;
        text-align: right;
        width: ${app.adjustMeasurementForDownload(100)}%;
        margin-bottom:${app.adjustMeasurementForDownload(10)}px;
        height: ${app.adjustMeasurementForDownload(210)}px;
        
      }
      .user-info .info h5{
        text-align: right;
        font-size: ${app.adjustMeasurementForDownload(1)}em;
        line-height: ${app.adjustMeasurementForDownload(48)}px;
        margin-top: ${app.adjustMeasurementForDownload(20)}px;
        margin-bottom: ${app.adjustMeasurementForDownload(20)}px;
       
      }
      .user-info{
        display:flex;
        gap: 16px;
        margin-bottom: ${app.adjustMeasurementForDownload(50)}px;
        justify-content: end;
        text-align: right;
        height: 41px;
        line-height: 30px;
        font-size: ${app.adjustMeasurementForDownload(1)}em;
        color: ${app.canvasStyles.textColor};
        height: ${app.adjustMeasurementForDownload(230)}px;
      }
      .title{
        text-align: right;
       
        font-size: ${app.adjustMeasurementForDownload(3)}em;
       
        
      }
      .title div{
        width: ${app.adjustMeasurementForDownload(100)}%;
      }
      .title h5{
        margin: 16px auto;
       
      }
     .user-info img{
      width:  ${app.adjustMeasurementForDownload(100)}px;
      height: ${app.adjustMeasurementForDownload(100)}px;
      border: 1px solid #af9e9e;
    border-radius: 50%;
     }
      .canvas {
        width: ${props.isDownloadMode ? `${getDownloadCanvasWidth()}px` : 'auto'};
        background: ${props.canvasBgColor};
        background-color: ${props.canvasBgType === CanvasBackgroundTypes.None && !app.isDownloadMode ? '#fff' : ''};
        padding-top: ${determineWidth(props.canvasVerticalPadding)}px;
        padding-bottom: ${determineWidth(props.canvasVerticalPadding)}px;
        padding-left: ${determineWidth(props.canvasHorizontalPadding)}px;
        padding-right: ${determineWidth(props.canvasHorizontalPadding)}px;
        margin: ${props.isDownloadMode ? '0' : '20px'};
        transform: scale(${props.isDownloadMode ? `1` : '.8'}) ${props.isAutoRotateActive ? ' rotate(270deg)' : ''};
        transform-origin: center;
        background-size: ${props.canvasBgType !== CanvasBackgroundTypes.None ? 'cover' : ''};
        overflow: hidden;
      }
    `
};