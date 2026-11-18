// Hero: real EUR/USD (14 Oct 2026, 5-minute) as a lit 3D scene with a scroll-driven camera.
// Plain JS on purpose (three.js scene code); started from Home.tsx after the markup mounts.
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';

export function startHero(data) {
const BARS=data.bars,GH=data.ghost;
const Q=new URLSearchParams(location.search),STILL=Q.get('t'),FSC=Q.get('s');let alive=true;
const cv=document.getElementById('gl'),hero=document.getElementById('hero');
const R=new THREE.WebGLRenderer({canvas:cv,antialias:true,powerPreference:'high-performance'});
const small=innerWidth<700;R.setPixelRatio(Math.min(devicePixelRatio,small?1.5:1.75));R.toneMapping=THREE.ACESFilmicToneMapping;R.toneMappingExposure=1.08;
const S=new THREE.Scene();S.background=new THREE.Color(0x050506);S.fog=new THREE.FogExp2(0x050506,.028);
const pm=new THREE.PMREMGenerator(R);S.environment=pm.fromScene(new RoomEnvironment(),.04).texture;
const C=new THREE.PerspectiveCamera(30,1,.1,220);
const N=BARS.length,SP=.34,X0=-(N-1)*SP/2;
const rng=(arr,o,h,l)=>{let a=-1e9,b=1e9;arr.forEach(r=>{a=Math.max(a,r[h]);b=Math.min(b,r[l])});return[a,b]};
const[hi,lo]=rng(BARS,0,2,3);const PY=v=>(v-lo)/(hi-lo)*9.5+.6,PX=i=>X0+i*SP;
// reflective floor + fine grid
const fl=new THREE.Mesh(new THREE.PlaneGeometry(260,260),new THREE.MeshStandardMaterial({color:0x060709,metalness:.92,roughness:.28}));fl.rotation.x=-Math.PI/2;S.add(fl);
const grid=new THREE.GridHelper(120,120,0x17191e,0x0e1013);grid.position.y=.003;S.add(grid);
// main candles (instanced)
const box=new THREE.BoxGeometry(1,1,1);box.translate(0,.5,0);
const mat=(c,e)=>new THREE.MeshPhysicalMaterial({color:c,emissive:e,emissiveIntensity:.6,metalness:.15,roughness:.14,clearcoat:1,clearcoatRoughness:.06,transmission:0});
const mUp=mat(0x36D6FF,0x0a6f9a),mDn=mat(0xFF3B52,0x9a1424);
const groups=[[],[]];BARS.forEach((b,i)=>groups[b[4]>=b[1]?0:1].push(i));
const IM=groups.map((g,k)=>{const im=new THREE.InstancedMesh(box,k?mDn:mUp,g.length*2);im.userData.g=g;S.add(im);return im});
const dm=new THREE.Object3D();
function setCandles(t){IM.forEach(im=>{im.userData.g.forEach((i,k)=>{const b=BARS[i];const g=Math.min(1,Math.max(0,(t*N*1.12-i)/5));const e=1-Math.pow(1-g,3);
 const yb=PY(Math.min(b[1],b[4])),h=Math.max(.05,Math.abs(PY(b[1])-PY(b[4])));dm.position.set(PX(i),yb+(1-e)*-.4,0);dm.scale.set(.24,Math.max(1e-4,h*e),.24);dm.updateMatrix();im.setMatrixAt(k*2,dm.matrix);
 dm.position.set(PX(i),PY(b[3]),0);dm.scale.set(.045,Math.max(1e-4,(PY(b[2])-PY(b[3]))*e),.045);dm.updateMatrix();im.setMatrixAt(k*2+1,dm.matrix)});im.instanceMatrix.needsUpdate=true})}
// ghost markets behind (GBP/USD, gold) - glass, fogged
function ghost(rows,z,col,op){const[gh,gl]=rng(rows,0,1,2);const py=v=>(v-gl)/(gh-gl)*8+.8;const gm=new THREE.MeshPhysicalMaterial({color:col,emissive:col,emissiveIntensity:.25,transparent:true,opacity:op,roughness:.2,metalness:.1});
 const im=new THREE.InstancedMesh(box,gm,rows.length);rows.forEach((r,i)=>{const h=Math.max(.04,Math.abs(py(r[0])-py(r[3])));dm.position.set(PX(i)*1.18,py(Math.min(r[0],r[3])),z);dm.scale.set(.2,h,.2);dm.updateMatrix();im.setMatrixAt(i,dm.matrix)});S.add(im)}
ghost(GH.GBPUSD,-9,0x8B7CFF,.22);ghost(GH.XAUUSD,-17,0x5CC8FF,.14);
// glowing EMA tube (revealed via draw range)
const pts=BARS.map((b,i)=>new THREE.Vector3(PX(i),PY(b[5]),.3));const curve=new THREE.CatmullRomCurve3(pts);
const RS=10,TS=N*4;const tube=new THREE.Mesh(new THREE.TubeGeometry(curve,TS,.05,RS,false),new THREE.MeshStandardMaterial({color:0x5CC8FF,emissive:0x2F8BFF,emissiveIntensity:2.4,roughness:.3}));S.add(tube);
const head=new THREE.Mesh(new THREE.SphereGeometry(.13,24,24),new THREE.MeshBasicMaterial({color:0xE6F6FF}));S.add(head);
const hl=new THREE.PointLight(0x5CC8FF,14,8);S.add(hl);
// dust particles
const PN=small?500:1100,pg=new THREE.BufferGeometry(),pp=new Float32Array(PN*3);for(let i=0;i<PN;i++){pp[i*3]=(Math.random()-.5)*70;pp[i*3+1]=Math.random()*18;pp[i*3+2]=(Math.random()-.5)*40-4}
pg.setAttribute('position',new THREE.BufferAttribute(pp,3));const dust=new THREE.Points(pg,new THREE.PointsMaterial({color:0xBFE6FF,size:.045,transparent:true,opacity:.55,depthWrite:false}));S.add(dust);
const k1=new THREE.PointLight(0x3B7BFF,40,40);k1.position.set(12,9,8);S.add(k1);const k2=new THREE.PointLight(0x21E6A1,22,36);k2.position.set(-16,7,7);S.add(k2);const k3=new THREE.PointLight(0x8B7CFF,18,40);k3.position.set(0,10,-14);S.add(k3);
// post
const comp=new EffectComposer(R);comp.addPass(new RenderPass(S,C));const bloom=new UnrealBloomPass(new THREE.Vector2(1,1),.62,.55,.7);comp.addPass(bloom);comp.addPass(new OutputPass());
let W=1,H=1;function size(){W=cv.clientWidth;H=cv.clientHeight;R.setSize(W,H,false);comp.setSize(W,H);C.aspect=W/H;C.fov=W<700?54:W<1060?40:30;C.updateProjectionMatrix()}size();addEventListener('resize',size);const offResize=()=>removeEventListener('resize',size);
// DOM hooks
const $=id=>document.getElementById(id);const px=$('px'),chg=$('chg'),tm=$('tm'),pgb=$('pg'),hc=$('hcopy'),cue=$('cue'),s1=$('s1'),s2=$('s2');
const A=[[$('a1'),BARS.findIndex(b=>b[0]==='07:00')],[$('a2'),BARS.findIndex(b=>b[0]==='09:30')],[$('a3'),BARS.findIndex(b=>b[0]==='13:30')]];
const uk=t=>{let[h,m]=t.split(':').map(Number);return String((h+1)%24).padStart(2,'0')+':'+String(m).padStart(2,'0')};
const iD=A[2][1],V=new THREE.Vector3();const proj=(x,y,z)=>{V.set(x,y,z).project(C);return[(V.x+1)/2*W,(1-V.y)/2*H,V.z<1]};
let mx=0,my=0,sx=0,sy=0;const onPM=e=>{mx=e.clientX/innerWidth-.5;my=e.clientY/innerHeight-.5};addEventListener('pointermove',onPM);
const L=THREE.MathUtils.lerp,ss=(a,b,x)=>{const t=Math.min(1,Math.max(0,(x-a)/(b-a)));return t*t*(3-2*t)};
let visible=true;const vio=new IntersectionObserver(e=>visible=e[0].isIntersecting);vio.observe(hero);
const t0=performance.now();let lastN=-1;
function frame(now){
 if(!alive)return;if(STILL===null)requestAnimationFrame(frame);if(!visible)return;
 const t=Math.min(1,Math.max(0,STILL!==null?+STILL:(now-t0)/4600));
 const r=hero.getBoundingClientRect(),sc=FSC!==null?+FSC:Math.min(1,Math.max(0,-r.top/(r.height-innerHeight)));
 setCandles(t);const f=Math.min(1,t*1.12);tube.geometry.setDrawRange(0,Math.floor(TS*f)*RS*6);
 const ip=Math.min(N-1,Math.floor(f*(N-1)));const P=curve.getPoint(Math.min(1,Math.max(0,f)));head.position.copy(P);hl.position.copy(P).add(new THREE.Vector3(0,.6,.8));head.visible=f<1;
 if(ip!==lastN){lastN=ip;const b=BARS[ip],c=(b[4]/BARS[0][1]-1)*100;px.textContent=b[4].toFixed(5);px.style.color=c>=0?'var(--green)':'var(--red)';chg.textContent=(c>=0?'+':'')+c.toFixed(2)+'%';chg.style.background=c>=0?'rgba(33,230,161,.14)':'rgba(255,77,94,.14)';chg.style.color=c>=0?'var(--green)':'var(--red)';tm.textContent=uk(b[0])+' UK';pgb.style.width=(f*100)+'%'}
 sx+=(mx-sx)*.045;sy+=(my-sy)*.045;
 // camera path: wide establishing shot -> sweep along the session -> close on the 14:30 drop
 const nar=W<700,a=ss(0,.45,sc),b=ss(.45,1,sc);
 const cx=L(L(-5,9,t*.55),PX(iD)+(nar?1.5:3),a)+sx*2.6,cy=L(L(9.5,7,a),4.2,b)-sy*1.6,cz=L(L(nar?48:31,nar?30:19,a),nar?16:10.5,b);
 C.position.set(cx,cy,cz);C.lookAt(L(L(2,PX(iD)*.7,a),PX(iD)+.6,b),L(L(nar?1.5:4.2,5.2,a),PY(1.1172),b),0);
 dust.rotation.y=now*.00002;dust.position.y=Math.sin(now*.0003)*.15;
 comp.render();
 // annotations pinned to candles
 A.forEach(([el,i],k)=>{const b=BARS[i],top=PY(b[2])+(k===2?.2:.25);const[x,y,ok]=proj(PX(i),top,0);const[,y2]=proj(PX(i),top+1.8,0);
  const show=ok&&t*N*1.12>i+6&&x>40&&x<W-40&&(k===2?sc<.9:sc<.4)&&!(nar&&k===1);
  const tw=el.querySelector('.x-tag').offsetWidth/2+22,cx2=Math.min(Math.max(x,tw),W-tw);el.classList.toggle('on',show&&y2>140);el.style.transform=`translate(${x}px,${y2}px)`;el.querySelector('.x-tag').style.transform=`translate(calc(-50% + ${cx2-x}px),0)`;el.querySelector('.x-pin').style.height=Math.max(0,y-y2)+'px'});
 // copy choreography
 hc.style.opacity=String(1-ss(.04,.2,sc));hc.style.transform=`translateY(${-ss(0,.2,sc)*60}px)`;cue.style.opacity=String(1-ss(0,.08,sc));
 s1.classList.toggle('on',sc>.28&&sc<.6);s2.classList.toggle('on',sc>.66&&sc<.96);
}
requestAnimationFrame(frame);const onS=()=>requestAnimationFrame(frame);if(STILL!==null)addEventListener('scroll',onS);
return ()=>{alive=false;offResize();removeEventListener('pointermove',onPM);removeEventListener('scroll',onS);vio.disconnect();comp.dispose&&comp.dispose();R.dispose();};

}
