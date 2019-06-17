declare global {
  interface Window {
    dataLayer: [];
    data: any;
    config: any;
    FB: fb.FacebookStatic;
    fbAsyncInit: () => any;
  }

  interface NodeModule {
    hot: any;
  }
  declare var module: NodeModule

  function nullCheck<T>(val: T) {
    if (!val) {
      const msg = `expect type: ${typeof T}, but got: ${val} `
      console.log(msg)
      throw new Error(msg)
    }
  }
}
