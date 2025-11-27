import request from './request'

const APPLICATION_ID = 'b4a84eb9ba424344ae2018bfac4a315b'
const FORM_HEAD_UUID = 'b28cec401ebe48d1889516ce9a271ee9'

export function getRouteList(params = {}) {
  const {
    page = 1,
    pagesize = 10,
    sortid = '',
    isasc = '',
    filters = []
  } = params

  return request.post('/appsheets/sheetapi/getFormList', {
    applicationid: APPLICATION_ID,
    formheaduuid: FORM_HEAD_UUID,
    needpage: 1,
    page,
    pagesize,
    sortid,
    isasc,
    filters
  })
}
