import{b as M,c as P,d as T,e as E,g as k,h as l,j as O,k as x,m as j,n as d}from"./chunk-WX4VKCG6.js";import{$b as w,Aa as A,Fb as N,Ia as C,Ka as R,Ma as F,Pa as b,Rb as D,U as u,W as m,Z as g,aa as i,db as I,ea as f,eb as S,fb as _,ha as y,ta as v}from"./chunk-RSBD42EU.js";var c=(n,t)=>{let e=i(d),r=i(l);return e.isAuthenticated()?!0:(r.navigate(["/auth/login"]),!1)};var G=(n,t)=>{let e=i(d),r=i(l);if(e.isAuthenticated()){let o=e.getUserRole();return o==="ESTUDIANTE"?r.navigate(["/estudiante"]):o==="MENTOR"&&r.navigate(["/mentor"]),!1}return!0};var U=[{path:"",redirectTo:"home",pathMatch:"full"},{path:"home",loadChildren:()=>import("./chunk-6I2OQ5RR.js").then(n=>n.homeRoutes)},{path:"auth",loadChildren:()=>import("./chunk-33JOOVHC.js").then(n=>n.authRoutes),canActivate:[G]},{path:"estudiante",loadChildren:()=>import("./chunk-ZAPNMTHD.js").then(n=>n.estudianteRoutes),canActivate:[c]},{path:"mentor",loadChildren:()=>import("./chunk-RI55RG2D.js").then(n=>n.mentorRoutes),canActivate:[c]}];var Y="@",Z=(()=>{class n{constructor(e,r,o,a,s){this.doc=e,this.delegate=r,this.zone=o,this.animationType=a,this.moduleImpl=s,this._rendererFactoryPromise=null,this.scheduler=i(R,{optional:!0}),this.loadingSchedulerFn=i(W,{optional:!0})}ngOnDestroy(){this._engine?.flush()}loadImpl(){let e=()=>this.moduleImpl??import("./chunk-5HXEIGXP.js").then(o=>o),r;return this.loadingSchedulerFn?r=this.loadingSchedulerFn(e):r=e(),r.catch(o=>{throw new u(5300,!1)}).then(({\u0275createEngine:o,\u0275AnimationRendererFactory:a})=>{this._engine=o(this.animationType,this.doc);let s=new a(this.delegate,this._engine,this.zone);return this.delegate=s,s})}createRenderer(e,r){let o=this.delegate.createRenderer(e,r);if(o.\u0275type===0)return o;typeof o.throwOnSyntheticProps=="boolean"&&(o.throwOnSyntheticProps=!1);let a=new h(o);return r?.data?.animation&&!this._rendererFactoryPromise&&(this._rendererFactoryPromise=this.loadImpl()),this._rendererFactoryPromise?.then(s=>{let L=s.createRenderer(e,r);a.use(L),this.scheduler?.notify(10)}).catch(s=>{a.use(o)}),a}begin(){this.delegate.begin?.()}end(){this.delegate.end?.()}whenRenderingDone(){return this.delegate.whenRenderingDone?.()??Promise.resolve()}static{this.\u0275fac=function(r){C()}}static{this.\u0275prov=m({token:n,factory:n.\u0275fac})}}return n})(),h=class{constructor(t){this.delegate=t,this.replay=[],this.\u0275type=1}use(t){if(this.delegate=t,this.replay!==null){for(let e of this.replay)e(t);this.replay=null}}get data(){return this.delegate.data}destroy(){this.replay=null,this.delegate.destroy()}createElement(t,e){return this.delegate.createElement(t,e)}createComment(t){return this.delegate.createComment(t)}createText(t){return this.delegate.createText(t)}get destroyNode(){return this.delegate.destroyNode}appendChild(t,e){this.delegate.appendChild(t,e)}insertBefore(t,e,r,o){this.delegate.insertBefore(t,e,r,o)}removeChild(t,e,r){this.delegate.removeChild(t,e,r)}selectRootElement(t,e){return this.delegate.selectRootElement(t,e)}parentNode(t){return this.delegate.parentNode(t)}nextSibling(t){return this.delegate.nextSibling(t)}setAttribute(t,e,r,o){this.delegate.setAttribute(t,e,r,o)}removeAttribute(t,e,r){this.delegate.removeAttribute(t,e,r)}addClass(t,e){this.delegate.addClass(t,e)}removeClass(t,e){this.delegate.removeClass(t,e)}setStyle(t,e,r,o){this.delegate.setStyle(t,e,r,o)}removeStyle(t,e,r){this.delegate.removeStyle(t,e,r)}setProperty(t,e,r){this.shouldReplay(e)&&this.replay.push(o=>o.setProperty(t,e,r)),this.delegate.setProperty(t,e,r)}setValue(t,e){this.delegate.setValue(t,e)}listen(t,e,r){return this.shouldReplay(e)&&this.replay.push(o=>o.listen(t,e,r)),this.delegate.listen(t,e,r)}shouldReplay(t){return this.replay!==null&&t.startsWith(Y)}},W=new g("");function z(n="animations"){return b("NgAsyncAnimations"),y([{provide:F,useFactory:(t,e,r)=>new Z(t,e,r,n),deps:[w,T,v]},{provide:A,useValue:n==="noop"?"NoopAnimations":"BrowserAnimations"}])}var B=(n,t)=>{let r=i(j).getAuthData();if(r&&r.token){let o=n.clone({headers:n.headers.set("Authorization",`Bearer ${r.token}`)});return t(o)}return t(n)};var H={providers:[D({eventCoalescing:!0}),O(U),z(),M(P([B]))]};var p=class n{title="TrueTest-app";static \u0275fac=function(e){return new(e||n)};static \u0275cmp=f({type:n,selectors:[["app-root"]],standalone:!0,features:[N],decls:2,vars:0,consts:[[1,"background-container"]],template:function(e,r){e&1&&(I(0,"div",0),_(1,"router-outlet"),S())},dependencies:[k,x],styles:[".background-container[_ngcontent-%COMP%]{background-image:url(/fondo1.jpg);background-size:cover;background-position:center;background-repeat:no-repeat;min-height:100vh}"]})};E(p,H).catch(n=>console.error(n));
