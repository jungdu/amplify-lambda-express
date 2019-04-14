type cb = (err: any, data: any) => void;
type cbFunc = (param: any, cb: cb) => void;
type cbToPromise = (cbFunc: cbFunc, apply: any) => (param: any) => Promise<any>;

export const cbToPromise: cbToPromise = (cbFunc, apply) => {
  return param =>
    new Promise((resolve, reject) => {
      if (apply) {
        cbFunc = cbFunc.bind(apply);
      } else {
        throw new Error("Put apply as second argument");
      }
      cbFunc(param, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
};
