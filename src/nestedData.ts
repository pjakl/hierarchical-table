import {HierarchicalTableData} from './HierarchicalTable';

const tableData: HierarchicalTableData = {
	rows: [
		{
			data: {
				"Identification number": "34",
				"Name": "Joqmo",
				"Gender": "female",
				"Risk": "BITES",
				"Hair length": "6.2000000000",
				"IQ": "98",
				"Admission date": "Mon Dec 13 00:00:00 CET 1993",
				"Last breakdown": "Wed Dec 24 07:14:50 CET 2014",
				"Yearly fee": "67035",
				"Knows the Joker?": "true"
			},
			nested: {
				rootKey: 'has_relatives',
				rows: [
					{
						data: {
							"Relative ID": "1007",
							"Patient ID": "34",
							"Is alive?": "true",
							"Frequency of visits": "29"
						},
						nested: {
							rootKey: 'has_phone',
							rows: [
								{
									data: {
										"Phone ID": "2008",
										"ID of the relative": "1007",
										"Phone": "+(179)-982-0570"
									},
								}
							]
						}
					}
				]
			}
		},
		{
			data: {
				"Identification number": "35",
				"Name": "Jason",
				"Gender": "m",
				"Risk": "BITES",
				"Hair length": "1.6000000000",
				"IQ": "91",
				"Admission date": "Mon Feb 17 00:00:00 CET 1997",
				"Last breakdown": "Wed Dec 03 03:09:55 CET 2014",
				"Yearly fee": "67932",
				"Knows the Joker?": "false"
			}
		},
		{
			data: {
				"Identification number": "38",
				"Name": "Julliane",
				"Gender": "m",
				"Risk": "EVIL_EYE",
				"Hair length": "1.0000000000",
				"IQ": "100",
				"Admission date": "Wed Aug 05 00:00:00 CEST 1992",
				"Last breakdown": "Wed Oct 29 12:59:39 CET 2014",
				"Yearly fee": "57167",
				"Knows the Joker?": "true"
			},
			nested: {
				rootKey: 'has_relatives',
				rows: [
					{
						data: {
							"Relative ID": "1043",
							"Patient ID": "38",
							"Is alive?": "false",
							"Frequency of visits": "24"
						},
						nested: {
							rootKey: 'has_phone',
							rows: [
								{
									data: {
										"Phone ID": "479",
										"ID of the relative": "1043",
										"Phone": "+(123)-408--5901"
									}
								},
								{
									data: {
										"Phone ID": "2470",
										"ID of the relative": "1043",
										"Phone": "546 765-7237"
									},
								}
							]
						}
					},
					{
						data: {
							"Relative ID": "1475",
							"Patient ID": "38",
							"Is alive?": "true",
							"Frequency of visits": "38"
						},
						nested: {
							rootKey: 'has_phone',
							rows: [
								{
									data: {
										"Phone ID": "2751",
										"ID of the relative": "1475",
										"Phone": "(416) 307-5637"
									}
								},
								{
									data: {
										"Phone ID": "3148",
										"ID of the relative": "1475",
										"Phone": "943 1104931"
									}
								}
							]
						}
					}
				]
			}
		}
	]
};

export default tableData;
