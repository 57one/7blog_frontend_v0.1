import Vue from 'vue'
var getToc = {
	install(Vue) {
		Vue.prototype.$Toc= {
			TOC:[],
			item:function(text,textLevel) {
				this.text=text;
				this.textLevel=textLevel;
			},
			generateToc:function(html,TOC) {
				var reg=/\s*?<h(\d).*?>\s*([\W|\w]*?)\s*<\/h\d>/g;
				var index=0;
				while (true) {
					var result = reg.exec(html);
					if(!result) break;
					//var i=new item(result[2],result[1]);
					var item={
						'index':++index,
						'text':result[2],
						'textLevel':result[1]
					}
					TOC.push(item)
				}
			}
		}
	}
}

Vue.use(getToc);