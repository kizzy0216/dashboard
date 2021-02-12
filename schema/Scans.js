cube(`Scans`, {
  // dataSource: `scans`,
  sql: `SELECT * FROM "Transact"."TransactionLine"`,

  joins: {
 
    },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [id, sourceid, utccreated]
    }
  },
  
  dimensions: {
    id: {
      sql: `${CUBE}."Id"`,
      type: `number`,
      primaryKey: true
    },
    scannerid: {
      sql: `LEFT(${CUBE}."Line",1)`,
      type: `string`,
	  title: `Employee ID`
    },	
//this tracking ID should match one from Processed.js(trackingnumber). Note we use these scanners for other purposes, so if it doesn't match it can be ignored.
    scannerdata: { 
      sql: `RIGHT(${CUBE}."Line", LEN(${CUBE}."Line") - 1)`,
      type: `string`,
	  title: `Scan Data`
    },		
// Line contains the Scanner ID as a single letter at the beginning of the data, then the barecode data. I have split that into two dimensions.
    line: {
      sql: `${CUBE}."Line"`,
      type: `string`,
	  shown: false
    },
    
    sourceid: {
      sql: `${CUBE}."SourceId"`,
      type: `string`,
      shown: false
    },
    
    utccreated: {
      sql: `${CUBE}."UtcCreated"`,
      type: `time`
    }
  }
});
