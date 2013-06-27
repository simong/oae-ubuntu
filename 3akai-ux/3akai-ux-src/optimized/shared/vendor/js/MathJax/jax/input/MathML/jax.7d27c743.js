(function(e,t){var n;e.Parse=MathJax.Object.Subclass({Init:function(e){this.Parse(e)},Parse:function(t){var n;if(typeof t!="string")n=t.parentNode;else{t.match(/^<[a-z]+:/i)&&!t.match(/^<[^<>]* xmlns:/)&&(t=t.replace(/^<([a-z]+)(:math)/i,'<$1$2 xmlns:$1="http://www.w3.org/1998/Math/MathML"'));var r=t.match(/^(<math( ('.*?'|".*?"|[^>])+)>)/i);r&&r[2].match(/ (?!xmlns=)[a-z]+=\"http:/i)&&(t=r[1].replace(/ (?!xmlns=)([a-z]+=(['"])http:.*?\2)/ig," xmlns:$1 $1")+t.substr(r[0].length)),t=t.replace(/^\s*(?:\/\/)?<!(--)?\[CDATA\[((.|\n)*)(\/\/)?\]\]\1>\s*$/,"$2"),t=t.replace(/&([a-z][a-z0-9]*);/ig,this.replaceEntity),n=e.ParseXML(t),n==null&&e.Error("Error parsing MathML")}var i=n.getElementsByTagName("parsererror")[0];i&&e.Error("Error parsing MathML: "+i.textContent.replace(/This page.*?errors:|XML Parsing Error: |Below is a rendering of the page.*/g,"")),n.childNodes.length!==1&&e.Error("MathML must be formed by a single element");if(n.firstChild.nodeName.toLowerCase()==="html"){var s=n.getElementsByTagName("h1")[0];s&&s.textContent==="XML parsing error"&&s.nextSibling&&e.Error("Error parsing MathML: "+String(s.nextSibling.nodeValue).replace(/fatal parsing error: /,""))}n.firstChild.nodeName.toLowerCase().replace(/^[a-z]+:/,"")!=="math"&&e.Error("MathML must be formed by a <math> element, not <"+n.firstChild.nodeName+">"),this.mml=this.MakeMML(n.firstChild)},MakeMML:function(t){var r=String(t.getAttribute("class")||""),i,s=t.nodeName.toLowerCase().replace(/^[a-z]+:/,""),o=r.match(/(^| )MJX-TeXAtom-([^ ]*)/);if(o)i=this.TeXAtom(o[2]);else{if(!(n[s]&&n[s].isa&&n[s].isa(n.mbase)))return MathJax.Hub.signal.Post(["MathML Jax - unknown node type",s]),n.merror("Unknown node type: "+s);i=n[s]()}return this.AddAttributes(i,t),this.CheckClass(i,r),this.AddChildren(i,t),e.config.useMathMLspacing&&(i.useMMLspacing=8),i},TeXAtom:function(e){var t=n.TeXAtom().With({texClass:n.TEXCLASS[e]});return t.texClass===n.TEXCLASS.OP&&(t.movesupsub=t.movablelimits=!0),t},CheckClass:function(e,t){t=t.split(/ /);var n=[];for(var r=0,i=t.length;r<i;r++)if(t[r].substr(0,4)==="MJX-"){if(t[r]==="MJX-arrow")e.arrow=!0;else if(t[r]==="MJX-variant")e.variantForm=!0,MathJax.Extension["TeX/AMSsymbols"]||MathJax.Hub.RestartAfter(MathJax.Ajax.Require("[MathJax]/extensions/TeX/AMSsymbols.js"));else if(t[r].substr(0,11)!=="MJX-TeXAtom"){e.mathvariant=t[r].substr(3);if(e.mathvariant==="-tex-caligraphic-bold"||e.mathvariant==="-tex-oldstyle-bold")MathJax.Extension["TeX/boldsymbol"]||MathJax.Hub.RestartAfter(MathJax.Ajax.Require("[MathJax]/extensions/TeX/boldsymbol.js"))}}else n.push(t[r]);n.length?e["class"]=n.join(" "):delete e["class"]},AddAttributes:function(e,t){e.attr={},e.attrNames=[];for(var r=0,i=t.attributes.length;r<i;r++){var s=t.attributes[r].name;s=="xlink:href"&&(s="href");if(s.match(/:/))continue;var o=t.attributes[r].value;o.toLowerCase()==="true"?o=!0:o.toLowerCase()==="false"&&(o=!1),e.defaults[s]!=null||n.copyAttributes[s]?e[s]=o:e.attr[s]=o,e.attrNames.push(s)}},AddChildren:function(t,r){for(var i=0,s=r.childNodes.length;i<s;i++){var o=r.childNodes[i];if(o.nodeName==="#comment")continue;if(o.nodeName==="#text")if(t.isToken&&!t.mmlSelfClosing){var u=o.nodeValue.replace(/&([a-z][a-z0-9]*);/ig,this.replaceEntity);t.Append(n.chars(this.trimSpace(u)))}else o.nodeValue.match(/\S/)&&e.Error("Unexpected text node: '"+o.nodeValue+"'");else if(t.type==="annotation-xml")t.Append(n.xml(o));else{var f=this.MakeMML(o);t.Append(f),f.mmlSelfClosing&&f.data.length&&(t.Append.apply(t,f.data),f.data=[])}}},trimSpace:function(e){return e.replace(/[\t\n\r]/g," ").replace(/^ +/,"").replace(/ +$/,"").replace(/  +/g," ")},replaceEntity:function(t,n){if(n.match(/^(lt|amp|quot)$/))return t;if(e.Parse.Entity[n])return e.Parse.Entity[n];var r=n.charAt(0).toLowerCase(),i=n.match(/^[a-zA-Z](fr|scr|opf)$/);return i&&(r=i[1]),e.Parse.loaded[r]||(e.Parse.loaded[r]=!0,MathJax.Hub.RestartAfter(MathJax.Ajax.Require(e.entityDir+"/"+r+".js"))),t}},{loaded:[]}),e.Augment({sourceMenuTitle:"Original MathML",prefilterHooks:MathJax.Callback.Hooks(!0),postfilterHooks:MathJax.Callback.Hooks(!0),Translate:function(r){this.ParseXML||(this.ParseXML=this.createParser());var i,s,o={script:r};r.firstChild&&r.firstChild.nodeName.toLowerCase().replace(/^[a-z]+:/,"")==="math"?(o.math=r.firstChild,this.prefilterHooks.Execute(o),s=o.math):(s=MathJax.HTML.getScript(r),t.isMSIE&&(s=s.replace(/(&nbsp;)+$/,"")),o.math=s,this.prefilterHooks.Execute(o),s=o.math);try{i=e.Parse(s).mml}catch(u){if(!u.mathmlError)throw u;i=this.formatError(u,s,r)}return o.math=n(i),this.postfilterHooks.Execute(o),o.math},prefilterMath:function(e,t){return e},prefilterMathML:function(e,t){return e},formatError:function(e,t,r){var i=e.message.replace(/\n.*/,"");return MathJax.Hub.signal.Post(["MathML Jax - parse error",i,t,r]),n.merror(i)},Error:function(e){throw MathJax.Hub.Insert(Error(e),{mathmlError:!0})},parseDOM:function(e){return this.parser.parseFromString(e,"text/xml")},parseMS:function(e){return this.parser.loadXML(e)?this.parser:null},parseDIV:function(e){return this.div.innerHTML=e.replace(/<([a-z]+)([^>]*)\/>/g,"<$1$2></$1>"),this.div},parseError:function(e){return null},createParser:function(){if(window.DOMParser)return this.parser=new DOMParser,this.parseDOM;if(window.ActiveXObject){var e=["MSXML2.DOMDocument.6.0","MSXML2.DOMDocument.5.0","MSXML2.DOMDocument.4.0","MSXML2.DOMDocument.3.0","MSXML2.DOMDocument.2.0","Microsoft.XMLDOM"];for(var t=0,n=e.length;t<n&&!this.parser;t++)try{this.parser=new ActiveXObject(e[t])}catch(r){}return this.parser?(this.parser.async=!1,this.parseMS):(alert("MathJax can't create an XML parser for MathML.  Check that\nthe 'Script ActiveX controls marked safe for scripting' security\nsetting is enabled (use the Internet Options item in the Tools\nmenu, and select the Security panel, then press the Custom Level\nbutton to check this).\n\nMathML equations will not be able to be processed by MathJax."),this.parseError)}return this.div=MathJax.Hub.Insert(document.createElement("div"),{style:{visibility:"hidden",overflow:"hidden",height:"1px",position:"absolute",top:0}}),document.body.firstChild?document.body.insertBefore(this.div,document.body.firstChild):document.body.appendChild(this.div),this.parseDIV},Startup:function(){n=MathJax.ElementJax.mml,n.mspace.Augment({mmlSelfClosing:!0}),n.none.Augment({mmlSelfClosing:!0}),n.mprescripts.Augment({mmlSelfClosing:!0})}}),e.prefilterHooks.Add(function(t){t.math=typeof t.math=="string"?e.prefilterMath(t.math,t.script):e.prefilterMathML(t.math,t.script)}),e.Parse.Entity={ApplyFunction:"⁡",Backslash:"∖",Because:"∵",Breve:"˘",Cap:"⋒",CenterDot:"·",CircleDot:"⊙",CircleMinus:"⊖",CirclePlus:"⊕",CircleTimes:"⊗",Congruent:"≡",ContourIntegral:"∮",Coproduct:"∐",Cross:"⨯",Cup:"⋓",CupCap:"≍",Dagger:"‡",Del:"∇",Delta:"Δ",Diamond:"⋄",DifferentialD:"ⅆ",DotEqual:"≐",DoubleDot:"¨",DoubleRightTee:"⊨",DoubleVerticalBar:"∥",DownArrow:"↓",DownLeftVector:"↽",DownRightVector:"⇁",DownTee:"⊤",Downarrow:"⇓",Element:"∈",EqualTilde:"≂",Equilibrium:"⇌",Exists:"∃",ExponentialE:"ⅇ",FilledVerySmallSquare:"▪",ForAll:"∀",Gamma:"Γ",Gg:"⋙",GreaterEqual:"≥",GreaterEqualLess:"⋛",GreaterFullEqual:"≧",GreaterLess:"≷",GreaterSlantEqual:"⩾",GreaterTilde:"≳",Hacek:"ˇ",Hat:"^",HumpDownHump:"≎",HumpEqual:"≏",Im:"ℑ",ImaginaryI:"ⅈ",Integral:"∫",Intersection:"⋂",InvisibleComma:"⁣",InvisibleTimes:"⁢",Lambda:"Λ",Larr:"↞",LeftAngleBracket:"⟨",LeftArrow:"←",LeftArrowRightArrow:"⇆",LeftCeiling:"⌈",LeftDownVector:"⇃",LeftFloor:"⌊",LeftRightArrow:"↔",LeftTee:"⊣",LeftTriangle:"⊲",LeftTriangleEqual:"⊴",LeftUpVector:"↿",LeftVector:"↼",Leftarrow:"⇐",Leftrightarrow:"⇔",LessEqualGreater:"⋚",LessFullEqual:"≦",LessGreater:"≶",LessSlantEqual:"⩽",LessTilde:"≲",Ll:"⋘",Lleftarrow:"⇚",LongLeftArrow:"⟵",LongLeftRightArrow:"⟷",LongRightArrow:"⟶",Longleftarrow:"⟸",Longleftrightarrow:"⟺",Longrightarrow:"⟹",Lsh:"↰",MinusPlus:"∓",NestedGreaterGreater:"≫",NestedLessLess:"≪",NotDoubleVerticalBar:"∦",NotElement:"∉",NotEqual:"≠",NotExists:"∄",NotGreater:"≯",NotGreaterEqual:"≱",NotLeftTriangle:"⋪",NotLeftTriangleEqual:"⋬",NotLess:"≮",NotLessEqual:"≰",NotPrecedes:"⊀",NotPrecedesSlantEqual:"⋠",NotRightTriangle:"⋫",NotRightTriangleEqual:"⋭",NotSubsetEqual:"⊈",NotSucceeds:"⊁",NotSucceedsSlantEqual:"⋡",NotSupersetEqual:"⊉",NotTilde:"≁",NotVerticalBar:"∤",Omega:"Ω",OverBar:"‾",OverBrace:"⏞",PartialD:"∂",Phi:"Φ",Pi:"Π",PlusMinus:"±",Precedes:"≺",PrecedesEqual:"⪯",PrecedesSlantEqual:"≼",PrecedesTilde:"≾",Product:"∏",Proportional:"∝",Psi:"Ψ",Rarr:"↠",Re:"ℜ",ReverseEquilibrium:"⇋",RightAngleBracket:"⟩",RightArrow:"→",RightArrowLeftArrow:"⇄",RightCeiling:"⌉",RightDownVector:"⇂",RightFloor:"⌋",RightTee:"⊢",RightTeeArrow:"↦",RightTriangle:"⊳",RightTriangleEqual:"⊵",RightUpVector:"↾",RightVector:"⇀",Rightarrow:"⇒",Rrightarrow:"⇛",Rsh:"↱",Sigma:"Σ",SmallCircle:"∘",Sqrt:"√",Square:"□",SquareIntersection:"⊓",SquareSubset:"⊏",SquareSubsetEqual:"⊑",SquareSuperset:"⊐",SquareSupersetEqual:"⊒",SquareUnion:"⊔",Star:"⋆",Subset:"⋐",SubsetEqual:"⊆",Succeeds:"≻",SucceedsEqual:"⪰",SucceedsSlantEqual:"≽",SucceedsTilde:"≿",SuchThat:"∋",Sum:"∑",Superset:"⊃",SupersetEqual:"⊇",Supset:"⋑",Therefore:"∴",Theta:"Θ",Tilde:"∼",TildeEqual:"≃",TildeFullEqual:"≅",TildeTilde:"≈",UnderBar:"_",UnderBrace:"⏟",Union:"⋃",UnionPlus:"⊎",UpArrow:"↑",UpDownArrow:"↕",UpTee:"⊥",Uparrow:"⇑",Updownarrow:"⇕",Upsilon:"Υ",Vdash:"⊩",Vee:"⋁",VerticalBar:"∣",VerticalTilde:"≀",Vvdash:"⊪",Wedge:"⋀",Xi:"Ξ",acute:"´",aleph:"ℵ",alpha:"α",amalg:"⨿",and:"∧",ang:"∠",angmsd:"∡",angsph:"∢",ape:"≊",backprime:"‵",backsim:"∽",backsimeq:"⋍",beta:"β",beth:"ℶ",between:"≬",bigcirc:"◯",bigodot:"⨀",bigoplus:"⨁",bigotimes:"⨂",bigsqcup:"⨆",bigstar:"★",bigtriangledown:"▽",bigtriangleup:"△",biguplus:"⨄",blacklozenge:"⧫",blacktriangle:"▴",blacktriangledown:"▾",blacktriangleleft:"◂",bowtie:"⋈",boxdl:"┐",boxdr:"┌",boxminus:"⊟",boxplus:"⊞",boxtimes:"⊠",boxul:"┘",boxur:"└",bsol:"\\",bull:"•",cap:"∩",check:"✓",chi:"χ",circ:"ˆ",circeq:"≗",circlearrowleft:"↺",circlearrowright:"↻",circledR:"®",circledS:"Ⓢ",circledast:"⊛",circledcirc:"⊚",circleddash:"⊝",clubs:"♣",colon:":",comp:"∁",ctdot:"⋯",cuepr:"⋞",cuesc:"⋟",cularr:"↶",cup:"∪",curarr:"↷",curlyvee:"⋎",curlywedge:"⋏",dagger:"†",daleth:"ℸ",ddarr:"⇊",deg:"°",delta:"δ",digamma:"ϝ",div:"÷",divideontimes:"⋇",dot:"˙",doteqdot:"≑",dotplus:"∔",dotsquare:"⊡",dtdot:"⋱",ecir:"≖",efDot:"≒",egs:"⪖",ell:"ℓ",els:"⪕",empty:"∅",epsi:"ε",epsiv:"ϵ",erDot:"≓",eta:"η",eth:"ð",flat:"♭",fork:"⋔",frown:"⌢",gEl:"⪌",gamma:"γ",gap:"⪆",gimel:"ℷ",gnE:"≩",gnap:"⪊",gne:"⪈",gnsim:"⋧",gt:">",gtdot:"⋗",harrw:"↭",hbar:"ℏ",hellip:"…",hookleftarrow:"↩",hookrightarrow:"↪",imath:"ı",infin:"∞",intcal:"⊺",iota:"ι",jmath:"ȷ",kappa:"κ",kappav:"ϰ",lEg:"⪋",lambda:"λ",lap:"⪅",larrlp:"↫",larrtl:"↢",lbrace:"{",lbrack:"[",le:"≤",leftleftarrows:"⇇",leftthreetimes:"⋋",lessdot:"⋖",lmoust:"⎰",lnE:"≨",lnap:"⪉",lne:"⪇",lnsim:"⋦",longmapsto:"⟼",looparrowright:"↬",lowast:"∗",loz:"◊",lt:"<",ltimes:"⋉",ltri:"◃",macr:"¯",malt:"✠",mho:"℧",mu:"μ",multimap:"⊸",nLeftarrow:"⇍",nLeftrightarrow:"⇎",nRightarrow:"⇏",nVDash:"⊯",nVdash:"⊮",natur:"♮",nearr:"↗",nharr:"↮",nlarr:"↚",not:"¬",nrarr:"↛",nu:"ν",nvDash:"⊭",nvdash:"⊬",nwarr:"↖",omega:"ω",omicron:"ο",or:"∨",osol:"⊘",period:".",phi:"φ",phiv:"ϕ",pi:"π",piv:"ϖ",prap:"⪷",precnapprox:"⪹",precneqq:"⪵",precnsim:"⋨",prime:"′",psi:"ψ",rarrtl:"↣",rbrace:"}",rbrack:"]",rho:"ρ",rhov:"ϱ",rightrightarrows:"⇉",rightthreetimes:"⋌",ring:"˚",rmoust:"⎱",rtimes:"⋊",rtri:"▹",scap:"⪸",scnE:"⪶",scnap:"⪺",scnsim:"⋩",sdot:"⋅",searr:"↘",sect:"§",sharp:"♯",sigma:"σ",sigmav:"ς",simne:"≆",smile:"⌣",spades:"♠",sub:"⊂",subE:"⫅",subnE:"⫋",subne:"⊊",supE:"⫆",supnE:"⫌",supne:"⊋",swarr:"↙",tau:"τ",theta:"θ",thetav:"ϑ",tilde:"˜",times:"×",triangle:"▵",triangleq:"≜",upsi:"υ",upuparrows:"⇈",veebar:"⊻",vellip:"⋮",weierp:"℘",xi:"ξ",yen:"¥",zeta:"ζ",zigrarr:"⇝"},e.loadComplete("jax.js")})(MathJax.InputJax.MathML,MathJax.Hub.Browser);