cube(`Order`, {
  sql: `SELECT * FROM dbo."Process"`,

  joins: {
    Scans: {
      relationship: `hasOne`,
      sql: `${Order}.TrackingNumber = RIGHT(${Scans}."Line", LEN(${Scans}."Line") - 1)`
    }
  },
  
  measures: {
    count: {
      sql: `count(${Order}.id)`,
      type: `number`
    },
    matchedScansCount:{
      sql: `count(${Scans}.id)`,
      type: `number`
    },
    completion: {
      sql: `${matchedScansCount} * 100.0 / ${count}`,
      type: `number`,
      format: `percent`
    },
    scanneridStr: {
      sql: `string_agg(LEFT(${Scans}."Line",1), ',')`,
      type: `number`,
    },
  },
  
  dimensions: {
    id: {
      sql: `id`,
      type: `number`,
      primaryKey: true,
      shown: true
    },
    
    processeddate: {
      sql: `${CUBE}."ProcessedDate"`,
      type: `time`
    },
    
    storename: {
      sql: `${CUBE}."StoreName"`,
      type: `string`
    },
    
    firstname: {
      sql: `${CUBE}."FirstName"`,
      type: `string`
    },
    
    lastname: {
      sql: `${CUBE}."LastName"`,
      type: `string`
    },
    
    ordernumber: {
      sql: `${CUBE}."OrderNumber"`,
      type: `string`
    },
    // The rows in this table will duplicate when there are multiple trackingnumbers for a single order.
    trackingnumber: {
      sql: `${CUBE}."TrackingNumber"`,
      type: `string`
    },
    
    service: {
      sql: `${CUBE}."Service"`,
      type: `string`
    },
    
    destinationzip: {
      sql: `${CUBE}."DestinationZip"`,
      type: `string`
    }
  }
});
