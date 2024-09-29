import Taro from "@tarojs/taro";

const jsonHader = "application/json;charset=UTF-8";

function getBaseUrl(): string {
  // if (process.env.NODE_ENV === "development") {
  //   return "http://127.0.0.1:9080";
  // } else return "";
  return "https://api.richcrm.org/"
}

function exist<T>(a: any, ...attrs: T[]): boolean {
  if (process.env.NODE_ENV === "development") {
    for (let i = 0; i < attrs.length; ++i) {
      let item = attrs[i];
      if (a[item] != "" && !a[item]) {
        return false;
      }
    }
  }
  return true;
}

export const HTTP_STATUS = {
  SUCCESS: 200,
  CREATED: 201,
  ACCEPTED: 202,
  CLIENT_ERROR: 400,
  AUTHENTICATE: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
};

export const REFRESH_STATUS = {
  NORMAL: 0,
  REFRESHING: 1,
  NO_MORE_DATA: 2,
};

export const getCurrentPageUrl = (): string => {
  let pages = Taro.getCurrentPages();
  let currentPage = pages[pages.length - 1];
  let url = currentPage.route;
  return url || "";
};

export const pageToLogin = () => {
  let path = getCurrentPageUrl();
  if (!path.includes("login")) {
    Taro.reLaunch({
      url: "/pages/login/index",
    });
  }
};

// 状态
export enum ResultStatus {
  // 成功
  SUCCESS = "success",
  // 失败
  FAILED = "failed"
}

// 响应参数
export type ResultDto<T> = {
  success: boolean;
  // 错误编号
  errorCode?: string;
  // 错误描述
  errorMessage?: string;
  // 具体对象
  data?: T;
  // error display type： 0 silent; 1 message.warn; 2 message.error; 4 notification; 9 page
  showType?: number;
  // Convenient for back-end Troubleshooting: unique request ID
  traceId?: string;
  // onvenient for backend Troubleshooting: host of current access server
  host?: string;
};

const tokenInterceptor = (chain: Taro.Chain) => {
  const requestParams = chain.requestParams;
  const { header } = requestParams;
  // let token = TokenService.load();
  // const tokenHeader = {
  //   Authorization: `Bearer ${token}`,
  //   // "content-type": jsonHader,
  // };
  // requestParams.header = { ...tokenHeader, ...header };
  return chain.proceed(requestParams);
};

// Taro 提供了两个内置拦截器
// logInterceptor - 用于打印请求的相关信息
// timeoutInterceptor - 在请求超时时抛出错误。
// const interceptors = [customInterceptor, Taro.interceptors.logInterceptor]
const interceptors = [tokenInterceptor];
interceptors.forEach((interceptorItem) => Taro.addInterceptor(interceptorItem));

type FilterOptional<T extends object> = Pick<T, Exclude<{ [K in keyof T]: T extends Record<K, T[K]> ? K : never }[keyof T], undefined>>
type kType<T extends object> = keyof FilterOptional<T>;

type Params = Taro.request.Option & {
  // 不需要走拦截器
  skipInterceptor?: boolean;
}

const request = <T extends object>(params: Params, ...attrs: kType<T>[]): Promise<ResultDto<T>> => {
  let { url, header } = params;
  const baseUrl = getBaseUrl();
  const url2 = baseUrl + url;
  let contentType = jsonHader;
  contentType = header?.contentType || jsonHader;
  const option = {
    ...params,
    header: { "content-type": contentType },
    timeout: 50000,
    url: url2,
  };

  Taro.showLoading({
    title: "加载中",
  });
  return Taro.request(option)
    .then((res: Taro.request.SuccessCallbackResult<any>) => {
      const pos = contentType.indexOf("application/json");
      const { statusCode, data } = res;

      // 如果不需要走拦截器，直接返回
      if (params.skipInterceptor) {
        return Promise.resolve({ success: true, data });
      }

      if (pos == -1) {
        return { success: true, data };
      }
      // 只要请求成功，不管返回什么状态码，都走这个回调
      if (statusCode == HTTP_STATUS.SUCCESS) {
        if (data?.success) {
          // 成功且取到了数据
          if (!exist(data.data, ...attrs)) {
            console.error("返回值不包含必需的字段", data.data, attrs);
            return Promise.resolve({ ...data, success: false, errorCode: "BizError", errorMessage: "返回值不能匹配" });
          }
          return Promise.resolve(data);
        }
        // 成功，但处理过程报错了
        let dto: ResultDto<T> = data;
        console.warn(
          `url =${url2}, traceid=${dto.traceId}, error code=${dto.errorCode}, error msg=${dto.errorMessage}`
        );
        if (dto.errorCode === "10002") {
          pageToLogin();
        }
        Promise.resolve(dto);
      }

      let dto: ResultDto<T> = {
        success: false,
        errorCode: statusCode + "",
        errorMessage: `http status: ${statusCode}`,
      };
      if (statusCode === HTTP_STATUS.NOT_FOUND) {
        dto.errorMessage = "请求资源不存在";
      } else if (statusCode === HTTP_STATUS.FORBIDDEN) {
        dto.errorMessage = "没有权限访问";
      } else if (statusCode === HTTP_STATUS.AUTHENTICATE) {
        dto.errorMessage = "需要鉴权";
      } else if (statusCode === HTTP_STATUS.SERVER_ERROR) {
        dto.errorMessage = "服务器错误";
      } else if (statusCode === HTTP_STATUS.NOT_IMPLEMENTED) {
        dto.errorMessage = "服务没有实现";
      } else if (statusCode === HTTP_STATUS.BAD_GATEWAY) {
        dto.errorMessage = "服务网关出现了问题";
      } else if (statusCode === HTTP_STATUS.SERVICE_UNAVAILABLE) {
        dto.errorMessage = "服务器无法处理请求";
      }
      console.log(res, dto)
      Taro.showToast({ title: dto.errorMessage || "", icon: "error" });
      return Promise.resolve(dto);
    })
    .catch((error) => {
      console.error("http return error,", error);
      return Promise.resolve({
        success: false,
        errorCode: "system",
        errorMessage: error.toString(),
      });
    })
    .finally(() => Taro.hideLoading());
};

export default request;
