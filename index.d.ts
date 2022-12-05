type Params = Record<string, string>
export function setParams(kparams: Params, url: string): string
export function queryParam(key: string, url?: string): string
