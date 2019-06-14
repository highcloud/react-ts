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
  if (!val) throw new Error('null error')

  return NonNullable(val)
}