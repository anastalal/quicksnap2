import {css} from "emotion";

export const styles = () => {
    return css`
          display: grid;
          grid-template-areas: 
                         "sidebar main-content";
          grid-template-columns: 310px auto;
          height: 100vh;

          .navbar {
            grid-area: nav;
          }
          .data .d-flex{
            gap: 15px;
          }
          .data img{
            border-radius: 50%;
            margin: auto;
          }

          .sidebar {
            display: flex;
            flex-direction: column;
            padding: 5px;
            font-size: .9em;
            
            .form-check-input:checked {
                background-color: #c45fc0;
                border-color: #c45fc0;
            }
            
            .form-range::-webkit-slider-thumb {
              background: #c460c0;
            }
            
            .form-range::-moz-range-thumb {
              background: #c460c0;
            }
            
            .form-range::-ms-thumb {
              background: #c460c0;
            }
           
            .logo {
              padding: 10px;
              font-size: 1.4em;
              text-align: center;
              color: #ff79ee;
              img {
                max-width: 100%;
                height: 130px;
              }
            }
        
            .settings {
              padding: 0 12px;
              
              h3 {
                font-size: 1.2em;
                color: #ff79ee;
                text-align: center;
                margin-bottom: .7em;
              }
              
              .section-wrap {
                padding: 10px 12px;
                background: #ffffff20;
                border-radius: 10px;
                margin-top: 10px;
              }
              
              .bg-image-preview {
                 padding: 5px;
                 height: 40px;
                 margin: 2px;
                 border: 1px solid #ffffff;
                 border-radius: 4px;
                 background-size: cover;
                 cursor: pointer;
                 
                 &.active {
                  border-width: 2px;
                 }

                 &.bg-image-preview--file {
                    position: relative;
                    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3Cpath fill='white' d='M492 236H276V20c0-11.046-8.954-20-20-20s-20 8.954-20 20v216H20c-11.046 0-20 8.954-20 20s8.954 20 20 20h216v216c0 11.046 8.954 20 20 20s20-8.954 20-20V276h216c11.046 0 20-8.954 20-20s-8.954-20-20-20z'/%3E%3C/svg%3E");
                    background-size: 40%;
                    background-repeat: no-repeat;
                    background-position: center;
                    cursor: pointer;
                   
                    input[type="file"] {
                      position: absolute;
                      top: 0;
                      left: 0;
                      width: 100%;
                      height: 100%;
                      opacity: 0;
                      cursor: pointer;
                    }

                  }
              }
            }
        
            .footer {
              padding: 12px;
            }
        
            color: #fff;
            background: #211440;
            grid-area: sidebar;
          }
        
          .main-content {
            display: flex;
            vertical-align: middle;
            align-items: center;
            grid-area: main-content;
            margin: 0 auto;
            flex-direction: column;
          }
          
          .btn-group-sm>.btn, .btn-sm {
            padding: 0.15rem .15rem;
            font-size: .775rem;
          }
          textarea{
            text-align: right;
          }
          .rows{
            overflow-y: auto;
            height: 200px;
          }
          .drop-here{
            display: inline-block;
            position: relative;
            width: 100px;
            height: 100px;
            border-radius: 50%;
            overflow: hidden;
            background: white;

          }
          .drop-here span{
            display: block;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 14px;
            color: #555;
          }
          
`;
}