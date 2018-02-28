const functions = require('firebase-functions')
const json2csv = require('json2csv')
const express = require('express')
const _ = require('lodash')
const moment = require('moment')
var admin = require('firebase-admin')

const app = express()
const serviceAccount = require('./key.json')
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://waterwatch-cb707.firebaseio.com'
})

const jsonFields = [
  {
    label: 'site ID #',
    value: 'logbookNumber'
  },
  {
    label: 'Site Name',
    value: 'logbookAbbv'
  },
  {
    label: 'Collection Date',
    value: 'collectionDate'
  },
  {
    label: 'Collection Time',
    value: 'collectionTime'
  },
  {
    label: 'Rainfall (in.)',
    value: 'precipitation'
  },
  {
    label: 'Dilution (mL / 100mL)',
    value: 'dilution'
  },
  {
    label: 'Total Coliform (MPN / 100mL)',
    value: 'totalColiform'
  },
  {
    label: 'E. coli (MPN/100mL)',
    value: 'totalEcoli'
  },
  {
    label: 'Fluorometry',
    value: 'fluorometry'
  },
  {
    label: 'Turbidity (NTU)',
    value: 'turbidity'
  },
  {
    label: 'Specific Conductivity (µS)',
    value: 'specificConductivity'
  },
  {
    label: 'Analyst',
    value: 'analyst'
  },
  {
    label: 'Notes',
    value: 'notes'
  }
]

const jsonFieldsAdopt = [
  {
    label: 'Site S-',
    value: 'aasSiteName'
  },
  {
    label: 'Event date (mm/dd/yyyy)',
    value: 'collectionDate'
  },
  {
    label: 'Time sample collected (hh:mm)',
    value: 'collectionTime'
  },
  {
    label: 'Total # of particip',
    value: 'participation'
  },
  {
    label: 'Time spent sampling (minutes)',
    value: 'samplingTime'
  },
  {
    label: 'Adopt-A-Stream monitors',
    value: 'monitor'
  },
  {
    label: 'Amount of rain (inches)',
    value: 'precipitation'
  },
  {
    label: 'In last (hours)',
    value: 'hours'
  },
  {
    label: 'Conductivity (µS/cm)',
    value: 'specificConductivity'
  },
  {
    label: 'Turbidity (NTU)',
    value: 'turbidity'
  },
  {
    label: 'Other than Petri film?',
    value: 'film'
  },
  {
    label: 'E.coli IDEXX (MPN / 100mL)',
    value: 'totalEcoli'
  }
]

const jsonFieldsStoret = [
  {
    label: 'Project ID',
    value: 'projectID'
  },
  {
    label: 'Monitoring Location ID',
    value: 'monitoringLocationId'
  },
  {
    label: 'L',
    value: 'lField'
  },
  {
    label: 'Activity Type',
    value: 'activityType'
  },
  {
    label: 'Activity Media Name',
    value: 'water'
  },
  {
    label: 'Activity Start Date',
    value: 'collectionDate'
  },
  {
    label: 'Activity Start Time',
    value: 'collectionTime'
  },
  {
    label: 'Activity Start Time Zone',
    value: 'timeZone'
  },
  {
    label: 'Activity Depth/Height Measure',
    value: 'activityMeasure'
  },
  {
    label: 'Activity Depth/Height Unit',
    value: 'activityUnit'
  },
  {
    label: 'Sample Collection Method ID',
    value: 'collectionMethod'
  },
  {
    label: 'Sample Collection Equipment Name',
    value: 'equipment'
  },
  {
    label: 'Sample Collection Equipment Comment',
    value: 'equipComment'
  },
  {
    label: 'Data Logger Line',
    value: 'loggerLine'
  },
  {
    label: 'Characteristic Name',
    value: 'characteristic'
  },
  {
    label: 'Method Speciation',
    value: 'methodSpeciation'
  },
  {
    label: 'Result Detection Condition',
    value: 'resultDetection'
  },
  {
    label: 'Result Value',
    value: 'totalEcoli'
  },
  {
    label: 'Result Unit',
    value: 'resultUnit'
  },
  {
    label: 'Result Measure Qualifier',
    value: 'qualifier'
  },
  {
    label: 'Result Sample Fraction',
    value: 'resultSampleFraction'
  },
  {
    label: 'Result Status ID',
    value: 'resultStatus'
  },
  {
    label: 'Statistical Base Code',
    value: 'baseCode'
  },
  {
    label: 'Result Value Type',
    value: 'valueType'
  },
  {
    label: 'Result Analytical Method ID',
    value: 'analyticalMethod'
  },
  {
    label: 'Result Analytical Method Context',
    value: 'analyticalMethodContext'
  },
  {
    label: 'Analysis Start Date',
    value: 'startDate'
  },
  {
    label: 'Result Detection/Quantitation Limit Type',
    value: 'limitMeasure'
  },
  {
    label: 'Result Detection/Quantitation Limit Unit',
    value: 'limitUnit'
  },
  {
    label: 'Result Comment',
    value: 'comments'
  }
]

