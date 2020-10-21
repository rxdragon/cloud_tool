type ErrorType = [number, string]

const CardException: ErrorType[] = [
  [0xA11010001, '此类卡片已使用']
]

export const errText: ErrorType[] = [
  ...CardException
]

type ErrType = {
  error_code?: number | string
  error_msg?: object | string
}

let errMap = new Map(errText)
export const errorCode = {
  getMsg: (err: ErrType) => {
    let codeNum = Number(err.error_code)
    return errMap.get(codeNum) || JSON.stringify(err.error_msg)
  }
}
