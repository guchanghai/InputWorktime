/**
 * Survery
 **/

var step = 1;

var stepInternal = 1500;
var pageGapStpes = 3;

var showTitle = function( comment ){
    step++;
    
    setTimeout( function(){
        console.log( comment );    
	}, step * stepInternal );    
};

// Get random feedback
var getSelectValue = function( max ){
    if( max === 2){
        return max - 1;
    } else {
	   return Math.random() > 0.5 ? max - 1 : max - 2;        
    }
};

var setHardcodeFeedback = function( feedback, offset ){
    step++;
    
    offset = offset || 0;

	setTimeout( function(){
		var feedbackId = ($( 'input[name="promptField"]' )[ feedback - 1 + offset ]).id
		var feedbackSelector = 'input[id="'+ feedbackId +'"]';
		$( feedbackSelector ).trigger( 'click' );
	}, step * stepInternal );
};

// Set feedback
var setFeedback = function( max, row ){
    step++;

    row = row || 0;
    max = max || 10;

	setTimeout( function(){
		var feedback = getSelectValue( max ) + max * row;
		var feedbackId = ($( 'input[name="promptField"]' )[ feedback ]).id
		var feedbackSelector = 'input[id="'+ feedbackId +'"]';
		$( feedbackSelector ).trigger( 'click' );
	}, step * stepInternal );
};

var setMultiFeedback = function( amount, max ){
    for( var j = 0; j < amount; j++) {
	   setFeedback( max, j );
    }
};

// Go to next page
var nextPage = function(){
    step += pageGapStpes;

	setTimeout( function(){
		console.log( '下一步。' );
		$( 'button[id="nextPageLink"]' ).trigger( 'mousedown' );
	}, step * stepInternal );    
};

showTitle( '欢迎参加 Nike 顾客 问卷调查。' );
nextPage();

showTitle( '您向朋友或家人推荐 Nike 的可能性有多大？' );
setFeedback();
nextPage();

showTitle( '今天什么吸引您来到这家耐克商店？' );
setFeedback();
nextPage();

showTitle( '请选择您对下列关于员工服务体验的说法的认同程度：' );
setMultiFeedback( 8, 5 );
nextPage();

showTitle( '有没有人帮助您挑选产品或合适的尺码？' );
setHardcodeFeedback( 1 );
nextPage();

showTitle( '您在光顾商店期间是否试穿过鞋类产品？' );
setHardcodeFeedback( 2 );
nextPage();

showTitle( '您在光顾商店期间是否在试衣间中试穿过产品？' );
setHardcodeFeedback( 2 );
nextPage();

showTitle( '您是否参加了以下任何服务？' );
setHardcodeFeedback( 2 );
setHardcodeFeedback( 1, 2 );
nextPage();

//部分隐藏
showTitle( '您是否买到了您需要的一切？' );
setHardcodeFeedback( 1 );
setHardcodeFeedback( 2, 7 );
nextPage();

showTitle( '請選擇您對下列關於結賬體驗的說法認同程度：' );
setMultiFeedback( 3, 5 );
nextPage();

showTitle( '请选择您对下列关于退货体验的说法的认同程度：' );
setMultiFeedback( 3, 5 );
nextPage();

showTitle( '在您光顾商店期间，是否有员工帮助提供出色的体验？' );
setHardcodeFeedback( 1 );
nextPage();

showTitle( '整体而言，我对最近一次到访很满意。' );
setMultiFeedback( 2, 5 );
nextPage();

showTitle( '请告诉我们商店体验的哪项要素对您来说最重要。' );
nextPage();

showTitle( '请问您主要想购买什么产品？' );
setFeedback( 4 );
setHardcodeFeedback( 2, 4 );
setHardcodeFeedback( 2, 7 );
nextPage();

showTitle( '今天主要是什么影响了您的购买决定？' );
setFeedback( 4 );
setHardcodeFeedback( 2, 10 );
nextPage();

showTitle( '这是您第一次光顾耐克商店吗？' );
setHardcodeFeedback( 2 );
showTitle();
showTitle();
showTitle();
setFeedback( 4 );
setHardcodeFeedback( 4, 2 );
setHardcodeFeedback( 4, 6 );
setHardcodeFeedback( 4, 10 );
setHardcodeFeedback( 1, 14 );
nextPage();

showTitle( '您从家里到达您今天光临的耐克专卖店花了多少时间？' );
setHardcodeFeedback( 3 );
nextPage();

showTitle( '请向我们简单介绍一下您自己。' );
setHardcodeFeedback( 2 );
setHardcodeFeedback( 3, 3 );
nextPage();

showTitle( '您是否希望通过电子邮件收到可在下一次购物时使用的优惠券？' );
setHardcodeFeedback( 1 );
nextPage();
