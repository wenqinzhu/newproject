var provinces = ['shanghai'];
var provincesText = ['上海'];
var myChart = echarts.init(document.getElementById('main'));

//获取li标签的值
var li_vue = $("#tab-title li");

//获取地图的值
myChart.on("click", function(params) {
	for(var i = 0; i < li_vue.length; i++) {
		if($(li_vue[i]).html() == params.name) {
			$(li_vue[i]).addClass("selected").siblings().removeClass();
			$("#tab-content > ul").hide().eq($('#tab-title li').index(li_vue[i])).show();
		}
	}
})

function showProvince(cityname) {
	var name = provinces[currentIdx];

	$.get('hangjia/json/shanghai.json', function(geoJson) {

		echarts.registerMap(name, geoJson);//初始化erchart

		myChart.setOption(option = {
			backgroundColor: '#d5e7ff', //整个背景的外部 白色
			series: [{
				type: 'map',
				mapType: name,
				label: {
					emphasis: {
						textStyle: {
							color: '#333' //悬停文字颜色 橙色
						}
					}
				},
				selectedMode: 'single',
				itemStyle: {
					normal: {
						borderColor: '#ffffff', //边框 黄色
						areaColor: '#abd5ff', //模块颜色  红色
						//                          label:{show:true},
					},
					emphasis: {
						areaColor: '#f8b551', //悬停模块  紫色
						borderWidth: 0
					}
				},
				animation: false,
				data: [{
					name: cityname,
					selected: true
				}]
			}],
			tooltip: {
				trigger: 'item',
				formatter: '{b}'
			}
		});
	});
}

var currentIdx = 0;

option = {
	graphic: [{
		id: 'left-btn',
		type: 'circle',
		shape: {
			r: 20
		},
		style: {
			text: '<',
			fill: '#eee'
		},
		left: 10,
		top: 'middle',
		onclick: function() {
			currentIdx -= 1;
			if(currentIdx < 0) {
				currentIdx += provinces.length;
			}
			showProvince();
		}
	}, {
		id: 'right-btn',
		type: 'circle',
		shape: {
			r: 20
		},
		style: {
			text: '>',
			fill: '#eee'
		},
		top: 'middle',
		right: 10,
		onclick: function() {
			currentIdx = (currentIdx + 1) % provinces.length;
			showProvince();
		}
	}],

	series: []
};

showProvince('黄浦');

