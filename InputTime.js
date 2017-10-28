/*
 * Author: Changhai Gu
 * Date: 09/30/2017 Saturday
 * Description: Input the time for each week
 */

var EACH_DAY_INTERVAL = 28000;
var EACH_ENTRY_INTERVAL = 8000;
var EACH_ITEM_INTERVAL = 1000;

var morningStartHour = 9;
var morningEndtHour = 12;
var afternoonStartHour = 1;
var afternoonEndHour = 6;

// From Monday to Friday
var Workdays = {
	MONDAY: 0,
	TUESDAY: 1,
	WEDNESDAY: 2,
	THURSDAY: 3,
	FRIDAY: 4
};

var EntryType = {
	LABOR: 'Labor',
	LUNCH: 'Lunch',
	SICK: 'Sick'
};

var EntryTypeMeridiem = {
	MORNING: 0,
	AFTERNOON: 1,
	NOON: 2
};

var EntryTimeMeridiem = {
	AM: 0,
	PM: 1
};

// Add two items for one workday
function addTimeForDay( workday, delay ) {
	var addNewLinkSelector = '#billingDetailId' + workday + ' tr.body10 a';
	var addAction = function(){
		$( addNewLinkSelector ).trigger( 'click' );
	};

	setTimeout( addAction, delay );
}

var setValue = function( idSelector, value ){
	$('select[id="' + idSelector + '"]').val( value );
};

// Add one time entry for one workday
function addTimeEntryForDay( workday, meridiem, startHour, startMeridiem, endHour, endMeridiem, entryType, timeDelay ) {
	var startHourSelector = 'billingDetailItems' + workday +'.billingTimeSpans' + meridiem + '.startHourM';
	var startMeridiemSelector = 'billingDetailItems' + workday +'.billingTimeSpans' + meridiem + '.startMeridiem';

	// it seems the item is created very slowly, so delay 2 seconds for setting values
	setTimeout( setValue, timeDelay + 2 * EACH_ITEM_INTERVAL, startHourSelector, startHour );
	setTimeout( setValue, timeDelay + 3 * EACH_ITEM_INTERVAL, startMeridiemSelector, startMeridiem );

	var endHourSelector = 'billingDetailItems' + workday +'.billingTimeSpans' + meridiem + '.endHourM';
	var endMeridiemSelector = 'billingDetailItems' + workday +'.billingTimeSpans' + meridiem + '.endMeridiem';

	setTimeout( setValue, timeDelay + 4 * EACH_ITEM_INTERVAL, endHourSelector, endHour );
	setTimeout( setValue, timeDelay + 5 * EACH_ITEM_INTERVAL, endMeridiemSelector, endMeridiem );

	var entryTypeSelector = 'billingDetailItems' + workday +'.billingTimeSpans' + meridiem + '.timeEntrySpanType';

	setTimeout( setValue, timeDelay + 6 * EACH_ITEM_INTERVAL, entryTypeSelector, entryType );
}

function addEntryForDay( weekday ) {

	var morningEntryStart = weekday * EACH_DAY_INTERVAL;

	addTimeEntryForDay( weekday, EntryTypeMeridiem.MORNING,
		morningStartHour, EntryTimeMeridiem.AM,
		morningEndtHour, EntryTimeMeridiem.PM,
		EntryType.LABOR, morningEntryStart );

	var afternoonEntryStart = weekday * EACH_DAY_INTERVAL + EACH_ENTRY_INTERVAL;

	addTimeForDay( weekday, afternoonEntryStart );

	addTimeEntryForDay( weekday, EntryTypeMeridiem.AFTERNOON,
		afternoonStartHour, EntryTimeMeridiem.PM,
		afternoonEndHour, EntryTimeMeridiem.PM,
		EntryType.LABOR, afternoonEntryStart );

	var noonEntryStart = weekday * EACH_DAY_INTERVAL + 2 * EACH_ENTRY_INTERVAL;

	addTimeForDay( weekday, noonEntryStart );

	addTimeEntryForDay( weekday, EntryTypeMeridiem.NOON,
		morningEndtHour, EntryTimeMeridiem.PM,
		afternoonStartHour, EntryTimeMeridiem.PM,
		EntryType.LUNCH, noonEntryStart );
}

Object.keys( Workdays ).forEach( function( index, weekday ){
	addEntryForDay( weekday );
});
