/*
Copyright 2018 SAS Institute Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    https://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
(function (window) {
    'use strict';

    var googleHelper = {};
	
	googleHelper.createDataTable = function(resultData)
	{
		var arrayData;
		if (resultData.data)
		{
			arrayData = resultData.data;
			if (resultData.columns)
			{
				arrayData.splice(0, 0, resultData.columns);
			}
		}
		return google.visualization.arrayToDataTable(arrayData);
	};

	googleHelper.formatData = function(dataTable, resultData)
	{
		if (!resultData || !dataTable)
			return;
			
		var columnInfo = resultData.columns;
		if (columnInfo)
		{
			for (var i = 0; i < columnInfo.length; i++)
			{
				var colInfo = columnInfo[i];
				if (colInfo.format)
				{
					if (colInfo.format.name == "DOLLAR")
					{
						var formatter = new google.visualization.NumberFormat({
							prefix: '$',
							fractionDigits: colInfo.format.precision
						});
						formatter.format(dataTable, i);
					}
					else if (colInfo.format.name == "COMMA")
					{
						var formatter = new google.visualization.NumberFormat({
							fractionDigits: colInfo.format.precision
						});
						formatter.format(dataTable, i);
					}
					else if (colInfo.format.name == "F")
					{
						var formatter = new google.visualization.NumberFormat({
							groupingSymbol: '',
							fractionDigits: colInfo.format.precision
						});
						formatter.format(dataTable, i);
					}
					else if (colInfo.format.name == "PERCENT")
					{
						var pattern = '#,###';
						if (colInfo.format.precision > 0)
						{
							pattern += ".";
							for (var j = 0; j < colInfo.format.precision; j++)
								pattern += "#";
						}
						
						pattern += "%";
						var formatter = new google.visualization.NumberFormat({
							pattern: pattern
						});
						formatter.format(dataTable, i);
					}
					else if (colInfo.format.name == "MONYY")
					{
						var formatter = new google.visualization.DateFormat({pattern: "MMMyyyy"});
						formatter.format(dataTable, i);
					}
					else if (colInfo.format.name == "MMYY")
					{
						var formatter = new google.visualization.DateFormat({pattern: "MM/yyyy"});
						formatter.format(dataTable, i);
					}
					else if (colInfo.format.name == "DATEN" || colInfo.format.formatString == "MMDDYY8")
					{
						var formatter = new google.visualization.DateFormat({pattern: "MM/dd/yyyy"});
						formatter.format(dataTable, i);
					}
					else if (colInfo.format.formatString == "DATE9")
					{
						var formatter = new google.visualization.DateFormat({pattern: "ddMMMyyyy"});
						formatter.format(dataTable, i);
					}
					else if (colInfo.format.formatString == "DATE11")
					{
						var formatter = new google.visualization.DateFormat({pattern: "MMM/dd/yyyy"});
						formatter.format(dataTable, i);
					}
					else if (colInfo.format.formatString == "DDMMYY8")
					{
						var formatter = new google.visualization.DateFormat({pattern: "dd/MM/yyyy"});
						formatter.format(dataTable, i);
					}
					else if (colInfo.format.formatString == "WORDDATE28")
					{
						var formatter = new google.visualization.DateFormat({formatType: "long"});
						formatter.format(dataTable, i);
					}
					else if (colInfo.format.formatString == "YYMMDD8")
					{dd
						var formatter = new google.visualization.DateFormat({pattern: "yyyy/MM/dd"});
						formatter.format(dataTable, i);
					}
					else if (colInfo.format.name == "DATETIME")
					{
						var formatter = new google.visualization.DateFormat({pattern: "ddMMMyyyy:HH:mm:ss"});
						formatter.format(dataTable, i);
					}
				}
			}
		}		
	};
		
	googleHelper.formatAxis = function(axis, options, resultData)
	{
		if (!resultData || !options || !axis)
			return;
			
		var columnInfo = resultData.columns;
		if (columnInfo)
		{
			if (!options[axis]) options[axis] = {};
			for (var i = 0; i < columnInfo.length; i++)
			{
				var colInfo = columnInfo[i];
				if (colInfo.format)
				{
					if (colInfo.format.name == "DOLLAR")
					{
						options[axis].format = '$#,###';
					}
					else if (colInfo.format.name == "COMMA")
					{
						options[axis].format = '#,###';
					}
					else if (colInfo.format.name == "F" || colInfo.format.name == "BEST")
					{
						options[axis].format = '####';
					}
					else if (colInfo.format.name == "PERCENT")
					{
						options[axis].format = 'percent';
					}
				}
			}
		}
	};
	
	googleHelper.convertDataOrgChart = function (dataTable, resultData)/*(arrayData, columnsInfo)*/ {
			if (!resultData || !dataTable)
			return;
			
			var numCols = resultData.columns;
			//var numCols = columnsInfo.length;
			for (var r = 0; r < dataTable.length; r++) {
				// At the highest level, there is no parent ID (= "missing" for string column or "." for numeric column).
				// An empty string as the parent ID will prevent the node to be displayed with a missing value.
			    if (dataTable[r][1] === "(ausente)" || dataTable[r][1] === ".") {dataTable[r][1] = "";}
				if (numCols >= 3 && dataTable[r][2] !== '') {
					// if an optional formatted role is provided (3rd column), add that to node ID (1st column) as {v: unformattedValue, f: formattedValue}
					// note: an empty 3rd column means no formatted value
					dataTable[r][0] = {v: dataTable[r][0], f: dataTable[r][2]};
				}
				if (numCols >= 3) {
					// Tooltip (if any) must be the third column for Google OrgChart
					// Remove column #3 (format) and let column #4 (tooltip, if any) automatically become column #3
					dataTable[r].splice(2,1);
				}
			}
			if (numCols >= 3) {
				// Tooltip (if any) must be the third column for Google OrgChart
				// Remove column #3 (format) and let column #4 (tooltip, if any) automatically become column #3
					//columnsInfo.splice(2,1);
			}
		}
	
	if (!window.va)
		window.va = {};
    window.va.googleHelper = googleHelper;

})(window);