/**
 * @file mofron-comp-mcarousel/index.js
 * @brief mobile carousel component for mofron
 * @license MIT
 */
const Text    = require('mofron-comp-text');
const NumKey  = require('mofron-comp-numkeyboard');
const Line    = require('mofron-comp-line');
const HrzPos  = require('mofron-effect-hrzpos');
const comutl  = mofron.util.common;
const ConfArg = mofron.class.ConfArg;

module.exports = class extends mofron.class.Component {
    /**
     * initialize component
     * 
     * @param (mixed) 
     *                key-value: component config
     * @type private
     */
    constructor (p1) {
        try {
            super();
            this.modname("CodeInput");
            this.shortForm('digits');
            
	    /* init config */
            this.confmng().add('digits', { type:'number', init:0 });
            this.confmng().add('left', { type:'size', init:'0.1rem' });
            this.confmng().add('font', { type:'string' });

	    if (0 < arguments.length) {
                this.config(p1);
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * initialize dom contents
     * 
     * @type private
     */
    initDomConts () {
        try {
            super.initDomConts();
            let inp_area = new mofron.class.Component({
                               style: { 'display':'flex' }
                           });
            this.child([inp_area, this.keyboard()]);
	    this.styleDom(inp_area.childDom());
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    keyEvent (p1,p2,p3) {
        try {
            let code_lst = p3.child();
            if (-1 !== p2) {
                for (let cidx in code_lst) {
//alert(code_lst[cidx].child()[0].text());
                    if ('' === code_lst[cidx].child()[0].text()) {
                        code_lst[cidx].child()[0].text(p2+'');
			code_lst[cidx].child()[1].style({ 'top':'-0.15rem' });
			break;
		    }
	        }
            } else {
                for (let cidx=code_lst.length-1; cidx >= 0 ;cidx--) {
                    if ('' !== code_lst[cidx].child()[0].text()) {
		        code_lst[cidx].child()[0].text('');
			code_lst[cidx].child()[1].style({ 'top':'0.6rem' });
			break;
		    }
		}
	    }
	} catch (e) {
            console.error(e.stack);
            throw e;
	}
    }
    
    keyboard (prm) {
        try {
	    if (undefined !== prm) {
                prm.config({
		   baseColor: [240,240,240],
		   keyEvent: new ConfArg(this.keyEvent,this)
		});
	    }
            return this.innerComp('keyboard', prm, NumKey);
	} catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    beforeRender () {
        try {
            for (let idx=0;idx < this.digits(); idx++) {
	        var inp = new mofron.class.Component({
                              size:  new ConfArg('0.3rem', '0.6rem'),
                              child: [
			          new Text({
				      size:'0.5rem', effect:new HrzPos(),
				      font: this.font()
				  }),
				  new Line({
				      length:'100%',
				      style:{ 'position':'relative', 'top':'0.6rem'}
				  })
                              ],
                              //style: { 'margin-left': this.left() }
                          });
                this.child()[0].child(inp);
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    font (prm) {
        try {
            return this.confmng('font', prm);
	} catch (e) {
            console.error(e.stack);
            throw e;
	}
    }

//    left (prm) {
//        try {
//            return this.confmng('left',prm);
//	} catch (e) {
//            console.error(e.stack);
//            throw e;
//        }
//    }
    
    digits (prm) {
        try {
            return this.confmng('digits',prm);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    mainColor (prm, opt) {
        try {
            return this.keyboard().baseColor(prm,opt);
	} catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    accentColor (prm) {
        try {
            this.keyboard().accentColor(prm);
	} catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    width (prm) {
        try {
            let ret = super.width(prm);
            if (undefined !== prm) {
                if (true === this.isExists()) {
                    //this.child()
                }
            }
            return ret;
	} catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */
