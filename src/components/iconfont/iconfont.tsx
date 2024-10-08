import React, { useState, useEffect, FC } from "react";
import { Block, View } from "@tarojs/components";
import "./iconfont.less";
import Taro from "@tarojs/taro";
import { classNames } from "@/utils/tools";

const SystemWidth = Taro.getSystemInfoSync().windowWidth
const quot = '"'

function hex2rgb(hex) {
  const rgb: number[] = [];

  hex = hex.substr(1);

  if (hex.length === 3) {
    hex = hex.replace(/(.)/g, "$1$1");
  }

  hex.replace(/../g, function (color: string) {
    rgb.push(parseInt(color, 0x10));
    return color;
  });

  return "rgb(" + rgb.join(",") + ")";
}

export type IconNames = 'icon-success';

type PropsType = {
  name: IconNames;
  size?: number;
  color?: string | string[];
  customStyle?: React.CSSProperties;
  customClassName?: string;
};

const IconFont: FC<PropsType> = ({
  name,
  size = 36,
  color,
  customStyle = {},
  customClassName = ""
}) => {
  const [colors, setColors] = useState<PropsType['color']>()
  const [isStr, setIsStr] = useState(true)
  const [svgSize, setSvgSize] = useState(() => (size / 750) * SystemWidth)

  useEffect(() => {
    setIsStr(typeof color === 'string')
    if (typeof color === 'string') {
      setColors(color.indexOf('#') === 0 ? hex2rgb(color) : color)
    } else {
      setColors(
        color?.map(function (item) {
          return item.indexOf('#') === 0 ? hex2rgb(item) : item
        })
      )
    }
    return () => { }
  }, [color])

  useEffect(() => {
    setSvgSize((size / 750) * SystemWidth)
  }, [size])

  // 也可以使用 if (name === 'xxx') { return <view> } 来渲染，但是测试发现在ios下会有问题，报错 Maximum call stack啥的。下面这个写法没问题
  return (
    <Block>
      {/* icon-colorCard  本地svg */}
      {/* { name === 'icon-colorCard' && (<View style={{backgroundImage: `url(${quot}data:image/svg+xml, %3Csvg xmlns='http://www.w3.org/2000/svg' width='${svgSize}px' height='${svgSize}px' viewBox='0 0 72 72'><defs><linearGradient id='a' x1='56.049%' x2='45.965%' y1='85.384%' y2='36.243%'><stop offset='0%' stop-color='${(isStr ? colors : colors?.[0]) || '%233667EF'}' stop-opacity='.572'/><stop offset='100%' stop-color='${(isStr ? colors : colors?.[1]) || '%233591FD'}' stop-opacity='.551'/></linearGradient><linearGradient id='b' x1='100%' x2='16.645%' y1='85.384%' y2='36.243%'><stop offset='0%' stop-color='${(isStr ? colors : colors?.[2]) || '%233667EF'}' stop-opacity='.572'/><stop offset='100%' stop-color='${(isStr ? colors : colors?.[3]) || '%233591FD'}' stop-opacity='.551'/></linearGradient><linearGradient id='c' x1='18.906%' x2='80.404%' y1='44.444%' y2='55.556%'><stop offset='0%' stop-color='${(isStr ? colors : colors?.[4]) || '%233591FD'}'/><stop offset='100%' stop-color='${(isStr ? colors : colors?.[5]) || '%233667EF'}'/></linearGradient></defs><g fill='none' fill-rule='nonzero'><path fill='url(%23a)' d='M24.75 11.25A2.25 2.25 0 0 1 27 13.5v47.25A2.25 2.25 0 0 1 24.75 63h-13.5A2.25 2.25 0 0 1 9 60.75V13.5a2.25 2.25 0 0 1 2.25-2.25h13.5ZM18 50.625a3.375 3.375 0 1 0 0 6.75 3.375 3.375 0 0 0 0-6.75Z'/><path fill='url(%23b)' d='m45.593 16.216 9.546 9.546a2.25 2.25 0 0 1 0 3.182l-31.82 31.82a2.25 2.25 0 0 1-3.182 0L16.273 56.9a3.375 3.375 0 1 0-1.174-1.174l-4.508-4.508a2.25 2.25 0 0 1 0-3.182l31.82-31.82a2.25 2.25 0 0 1 3.182 0Z'/><path fill='url(%23c)' d='M60.75 45A2.25 2.25 0 0 1 63 47.25v13.5A2.25 2.25 0 0 1 60.75 63h-49.5A2.25 2.25 0 0 1 9 60.75v-13.5A2.25 2.25 0 0 1 11.25 45h49.5ZM18 50.625a3.375 3.375 0 1 0 0 6.75 3.375 3.375 0 0 0 0-6.75Z' opacity='.95'/></g></svg%3E${quot})`, width: `${svgSize}px`, height: `${svgSize}px`, ...customStyle}} className={classnames("icon", customClassName)} />) } */}
      {/* icon-alipay */}
      {/* {name === "icon-alipay" && (
        <View
          style={{
            backgroundImage: `url(${quot}data:image/svg+xml, %3Csvg viewBox='0 0 1024 1024' xmlns='http://www.w3.org/2000/svg' width='${svgSize}px' height='${svgSize}px'%3E%3Cpath d='M192 692.736c0-69.632 51.2-106.496 88.064-111.104 111.104-18.432 264.192 74.24 264.192 74.24-69.632 88.064-166.912 134.144-241.152 134.144-65.024-4.608-111.104-41.472-111.104-97.28z' fill='${(isStr
              ? colors
              : colors[0]) ||
              "rgb(91,139,212)"}' /%3E%3Cpath d='M979.456 729.6c-13.824-4.608-329.216-101.888-319.488-111.104 46.592-55.808 78.848-185.344 78.848-185.344v-27.648h-185.344V335.872h226.816v-41.472h-226.816V192.512H460.8v97.28H257.024v41.472H460.8v69.632H298.496v27.648h333.824c0 13.824-23.04 106.496-46.08 148.48-4.608-9.216-153.088-60.416-236.544-65.024-88.064 4.608-157.696 32.256-189.952 97.28-46.592 120.32 27.648 241.152 194.56 241.152 27.648 0 162.304-13.824 264.192-153.088 27.648 13.824 185.344 92.672 282.624 143.872-92.672 111.104-231.936 180.736-389.12 180.736-280.576 1.024-508.928-226.304-509.44-506.88v-3.072C1.024 231.424 227.84 3.072 508.928 2.56h3.072c280.576-1.024 508.928 226.304 509.44 506.88v3.072c4.608 82.944-13.824 152.576-41.984 217.088z' fill='${(isStr
              ? colors
              : colors[1]) ||
              "rgb(91,139,212)"}' /%3E%3C/svg%3E${quot})`, width: `${svgSize}px`, height: `${svgSize}px`,
            ...customStyle
          }}
          className={classnames(icon, customClassName)}
        />
      )} */}
      {/* icon-success */}

      {name === 'icon-success' && (<View style={{ backgroundImage: `url(${quot}data:image/svg+xml, %3Csvg viewBox='0 0 1024 1024' xmlns='http://www.w3.org/2000/svg' width='${svgSize}px' height='${svgSize}px'%3E%3Cpath d='M885.3 194.7L400 680 138.7 418.7 64 493.3l336 336 560-560z' fill='${(isStr ? colors : colors?.[0]) || 'rgb(39,38,54)'}'/%3E%3C/svg%3E${quot})`, width: `${svgSize}px`, height: `${svgSize}px`, ...customStyle }} className={classNames("icon", customClassName)} />)}
    </Block>
  )
}

export default IconFont