function getCSVData ({ exportType, startDate, endDate, collectionSites }) {
  var reportsCollection = []
  var returnCollection = []
  var promiseCollection = []

  _.map(collectionSites, (siteKey) => {
    var promise = getAdminData({ siteKey, startDate, endDate })
    promiseCollection.push(promise)
  })

  return Promise.all(promiseCollection).then(function (values) {
    console.log(values)
    reportsCollection = _.flatten(values)
    console.log('promise all started')

    if (exportType === 'storet_report') {
      returnCollection = storetReport(reportsCollection)
    } else if (exportType === 'adopt_report') {
      returnCollection = adoptReport(reportsCollection)
    } else if (exportType === 'regular_report') {
      returnCollection = regularReport(reportsCollection)
    }

    if (returnCollection.length > 0) {
      let csv
      if (exportType === 'storet_report') {
        csv = json2csv({ data: returnCollection, fields: jsonFieldsStoret })
      } else if (exportType === 'adopt_report') {
        csv = json2csv({ data: returnCollection, fields: jsonFieldsAdopt })
      } else if (exportType === 'regular_report') {
        csv = json2csv({ data: returnCollection, fields: jsonFields })
      }

      return csv
    }

    return null
  })
}

function getAdminData ({ siteKey, startDate, endDate }) {
  var promise1 = new Promise(function (resolve, reject) {
    admin.database().ref('reports/' + siteKey).orderByChild('collectionDate').startAt(startDate).endAt(endDate)
      .once('value', (snapshot) => {
        var data = []
        _.map(snapshot.val(), (object) => {
          data.push(object)
        })
        resolve(data)
      }, function (error) {
        console.error(error)
      })
  })

  return promise1
}

function adoptReport (reports) {
  if (!(reports.length > 0)) return
  var jsonData = []
  jsonData = _.map(reports, (report) => {
    let startDate = moment(report.collectionDate).utcOffset(60).format('MM/DD/YY')

    return {
      aasSiteName: report.stationName + ' (' + report.aasNumber + ')',
      collectionDate: startDate || '',
      collectionTime: report.collectionTime || '',
      participation: '1',
      samplingTime: '60',
      monitor: 'Michael Meyer (25064)',
      precipitation: report.precipitation || '',
      hours: '24',
      specificConductivity: report.specificConductivity || '',
      turbidity: report.turbidity || '',
      film: 'yes',
      totalEcoli: report.totalEcoli || ''
    }
  })

  return jsonData
}

function storetReport (reports) {
  if (!(reports.length > 0)) return
  var jsonData = []

  jsonData = _.map(reports, (report) => {
    let lDate = moment(report.collectionDate).utcOffset(60).format('YYYYMMDD')
    let startDate = moment(report.collectionDate).utcOffset(60).format('YYYY-MM-DD')
    let storetTime = (report.collectionTime === '') ? '' : `${report.collectionTime}:00`

    return {
      projectID: 'NWW_2012',
      monitoringLocationId: `${report.storetId || ''}`,
      lField: `${report.storetId || ''}${lDate || ''}`,
      activityType: 'Sample-Routine',
      water: 'Water',
      collectionDate: startDate || '',
      collectionTime: storetTime || '',
      timeZone: 'EST',
      activityMeasure: ' ',
      activityUnit: ' ',
      collectionMethod: 'Grab Sample',
      equipment: 'Whirl-pak bag',
      equipComment: ' ',
      loggerLine: ' ',
      characteristic: 'Escherichia coli',
      methodSpeciation: ' ',
      resultDetection: ' ',
      totalEcoli: report.totalEcoli || '',
      resultUnit: 'MPN',
      qualifier: ' ',
      resultSampleFraction: ' ',
      resultStatus: 'Final',
      baseCode: ' ',
      valueType: 'Calculated',
      analyticalMethod: 'Colliert',
      analyticalMethodContext: 'IDEXX',
      startDate: ' ',
      limitMeasure: ' ',
      limitUnit: ' ',
      comments: ' '
    }
  })

  return jsonData
}

function regularReport (reports) {
  if (!(reports.length > 0)) return
  var jsonData = []

  jsonData = _.map(reports, (report) => {
    return {
      logbookNumber: report.logbookNumber || '',
      logbookAbbv: report.stationName || '',
      collectionDate: report.collectionDate || '',
      collectionTime: report.collectionTime || '',
      precipitation: report.precipitation || '',
      dilution: '2/100',
      totalColiform: report.totalColiform || '',
      totalEcoli: report.totalEcoli || '',
      fluorometry: report.fluorometry || '',
      turbidity: report.turbidity || '',
      specificConductivity: report.specificConductivity || '',
      analyst: report.analyst || '',
      notes: report.notes || ''
    }
  })

  return jsonData
}

app.post('/export', (request, response) => {
  var exportType = request.body['export_type']
  var startDate = request.body['start_date']
  var endDate = request.body['end_date']
  var collectionSites = request.body['collection_sites']

  getCSVData({ exportType, startDate, endDate, collectionSites })
    .then((csv) => {
      response.setHeader('Content-disposition', `attachment;filename=report.xls`)
      response.set('Content-Type', 'application/vnd.ms-excel')
      response.status(200).send(csv)
    })
})

exports.exportExcel = functions.https.onRequest(app)
