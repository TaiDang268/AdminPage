declare module '*.svg' {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>> | any
  export default content
}
