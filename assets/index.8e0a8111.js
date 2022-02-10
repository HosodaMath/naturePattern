var b=Object.defineProperty;var E=(e,t,o)=>t in e?b(e,t,{enumerable:!0,configurable:!0,writable:!0,value:o}):e[t]=o;var p=(e,t,o)=>(E(e,typeof t!="symbol"?t+"":t,o),o);import{P as w}from"./vendor.6c0cdefa.js";const M=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))a(r);new MutationObserver(r=>{for(const n of r)if(n.type==="childList")for(const i of n.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function o(r){const n={};return r.integrity&&(n.integrity=r.integrity),r.referrerpolicy&&(n.referrerPolicy=r.referrerpolicy),r.crossorigin==="use-credentials"?n.credentials="include":r.crossorigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function a(r){if(r.ep)return;r.ep=!0;const n=o(r);fetch(r.href,n)}};M();class m{}p(m,"degTorad",t=>t*Math.PI/180);const P=3,x=5,A=x,T=(e,t,o,a)=>{[...Array(t).keys()].forEach(r=>{[...Array(a).keys()].forEach(n=>{if(r%P==0){const i=m.degTorad(r),s=e.createVector(e.cos(i)*e.tan(i)*n*o,e.sin(i)*e.tan(i)*n*o,0),c=x*Math.cos(i*10)+A;e.push();const l=n*10,d=n*50,u=150,f=200;e.fill(e.color(l,d,u,f)),e.translate(s.x,s.y),e.ellipse(0,0,c,c),e.pop()}})})},k=(e,t)=>{e.push(),e.translate(-e.width*.5,-e.height*.5),e.shader(t),t.setUniform("uResolution",[e.width,e.height]),t.setUniform("uTime",.5),e.rect(0,0,e.width,e.height),e.resetShader(),e.pop()},L=e=>{const t=document.createElement("button");t.className="fullScreenButton",t.textContent="fullScreen",e.appendChild(t),t.addEventListener("click",()=>{e.requestFullscreen()})},z=e=>{const t=document.createElement("div");t.className="startWindow";const o=document.createElement("h1");o.textContent="Pattern Color";const a=document.createElement("p");a.textContent="\u8EAB\u306E\u56DE\u308A\u306E\u74B0\u5883\u3092\u8272\u3068Pattern\u3067\u8868\u3057\u307E\u3057\u305F\u3002";const r=document.createElement("button");return r.textContent="Start!!",r.className="startButton",e.appendChild(t),t.appendChild(o),t.appendChild(a),t.appendChild(r),{startWindow:t,startButton:r}};var F=`attribute vec3 aPosition;\r
attribute vec2 aTexCoord;\r
\r
uniform mat4 uProjectionMatrix;\r
uniform mat4 uModelViewMatrix;\r
\r
varying vec2 vTexCoord;\r
\r
void main(){\r
  vTexCoord = aTexCoord;\r
\r
  vec4 positionVec4 = vec4(aPosition, 1.0);\r
\r
  gl_Position = uProjectionMatrix * uModelViewMatrix * positionVec4;\r
}`,R=`precision highp float;\r
precision highp int;\r
uniform vec2 uResolution;\r
uniform vec2 uMouse;\r
uniform float uTime;\r
varying vec2 vTexCoord;\r
const float PI = 3.14159265359;\r
const float PI2 = 6.28318530718;\r
\r
vec3 fade(vec3 x){\r
  vec3 result = x * x * x * (x * (x * 6.0 - 15.0) + 10.0);\r
\r
  return result;\r
}\r
\r
vec3 phash(vec3 p){\r
  p = fract(mat3(1.2989833, 7.8233198, 2.3562332,\r
                  6.7598192, 3.4857334, 8.2837193,\r
                   2.9175399, 2.9884245, 5.4987265) * p);\r
    p = ((2384.2345 * p - 1324.3438) * p + 3884.2243) * p - 4921.2354;\r
    return normalize(fract(p) * 2.0 - 1.0);\r
}\r
\r
float noise(vec3 p)\r
{\r
    vec3 ip = floor(p);\r
    vec3 fp = fract(p);\r
    float d000 = dot(phash(ip), fp);\r
    float d001 = dot(phash(ip + vec3(0.0, 0.0, 1.0)), fp - vec3(0.0, 0.0, 1.0));\r
    float d010 = dot(phash(ip + vec3(0.0, 1.0, 0.0)), fp - vec3(0.0, 1.0, 0.0));\r
    float d011 = dot(phash(ip + vec3(0.0, 1.0, 1.0)), fp - vec3(0.0, 1.0, 1.0));\r
    float d100 = dot(phash(ip + vec3(1.0, 0.0, 0.0)), fp - vec3(1.0, 0.0, 0.0));\r
    float d101 = dot(phash(ip + vec3(1.0, 0.0, 1.0)), fp - vec3(1.0, 0.0, 1.0));\r
    float d110 = dot(phash(ip + vec3(1.0, 1.0, 0.0)), fp - vec3(1.0, 1.0, 0.0));\r
    float d111 = dot(phash(ip + vec3(1.0, 1.0, 1.0)), fp - vec3(1.0, 1.0, 1.0));\r
    fp = fade(fp);\r
    return mix(mix(mix(d000, d001, fp.z), mix(d010, d011, fp.z), fp.y),\r
              mix(mix(d100, d101, fp.z), mix(d110, d111, fp.z), fp.y), fp.x);\r
}\r
\r
\r
// \u30D5\u30E9\u30AF\u30BF\u30EB\u30D6\u30E9\u30A6\u30F3\u904B\u52D5\r
float fbm(vec3 value){\r
  float result = 0.0;\r
  float amp = 0.5;\r
  for(int i = 0; i < 5; i++){\r
    result += amp * noise(value);\r
    value *= 2.01;\r
    amp *= 0.5;\r
  }\r
\r
  return result;\r
}\r
\r
\r
void main(){\r
  vec2 coord = vTexCoord;\r
  // coord = (2.0 * gl_FragCoord.xy - uResolution) / min(uResolution.x, uResolution.y);\r
\r
  vec3 p = vec3(gl_FragCoord.xy * 10.0 / uResolution.y, uTime * 0.25);\r
  vec4 bgColor = vec4(fbm(p) / 2.0 + 0.5);\r
\r
  vec3 baseAirColor1 = vec3(1.0, 1.0, 0.2);\r
  vec3 baseAirColor2 = vec3(0.0, 0.7, 0.3);  \r
  vec4 airColor = vec4(mix(baseAirColor1, baseAirColor2, coord.y), 1.0);\r
\r
  bgColor += airColor;\r
\r
  gl_FragColor = bgColor;\r
}`;const h=document.body,g=z(h);L(h);g.startButton.addEventListener("click",()=>{h.removeChild(g.startWindow);const e=t=>{const o=360,a=512,r=512;let n;t.setup=()=>{t.createCanvas(a,r,t.WEBGL),t.noStroke(),t.pixelDensity(1),t.smooth(),n=t.createShader(F,R)},t.draw=()=>{t.noLoop(),t.background(0,0,0),k(t,n);const s=Math.floor(a*.01),v=s,c=10,l=5,d=c*l,u=-t.width*.5+d,f=-t.height*.5+d;t.push(),t.translate(u,f),[...Array(s).keys()].forEach(C=>{[...Array(v).keys()].forEach(y=>{t.push(),t.translate(C*100,y*100,0),T(t,o,c,l),t.pop()})}),t.pop()},t.windowResized=()=>{t.resizeCanvas(a,r)}};new w(e)});
