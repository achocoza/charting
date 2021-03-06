/// <reference path="../typings/d3/d3.d.ts"/>
module charting{
	export class yAxis{
		
		private _scale: D3.Scale.LinearScale;
		private _group: D3.Selection;
		private _axis: D3.Svg.Axis;
		constructor(container: D3.Selection, height: number) {
			this.init(container, height);
		}
		
		private init(container:D3.Selection, height: number) {
			this._scale = d3.scale.linear();
			this._scale.range([height,0]);
			this._axis = d3.svg.axis()
				.scale(this._scale)
				.orient('left');
			
			this._group = container.append('g');
			
			this.update(0, 1)
		}
		
		translate(translateX: number, translateY:number) {
			this._group.attr({
				'transform': 'translate(' + translateX + ',' + translateY + ')'
			});
		}
		
		update(min:number, max:number):D3.Scale.LinearScale {
			this._scale.domain([min, max]);
			this._group.call(this._axis);
			return this._scale;
		}
		
		scale() {
			return this._scale;
        }
        
        resize(width: number, height: number) {
            this._scale.range([height, 0]);
            
            if (height < 250) {
                this._axis.ticks(5);
            } else {
                this._axis.ticks(10);
                
            }
			this._group.call(this._axis);
            
        }
	}
}