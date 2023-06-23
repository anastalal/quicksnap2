import React from "react";

export enum LogoStyle {
    Light = "/images/logo-light.png",
    Dark = "/images/logo-dark.png",
}

interface ILogoProps {
    style: LogoStyle;
}

export const Logo = ({style}: ILogoProps) => {
    return (
        <div className="logo">
            <img src={style} alt="Screenshot.Rocks logo"/>
            {/* <p className="text-center">QuickSnap</p> */}
        </div>
    )
};